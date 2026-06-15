# 🎓 AI Study Buddy

AI Study Buddy is an AI-powered learning assistant designed to help students understand, revise, and prepare for exams more efficiently. By simply pasting study notes, users can instantly generate summaries, simplified explanations, MCQs, flashcards, and important exam questions using Generative AI.

---

## 🌐 Live Demo

🔗 **Deployment URL:**
https://study-budy-rho.vercel.app/

📂 **GitHub Repository:**
https://github.com/kishalaycodes/Study-Budy

---

## 📌 Problem Statement

Students often struggle to understand lengthy study materials and prepare effectively for examinations. Searching for explanations online can be time-consuming and often leads to irrelevant information.

AI Study Buddy addresses this challenge by transforming study notes into structured learning resources, helping students learn faster and revise more efficiently.

---

## 🚀 Features

* 📄 AI-generated concise summaries
* 🧠 Simplified explanations of complex topics
* ❓ Automatic MCQ generation
* 🗂️ Flashcard generation for quick revision
* 📝 Important exam question generation
* 🎯 Difficulty selection (Easy, Medium, Hard)
* 📥 PDF download support
* ⚡ Fast AI responses using Groq LLM

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### AI Model

* Groq API
* Llama 3.3 70B Versatile

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```text
Study-Budy/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/kishalaycodes/Study-Budy.git
cd Study-Budy
```

---

### 2️⃣ Backend Setup

Navigate to backend folder:

```bash
cd backend
npm install
```

Create a `.env` file:

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
PORT=5000
```

Start backend server:

```bash
node server.js
```

Backend will run on:

```text
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 🎯 How It Works

1. User enters study notes.
2. User selects difficulty level.
3. Frontend sends notes to Express backend.
4. Backend sends prompt to Groq LLM.
5. AI generates:

   * Summary
   * Simple Explanation
   * MCQs
   * Flashcards
   * Important Questions
6. Results are displayed in an interactive UI.
7. User can download generated study material as a PDF.


## 📊 Future Enhancements

* 📄 PDF Upload Support
* 🎤 Voice-to-Notes Conversion
* 🧪 Interactive Quiz Mode
* 🌍 Multi-language Support
* 📈 Student Learning Analytics
* 👤 User Authentication
* ☁️ Cloud Database Integration

---

## 🎓 Academic Relevance

This project demonstrates practical implementation of:

* Generative AI
* Prompt Engineering
* REST APIs
* Full Stack Web Development
* React State Management
* Node.js Backend Development
* JSON Data Processing
* Cloud Deployment

---

## 👨‍💻 Author

**Kishalay Das**

GitHub: https://github.com/kishalaycodes

---

## 📜 License

This project is developed for educational and academic purposes.

Feel free to use and modify it for learning and research.
