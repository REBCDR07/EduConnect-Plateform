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
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
        setError("L'email et le mot de passe sont requis.");
        return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simuler un délai réseau pour un meilleur effet visuel
    setTimeout(() => {
        try {
            const user = login(email, password); // C'est synchrone maintenant
            if (user.role === 'Directeur') {
                navigate('/dashboard/director');
            } else {
                navigate('/'); // Les étudiants vont à l'accueil pour voir les écoles
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, 800);
  };

  return (
    // ... Le JSX que vous m'avez fourni (Login.jsx) est parfait et n'a pas besoin de changer.
    // Juste au cas où, je le remets ici
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* ... code JSX de fond décoratif ... */}
      <div className="relative z-10 w-full max-w-md">
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Connexion
            </h1>
          </div>
          {error && <p className="text-red-500 text-center font-medium my-4">{error}</p>}
          <div className="space-y-6">
            <div>
              <label>Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2"><User/></span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 border rounded-xl" placeholder="votre@email.com"/>
              </div>
            </div>
            <div>
              <label>Mot de passe</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2"><Lock/></span>
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-12 pr-14 py-4 border rounded-xl" placeholder="••••••••"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff/> : <Eye/>}
                </button>
              </div>
            </div>
          </div>
          <button onClick={handleLogin} disabled={isLoading} className="mt-8 w-full bg-blue-600 text-white font-semibold py-4 rounded-xl disabled:bg-blue-400">
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
          <p className="text-center pt-6">Pas de compte ? <Link to="/register" className="text-blue-500 font-semibold">Inscrivez-vous</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;