import { jsPDF } from "jspdf";

function drawCorner(doc, x, y, flipX = 1, flipY = 1) {
  doc.setDrawColor(103, 84, 232);
  doc.setLineWidth(1.3);
  doc.line(x, y, x + 30 * flipX, y, "S");
  doc.line(x, y, x, y + 22 * flipY, "S");

  doc.setDrawColor(242, 174, 73);
  doc.setLineWidth(0.6);
  doc.line(x + 4 * flipX, y + 4 * flipY, x + 22 * flipX, y + 4 * flipY, "S");
  doc.line(x + 4 * flipX, y + 4 * flipY, x + 4 * flipX, y + 16 * flipY, "S");
}

export function downloadCertificatePdf(record) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  doc.setFillColor(252, 251, 255);
  doc.rect(0, 0, width, height, "F");

  doc.setDrawColor(17, 38, 67);
  doc.setLineWidth(1.1);
  doc.roundedRect(10, 10, width - 20, height - 20, 2, 2, "S");

  doc.setDrawColor(103, 84, 232);
  doc.setLineWidth(0.5);
  doc.roundedRect(14, 14, width - 28, height - 28, 2, 2, "S");

  drawCorner(doc, 19, 19);
  drawCorner(doc, width - 19, 19, -1, 1);
  drawCorner(doc, 19, height - 19, 1, -1);
  drawCorner(doc, width - 19, height - 19, -1, -1);

  doc.setFillColor(103, 84, 232);
  doc.roundedRect(width / 2 - 13, 20, 26, 26, 6, 6, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("N", width / 2, 37, { align: "center" });

  doc.setTextColor(17, 38, 67);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("NAVPRAYAS", width / 2, 53, { align: "center" });

  doc.setTextColor(103, 84, 232);
  doc.setFontSize(25);
  doc.setFont("times", "bold");
  doc.text("CERTIFICATE OF APPRECIATION", width / 2, 72, {
    align: "center",
  });

  doc.setTextColor(84, 96, 115);
  doc.setFontSize(10.5);
  doc.setFont("helvetica", "normal");
  doc.text("This certificate is proudly presented to", width / 2, 85, {
    align: "center",
  });

  doc.setTextColor(17, 38, 67);
  doc.setFontSize(30);
  doc.setFont("times", "italic");
  doc.text(record.name, width / 2, 106, { align: "center" });

  doc.setDrawColor(242, 174, 73);
  doc.setLineWidth(0.8);
  doc.line(width / 2 - 52, 111, width / 2 + 52, 111);

  doc.setTextColor(73, 84, 102);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const appreciationText = `in recognition of valuable contribution as ${record.role} for ${record.department} during ${record.programme}.`;
  const lines = doc.splitTextToSize(appreciationText, 190);
  doc.text(lines, width / 2, 124, { align: "center", lineHeightFactor: 1.5 });

  doc.setFillColor(244, 242, 255);
  doc.roundedRect(39, 151, width - 78, 24, 4, 4, "F");

  doc.setTextColor(84, 96, 115);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICATE NUMBER", 62, 160, { align: "center" });
  doc.text("MEMBERSHIP NUMBER", width / 2, 160, { align: "center" });
  doc.text("ISSUE DATE", width - 62, 160, { align: "center" });

  doc.setTextColor(17, 38, 67);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(record.certificateNo, 62, 168, { align: "center" });
  doc.text(record.membershipNo, width / 2, 168, { align: "center" });
  doc.text(record.issueDate, width - 62, 168, { align: "center" });

  doc.setTextColor(84, 96, 115);
  doc.setFontSize(8.5);
  doc.text("Verify at: certificate.navprayas.in", width / 2, 190, {
    align: "center",
  });

  doc.save(`${record.name.replace(/\s+/g, "-")}-${record.certificateNo}.pdf`);
}
