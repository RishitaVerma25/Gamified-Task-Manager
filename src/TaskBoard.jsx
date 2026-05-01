import React, { useState, useEffect, useRef } from "react";
import { useUserState, useUserDispatch } from "./UserContext";

function TaskItem({ task, onComplete, onDragStart, onDelete }) {
  const getStatusClass = () => {
    if (task.status === "DONE") return "done";
    if (task.status === "IN_PROGRESS") return "doing";
    return "todo";
  };

  return (
    <article 
      className={`quest-card ${getStatusClass()}`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="quest-title">{task.title}</div>
      
      <div className="quest-tags">
        <span className="tag">{task.category}</span>
        <span className="tag xp">{task.xp} XP</span>
        <span className="tag">{task.difficulty}</span>
      </div>

      <div className="card-actions">
        <button 
          className="btn-icon" 
          onClick={() => onDelete(task.id)}
          title="Abort Quest"
        >
          ❌
        </button>
        {task.status !== "DONE" && (
          <button 
            className="btn-icon success" 
            onClick={() => onComplete(task.id)}
          >
            ✅
          </button>
        )}
      </div>
    </article>
  );
}

export default function TaskBoard() {
  const { taskArray } = useUserState();
  const { completeTask, moveTask, deleteTask } = useUserDispatch();
  const [activeCol, setActiveCol] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const debounceTimer = useRef(null);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchInput(val);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setSearchQuery(val.toLowerCase());
    }, 300);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
  }, []);

  const filtered = searchQuery
    ? taskArray.filter(t => t.title.toLowerCase().includes(searchQuery) || t.category?.toLowerCase().includes(searchQuery))
    : taskArray;

  const todoTasks = filtered.filter(t => t.status === "TODO");
  const inProgressTasks = filtered.filter(t => t.status === "IN_PROGRESS");
  const doneTasks = filtered.filter(t => t.status === "DONE");

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    setActiveCol(null);
    const taskId = e.dataTransfer.getData("taskId");
    if (status === "DONE") {
      completeTask(taskId);
    } else {
      moveTask(taskId, status);
    }
  };

  return (
    <>
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Filter active quests..."
          className="search-input"
        />
      </div>

      <div className="kanban-grid">
        <div 
          className="kanban-col"
          onDragOver={(e) => { e.preventDefault(); setActiveCol("TODO"); }}
          onDragLeave={() => setActiveCol(null)}
          onDrop={(e) => handleDrop(e, "TODO")}
        >
          <div className="col-header">
            <div className="col-title">
              <span className="col-dot todo" />
              BACKLOG
            </div>
            <span className="tag">{todoTasks.length}</span>
          </div>
          <div className="task-list">
            {todoTasks.map(task => (
              <TaskItem key={task.id} task={task} onComplete={completeTask} onDragStart={handleDragStart} onDelete={deleteTask} />
            ))}
          </div>
        </div>

        <div 
          className="kanban-col"
          onDragOver={(e) => { e.preventDefault(); setActiveCol("IN_PROGRESS"); }}
          onDragLeave={() => setActiveCol(null)}
          onDrop={(e) => handleDrop(e, "IN_PROGRESS")}
        >
          <div className="col-header">
            <div className="col-title">
              <span className="col-dot doing" />
              IN PROGRESS
            </div>
            <span className="tag">{inProgressTasks.length}</span>
          </div>
          <div className="task-list">
            {inProgressTasks.map(task => (
              <TaskItem key={task.id} task={task} onComplete={completeTask} onDragStart={handleDragStart} onDelete={deleteTask} />
            ))}
          </div>
        </div>

        <div 
          className="kanban-col"
          onDragOver={(e) => { e.preventDefault(); setActiveCol("DONE"); }}
          onDragLeave={() => setActiveCol(null)}
          onDrop={(e) => handleDrop(e, "DONE")}
        >
          <div className="col-header">
            <div className="col-title">
              <span className="col-dot done" />
              ARCHIVE
            </div>
            <span className="tag">{doneTasks.length}</span>
          </div>
          <div className="task-list">
            {doneTasks.map(task => (
              <TaskItem key={task.id} task={task} onComplete={completeTask} onDragStart={handleDragStart} onDelete={deleteTask} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}