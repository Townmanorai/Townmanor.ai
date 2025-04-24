import React from 'react'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { VscFilePdf } from "react-icons/vsc";
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    if (!url || url === 'undefined' || url === 'null') {
      reject(new Error('Invalid image URL'));
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";  // Enable CORS

    // Add error handling for malformed URLs
    try {
      new URL(url); // This will throw if URL is invalid
    } catch (e) {
      reject(new Error('Invalid URL format'));
      return;
    }

    img.onload = () => resolve(img);
    img.onerror = (error) => {
      console.error('Error loading image:', error);
      reject(error);
    };
    img.src = url;
  });
};

// Function to add watermark to all pages
const addWatermark = (doc) => {
  const pageCount = doc.internal.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(60);
    doc.setTextColor(230, 230, 230);
    doc.setGState(new doc.GState({ opacity: 0.3 }));
    doc.text("TOWNMANOR", pageWidth/2, pageHeight/2, {
      align: 'center',
      angle: -45,
      renderingMode: 'fill'
    });
  }
};

// Function to add company logo
const addCompanyLogo = async (doc) => {
  try {
    const logoImage = await loadImage('/logo.png');
    
    // Calculate dimensions for the logo
    const maxLogoWidth = 100;
    const maxLogoHeight = 40;
    let logoWidth = logoImage.width;
    let logoHeight = logoImage.height;
    
    // Maintain aspect ratio
    if (logoWidth > maxLogoWidth) {
      logoHeight = (maxLogoWidth * logoHeight) / logoWidth;
      logoWidth = maxLogoWidth;
    }
    if (logoHeight > maxLogoHeight) {
      logoWidth = (maxLogoHeight * logoWidth) / logoHeight;
      logoHeight = maxLogoHeight;
    }

    // Create canvas for logo
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = logoImage.width;
    canvas.height = logoImage.height;
    ctx.drawImage(logoImage, 0, 0);
    
    // Get the last page
    const totalPages = doc.internal.getNumberOfPages();
    doc.setPage(totalPages);

    // Get page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Position logo at absolute bottom
    const xPos = (pageWidth - logoWidth) / 2;
    const yPos = pageHeight - maxLogoHeight - 15; // 15px from bottom

    // Add logo
    doc.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      xPos,
      yPos,
      logoWidth,
      logoHeight
    );
  } catch (error) {
    console.error('Error adding logo:', error);
  }
};

const generatePropertyPDF = async (property) => {
  try {
    console.log('Property data for PDF:', property);
    const doc = new jsPDF();
    let yPos = 20;

    // Add header with title
    doc.setFontSize(24);
    doc.setTextColor(0, 102, 204);
    doc.text("Property Details", 105, yPos, { align: "center" });
    yPos += 20;

    // Add images if available
    if (property.image_repository) {
      try {
        const images = property.image_repository.split(',')
          .map(img => img.trim())
          .filter(img => img && img !== 'undefined' && img !== 'null')
          .slice(0, 3); // Get up to 3 images

        if (images.length > 0) {
          // Calculate dimensions for images in a row
          const pageWidth = doc.internal.pageSize.getWidth();
          const margin = 20;
          const spacing = 10;
          const availableWidth = pageWidth - (2 * margin) - (2 * spacing);
          const individualWidth = availableWidth / 3;
          const maxHeight = 60;

          // Process up to 3 images
          for (let i = 0; i < images.length; i++) {
            const imageUrl = images[i];
            console.log('Loading image from:', imageUrl);

            try {
              const img = await loadImage(imageUrl);
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              
              const imageData = canvas.toDataURL('image/jpeg', 0.8);

              // Calculate dimensions while maintaining aspect ratio
              let width = individualWidth;
              let height = (individualWidth * img.height) / img.width;
              
              if (height > maxHeight) {
                width = (maxHeight * width) / height;
                height = maxHeight;
              }

              // Calculate x position for image in row
              const xPos = margin + (i * (individualWidth + spacing));

              // Add image to PDF
              doc.addImage(
                imageData,
                'JPEG',
                xPos,
                yPos,
                width,
                height,
                undefined,
                'MEDIUM'
              );

              // Only update yPos after all images are added
              if (i === images.length - 1) {
                yPos += maxHeight + 10;
              }
            } catch (error) {
              console.error('Error processing image:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error handling images:', error);
      }
    }

    // Format price function
    const formatPrice = (price) => {
      if (!price) return null;
      
      // If price is already a string with currency symbol
      if (typeof price === 'string') {
        // Clean up the price string
        const cleanPrice = price.replace('â‚¹', '₹').trim();
        return cleanPrice;
      }
      
      if (isNaN(price) || !isFinite(price)) {
        return null;
      }

      try {
        return `₹ ${price.toLocaleString('en-IN')} ${property.money_type || 'INR'}`;
      } catch (error) {
        console.error('Error formatting price:', error);
        return null;
      }
    };

    // Filter and format fields
    const details = [
      property.property_name && ["Property Name", property.property_name],
      (property.address || property.city) && ["Location", `${property.address || ''} ${property.city || ''}`.trim()],
      property.configuration && ["Configuration", property.configuration],
      (property.area_detail || property.area_type) && 
        ["Area", `${property.area_detail || ''} ${property.area_type || ''}`.trim()],
      formatPrice(property.price) && ["Price", formatPrice(property.price)],
      property.purpose && ["Purpose", property.purpose],
      property.property_facing && ["Facing", property.property_facing],
      property.furnish_type && ["Furnishing", property.furnish_type]
    ].filter(item => {
      return item && 
             item[1] && 
             item[1].toString().trim() !== '' && 
             item[1].toString().toLowerCase() !== 'nan' &&
             item[1].toString().toLowerCase() !== 'undefined';
    });

    // Add property details table
    doc.setFontSize(16);
    doc.setTextColor(0, 102, 204);
    doc.text("Overview", 20, yPos);
    yPos += 10;

    doc.autoTable({
      startY: yPos,
      head: [["Detail", "Value"]],
      body: details,
      theme: "grid",
      headStyles: { 
        fillColor: [0, 102, 204],
        textColor: [255, 255, 255]
      },
      styles: {
        fontSize: 10,
        cellPadding: 5
      }
    });

    yPos = doc.lastAutoTable.finalY + 15;

    // Add description if available
    if (property.description) {
      // Check if we need a new page
      if (yPos > doc.internal.pageSize.height - 60) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(16);
      doc.setTextColor(0, 102, 204);
      doc.text("Description", 20, yPos);
      yPos += 10;

      doc.setFontSize(10);
      doc.setTextColor(51, 51, 51);
      const descriptionLines = doc.splitTextToSize(property.description, 170);
      doc.text(descriptionLines, 20, yPos);
      yPos += (descriptionLines.length * 6) + 15; // Increased line spacing
    }

    // Add amenities if available
    if (property.amenities) {
      // Check if we need a new page
      if (yPos > doc.internal.pageSize.height - 60) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(16);
      doc.setTextColor(0, 102, 204);
      doc.text("Amenities", 20, yPos);
      yPos += 10;

      let amenitiesList = Array.isArray(property.amenities) 
        ? property.amenities 
        : typeof property.amenities === 'string'
          ? property.amenities.split(',').map(a => a.trim())
          : [];

      // Filter out empty or invalid amenities
      amenitiesList = amenitiesList.filter(amenity => 
        amenity && typeof amenity === 'string' && amenity.trim().length > 0
      );

      if (amenitiesList.length > 0) {
        // Format amenities with bullet points in columns
        const amenitiesPerRow = 2;
        const amenityRows = [];
        
        for (let i = 0; i < amenitiesList.length; i += amenitiesPerRow) {
          const row = amenitiesList.slice(i, i + amenitiesPerRow).map(amenity => `• ${amenity.trim()}`);
          amenityRows.push(row);
        }

        doc.autoTable({
          startY: yPos,
          body: amenityRows,
          theme: "plain",
          styles: {
            fontSize: 10,
            cellPadding: 5,
            lineWidth: 0
          },
          columnStyles: {
            0: { cellWidth: 85 },
            1: { cellWidth: 85 }
          }
        });

        yPos = doc.lastAutoTable.finalY + 15;
      }
    }

    // Add distances if available
    const distances = [
      property.metro && property.metro !== 'NaN' && property.metro.toString().trim() !== '' && ["Metro", property.metro],
      property.school && property.school !== 'NaN' && property.school.toString().trim() !== '' && ["School", property.school],
      property.hospital && property.hospital !== 'NaN' && property.hospital.toString().trim() !== '' && ["Hospital", property.hospital],
      property.mall && property.mall !== 'NaN' && property.mall.toString().trim() !== '' && ["Mall", property.mall],
      property.restaurant && property.restaurant !== 'NaN' && property.restaurant.toString().trim() !== '' && ["Restaurant", property.restaurant],
      property.bus && property.bus !== 'NaN' && property.bus.toString().trim() !== '' && ["Bus", property.bus],
      property.cinema && property.cinema !== 'NaN' && property.cinema.toString().trim() !== '' && ["Cinema", property.cinema]
    ].filter(item => item && item[1] && 
      item[1].toString().trim() !== '' && 
      item[1].toString().toLowerCase() !== 'nan' && 
      item[1].toString().toLowerCase() !== 'undefined'
    );

    if (distances.length > 0) {
      // Check if we need a new page
      if (yPos > doc.internal.pageSize.height - 60) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(16);
      doc.setTextColor(0, 102, 204);
      doc.text("Nearby Places", 20, yPos);
      yPos += 10;

      doc.autoTable({
        startY: yPos,
        head: [["Place", "Distance"]],
        body: distances,
        theme: "grid",
        headStyles: { 
          fillColor: [0, 102, 204],
          textColor: [255, 255, 255]
        },
        styles: {
          fontSize: 10,
          cellPadding: 5
        }
      });

      yPos = doc.lastAutoTable.finalY + 15;
    }

    // Add contact information (right-aligned)
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(12);
    doc.setTextColor(51, 51, 51);
    
    // Calculate right margin position (20px from right)
    const rightMargin = pageWidth - 20;
    
    // Add contact details right-aligned
    doc.text("Contact Us:", rightMargin, yPos, { align: 'right' });
    yPos += 7;
    doc.text("Email: sales@townmanor.in", rightMargin, yPos, { align: 'right' });
    yPos += 7;
    doc.text("Phone: +91-0120-4420450, 7042888903", rightMargin, yPos, { align: 'right' });
    yPos += 20;

    // Add watermark to all pages
    addWatermark(doc);

    // Add company logo at the end
    try {
      const logoImage = await loadImage('/logo.png'); // Load from public folder
      
      // Calculate dimensions for the logo
      const maxLogoWidth = 100;
      const maxLogoHeight = 40;
      let logoWidth = logoImage.width;
      let logoHeight = logoImage.height;
      
      // Maintain aspect ratio
      if (logoWidth > maxLogoWidth) {
        logoHeight = (maxLogoWidth * logoHeight) / logoWidth;
        logoWidth = maxLogoWidth;
      }
      if (logoHeight > maxLogoHeight) {
        logoWidth = (maxLogoHeight * logoWidth) / logoHeight;
        logoHeight = maxLogoHeight;
      }

      // Create canvas for logo
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = logoImage.width;
      canvas.height = logoImage.height;
      ctx.drawImage(logoImage, 0, 0);
      
      // Position logo at bottom center
      const pageWidth = doc.internal.pageSize.getWidth();
      const xPos = (pageWidth - logoWidth) / 2;
      const bottomMargin = 30;
      const yPosition = doc.internal.pageSize.getHeight() - bottomMargin;

      // Add logo
      doc.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        xPos,
        yPosition,
        logoWidth,
        logoHeight
      );
    } catch (error) {
      console.error('Error adding logo:', error);
      // Try with absolute path if relative path fails
      try {
        const logoImage = await loadImage(window.location.origin + '/logo.png');
        
        const maxLogoWidth = 100;
        const maxLogoHeight = 40;
        let logoWidth = logoImage.width;
        let logoHeight = logoImage.height;
        
        if (logoWidth > maxLogoWidth) {
          logoHeight = (maxLogoWidth * logoHeight) / logoWidth;
          logoWidth = maxLogoWidth;
        }
        if (logoHeight > maxLogoHeight) {
          logoWidth = (maxLogoHeight * logoWidth) / logoHeight;
          logoHeight = maxLogoHeight;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = logoImage.width;
        canvas.height = logoImage.height;
        ctx.drawImage(logoImage, 0, 0);
        
        const xPos = (pageWidth - logoWidth) / 2;
        const bottomMargin = 30;
        const yPosition = doc.internal.pageSize.getHeight() - bottomMargin;

        doc.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          xPos,
          yPosition,
          logoWidth,
          logoHeight
        );
      } catch (secondError) {
        console.error('Error adding logo with absolute path:', secondError);
      }
    }

    // Save the PDF
    doc.save('townmanor-property-details.pdf');

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

function AdminPdf({property}) {
  const handleDownload = () => {
    console.log('Download button clicked, property:', property);
    generatePropertyPDF(property);
  };

  return (
    <>
      <button 
        className="custom_pdf_btn_2025" 
        style={{
            width:'fit-content'
        }}
        onClick={handleDownload}
      >
        <VscFilePdf size={20}/> Download Bronchure
      </button>
    </>
  );
}

export default AdminPdf;