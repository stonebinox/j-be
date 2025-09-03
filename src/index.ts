import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

import { instructions } from "./lib/instructions";

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/analyze", async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing text in request body." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: instructions },
        { role: "user", content: text },
      ],
    });
    const summary = JSON.parse(completion.choices[0]?.message?.content || "");
    res.json({ data: summary });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "OpenAI API error." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
