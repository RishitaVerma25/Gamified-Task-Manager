import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserState } from './UserContext';

export default function Sidebar() {
  const state = useUserState();
  
  if (!state || !state.userProfile) {
    return <aside className="sidebar">Loading...</aside>;
  }

  const { userProfile, leaderboard, achievements, xpPercent, XP_PER_LEVEL } = state;

  const avatar = userProfile.avatar || "👤";

  return (
    <aside className="sidebar">
      <NavLink to="/" className="logo">
        <div className="logo-dot" />
        QuestBoard
      </NavLink>

      <nav className="nav-group">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          🏠 Dashboard
        </NavLink>
        <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          🛍️ Rewards
        </NavLink>
      </nav>

      <div className="sidebar-profile">
        <div className="profile-info">
          <div className="profile-avatar">
            {/* Logic to show image if it's a URL, otherwise show the text/emoji */}
            {avatar.includes('http') ? (
              <img src={avatar} alt="Profile" className="avatar-img" />
            ) : (
              avatar
            )}
          </div>
          <div className="profile-meta">
            <h4>{userProfile.name}</h4>
            <p>{userProfile.title}</p>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-labels">
            <span>LVL {userProfile.level}</span>
            <span>{Math.floor(xpPercent)}%</span>
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar-fill" style={{ width: `${xpPercent}%` }}></div>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="section-title">Achievements</div>
        <div className="achievements-mini-grid">
          {achievements && achievements.slice(0, 8).map((ach) => (
            <div
              key={ach.id}
              className={`achievement-dot ${ach.active ? 'active' : 'locked'}`}
              title={ach.active ? ach.desc : 'Locked'}
            >
              {ach.icon}
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="section-title">Ranking</div>
        <div className="leaderboard-mini">
          {leaderboard && leaderboard.slice(0, 5).map((user, index) => (
            <div key={user.id} className={`rank-item ${user.name === "You" ? 'highlight' : ''}`}>
              <span className="rank-num">{index + 1}</span>
              <span className="rank-name">{user.name}</span>
              <span className="rank-score">{user.score}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
