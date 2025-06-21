# Let's Get Quizzical!

A lightweight quiz app that tests your knowledge with 10 randomized trivia questions pulled from various categories. At the end of the game, you'll see your score and the correct answers. You can play again as many times as you'd like!

---

## 🚀 Features

- 10-question multiple-choice quiz per session
- View correct answers after completing the quiz
- Persistent score/answer history via `localStorage`
- Error handling and loading indicators
- Clean and responsive layout
- Built using modern React best practices

---

## 📦 Dependencies

- **React** – Component-based UI library
- **React Router DOM** – Navigation and routing
- **Custom Components** – `QuestionCard`, `NavBar`, etc.
- **No direct DOM manipulation** – All handled via React's virtual DOM

---

## 🛠 Installation & Running the App

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Steps

```bash
git clone https://github.com/xpwetx/quiz-app.git
cd quiz-app
npm install
cp .env.local.example .env.local
npm run dev
