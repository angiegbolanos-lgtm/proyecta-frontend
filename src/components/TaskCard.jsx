import { Calendar, User, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TaskCard({ task, users, onStatusChange }) {
  const assignedUser = users.find(u => u.id === task.assignedTo);

  const priorityStyles = {
    ALTA: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    MEDIA: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    BAJA: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  };

  const statusStyles = {
    PENDIENTE: 'bg-slate-800 text-slate-300 border-slate-700',
    EN_PROGRESO: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    COMPLETADA: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between gap-4 group">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <h4 className="font-semibold text-white text-base group-hover:text-indigo-300 transition-colors">
            {task.title}
          </h4>
          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium uppercase tracking-wider ${priorityStyles[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-800/60">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-indigo-400">
              {assignedUser ? assignedUser.avatar : '??'}
            </div>
            <span>{assignedUser ? assignedUser.name : 'Sin asignar'}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar size={14} className="text-slate-500" />
            <span>{task.dueDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-xs text-slate-400 font-medium">Estado actual:</span>
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium cursor-pointer focus:outline-none transition-all ${statusStyles[task.status]}`}
          >
            <option value="PENDIENTE" className="bg-slate-900 text-slate-300">⏳ PENDIENTE</option>
            <option value="EN_PROGRESO" className="bg-slate-900 text-indigo-300">🚀 EN PROGRESO</option>
            <option value="COMPLETADA" className="bg-slate-900 text-emerald-300">✅ COMPLETADA</option>
          </select>
        </div>
      </div>
    </div>
  );
}