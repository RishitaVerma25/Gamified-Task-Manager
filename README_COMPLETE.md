# 🎮 Gamified Task Manager

A fully-featured task manager with gamification elements to make productivity fun! Level up, earn achievements, and maintain streaks as you complete tasks.

## ✨ Features

### Core Gamification
- **🎯 XP System**: Earn XP by completing tasks (varies by difficulty)
- **⬆️ Level Up**: Gain levels every 100 XP
- **🔥 Streak System**: Track consecutive task completions
- **🏆 Achievements**: Unlock badges as you progress
- **💰 Streak Bonuses**: Earn extra XP based on your streak multiplier

### Task Management
- **3 Difficulty Levels**:
  - Easy: 15 XP per task
  - Medium: 30 XP per task
  - Hard: 50 XP per task
- **Task Filtering**: View All, Active, or Completed tasks
- **Delete Tasks**: Remove tasks you no longer need
- **Visual Feedback**: Color-coded difficulty badges and completion states

### Achievements
- **First Blood**: Earn your first XP
- **On Fire 🔥**: Reach a 5-task streak
- **Unstoppable**: Reach a 10-task streak
- **Legend**: Reach level 10
- **Task Collector**: Accumulate 20+ total tasks
- **Speed Demon**: Complete 15+ tasks

### Data Persistence
- All progress saved to **localStorage**
- Your stats persist across browser sessions
- Automatic save on every action

## 🚀 Getting Started

### Installation

1. Navigate to the project directory:
```bash
cd gamified-task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5174](http://localhost:5174) in your browser

### Building for Production

```bash
npm run build
npm run preview
```

## 📊 Dashboard Stats

- **Level**: Your current rank (based on total XP)
- **Total XP**: Cumulative experience points earned
- **Streak**: Current consecutive task completion count
- **Completed**: Total tasks finished

## 🎮 How to Play

1. **Add a Quest**: Type a task name and select difficulty (Easy/Medium/Hard)
2. **Complete Tasks**: Click the checkmark to mark a task as complete
3. **Earn XP**: Gain XP instantly with streak bonuses
4. **Level Up**: Every 100 XP grants a level increase
5. **Unlock Achievements**: Complete challenges to earn badges
6. **Track Progress**: Monitor your stats on the dashboard

## 🎨 UI Features

- **Dark Theme**: Eye-friendly dark mode with blue accents
- **Smooth Animations**: Bouncing notifications and progress transitions
- **Responsive Design**: Works perfectly on desktop and mobile
- **Real-time Notifications**: See instant feedback on actions
- **Gradient Effects**: Modern glassmorphism design

## 📱 Tech Stack

- **React 19.2.5**: Modern UI framework
- **Vite 8.0.10**: Fast build tool
- **Tailwind CSS 4.2.4**: Utility-first CSS
- **Lucide React**: Beautiful icons
- **localStorage**: Client-side data persistence

## 📝 Project Structure

```
gamified-task-manager/
├── src/
│   ├── App.jsx          # Main component with all game logic
│   ├── App.css          # Animations and styling
│   ├── index.css        # Global styles with Tailwind
│   ├── main.jsx         # Entry point
│   └── tailwind.config.js
├── public/
├── package.json
├── vite.config.js
└── eslint.config.js
```

## 🎯 Game Mechanics

### XP Calculation
```
Base XP = Task Difficulty (15/30/50)
Streak Bonus = Base XP × Streak × 0.1
Total XP = Base XP + Streak Bonus
```

### Example
- Easy task, no streak: 15 XP
- Medium task, 3-task streak: 30 + (30 × 3 × 0.1) = 39 XP
- Hard task, 5-task streak: 50 + (50 × 5 × 0.1) = 75 XP

## 🔧 Customization

### Change XP Values
Edit `xpValues` object in `App.jsx`:
```javascript
const xpValues = { easy: 15, medium: 30, hard: 50 };
```

### Modify Achievements
Update the `achievementTypes` object in `checkAchievements()` function

### Adjust Colors
All Tailwind classes can be customized in the component

## 🐛 Troubleshooting

**Tasks not saving?**
- Check browser's localStorage permissions
- Clear cache and refresh

**Animations too fast/slow?**
- Modify animation durations in `App.css`

**Colors not matching?**
- Ensure Tailwind is properly configured
- Clear build cache: `rm -rf node_modules/.vite`

## 📈 Future Enhancements

- 🎵 Sound effects for achievements
- 🌍 Multiplayer leaderboards
- 📅 Daily challenges
- 🎁 Reward system with unlockables
- 📊 Statistics and progress tracking
- 🎨 Theme customization
- 📱 Mobile app version

## 👨‍💻 Developer Info

Built with ❤️ using React and modern web technologies.

For questions or suggestions, feel free to contribute!

---

**Happy tasking and leveling up! 🚀**
