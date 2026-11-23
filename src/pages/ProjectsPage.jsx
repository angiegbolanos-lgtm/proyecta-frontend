import { Calendar, CheckSquare, Layers } from 'lucide-react';

export default function ProjectsPage({ projects, tasks }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-white">Proyectos</h1>
        <p className="text-slate-400 text-sm">Listado general de iniciativas y sus métricas de avance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => {
          const projectTasks = tasks.filter(t => t.projectId === project.id);
          const completedTasks = projectTasks.filter(t => t.status === 'COMPLETADA');
          const percent = projectTasks.length ? Math.round((completedTasks.length / projectTasks.length) * 100) : 0;

          return (
            <div key={project.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-lg hover:border-slate-700 transition-all space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                    {project.category || 'General'}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{project.name}</h3>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Tareas completadas</span>
                  <span className="font-semibold text-indigo-300">{completedTasks.length} de {projectTasks.length}</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="bg-indigo-500 h-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-500" />
                  <span>{project.startDate} a {project.endDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
                  <CheckSquare size={14} />
                  <span>{projectTasks.length} tareas</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}