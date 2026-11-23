import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import initialData from './data/mockData.json';
import Navbar from './components/Navbar';
import TaskModal from './components/TaskModal';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';

export default function App() {
  const [users] = useState(initialData.users);
  const [projects] = useState(initialData.projects);
  const [tasks, setTasks] = useState(initialData.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleSaveTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
        <Navbar onOpenModal={() => setIsModalOpen(true)} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard tasks={tasks} projects={projects} onOpenModal={() => setIsModalOpen(true)} />} 
            />
            <Route 
              path="/projects" 
              element={<ProjectsPage projects={projects} tasks={tasks} />} 
            />
            <Route 
              path="/tasks" 
              element={<TasksPage tasks={tasks} users={users} onStatusChange={handleStatusChange} />} 
            />
          </Routes>
        </main>

        <TaskModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveTask} 
          users={users} 
          projects={projects} 
        />
      </div>
    </BrowserRouter>
  );
}