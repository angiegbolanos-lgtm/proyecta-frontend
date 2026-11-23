import { useNavigate } from 'react-router-dom';
import { FolderKanban, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Dashboard({ tasks, projects }) {
  const navigate = useNavigate();

  const pendingCount = tasks.filter(t => t.status === 'PENDIENTE').length;
  const inProgressCount = tasks.filter(t => t.status === 'EN_PROGRESO').length;
  const completedCount = tasks.filter(t => t.status === 'COMPLETADA').length;

  const totalTasks = tasks.length || 1;
  const completionRate = Math.round((completedCount / totalTasks) * 100);

  const goToTasksWithStatus = (status) => {
    navigate('/tasks', { state: { initialStatus: status } });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 py-4">
      {/* Hero Banner Estético */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800/80 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Panel Principal <span className="text-yellow-400">✦</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-bold leading-relaxed bg-gradient-to-r from-blue-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent">
            «Organiza tus tareas, conecta tus ideas y alcanza tus proyectos»
          </p>
          <p className="text-slate-400 text-sm md:text-base">
            Bienvenido a tu centro de control. Haz clic en cualquier métrica para ir directo a ver su detalle.
          </p>
        </div>
      </div>

      {/* Grid de Tarjetas Clicables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Proyectos - Estilo Morado */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate('/projects')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/projects')}
          className="bg-slate-900/40 backdrop-blur-md border border-purple-500/20 hover:border-purple-400/50 rounded-2xl p-6 shadow-xl transition-all hover:scale-[1.02] cursor-pointer group"
        >
          <div className="flex items-center justify-between text-purple-400 mb-4">
            <span className="text-sm font-bold uppercase tracking-wider group-hover:underline">Proyectos</span>
            <FolderKanban size={22} className="text-purple-400" />
          </div>
          <div className="text-5xl font-black text-white mb-2">{projects.length}</div>
          <p className="text-sm text-slate-400">Ver proyectos activos →</p>
          <div className="w-full bg-purple-950/50 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-purple-500 h-full w-2/3 rounded-full" />
          </div>
        </div>

        {/* Pendientes - Estilo Amarillo */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => goToTasksWithStatus('PENDIENTE')}
          onKeyDown={(e) => e.key === 'Enter' && goToTasksWithStatus('PENDIENTE')}
          className="bg-slate-900/40 backdrop-blur-md border border-yellow-500/20 hover:border-yellow-400/50 rounded-2xl p-6 shadow-xl transition-all hover:scale-[1.02] cursor-pointer group"
        >
          <div className="flex items-center justify-between text-yellow-500 mb-4">
            <span className="text-sm font-bold uppercase tracking-wider group-hover:underline">Pendientes</span>
            <Clock size={22} className="text-yellow-400" />
          </div>
          <div className="text-5xl font-black text-yellow-400 mb-2">{pendingCount}</div>
          <p className="text-sm text-slate-400">Ver tareas pendientes →</p>
          <div className="w-full bg-yellow-950/50 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-yellow-400 h-full w-1/3 rounded-full" />
          </div>
        </div>

        {/* En Progreso - Estilo Azul */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => goToTasksWithStatus('EN_PROGRESO')}
          onKeyDown={(e) => e.key === 'Enter' && goToTasksWithStatus('EN_PROGRESO')}
          className="bg-slate-900/40 backdrop-blur-md border border-blue-500/20 hover:border-blue-400/50 rounded-2xl p-6 shadow-xl transition-all hover:scale-[1.02] cursor-pointer group"
        >
          <div className="flex items-center justify-between text-blue-400 mb-4">
            <span className="text-sm font-bold uppercase tracking-wider group-hover:underline">En Progreso</span>
            <TrendingUp size={22} className="text-blue-400" />
          </div>
          <div className="text-5xl font-black text-blue-400 mb-2">{inProgressCount}</div>
          <p className="text-sm text-slate-400">Ver en progreso →</p>
          <div className="w-full bg-blue-950/50 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-blue-400 h-full w-1/2 rounded-full" />
          </div>
        </div>

        {/* Completadas - Estilo Verde */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => goToTasksWithStatus('COMPLETADA')}
          onKeyDown={(e) => e.key === 'Enter' && goToTasksWithStatus('COMPLETADA')}
          className="bg-slate-900/40 backdrop-blur-md border border-emerald-500/20 hover:border-emerald-400/50 rounded-2xl p-6 shadow-xl transition-all hover:scale-[1.02] cursor-pointer group"
        >
          <div className="flex items-center justify-between text-emerald-400 mb-4">
            <span className="text-sm font-bold uppercase tracking-wider group-hover:underline">Completadas</span>
            <CheckCircle2 size={22} className="text-emerald-400" />
          </div>
          <div className="text-5xl font-black text-emerald-400 mb-2">{completedCount}</div>
          <p className="text-sm text-slate-400">Ver completadas →</p>
          <div className="w-full bg-emerald-950/50 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-emerald-500 h-full w-1/3 rounded-full" />
          </div>
        </div>
      </div>

      {/* Sección del Progreso Global */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-sm md:text-base">
          <span className="font-bold text-white text-lg">Progreso Global</span>
          <span className="font-extrabold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
            {completionRate}% Completado
          </span>
        </div>
        <div className="relative w-full bg-slate-950 h-4 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div 
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-400 h-full transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.3)]"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 px-1 font-semibold">
          <span>0%</span>
          <span>{completionRate}%</span>
        </div>
      </div>
    </div>
  );
}