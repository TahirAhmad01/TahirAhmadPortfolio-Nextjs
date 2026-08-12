import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request payload. Messages must be an array." });
    }

    // Load portfolio data for context injection
    const utilsDir = path.join(process.cwd(), "src", "utils");
    
    let about = {};
    let skills = [];
    let work = [];
    let education = [];
    let projects = [];

    try {
      about = JSON.parse(fs.readFileSync(path.join(utilsDir, "about.json"), "utf8"));
      skills = JSON.parse(fs.readFileSync(path.join(utilsDir, "skillsList.json"), "utf8"));
      work = JSON.parse(fs.readFileSync(path.join(utilsDir, "workList.json"), "utf8"));
      education = JSON.parse(fs.readFileSync(path.join(utilsDir, "educationList.json"), "utf8"));
      projects = JSON.parse(fs.readFileSync(path.join(utilsDir, "projectList.json"), "utf8"));
    } catch (e) {
      console.error("Error reading portfolio context files:", e);
    }

    // Format context for the system prompt
    const portfolioContext = `
Developer Name: Tahir Ahmad
Contact Email: tahirahmadsani@gmail.com
Contact Phone: +8801610881871
Address: Mirpur-1, Dhaka, Bangladesh

Professional Biography:
${about.description || ""}

Key Skills & Expertise Categories:
${skills.map(cat => `- ${cat.name}: ${cat.list.map(s => `${s.name} (${s.position})`).join(", ")}`).join("\n")}

Professional Experience:
${work.map(w => `- Role: ${w.position} at ${w.workTitle} (${w.startDate} to ${w.endDate})\n  Location: ${w.location}\n  Description: ${w.description}`).join("\n")}

Education:
${education.map(e => `- Degree: ${e.position} in ${e.educationTitle} (${e.startDate} to ${e.endDate})\n  Location: ${e.location}`).join("\n")}

Key Projects:
${projects.map(p => `- Project Name: ${p.name}\n  Category Tags: ${p.category?.join(", ") || ""}\n  Link: ${p.link || "N/A"}\n  Description: ${p.description || ""}`).join("\n")}
`;

    const systemInstruction = `You are a helpful, professional, and charming AI Portfolio Assistant for Tahir Ahmad.
Your job is to answer questions about Tahir's professional background, skills, work experience, projects, education, and career path.
Keep responses concise, engaging, and structured (use bullet points or bold text where appropriate).

Here is the official background context of Tahir Ahmad:
${portfolioContext}

Guidelines:
1. Speak in a friendly, conversational manner representing Tahir's digital assistant.
2. If asked about contact info, provide email (tahirahmadsani@gmail.com) and phone (+8801610881871).
3. If a question is entirely unrelated to Tahir, software engineering, or his projects, politely decline to answer and guide the conversation back to his portfolio.
4. Do not invent any skills, jobs, or projects. Stick strictly to the provided information.
5. If someone asks about how this chatbot works, tell them it's powered by Next.js and the Gemini API, reading the portfolio configurations dynamically.
`;

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;

    if (!apiKey) {
      // Fallback Demo Mode - parses query and provides mock responses to prevent crash when key is missing
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let mockReply = "";

      if (lastUserMsg.includes("project") || lastUserMsg.includes("uddogi") || lastUserMsg.includes("mcp")) {
        mockReply = `**Tahir's Projects:**\n\n1. **AI-Powered Automation & MCP Orchestration**: Built custom Model Context Protocol (MCP) servers to automate tasks and orchestrate workflows.\n2. **Uddogi (VAT Management)**: A Rails-based VAT reporting platform built at Nascenia Ltd.\n3. **Course Management System**: An online student enrollment system built using Ruby on Rails.\n\n*Note: Configure a \`GEMINI_API_KEY\` in your \`.env.local\` file to enable live AI responses.*`;
      } else if (lastUserMsg.includes("skill") || lastUserMsg.includes("tech") || lastUserMsg.includes("language")) {
        mockReply = `**Tahir's Technical Skills:**\n\n* **AI & Automation**: Model Context Protocol (MCP), LLM Integration, Agentic Workflows.\n* **Backend**: Ruby on Rails, Node.js, Ruby, JavaScript.\n* **Frontend**: React.js, Next.js, Redux, Tailwind CSS, Bootstrap.\n* **Tools & Databases**: Git/GitHub, PostgreSQL, Redis, Docker.\n\n*Note: Configure a \`GEMINI_API_KEY\` in your \`.env.local\` file to enable live AI responses.*`;
      } else if (lastUserMsg.includes("contact") || lastUserMsg.includes("hire") || lastUserMsg.includes("email")) {
        mockReply = `You can easily reach out to Tahir Ahmad:\n\n* **Email**: tahirahmadsani@gmail.com\n* **Phone**: +8801610881871\n* **Address**: Mirpur-1, Dhaka, Bangladesh\n\nYou can also click the **"Get in touch"** button on the home page.\n\n*Note: Configure a \`GEMINI_API_KEY\` in your \`.env.local\` file to enable live AI responses.*`;
      } else {
        mockReply = `Hello! I am Tahir's AI Portfolio Assistant.\n\nI can tell you all about his projects (like **Uddogi** or his **custom MCP servers**), his technical expertise, or how to contact him. What would you like to know?\n\n*(Demo Mode: To unlock full LLM conversational intelligence, configure \`GEMINI_API_KEY\` inside your environment variables).*`;
      }

      return res.status(200).json({ text: mockReply, demo: true });
    }

    // Live LLM Mode using Google Generative AI SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction: systemInstruction,
    });
    
    // Convert message history to Gemini format (user/model)
    // Map roles: 'user' -> 'user', 'assistant'/'model' -> 'model'
    const contents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const result = await model.generateContent({
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    });

    const response = result.response;
    const replyText = response.text() || "Sorry, I couldn't generate a response.";
    return res.status(200).json({ text: replyText, demo: false });

  } catch (error) {
    console.error("Gemini API handler error:", error);
    return res.status(500).json({ error: "Failed to process chat query", details: error.message });
  }
}
