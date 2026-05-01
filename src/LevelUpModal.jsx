import React from 'react';
import { useUserState, useUserDispatch } from './UserContext';

export default function LevelUpModal() {
  const { levelUpData } = useUserState();
  const { clearLevelUp } = useUserDispatch();

  if (!levelUpData) return null;

  return (
    <div className="modal-overlay level-up-overlay">
      <div className="modal-content level-up-content">
        <div className="level-up-icon-wrapper">
          <span style={{ fontSize: '48px' }}>⚡</span>
        </div>
        
        <h1 className="level-up-title">PROMOTION SECURED</h1>
        
        <div className="level-up-rank">
          RANK INCREASED TO LEVEL {levelUpData.level}
        </div>
        
        <div className="level-up-rewards">
          <div className="reward-label">LOGISTICS BONUS</div>
          <div className="reward-value">+{levelUpData.rewards.gold} GOLD UNITS</div>
        </div>

        <button 
          className="btn-primary full-width" 
          onClick={clearLevelUp}
        >
          ACKNOWLEDGE
        </button>
      </div>
    </div>
  );
}
