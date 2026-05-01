import React, { useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./UserContext";
import Sidebar from "./Sidebar";
import TopStats from "./TopStats";
import Banners from "./Banners";
import TaskBoard from "./TaskBoard";
import NewQuestModal from "./NewQuestModal";
import LevelUpModal from "./LevelUpModal";
import QuoteBanner from "./QuoteBanner";

// React.lazy and Suspense from Unit 5
const Shop = lazy(() => import("./Shop"));

function Dashboard({ onNewQuest }) {
  return (
    <div className="dashboard-view">
      <div className="board-header">
        <h2 className="board-title">Active Quests</h2>
        <button className="btn-primary" onClick={onNewQuest}>
          ➕ New Quest
        </button>
      </div>
      <QuoteBanner />
      <Banners />
      <TaskBoard />
    </div>
  );
}

function AppLayout() {
  const [isNewQuestOpen, setIsNewQuestOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <TopStats />
        <div className="content-scroll">
          <Suspense fallback={<div className="loading-fallback">Loading Command Center...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard onNewQuest={() => setIsNewQuestOpen(true)} />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      
      {isNewQuestOpen && <NewQuestModal onClose={() => setIsNewQuestOpen(false)} />}
      <LevelUpModal />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppLayout />
    </UserProvider>
  );
}