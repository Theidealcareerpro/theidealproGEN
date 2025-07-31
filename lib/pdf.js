const PDFDocument = require('pdfkit');

module.exports.generatePDF = async (content, templateId) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.fontSize(12);
    doc.text(JSON.stringify(content, null, 2)); // Simplified example

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.end();
  });
};
