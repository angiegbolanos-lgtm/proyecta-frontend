import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, PlusCircle, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenModal }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo "Proyecta" de la imagen */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* Representación SVG recreada del logo de Proyecta */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Icono de Calendario del logo */}
                <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                  <path d="M10 8h20a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z" fill="none" stroke="#2563eb" strokeWidth="3"/>
                  <path d="M14 6v4M26 6v4" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M13 22l5 5 10-10" fill="none" stroke="#00d2ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 15h6M3 21h4M3 27h6" stroke="#c084fc" strokeWidth="2" strokeLinecap="round"/>
                  {/* Destello amarillo del logo */}
                  <path d="M31 6l1.5-1.5M34 9l2-.5M33 13l2.5 1.5" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  Proyecta
                </span>
                <span className="text-[9px] text-slate-400 font-medium tracking-wide max-w-[200px] leading-tight hidden lg:block">
                  «Organiza tus tareas, conecta tus ideas y alcanza tus proyectos»
                </span>
              </div>
            </div>
          </div>

          {/* Enlaces y Navegación */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/') 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link
              to="/projects"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/projects') 
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FolderKanban size={16} />
              Proyectos
            </Link>
            <Link
              to="/tasks"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/tasks') 
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <CheckSquare size={16} />
              Tareas
            </Link>
          </nav>

          {/* Botón CTA + Menú Móvil */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenModal}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4.5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle size={16} />
              <span>Nueva Tarea</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú para Móviles */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-2">
          <p className="text-[10px] text-slate-500 px-3 font-semibold uppercase tracking-wider">
            «Organiza tus tareas, conecta tus ideas y alcanza tus proyectos»
          </p>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 text-sm font-medium"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 text-sm font-medium"
          >
            <FolderKanban size={18} /> Proyectos
          </Link>
          <Link
            to="/tasks"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 text-sm font-medium"
          >
            <CheckSquare size={18} /> Tareas
          </Link>
        </div>
      )}
    </header>
  );
}