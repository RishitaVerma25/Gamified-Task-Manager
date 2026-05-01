import React from 'react';
import { useUserState, useUserDispatch } from './UserContext';

export default function TopStats() {
  const { userProfile, isDarkMode } = useUserState();
  const { toggleDarkMode } = useUserDispatch();

  return (
    <header className="top-bar">
      <div className="breadcrumbs">
        <span className="breadcrumb-muted">DASHBOARD</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-active">OVERVIEW</span>
      </div>

      <div className="top-stat-group">
        <div className="stat-chip streak">
          <span>🔥 {userProfile.streak}D STREAK</span>
        </div>
        
        <div className="stat-chip">
          <span style={{ color: 'var(--accent)' }}>💰</span>
          <span>{userProfile.totalGold}G</span>
        </div>

        <div className="stat-chip">
          <span style={{ color: 'var(--accent)' }}>⚡</span>
          <span>{userProfile.level * 1000 + userProfile.currentXp} XP</span>
        </div>

        <div className="vertical-divider"></div>

        <button 
          onClick={toggleDarkMode}
          className="btn-icon theme-toggle"
          title="Toggle Theme"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
