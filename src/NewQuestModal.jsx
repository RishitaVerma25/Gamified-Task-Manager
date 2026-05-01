import React, { useState } from 'react';
import { useUserDispatch } from './UserContext';

export default function NewQuestModal({ onClose }) {
  const { addTask } = useUserDispatch();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Design',
    xp: 50,
    difficulty: 'Easy'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('A title is required for this operation.');
      return;
    }
    addTask({ ...formData, xp: Number(formData.xp) });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="board-header">
          <h2 className="board-title">New Quest Initialization</h2>
          <button className="btn-icon" onClick={onClose}>❌</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Quest Designation</label>
            <input 
              type="text" 
              className={`search-input ${error ? 'error' : ''}`}
              placeholder="Define task parameters..."
              value={formData.title}
              onChange={e => { setFormData({ ...formData, title: e.target.value }); setError(''); }}
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Classification</label>
              <select 
                className="search-input"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option>Design</option>
                <option>Code</option>
                <option>Study</option>
                <option>Urgent</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>Docs</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select 
                className="search-input"
                value={formData.difficulty}
                onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">XP Reward Yield ({formData.xp} XP)</label>
            <input 
              type="range" 
              min="10" 
              max="500" 
              step="10"
              className="search-input"
              value={formData.xp}
              onChange={e => setFormData({ ...formData, xp: e.target.value })}
              style={{ padding: '8px' }}
            />
          </div>

          <button type="submit" className="btn-primary full-width">
            DEPLOY QUEST
          </button>
        </form>
      </div>
    </div>
  );
}
