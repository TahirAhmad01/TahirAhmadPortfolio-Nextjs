import skillList from "@/utils/skillsList";
import fs from "fs";
import path from "path";

export default function SkillData(req, res) {
  const filePath = path.resolve("./utils/skillData.json");

  if (req.method === "GET") {
    try {
      res.status(200).json(skillList);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Failed to fetch skills data" });
    }
  } else if (req.method === "POST") {
    try {
      const newSkill = req.body;

      // Validate the input data
      if (!newSkill || !newSkill.name || !newSkill.level) {
        return res
          .status(400)
          .json({
            message: "Invalid skill data. Name and level are required.",
          });
      }

      skillList.push(newSkill);

      // Write updated data to the file
      console.log("Writing to file:", filePath);
      fs.writeFile(filePath, JSON.stringify(skillList, null, 2), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res
            .status(500)
            .json({ message: "Failed to update skills data" });
        }

        console.log("File modified successfully");
        res.status(201).json(newSkill); // Respond with the newly added skill
      });
    } catch (error) {
      console.error("Error updating skills:", error);
      res.status(500).json({ message: "Failed to update skills data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
