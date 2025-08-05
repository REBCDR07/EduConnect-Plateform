import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Sun, Moon, LogOut, User, LayoutDashboard, Menu, X, Zap } from 'lucide-react';

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
    <nav className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-white/20 dark:border-gray-700/30 sticky top-0 z-50 transition-all duration-500">
      

      <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 via-emerald-500/40 to-transparent animate-gradient-x"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center py-3 sm:py-4 lg:py-5">
          {/* Logo and title */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 sm:space-x-3 group animate-fade-in-up" 
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative group/logo">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:shadow-xl group-hover/logo:shadow-blue-500/30">
                <Zap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white drop-shadow-sm" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="space-y-1">
              <span className="block text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
                EduConnect
              </span>
              <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full opacity-60"></div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {user ? (
              <>
                {/* User greeting */}
                <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      Bonjour, <span className="font-semibold text-gray-800 dark:text-white">{user.firstName}</span>
                    </span>
                  </div>
                </div>

                {/* Dashboard button */}
                <Link 
                  to={dashboardLink} 
                  className="group relative p-2 sm:p-3 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 rounded-xl animate-fade-in-up" 
                  title="Tableau de bord"
                  style={{ animationDelay: '0.4s' }}
                >
                  <LayoutDashboard size={20} className="sm:w-6 sm:h-6 relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300"></div>
                </Link>

                {/* Logout button */}
                <button 
                  onClick={handleLogoutAndCloseMenu} 
                  className="group relative p-2 sm:p-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 rounded-xl animate-fade-in-up" 
                  title="Déconnexion"
                  style={{ animationDelay: '0.6s' }}
                >
                  <LogOut size={20} className="sm:w-6 sm:h-6 relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/0 to-pink-500/0 group-hover:from-red-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-300"></div>
                </button>
              </>
            ) : (
              <>
                {/* Login button */}
                <Link 
                  to="/login" 
                  className="relative group px-4 sm:px-6 py-2 sm:py-3 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 rounded-xl hover:bg-blue-50/50 dark:hover:bg-gray-700/50 font-medium text-base sm:text-lg animate-fade-in-up" 
                  style={{ animationDelay: '0.2s' }}
                >
                  <span className="relative z-10">Connexion</span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-300"></div>
                </Link>
                {/* Register button */}
                <Link 
                  to="/register" 
                  className="relative group overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up" 
                  style={{ animationDelay: '0.4s' }}
                >
                  <span className="relative z-10">Inscription</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </Link>
              </>
            )}

            {/* Theme toggle button */}
            <button 
              onClick={toggleTheme} 
              className="group relative p-2 sm:p-3 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-yellow-400 transition-all duration-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 animate-fade-in-up" 
              title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
              style={{ animationDelay: '0.8s' }}
            >
              {theme === 'light' ? (
                <>
                  <Moon size={20} className="sm:w-6 sm:h-6 relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/10 group-hover:to-indigo-500/10 rounded-xl transition-all duration-300"></div>
                </>
              ) : (
                <>
                  <Sun size={20} className="sm:w-6 sm:h-6 relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/10 group-hover:to-orange-500/10 rounded-xl transition-all duration-300"></div>
                </>
              )}
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={toggleTheme} 
              className="group relative p-2 sm:p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
              title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
            >
              {theme === 'light' ? (
                <>
                  <Moon size={20} className="sm:w-6 sm:h-6 relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/10 group-hover:to-indigo-500/10 rounded-xl transition-all duration-300"></div>
                </>
              ) : (
                <>
                  <Sun size={20} className="sm:w-6 sm:h-6 relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/10 group-hover:to-orange-500/10 rounded-xl transition-all duration-300"></div>
                </>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="group relative p-2 sm:p-3 text-gray-800 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
              title="Menu"
            >
              {isMenuOpen ? (
                <>
                  <X size={22} className="sm:w-7 sm:h-7 relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/0 to-gray-500/0 group-hover:from-gray-500/10 group-hover:to-gray-500/10 rounded-xl transition-all duration-300"></div>
                </>
              ) : (
                <>
                  <Menu size={22} className="sm:w-7 sm:h-7 relative z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/0 to-gray-500/0 group-hover:from-gray-500/10 group-hover:to-gray-500/10 rounded-xl transition-all duration-300"></div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute w-full bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl shadow-2xl border-t border-white/30 dark:border-gray-700/30 z-50 animate-slide-down">
          <div className="relative flex flex-col space-y-3 sm:space-y-4 py-4 sm:py-6 px-4 sm:px-6">
            {/* Decorative background for mobile menu */}
            <div className="absolute top-0 left-0 w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
            {user ? (
              <>
                {/* Mobile user profile */}
                <div className="relative group py-3 sm:py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-blue-200/50 dark:border-gray-600/50 animate-fade-in-up">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/15 dark:to-purple-400/15 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-base sm:text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">
                      Bonjour, {user.firstName}
                    </span>
                  </div>
                  <span className="block text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                    {user.role}
                  </span>
                </div>

                {/* Mobile dashboard button */}
                <Link 
                  to={dashboardLink} 
                  className="relative group w-full text-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-all duration-300 font-medium text-base sm:text-lg border border-blue-200/50 dark:border-gray-600/50 animate-fade-in-up" 
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Tableau de bord</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-300"></div>
                </Link>

                {/* Mobile logout button */}
                <button 
                  onClick={handleLogoutAndCloseMenu} 
                  className="relative group w-full text-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-red-50/50 dark:hover:bg-gray-700/50 text-red-600 dark:text-red-400 transition-all duration-300 font-medium text-base sm:text-lg border border-red-200/50 dark:border-gray-600/50 animate-fade-in-up" 
                  style={{ animationDelay: '0.4s' }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Déconnexion</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/0 to-pink-500/0 group-hover:from-red-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-300"></div>
                </button>
              </>
            ) : (
              <>
                {/* Mobile login button */}
                <Link 
                  to="/login" 
                  className="relative group w-full text-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-all duration-300 font-medium text-base sm:text-lg border border-blue-200/50 dark:border-gray-600/50 animate-fade-in-up" 
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: '0.2s' }}
                >
                  <span className="relative z-10">Connexion</span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all duration-300"></div>
                </Link>
                {/* Mobile register button */}
                <Link 
                  to="/register" 
                  className="relative group w-full text-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-all duration-300 font-medium text-base sm:text-lg border border-blue-200/50 dark:border-gray-600/50 animate-fade-in-up" 
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: '0.4s' }}
                >
                  <span className="relative z-10">Inscription</span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/10 rounded-2xl transition-all duration-300"></div>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradient-x {
          0%, 100% {
            background-size: 400% 400%;
            background-position: left center;
          }
          50% {
            background-size: 400% 400%;
            background-position: right center;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
        a:focus, button:focus {
          outline: 2px solid theme('colors.blue.500');
          outline-offset: 2px;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

