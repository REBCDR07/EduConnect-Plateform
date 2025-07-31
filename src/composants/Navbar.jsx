import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Sun, Moon, LogOut, User, LayoutDashboard, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogoutAndCloseMenu = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const dashboardLink = user?.role === 'Directeur' ? '/dashboard/director' : '/dashboard/student';

  return (
    <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-lg border-b border-white/30 dark:border-gray-700/30 relative sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center py-4 lg:py-5">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group" 
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative">
              <img 
                src="/src/assets/logo.jpg" 
                alt="EduConnect Logo" 
                className="h-12 w-12 lg:h-14 lg:w-14 rounded-xl border-2 border-white/30 shadow-lg shadow-blue-500/10 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl group-hover:opacity-50 opacity-0 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">
              EduConnect
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {user ? (
              <>
                {/* Salutation utilisateur */}
                <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-blue-200/50 dark:border-gray-600/50">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Bonjour, <span className="font-semibold text-gray-800 dark:text-white">{user.firstName}</span>
                  </span>
                </div>

                <Link 
                  to={dashboardLink} 
                  className="group relative p-3 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700/50"
                >
                  <LayoutDashboard size={24} className="relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300"></div>
                </Link>
                <button 
                  onClick={logout} 
                  className="group relative p-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 rounded-xl hover:bg-red-50 dark:hover:bg-gray-700/50"
                >
                  <LogOut size={24} className="relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/0 to-pink-500/0 group-hover:from-red-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300"></div>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 px-6 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700/50 font-medium text-lg"
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="relative group overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 text-lg"
                >
                  <span className="relative z-10">Inscription</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </Link>
              </>
            )}
            <button 
              onClick={toggleTheme} 
              className="group relative p-3 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-yellow-400 transition-all duration-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              {theme === 'light' ? (
                <>
                  <Moon size={24} className="relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/5 group-hover:to-indigo-500/5 rounded-xl transition-all duration-300"></div>
                </>
              ) : (
                <>
                  <Sun size={24} className="relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/5 group-hover:to-orange-500/5 rounded-xl transition-all duration-300"></div>
                </>
              )}
            </button>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300"
            >
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-3 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile amélioré */}
      {isMenuOpen && (
        <div className="lg:hidden absolute w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-2xl left-0 border-t border-white/30 dark:border-gray-700/30 z-50 animate-slide-down">
          <div className="flex flex-col space-y-4 py-6 px-6">
            {user ? (
              <>
                <div className="text-center py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl border border-blue-200/50 dark:border-gray-600/50">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">
                      Bonjour, {user.firstName}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {user.role}
                  </span>
                </div>
                <Link 
                  to={dashboardLink} 
                  className="w-full text-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700/50 dark:to-gray-800/50 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-600/50 dark:hover:to-gray-700/50 transition-all duration-300 font-medium text-lg border border-blue-200/50 dark:border-gray-600/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Tableau de bord</span>
                  </div>
                </Link>
                <button 
                  onClick={handleLogoutAndCloseMenu} 
                  className="w-full text-center px-8 py-4 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-700/50 dark:to-gray-800/50 hover:from-red-100 hover:to-pink-100 dark:hover:from-gray-600/50 dark:hover:to-gray-700/50 text-red-600 dark:text-red-400 transition-all duration-300 font-medium text-lg border border-red-200/50 dark:border-gray-600/50"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <LogOut className="h-5 w-5" />
                    <span>Déconnexion</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="w-full text-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700/50 dark:to-gray-800/50 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-600/50 dark:hover:to-gray-700/50 transition-all duration-300 font-medium text-lg border border-blue-200/50 dark:border-gray-600/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="w-full text-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25 font-semibold text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;