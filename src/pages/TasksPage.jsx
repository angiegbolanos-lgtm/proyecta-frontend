import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, FolderX } from 'lucide-react';
import TaskCard from '../components/TaskCard';

export default function TasksPage({ tasks, users, onStatusChange }) {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState(location.state?.initialStatus || 'TODOS');
  const [filterPriority, setFilterPriority] = useState('TODAS');
  const [filterUser, setFilterUser] = useState('TODOS');

  useEffect(() => {
    if (location.state?.initialStatus) {
      setFilterStatus(location.state.initialStatus);
    }
  }, [location.state]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                          task.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'TODOS' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'TODAS' || task.priority === filterPriority;
    const matchesUser = filterUser === 'TODOS' || task.assignedTo === Number(filterUser);

    return matchesSearch && matchesStatus && matchesPriority && matchesUser;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white">Listado de Tareas</h1>
        <p className="text-slate-400 text-sm">Filtra, consulta y actualiza el estado de las tareas activas.</p>
      </div>

      {/* Control de Filtros */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl shadow-lg space-y-3 md:space-y-0 md:flex md:items-center md:gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar tarea..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="TODOS">Todos los Estados</option>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="EN_PROGRESO">EN PROGRESO</option>
            <option value="COMPLETADA">COMPLETADA</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="TODAS">Todas las Prioridades</option>
            <option value="ALTA">ALTA</option>
            <option value="MEDIA">MEDIA</option>
            <option value="BAJA">BAJA</option>
          </select>

          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 col-span-2 sm:col-span-1"
          >
            <option value="TODOS">Todos los Usuarios</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
      </div>

      {/* Grid de Tarjetas o Empty State */}
      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/40 border border-slate-800 rounded-xl text-center space-y-3">
          <FolderX size={48} className="text-slate-600" />
          <h3 className="text-lg font-medium text-slate-300">No se encontraron tareas</h3>
          <p className="text-slate-500 text-sm max-w-sm">Prueba ajustando los términos de búsqueda o limpiando los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} users={users} onStatusChange={onStatusChange} />
          ))}
        </div>
      )}
    </div>
  );
}