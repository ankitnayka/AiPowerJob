const fs = require('fs');
const pdfParse = require('pdf-parse');

const filePath = 'D:/AiPowerJob/server/test/data/05-versions-space.pdf'; // Adjust path as needed

// Read the PDF file as a buffer
const pdfBuffer = fs.readFileSync(filePath);

// Parse the PDF buffer
pdfParse(pdfBuffer).then(data => {
    // Extract the text content of the PDF
    console.log('PDF Content:', data.text);
}).catch(err => {
    console.error('Error parsing PDF:', err.message);
});
