
# 🎮 Babamemory Game

A professional memory card matching game built with **Next.js 15**, featuring glassmorphism UI, multiple difficulty levels, and persistent high scores.

![Babamemory Game](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 🎨 **Glassmorphism Design** - Modern blur effects and neon gradients
- 🎯 **3 Difficulty Levels** - Easy (4×4), Medium (6×4), Hard (6×6)
- 💾 **Persistent High Scores** - Best scores saved in localStorage
- 🔄 **Smooth Animations** - Card flip effects and hover states
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🌟 **18 Unique Icons** - Tech-themed emoji cards
- ⚡ **Lightning Fast** - Optimized with Next.js 15 and Turbopack

---

## 🎥 Demo

**Live Demo:** [babamemory.vercel.app](https://babamemory.vercel.app) _(add your link after deployment)_

### How to Play

1. Click any card to reveal the icon
2. Click a second card to find its match
3. Match all pairs with the fewest moves to win
4. Beat your best score!

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + Inline Styles
- **Deployment:** Vercel
- **Package Manager:** npm / yarn / pnpm

---

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/babamemory-game.git
   cd babamemory-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
babamemory-game/
├── app/
│   ├── page.tsx          # Main game component
│   ├── globals.css       # Global styles + animations
│   └── layout.tsx        # Root layout
├── public/               # Static assets
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
└── README.md            # You are here
```

---

## 🎮 Game Logic

### State Management
- `cards[]` - Array of card objects with id, icon, matched status
- `first/second` - Track selected card indices
- `moves` - Count player attempts
- `best` - Persistent best score (localStorage)
- `difficulty` - Easy/Medium/Hard mode

### Match Detection
```typescript
if (cards[first].icon === cards[second].icon) {
  // Mark both as matched
  setCards(prev => prev.map((card, i) => 
    i === first || i === second ? { ...card, matched: true } : card
  ));
}
```

---

## 🚀 Deployment (Vercel)

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow prompts** → Get live URL instantly!

### Option 2: Deploy via GitHub

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import in Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo
   - Click **Deploy** (auto-detects Next.js)

3. **Done!** Your game is live in 30 seconds.

---

## 🎨 Customization

### Change Icons
Edit the `allIcons` array in `app/page.tsx`:
```typescript
const allIcons = ["💾", "⚙️", "🧠", "🤖", "🚀", "💻", "📡", "🌐", ...];
```

### Adjust Difficulty
Modify card counts in `shuffleCards()`:
```typescript
const count = level === 'easy' ? 8 : level === 'medium' ? 12 : 18;
```

### Change Colors
Update gradient colors in inline styles:
```typescript
background: 'linear-gradient(45deg, #38bdf8, #a78bfa, #ec4899)'
```

---

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🐛 Troubleshooting

### Cards not showing?
- Open browser console (F12) → Check for errors
- Verify `cards.length` in debug footer
- Hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

### Tailwind not working?
- Delete `.next` folder
- Run `npm run dev` again

### Deploy fails?
- Check Node version: `node -v` (must be 18+)
- Verify `package.json` has correct Next.js version

---

## 🤝 Contributing

Contributions welcome! Open an issue or submit a PR.

1. Fork the repo
2. Create feature branch: `git checkout -b feature/awesome-feature`
3. Commit changes: `git commit -m 'Add awesome feature'`
4. Push: `git push origin feature/awesome-feature`
5. Open Pull Request

---

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

## 👨‍💻 Author

**Vikram Singh**
- Portfolio: [your-portfolio.com](https://your-portfolio.com)
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Name](https://linkedin.com/in/your-profile)
***