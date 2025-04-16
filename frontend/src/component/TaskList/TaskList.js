import React from 'react';
import { useTasks } from '../../context/TaskContext';
import './TaskList.css';

const TaskList = () => {
  const { tasks, loading, toggleComplete } = useTasks();

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="task-wrapper">
      <h2 className="task-title">Task List</h2>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span>{task.title}</span>
            {!task.completed && (
              <button className="btn" onClick={() => toggleComplete(task.id)}>
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
