import multer from "multer";
import pdfParse from "pdf-parse";

// Set up multer with memory storage
const upload = multer({
  storage: multer.memoryStorage(),

});

export const uploadResume = async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded!",
        success: false,
      });
    }

    // Parse the PDF file buffer to extract text
    const resumeData = await pdfParse(req.file.buffer);

    // Define skill keywords to extract from the resume
    const skillKeywords = [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "SQL",
      "MongoDB",
      "HTML",
      "CSS",
      "TypeScript",
      "Express",
    ];

    // Extract skills by checking for their presence in the parsed text
    const extractedSkills = skillKeywords.filter((skill) =>
      resumeData.text.toLowerCase().includes(skill.toLowerCase())
    );

    // Send extracted skills as response
    return res.status(200).json({
      message: "Resume parsed successfully!",
      success: true,
      skills: extractedSkills,
    });
  } catch (error) {
    console.error("Error parsing resume:", error);
    return res.status(500).json({
      message: "Error parsing resume. Please try again later.",
      success: false,
    });
  }
};
