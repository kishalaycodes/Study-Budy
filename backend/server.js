const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post("/api/generate", async (req, res) => {
  try {
    const { notes, difficulty } = req.body;

const prompt = `
You are an AI Study Assistant.

IMPORTANT:
Return ONLY valid JSON.
Do not wrap the response in markdown.
Do not use markdown code fences.
Do not add explanations before or after the JSON.

Format:

{
  "summary":"",
  "simpleExplanation":"",
  "mcqs":[
    {
      "question":"",
      "options":["","","",""],
      "answer":""
    }
  ],
  "flashcards":[
    {
      "front":"",
      "back":""
    }
  ],
  "importantQuestions":[]
}

Difficulty Level: ${difficulty}

Study Notes:
${notes}
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

       let result = completion.choices[0].message.content;

    try {
      
      result = result
        .replace(/```json\s*/g, "")
        .replace(/```/g, "")
        .trim();

      console.log("Cleaned Response:");
      console.log(result);

      const parsedResult = JSON.parse(result);

      res.json({
        success: true,
        data: parsedResult,
      });

    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);

      
      res.status(500).json({
        success: false,
        message: "Failed to parse AI response",
        rawResponse: result,
      });
    }

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});