import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";  // Enable CORS
    img.onload = () => resolve(img);
    img.onerror = (error) => {
      console.error('Error loading image:', error);
      reject(error);
    };
    img.src = url;
  });
};

const generatePropertyPDF = async (property) => {
  // Debug log to see what data we're receiving
  console.log('Property data for PDF:', property);

  // Create new document
  const doc = new jsPDF();
  let yPos = 20;

  try {
    // Add header with logo and title
    doc.setFontSize(24);
    doc.setTextColor(0, 102, 204);
    doc.text("Property Details", 105, yPos, { align: "center" });
    yPos += 20;

    // Add images if available
    if (property.image_repository) {
      try {
        const images = property.image_repository.split(',')
          .map(img => img.trim())
          .filter(img => img); // Remove empty strings

        if (images.length > 0) {
          // Take first image
          const imageUrl = `https://s3.ap-south-1.amazonaws.com/townamnor.ai/owner-images/${images[0]}`;
          console.log('Loading image from:', imageUrl);

          // Create a canvas to process the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          try {
            const img = await loadImage(imageUrl);
            
            // Set canvas size to match image
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw image to canvas
            ctx.drawImage(img, 0, 0);
            
            // Get image data as base64
            const imageData = canvas.toDataURL('image/jpeg');

            // Calculate dimensions while maintaining aspect ratio
            const maxWidth = 170;
            const maxHeight = 100;
            let width = img.width;
            let height = img.height;
            
            if (width > maxWidth) {
              height = (maxWidth * height) / width;
              width = maxWidth;
            }
            if (height > maxHeight) {
              width = (maxHeight * width) / height;
              height = maxHeight;
            }

            // Add image to PDF
            doc.addImage(
              imageData,
              'JPEG',
              20,
              yPos,
              width,
              height,
              undefined,
              'MEDIUM'
            );
            yPos += height + 10;

          } catch (error) {
            console.error('Error processing image:', error);
            // Continue without image
          }
        }
      } catch (error) {
        console.error('Error handling image repository:', error);
        // Continue without image
      }
    }

    // Add property details
    if (property) {
      // Basic Property Details
      doc.setFontSize(16);
      doc.setTextColor(0, 102, 204);
      doc.text("Overview", 20, yPos);
      yPos += 10;

      // Only include fields that have values
      const details = [
        property.property_name && ["Property Name", property.property_name],
        property.address && ["Location", property.address+property.city],
        property.configuration && ["Configuration", property.configuration],
        (property.area_detail || property.area_type) && ["Area", `${property.area_detail || ''} ${property.area_type || ''}`],
        property.price && ["Price", `${property.price.toLocaleString()} ${property.money_type || 'INR'}`],
        property.purpose && ["Purpose", property.purpose],
        property.property_facing && ["Facing", property.property_facing],
        property.furnish_type && ["Furnishing", property.furnish_type]
      ].filter(Boolean);

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
        property.metro && ["Metro", property.metro],
        property.school && ["School", property.school],
        property.hospital && ["Hospital", property.hospital],
        property.mall && ["Mall", property.mall],
        property.restaurant && ["Restaurant", property.restaurant],
        property.bus && ["Bus", property.bus],
        property.cinema && ["Cinema", property.cinema]
      ].filter(Boolean);

      if (distances.length > 0) {
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

      // Add contact information
      doc.setFontSize(12);
      doc.setTextColor(51, 51, 51);
      doc.text("Contact Us:", 20, yPos);
      yPos += 7;
      doc.text("Email: sales@townmanor.in", 20, yPos);
      yPos += 7;
      doc.text("Phone: +91-0120-4420450, 7042888903", 20, yPos);
      yPos += 20;

      // Add company logo at the bottom
      try {
        const logoImage = await loadImage('/logo.png'); // Assuming logo.png is in the public folder
        
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
        // Continue without logo if it fails to load
      }
    }

    // Add watermark
    doc.setFontSize(60);
    doc.setTextColor(230, 230, 230);
    
    // Get page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Add diagonal watermark
    doc.setGState(new doc.GState({ opacity: 0.3 }));
    doc.text("TOWNMANOR", pageWidth/2, pageHeight/2, {
      align: 'center',
      angle: -45,
      renderingMode: 'fill'
    });

    // Save the PDF
    doc.save('townmanor-property-details.pdf');

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

const PropertyPDF = ({ property }) => {
  const handleDownload = () => {
    console.log('Download button clicked, property:', property);
    generatePropertyPDF(property);
  };

  return (
    <button 
      className="custom_pdf_btn_2025" 
      onClick={handleDownload}
    >
      ⬇ Download PDF
    </button>
  );
};

export default PropertyPDF; 