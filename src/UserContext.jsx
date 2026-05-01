import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

const XP_PER_LEVEL = 1000;

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const INITIAL_PROFILE = {
  name: "Player One",
  title: "Apprentice Coder",
  level: 5,
  currentXp: 420,
  totalGold: 340,
  streak: 0,
  lastStreakDate: null,
  questsDone: 0,
  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=PlayerOne&backgroundColor=b6e3f4",
  ownedAvatars: ["https://api.dicebear.com/7.x/adventurer/svg?seed=PlayerOne&backgroundColor=b6e3f4"],
};

const INITIAL_LEADERBOARD = [
  { id: 1, name: "Riya S.", avatar: "RS", score: 2400 },
  { id: 2, name: "Dev M.", avatar: "DM", score: 1950 },
  { id: 3, name: "You", avatar: "YO", score: 420 },
  { id: 4, name: "Ananya K.", avatar: "AK", score: 310 },
];

const INITIAL_ACHIEVEMENTS = [
  { id: 'streak-3', icon: '⚡', active: false, desc: '3 Day Streak' },
  { id: 'streak-7', icon: '⚡', active: false, desc: '7 Day Streak' },
  { id: 'first-blood', icon: '🔥', active: false, desc: 'Complete 1 Task' },
  { id: 'five-tasks', icon: '🗡️', active: false, desc: 'Complete 5 Tasks' },
  { id: 'ten-tasks', icon: '🏆', active: false, desc: 'Complete 10 Tasks' },
  { id: 'boss-slayer', icon: '🐉', active: false, desc: 'Defeat a Boss' },
  { id: 'rich', icon: '👑', active: false, desc: 'Earn 1000 Gold' },
];

const INITIAL_BOSS = {
  name: "Procrastination Dragon",
  level: 1,
  hp: 1000,
  maxHp: 1000,
};

const INITIAL_TASKS = [
  { id: "task-1", title: "Design the landing page", category: "Design", xp: 80, difficulty: "Easy", status: "TODO" },
  { id: "task-2", title: "Build the auth system", category: "Code", xp: 120, difficulty: "Hard", status: "TODO" },
  { id: "task-3", title: "Read React docs chapter 3", category: "Study", xp: 60, difficulty: "Easy", status: "TODO" },
  { id: "task-4", title: "Submit capstone report", category: "Urgent", xp: 200, difficulty: "Hard", status: "TODO" },
  { id: "task-5", title: "Build the task board UI", category: "Frontend", xp: 100, difficulty: "Medium", status: "IN_PROGRESS" },
  { id: "task-6", title: "Setup Firebase database", category: "Backend", xp: 90, difficulty: "Hard", status: "IN_PROGRESS" },
  { id: "task-7", title: "Write API documentation", category: "Docs", xp: 70, difficulty: "Easy", status: "DONE" },
];

const DATA_VERSION = "v12"; 

if (typeof window !== 'undefined') {
  try {
    const currentVersion = localStorage.getItem("dataVersion");
    if (currentVersion !== DATA_VERSION) {
      localStorage.clear();
      localStorage.setItem("dataVersion", DATA_VERSION);
    }
  } catch (e) {
    console.error("Storage error", e);
  }
}

const loadState = (key, defaultVal) => {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed !== null ? parsed : defaultVal;
    }
  } catch (e) {
    console.error(`Load error ${key}`, e);
  }
  return defaultVal;
};

export function UserProvider({ children }) {
  const [userProfile, setUserProfile] = useState(() => loadState("userProfile", INITIAL_PROFILE));
  const [taskArray, setTaskArray] = useState(() => loadState("taskArray", INITIAL_TASKS));
  const [leaderboard, setLeaderboard] = useState(() => loadState("leaderboard", INITIAL_LEADERBOARD));
  const [achievements, setAchievements] = useState(() => loadState("achievements", INITIAL_ACHIEVEMENTS));
  const [boss, setBoss] = useState(() => loadState("boss", INITIAL_BOSS));
  const [isDarkMode, setIsDarkMode] = useState(() => loadState("isDarkMode", true));
  const [toast, setToast] = useState(null);
  const [levelUpData, setLevelUpData] = useState(null);

  useEffect(() => {
    const today = getTodayStr();
    const yesterday = getYesterdayStr();
    const lastDate = userProfile.lastStreakDate;
    if (lastDate && lastDate !== today && lastDate !== yesterday) {
      setUserProfile((prev) => ({ ...prev, streak: 0 }));
    }
    setTaskArray((prev) => prev.map(t => 
      t.status === "DONE" ? { ...t, status: "TODO" } : t
    ));
  }, []);

  useEffect(() => { if (userProfile) localStorage.setItem("userProfile", JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { if (taskArray) localStorage.setItem("taskArray", JSON.stringify(taskArray)); }, [taskArray]);
  useEffect(() => { if (leaderboard) localStorage.setItem("leaderboard", JSON.stringify(leaderboard)); }, [leaderboard]);
  useEffect(() => { if (achievements) localStorage.setItem("achievements", JSON.stringify(achievements)); }, [achievements]);
  useEffect(() => { if (boss) localStorage.setItem("boss", JSON.stringify(boss)); }, [boss]);
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  
  const showToast = (message, icon = "*") => {
    setToast({ message, icon });
    setTimeout(() => setToast(null), 3000);
  };

  const unlockAchievement = (id) => {
    setAchievements((prev) => {
      const idx = prev.findIndex((a) => a.id === id);
      if (idx !== -1 && !prev[idx].active) {
        showToast(`Achievement Unlocked: ${prev[idx].desc}`, prev[idx].icon);
        const newArr = [...prev];
        newArr[idx] = { ...newArr[idx], active: true };
        return newArr;
      }
      return prev;
    });
  };

  const moveTask = (taskId, newStatus) => {
    setTaskArray((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  const fireBigConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#8b5cf6', '#f472b6', '#fbbf24'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#8b5cf6', '#f472b6', '#fbbf24'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const updateStreak = () => {
    setUserProfile((prev) => {
      const today = getTodayStr();
      const yesterday = getYesterdayStr();
      if (prev.lastStreakDate === today) return prev;
      let newStreak = (prev.lastStreakDate === yesterday || prev.streak === 0) ? prev.streak + 1 : 1;
      if (newStreak >= 3) unlockAchievement('streak-3');
      if (newStreak >= 7) unlockAchievement('streak-7');
      if (newStreak > prev.streak) showToast(`Streak: ${newStreak} day${newStreak > 1 ? 's' : ''}!`, "⚡");
      return { ...prev, streak: newStreak, lastStreakDate: today };
    });
  };

  const completeTask = (taskId) => {
    const task = taskArray.find((t) => t.id === taskId);
    if (!task || task.status === "DONE") return;
    
    moveTask(taskId, "DONE");
    updateStreak();
    
    setUserProfile((prev) => {
      let newXp = prev.currentXp + task.xp;
      let newLevel = prev.level;
      let goldEarned = Math.floor(task.xp * 0.5);
      let newGold = prev.totalGold + goldEarned;
      let newQuests = prev.questsDone + 1;
      
      if (newXp >= XP_PER_LEVEL) {
        newXp -= XP_PER_LEVEL;
        newLevel += 1;
        fireBigConfetti();
        setLevelUpData({ level: newLevel, rewards: { gold: 500 } });
        newGold += 500;
      }
      
      if (newQuests === 1) unlockAchievement('first-blood');
      if (newQuests === 5) unlockAchievement('five-tasks');
      if (newQuests === 10) unlockAchievement('ten-tasks');
      if (newGold >= 1000) unlockAchievement('rich');
      
      return { ...prev, level: newLevel, currentXp: newXp, totalGold: newGold, questsDone: newQuests };
    });

    setBoss((prev) => {
      const newHp = prev.hp - task.xp;
      if (newHp <= 0) {
        unlockAchievement('boss-slayer');
        showToast(`Defeated ${prev.name}! +200 Gold`, "!");
        setUserProfile((u) => ({ ...u, totalGold: u.totalGold + 200 }));
        return { ...prev, level: prev.level + 1, maxHp: prev.maxHp + 500, hp: prev.maxHp + 500, name: `Cyber Demon Lvl ${prev.level + 1}` };
      }
      return { ...prev, hp: newHp };
    });

    setLeaderboard((prev) => prev.map((entry) => 
      entry.name === "You" ? { ...entry, score: entry.score + task.xp } : entry
    ).sort((a, b) => b.score - a.score));
  };

  const buyItem = (item) => {
    if (userProfile.totalGold >= item.price) {
      if (userProfile.ownedAvatars.includes(item.avatar)) return;
      setUserProfile((prev) => ({ 
        ...prev, 
        totalGold: prev.totalGold - item.price, 
        ownedAvatars: [...prev.ownedAvatars, item.avatar], 
        avatar: item.avatar 
      }));
      showToast(`Purchased ${item.name}!`, "+");
    } else showToast("Not enough Gold!", "x");
  };

  const equipAvatar = (avatar) => setUserProfile((prev) => ({ ...prev, avatar }));
  
  const addTask = (task) => setTaskArray((prev) => [
    ...prev, 
    { ...task, id: `task-${Date.now()}`, status: "TODO" }
  ]);

  const deleteTask = (taskId) => {
    setTaskArray((prev) => prev.filter(t => t.id !== taskId));
    showToast("Quest Aborted", "×");
  };

  const clearLevelUp = () => setLevelUpData(null);
  const xpPercent = userProfile ? Math.min((userProfile.currentXp / XP_PER_LEVEL) * 100, 100) : 0;

  return (
    <UserStateContext.Provider value={{ userProfile, taskArray, leaderboard, achievements, boss, toast, levelUpData, isDarkMode, xpPercent, XP_PER_LEVEL }}>
      <UserDispatchContext.Provider value={{ completeTask, moveTask, buyItem, equipAvatar, addTask, deleteTask, clearLevelUp, toggleDarkMode }}>
        {children}
        {toast && (
          <div className="global-toast">
            <span className="toast-icon">{toast.icon}</span>
            <span className="toast-msg">{toast.message}</span>
          </div>
        )}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const ctx = useContext(UserStateContext);
  if (!ctx) throw new Error("useUserState must be used inside <UserProvider>");
  return ctx;
}

export function useUserDispatch() {
  const ctx = useContext(UserDispatchContext);
  if (!ctx) throw new Error("useUserDispatch must be used inside <UserProvider>");
  return ctx;
}