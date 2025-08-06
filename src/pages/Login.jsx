import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth(); // Vient de AuthContext
  const navigate = useNavigate();

  // Logique asynchrone corrigée pour Firebase
  const handleLogin = async () => {
    if (!email || !password) {
        setError("L'email et le mot de passe sont requis.");
        return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      // 1. Appel de la fonction de connexion et attente du résultat
      const user = await login(email, password);

      // 2. Si la connexion réussit, on redirige manuellement
      // Le `onAuthStateChanged` dans le contexte va aussi mettre à jour l'état,
      // mais la redirection manuelle est plus rapide pour l'UX.
      if (user.role === 'Directeur') {
        navigate('/dashboard/director');
      } else {
        navigate('/'); // Étudiants et autres vont à l'accueil
      }

    } catch (err) {
      // 3. Gestion des erreurs de connexion de Firebase
      setError("L'email ou le mot de passe est incorrect.");
    } finally {
      // 4. On arrête l'indicateur de chargement
      setIsLoading(false);
    }
  };
  
  // ----- VOTRE DESIGN JSX EST PARFAITEMENT CONSERVÉ -----

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl opacity-10 blur-sm"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Bon retour parmi nous
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Connectez-vous pour continuer</p>
          </div>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 my-4">
              <p className="text-red-600 dark:text-red-400 text-center font-medium">{error}</p>
            </div>
          )}
          <div className="space-y-6">
            <div className="group">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                </span>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg" 
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div className="group">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full pl-12 pr-14 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg" 
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogin} 
            disabled={isLoading} 
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white font-semibold py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed text-lg"
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
          <p className="text-center pt-6 text-gray-500 dark:text-gray-400">
            Pas encore de compte ? <Link to="/client/src/pages/register" className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-300">Inscrivez-vous</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;