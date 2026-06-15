import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function App() {
  const [notes, setNotes] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generateStudyMaterial = async () => {
  try {
    setLoading(true);

    const response = await axios.post(
      "https://study-buddy-api-j56y.onrender.com/api/generate",
      {
        notes,
        difficulty,
      }
    );

    setResult(response.data.data);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const downloadPDF = () => {
  if (!result) return;

  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text("AI Study Buddy Report", 20, y);

  y += 15;

  doc.setFontSize(14);
  doc.text("Summary", 20, y);

  y += 10;

  const summaryLines = doc.splitTextToSize(
    result.summary || "",
    170
  );

  doc.text(summaryLines, 20, y);

  y += summaryLines.length * 7 + 10;

  doc.text("Simple Explanation", 20, y);

  y += 10;

  const explanationLines = doc.splitTextToSize(
    result.simpleExplanation || "",
    170
  );

  doc.text(explanationLines, 20, y);

  y += explanationLines.length * 7 + 10;

  doc.text("Important Questions", 20, y);

  y += 10;

  result.importantQuestions?.forEach((q) => {
    const lines = doc.splitTextToSize(`• ${q}`, 170);
    doc.text(lines, 20, y);
    y += lines.length * 7;
  });

  doc.save("AI_Study_Buddy_Report.pdf");
};

  return (
  <div className="min-h-screen bg-slate-950 text-white">
    
    {/* Hero Section */}
    <div className="text-center py-10">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        AI Study Buddy
      </h1>

      <p className="text-slate-400 mt-4 text-lg">
        Turn Notes into Summaries, Flashcards & MCQs
      </p>
    </div>

    {/* Input Section */}
    <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-8 shadow-2xl">

      <textarea
        className="w-full h-64 bg-slate-800 rounded-2xl p-5 border border-slate-700 focus:outline-none focus:border-blue-500"
        placeholder="Paste your study notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="flex flex-wrap gap-4 mt-5">

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button
          onClick={generateStudyMaterial}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Generating..." : "🚀 Generate"}
        </button>

        {result && (
          <button
            onClick={downloadPDF}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            📄 Download PDF
          </button>
        )}
      </div>
    </div>

    {/* Results */}
    {result && (
      <div className="max-w-5xl mx-auto mt-8 space-y-6">

        {/* Summary */}
        <div className="bg-slate-900 p-6 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4">
            📖 Summary
          </h2>

          <p className="text-slate-300">
            {result.summary}
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-slate-900 p-6 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4">
            🧠 Simple Explanation
          </h2>

          <p className="text-slate-300">
            {result.simpleExplanation}
          </p>
        </div>

        {/* MCQs */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            ❓ MCQs
          </h2>

          <div className="space-y-4">
            {result.mcqs?.map((mcq, index) => (
              <div
                key={index}
                className="bg-slate-900 p-6 rounded-3xl border border-slate-800"
              >
                <h3 className="font-bold text-lg mb-4">
                  Q{index + 1}. {mcq.question}
                </h3>

                <div className="space-y-2">
                  {mcq.options?.map((option, i) => (
                    <div
                      key={i}
                      className="bg-slate-800 p-3 rounded-xl"
                    >
                      {option}
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-green-400">
                  Answer: {mcq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Flashcards */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            🎴 Flashcards
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {result.flashcards?.map((card, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-600 to-purple-700 p-5 rounded-2xl shadow-xl"
              >
                <h3 className="font-bold text-xl mb-3">
                  {card.front}
                </h3>

                <p>{card.back}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Questions */}
        <div className="bg-slate-900 p-6 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4">
            ⭐ Important Questions
          </h2>

          <ul className="space-y-2">
            {result.importantQuestions?.map((question, index) => (
              <li
                key={index}
                className="bg-slate-800 p-3 rounded-xl"
              >
                {question}
              </li>
            ))}
          </ul>
        </div>

      </div>
    )}
  </div>
);
}
export default App;