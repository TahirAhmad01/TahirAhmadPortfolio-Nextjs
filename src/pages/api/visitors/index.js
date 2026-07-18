import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "src", "utils", "visitorCount.json");

  let data = { count: 0 };
  
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      data = JSON.parse(fileContent);
    } else {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Error reading visitor count file:", error);
  }

  if (req.method === "GET") {
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const { increment } = req.body;
    if (increment) {
      data.count = (data.count || 0) + 1;
      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("Error writing visitor count file:", error);
        return res.status(500).json({ message: "Failed to update visitor count" });
      }
    }
    return res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
