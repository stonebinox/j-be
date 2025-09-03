import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

import { initDb, getDb } from "./lib/db";
import { instructions } from "./lib/instructions";

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Initialize the database and table
initDb();
app.post("/api/analyze", async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing text in request body." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: instructions },
        { role: "user", content: text },
      ],
    });

    const summary = JSON.parse(completion.choices[0]?.message?.content || "");

    // Store in SQLite with individual fields
    try {
      const db = await getDb();
      await db.run(
        `INSERT INTO history (user_input, summary, title, topics, sentiment, keywords) VALUES (?, ?, ?, ?, ?, ?)`,
        text,
        summary.summary || null,
        summary.title || null,
        Array.isArray(summary.topics) ? JSON.stringify(summary.topics) : null,
        summary.sentiment || null,
        Array.isArray(summary.keywords)
          ? JSON.stringify(summary.keywords)
          : null
      );
      await db.close();
    } catch (dbError) {
      console.error("Failed to store history in DB:", dbError);
    }

    res.json({ data: summary });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "OpenAI API error." });
  }
});

// Endpoint to fetch last 100 history rows
app.get("/api/history", async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const rows = await db.all(
      `SELECT id, user_input, summary, title, topics, sentiment, keywords, created_at
       FROM history
       ORDER BY id DESC
       LIMIT 100`
    );
    await db.close();
    // Parse topics and keywords from JSON
    const parsedRows = rows.map((row: any) => ({
      ...row,
      topics: row.topics ? JSON.parse(row.topics) : [],
      keywords: row.keywords ? JSON.parse(row.keywords) : [],
    }));

    res.json({ data: parsedRows });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "DB error." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
