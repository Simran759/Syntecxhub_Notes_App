# 📝 Modern Notes Application

A sleek, feature-rich notes application built with React that provides a seamless note-taking experience with password protection, persistent storage, and a beautiful dark-themed UI.

![Notes App Banner](https://via.placeholder.com/1200x400/0a0e27/3b82f6?text=Modern+Notes+Application)

## ✨ Features

### Core Functionality
- ✅ **Add Notes** - Quick note creation with keyboard shortcuts (Enter to add)
- ✏️ **Edit Notes** - Click any note to view and edit in detail page
- 🗑️ **Delete Notes** - Remove unwanted notes with confirmation
- 💾 **Auto-Save** - Automatic persistence using browser localStorage
- 📱 **Responsive Design** - Fully optimized for mobile, tablet, and desktop

### Advanced Features
- 🔒 **Password Protection** - Lock sensitive notes with password encryption
- 🔐 **Password Verification** - Secure access to locked notes
- 🎨 **Modern UI** - Beautiful dark theme with smooth animations
- ⚡ **Fast Performance** - Optimized React hooks and state management
- 📊 **Note Metadata** - Track creation and update timestamps

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ with Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Storage**: Browser localStorage API
- **Security**: Simple password hashing (client-side)

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn**
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Getting Started

### Installation

1. **Clone the repository** (or download the project)
```bash
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
```

2. **Install dependencies**

```bash
npm install
```
3. **Start the development server**
```bash
 npm run dev
```

4. **Open your browser**
```bash
Navigate to: http://localhost:5173
```

5. **Build for Production**
```bash
npm run build
```
## 📁 Project Structure

```bash
notes-app/
├── src/
│   ├── components/
│   │   ├── NoteCard.jsx          # Individual note card component
│   │   ├── NoteDetailPage.jsx    # Full note view/edit page
│   │   ├── NotesGrid.jsx         # Grid layout for notes
│   │   ├── NoteInput.jsx         # Input component for adding notes
│   │   └── PasswordModal.jsx     # Password input modal
│   │
│   ├── hooks/
│   │   └── useNotes.js           # Custom hook for note management
│   │
│   ├── utils/
│   │   └── hashPassword.js       # Password hashing utilities
│   │
│   ├── styles/
│   │   └── globals.css           # Global styles and theme
│   │
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # App entry point
│
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite configuration
└── README.md                     # Project documentation
```
