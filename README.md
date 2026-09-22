# 📝 Todo List - TypeScript

A simple, clean, and fully functional Todo List application built with **HTML**, **CSS**, and **TypeScript**.

Perfect project for junior developers to practice:

- TypeScript fundamentals
- DOM manipulation
- Local Storage
- Event handling
- Clean & modern UI design

---

## ✨ Features

- ✅ Add new tasks
- ✅ Mark tasks as completed / incomplete
- ✅ Delete tasks
- ✅ Filter tasks (All / Active / Completed)
- ✅ Clear all completed tasks
- ✅ Persist data with `localStorage` (tasks survive page refresh)
- ✅ Responsive design (works on mobile & desktop)
- ✅ Clean modern UI with CSS variables

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3**
- **TypeScript**
- No frameworks or libraries (vanilla)

---

## 📁 Project Structure

```
todo-list/
├── index.html          # Main HTML file
├── style.css           # All styles
├── src/
│   └── app.ts          # TypeScript application logic
├── dist/               # Compiled JavaScript (generated after build)
├── tsconfig.json       # TypeScript configuration
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/todo-list-typescript.git
cd todo-list-typescript
```

2. Install dependencies

```bash
npm install
```

3. Compile TypeScript

```bash
npm run build
```

4. Open the app

You can simply open `index.html` in your browser,  
**or** serve it locally with:

```bash
npx serve .
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

---

### Development Mode (Watch)

While coding, run this command so TypeScript recompiles automatically every time you save a file:

```bash
npm run watch
```

---

## 📦 Available Scripts

| Command           | Description                              |
|-------------------|------------------------------------------|
| `npm run build`   | Compile TypeScript → JavaScript          |
| `npm run watch`   | Compile + watch for file changes         |
| `npm start`       | Build the project + start a local server |

---

## 🧠 How it works

- All tasks are stored in an array of `Todo` objects.
- Data is automatically saved to and loaded from `localStorage`.
- The UI is re-rendered every time the list changes.
- Filtering is done client-side based on the current filter state (`all`, `active`, or `completed`).

---

## 🎯 Learning Goals

This project helps you practice:

- Writing clean TypeScript with interfaces and classes
- Working with the DOM
- Handling user events (submit, click, change)
- Using `localStorage` for data persistence
- Writing maintainable and readable code
- Basic responsive CSS

---

## 📄 License

This project is open source and free to use for learning purposes.
