import React, { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setLoading(false);
  };

  const toggleComplete = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/tasks/${id}`, { method: 'PUT' });
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
};
