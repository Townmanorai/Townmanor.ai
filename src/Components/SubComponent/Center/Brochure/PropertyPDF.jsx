import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PropertyPDF = ({ property }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Load logo image (replace with correct path or URL of your logo)
    const logoPath = "logo.Townmanorr.png"; // If local or a URL

    // Add Logo at the top center
    const logoWidth = 40;
    const logoHeight = 8;
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = (pageWidth - logoWidth) / 2;

    doc.addImage(logoPath, "PNG", centerX, 10, logoWidth, logoHeight);

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
    const imageWidth = 50; // Width of each image
    const imageHeight = 35; // Height of each image
    const gap = 10; // Gap between images
    const imagePaths = ["image1.jpg", "image2.jpg", "image3.jpg"];

    // Calculate positions for the images
    let imageX = 20;
    for (let i = 0; i < imagePaths.length; i++) {
      doc.addImage(imagePaths[i],"JPEG",imageX,currentY,imageWidth,imageHeight);
      imageX += imageWidth + gap; // Move X position for the next image
    }

    currentY += imageHeight + 5; // Move Y position after the images

    // Short Introduction
    const shortIntro = `Discover ${property.property_name} in ${property.locality}, ${property.city}, an exciting new housing society currently under construction. Jointly developed by Godrej Properties and ACE Group, this project features apartments for sale and is set for possession in June 2025. ${property.property_name} offers 430 exclusive ‘Resort Residences,’ providing a lifestyle that feels like a continuous vacation. Designed by Godrej Properties, a highly trusted real estate name, this development aims to deliver low-rise, resort-style homes for a tranquil and low-density living experience. The property is currently ${property.construction_status}.`;

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
      const requiredSpace = 18 + Math.ceil(property.amenities.length / 3) * 10;
      if (currentY + requiredSpace > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        currentY = 35;
      }

      doc.setFontSize(18);
      doc.setTextColor(0, 102, 204);
      doc.text("Amenities", 20, currentY);
      currentY += 10;

      const amenities = property.amenities || [];
      const columns = 3;
      const columnWidth = 60;
      const lineHeight = 10;

      for (let i = 0; i < amenities.length; i++) {
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
        doc.text(amenities[i], xPosition, currentY + rowIndex * lineHeight);
      }

      currentY += Math.ceil(amenities.length / columns) * lineHeight + 20;
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
      // doc.addImage(logoPath, "PNG", centerX, 10, logoWidth, logoHeight);
      // Add logo at the top of every page
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
    doc.setFontSize(12); // Increase font size
    doc.setFont("helvetica", "bold"); // Set font to bold for "Contact Details"
    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.text("Contact Details", 20, footerYPosition - 20);

    // Reset font weight for email and phone numbers
    doc.setFontSize(12); // Maintain font size
    doc.setFont("helvetica", "normal"); // Set font to normal for email and phone numbers
    doc.text("sales@townmanor.in", 20, footerYPosition - 10);
    doc.text("+91-0120-4420450, 7042888903", 20, footerYPosition);

    // Reset font for company name
    doc.setFontSize(12); // Increase font size
    doc.setFont("helvetica", "bold"); // Set font to bold for company name

    // Company and Logo name on the right
    const footerLogoWidth = 60;
    const footerLogoHeight = 12;
    const footerLogoX = doc.internal.pageSize.getWidth() - footerLogoWidth - 20; // Align to right

    // Company Name
    doc.text("Townmanor Technologies Pvt Ltd",footerLogoX,footerYPosition - 18);

    // Company Image
    doc.addImage(
      logoPath,"PNG",footerLogoX,footerYPosition - 13,footerLogoWidth,footerLogoHeight);

    // Reset font back to normal if needed for other text
    doc.setFont("helvetica", "normal");

    // Save the PDF
    doc.save(`property_${property.id}.pdf`);
  };

  return (
    <button className="download-btn" onClick={generatePDF}>
      Download PDF
    </button>
  );
};

export default PropertyPDF;
