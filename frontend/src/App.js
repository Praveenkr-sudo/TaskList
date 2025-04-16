import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskList from './component/TaskList/TaskList';


function App() {
  return (
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );
}

export default App;
