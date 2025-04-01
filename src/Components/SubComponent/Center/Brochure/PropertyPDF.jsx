import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PropertyPDF = ({ property }) => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    let currentY = 35;

    // Property Title
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text(property.property_name, 20, currentY);

    // Property Address
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    const addressX = 190;
    doc.text(property.address, addressX, currentY, { align: "right" });

    currentY += 5;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(20, currentY, 190, currentY);

    currentY += 10;

    // Add three images horizontally
    const loadAndAddImages = async () => {
      const imageWidth = 50;
      const imageHeight = 35;
      const gap = 10;
      const startX = 20;

      // Get first three images from repository
      const imagesToShow = property.image_repository ? property.image_repository.slice(0, 3) : [];
      
      if (imagesToShow.length > 0) {
        try {
          for (let i = 0; i < imagesToShow.length; i++) {
            const imageUrl = imagesToShow[i];
            const xPosition = startX + (i * (imageWidth + gap));
            
            // Create new image object
            const img = new Image();
            img.crossOrigin = "Anonymous";  // Handle CORS
            
            // Convert the image to base64 and add to PDF
            await new Promise((resolve, reject) => {
              img.onload = () => {
                try {
                  const canvas = document.createElement('canvas');
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0);
                  
                  const imageData = canvas.toDataURL('image/jpeg');
                  doc.addImage(imageData, 'JPEG', xPosition, currentY, imageWidth, imageHeight);
                  resolve();
                } catch (err) {
                  console.warn(`Failed to process image ${i + 1}:`, err);
                  resolve(); // Continue with next image even if this one fails
                }
              };
              
              img.onerror = () => {
                console.warn(`Failed to load image ${i + 1}`);
                resolve(); // Continue with next image even if this one fails
              };
              
              img.src = imageUrl;
            });
          }
        } catch (error) {
          console.warn('Error processing images:', error);
        }
        
        // Update currentY position after images
        currentY += imageHeight + 10;
      }
    };

    // Call the async function to load images
    await loadAndAddImages();

    // Short Introduction
    const shortIntro = `Discover ${property.property_name} in ${property.locality}, ${property.city}, an exciting new housing society currently under construction. Jointly developed by Godrej Properties and ACE Group, this project features apartments for sale and is set for possession in June 2025. ${property.property_name} offers 430 exclusive 'Resort Residences,' providing a lifestyle that feels like a continuous vacation. Designed by Godrej Properties, a highly trusted real estate name, this development aims to deliver low-rise, resort-style homes for a tranquil and low-density living experience. The property is currently ${property.construction_status}.`;

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    const shortIntroLines = doc.splitTextToSize(shortIntro, 170);
    doc.text(shortIntroLines, 20, currentY + 10, {
      maxWidth: 170,
      align: "left",
    });

    currentY += shortIntroLines.length * 6 + 10;

    // Overview Section
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204);
    doc.text("Overview", 20, currentY);

    currentY += 10;

    // Add Table for Property Details
    doc.autoTable({
      startY: currentY,
      head: [["Label", "Value", "Additional Info"]],
      body: [
        ["City", property.city, ""],
        ["Locality", property.locality, ""],
        [
          "Price",
          `${property.money_type} ${property.price.toLocaleString()}`,
          `Range: ${property.pricerange}`,
        ],
        [
          "Configuration",
          property.configuration,
          `${property.area_detail} ${property.area_type}`,
        ],
        ["Bathrooms", property.bathroom, ""],
        ["Balconies", property.balcony, ""],
        [
          "Floor",
          `${property.floor_no} of ${property.total_floor}`,
          `Facing: ${property.property_facing}`,
        ],
        ["Furnish Type", property.furnish_type, ""],
        ["RERA ID", property.rera_id, ""],
        ["Construction Status", property.construction_status, ""],
        [
          "Maintenance",
          `${property.money_type} ${property.maintenance_charge}`,
          "",
        ],
        ["Token Amount", `${property.money_type} ${property.token_amount}`, ""],
        ["Monthly Rent", `${property.money_type} ${property.monthly_rent}`, ""],
        [
          "Security Deposit",
          `${property.money_type} ${property.security_deposit}`,
          "",
        ],
        [
          "Current Lease",
          property.current_lease,
          `Remaining: ${property.remaining_time}`,
        ],
        ["Lock-in Period", property.lock_in_period, ""],
      ],
      theme: "striped",
      styles: {
        fontSize: 10,
        halign: "left",
        valign: "middle",
      },
      headStyles: {
        fillColor: [0, 102, 204],
        textColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      margin: { top: 10 },
    });

    currentY = doc.lastAutoTable.finalY + 10;

    // Amenities Section
    const drawAmenitiesSection = () => {
      // Check if we need a new page
      if (currentY + 40 > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        currentY = 35;
      }

      // Add Amenities header
      doc.setFontSize(18);
      doc.setTextColor(0, 102, 204);
      doc.text("Amenities", 20, currentY);
      currentY += 15;

      // Set up amenities display configuration
      let amenities = [];
      // Ensure amenities is properly formatted as an array of strings
      if (Array.isArray(property.amenities)) {
        amenities = property.amenities;
      } else if (typeof property.amenities === 'string') {
        try {
          // If it's a JSON string, parse it
          amenities = JSON.parse(property.amenities);
        } catch (e) {
          // If parsing fails, split by comma as fallback
          amenities = property.amenities.split(',').map(item => item.trim());
        }
      }

      // Skip if no amenities
      if (!amenities || amenities.length === 0) {
        currentY += 10;
        return;
      }

      const columns = 3;
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const usableWidth = pageWidth - (2 * margin);
      const columnWidth = usableWidth / columns;
      const lineHeight = 8;
      const itemsPerColumn = Math.ceil(amenities.length / columns);

      // Set font for amenities
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);

      // Draw amenities in columns
      for (let i = 0; i < amenities.length; i++) {
        if (!amenities[i] || typeof amenities[i] !== 'string') continue;
        
        const column = Math.floor(i / itemsPerColumn);
        const row = i % itemsPerColumn;
        
        const x = margin + (column * columnWidth);
        const y = currentY + (row * lineHeight);

        // Check if we need a new page
        if (y > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          currentY = 35;
          // Redraw the header on the new page
          doc.setFontSize(18);
          doc.setTextColor(0, 102, 204);
          doc.text("Amenities (continued)", 20, currentY);
          currentY += 15;
          
          // Reset for amenities text
          doc.setFontSize(10);
          doc.setTextColor(80, 80, 80);
          
          // Adjust y position for the current item
          const newRow = 0;
          const newY = currentY + (newRow * lineHeight);
          doc.text("• " + amenities[i].trim(), x, newY);
        } else {
          doc.text("• " + amenities[i].trim(), x, y);
        }
      }

      // Update currentY to after the amenities section
      const totalRows = Math.ceil(amenities.length / columns);
      currentY += (totalRows * lineHeight) + 20;
    };

    drawAmenitiesSection();

    // Distance Section
    const drawDistanceSection = () => {
      doc.setFontSize(18);
      doc.setTextColor(0, 102, 204);
      doc.text("Distance", 20, currentY);
      currentY += 10;

      // Define distances from property object
      const distances = [
        { label: "Metro", value: property.metro },
        { label: "School", value: property.school },
        { label: "Hospital", value: property.hospital },
        { label: "Mall", value: property.mall },
        { label: "Restaurant", value: property.restaurant },
        { label: "Bus", value: property.bus },
        { label: "Cinema", value: property.cinema },
      ];

      const columns = 3;
      const columnWidth = 60; // Width for each column
      const lineHeight = 10;

      // Add distances to the PDF
      for (let i = 0; i < distances.length; i++) {
        const colIndex = i % columns;
        const rowIndex = Math.floor(i / columns);
        const xPosition = 20 + colIndex * columnWidth;

        if (
          currentY + rowIndex * lineHeight >
          doc.internal.pageSize.getHeight() - 20
        ) {
          doc.addPage();
          currentY = 20;
        }

        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        doc.text(
          `${distances[i].label}: ${distances[i].value}`,
          xPosition,
          currentY + rowIndex * lineHeight
        );
      }

      currentY += Math.ceil(distances.length / columns) * lineHeight + 20; // Adjust currentY after distances list
    };

    drawDistanceSection();

    // Add Footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      // Add company name instead of logo at the top of every page
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() - 30,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    // Footer on last page
    doc.setPage(pageCount);
    const footerYPosition = doc.internal.pageSize.getHeight() - 20;

    // Contact details on the left
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Contact Details", 20, footerYPosition - 20);

    // Reset font weight for email and phone numbers
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("sales@townmanor.in", 20, footerYPosition - 10);
    doc.text("+91-0120-4420450, 7042888903", 20, footerYPosition);

    // Company name on the right
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    
    // Company Name - aligned to right
    const companyName = "Townmanor Technologies Pvt Ltd";
    const companyNameWidth = doc.getStringUnitWidth(companyName) * 12 / doc.internal.scaleFactor;
    const rightMargin = 20;
    const companyNameX = doc.internal.pageSize.getWidth() - companyNameWidth - rightMargin;
    
    doc.text(companyName, companyNameX, footerYPosition - 15);
    
    // Add a styled tagline
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Your Trusted Property Partner", companyNameX, footerYPosition - 5);

    // Reset font back to normal
    doc.setFont("helvetica", "normal");

    // Save the PDF
    doc.save(`property_${property.id}.pdf`);
  };

  return (
    <button 
      className="download-btn" 
      onClick={async () => {
        try {
          await generatePDF();
        } catch (error) {
          console.error('Error generating PDF:', error);
        }
      }}
    >
      Download PDF
    </button>
  );
};

export default PropertyPDF;
