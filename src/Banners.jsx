import React from 'react';
import { useUserState } from './UserContext';

export default function Banners() {
  const state = useUserState();
  
  if (!state || !state.taskArray || !state.boss) {
    return null;
  }

  const { taskArray, boss } = state;
  const doneCount = taskArray.filter(t => t.status === 'DONE').length;
  const targetCount = 3;
  const dailyPct = Math.min((doneCount / targetCount) * 100, 100);
  const bossHpPct = Math.max((boss.hp / boss.maxHp) * 100, 0);

  return (
    <div className="banners-grid">
      {/* Boss Panel */}
      <div className="banner-card boss">
        <div className="banner-info">
          <div className="banner-header-icon">
            <span>🛡️</span>
            <h3>{boss.name ? boss.name.toUpperCase() : "BOSS"}</h3>
          </div>
          <p>Active objective: Defeat the anomaly</p>
        </div>
        <div className="banner-stats">
          <div className="stat-label danger">
            {Math.max(boss.hp, 0)} HP
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar-fill danger" style={{ width: `${bossHpPct}%` }}></div>
          </div>
        </div>
      </div>

      {/* Daily Panel */}
      <div className="banner-card daily">
        <div className="banner-info">
          <div className="banner-header-icon">
            <span>🎯</span>
            <h3>DAILY OPERATIONS</h3>
          </div>
          <p>Quota: {targetCount} units of work</p>
        </div>
        <div className="banner-stats">
          <div className="stat-label success">
            {doneCount}/{targetCount} DONE
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar-fill success" style={{ width: `${dailyPct}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
