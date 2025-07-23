import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { User, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      setError('');
      const user = login(email, password);
      
      if (user) {
        // Redirection en fonction du rôle : étudiant & directeur
        if (user.role === 'Directeur') {
          navigate('/dashboard/director');
        } else {
        
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h1 className="text-3xl font-bold text-center">Connexion</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="space-y-4">
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded"/>
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded"/>
                </div>
            </div>
            <button onClick={handleLogin} className="w-full py-2 bg-blue-600 text-white rounded">Se connecter</button>
            <p className="text-center">Pas encore de compte ? <Link to="/register" className="text-blue-500">Inscrivez-vous</Link></p>
        </div>
    </div>
  );
};

export default Login;