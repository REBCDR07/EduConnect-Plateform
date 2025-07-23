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
  
    <nav className="bg-white dark:bg-gray-800 shadow-md relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
            <img src="/src/assets/logo.jpg" alt="EduConnect Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">EduConnect</span>
          </Link>


          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to={dashboardLink} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                    <LayoutDashboard size={24} />
                </Link>
                <button onClick={logout} className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400">
                  <LogOut size={24} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Connexion</Link>
                <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Inscription
                </Link>
              </>
            )}
             <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-yellow-400">
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          </div>


          <div className="md:hidden flex items-center">
             <button onClick={toggleTheme} className="mr-4 text-gray-600 dark:text-gray-300">
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} className="text-gray-800 dark:text-white" /> : <Menu size={28} className="text-gray-800 dark:text-white" />}
            </button>
          </div>
        </div>
      </div>


      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white dark:bg-gray-800 shadow-lg left-0">
          <div className="flex flex-col items-center space-y-4 py-4">
            {user ? (
              <>
                <span className="text-gray-700 dark:text-gray-300 text-lg">
                  Bonjour, {user.firstName}
                </span>
                <Link 
                  to={dashboardLink} 
                  className="w-full text-center py-2 hover:bg-gray-100 dark:hover:bg-gray-700" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tableau de bord
                </Link>
                <button 
                  onClick={handleLogoutAndCloseMenu} 
                  className="w-full text-center py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="w-full text-center py-2 hover:bg-gray-100 dark:hover:bg-gray-700" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="w-full text-center py-2 bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;