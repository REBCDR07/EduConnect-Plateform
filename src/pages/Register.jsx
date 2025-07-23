import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { User, Briefcase, Mail, Phone, Calendar, Lock } from 'lucide-react';

const Register = () => {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', birthDate: '', email: '',
    profession: '', phone: '', password: '', confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    setError('');
    if (Object.values(formData).some(v => v === '')) {
      setError('Tous les champs sont requis.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      register({ ...formData, role });
      setSuccess('Inscription réussie ! Vous serez redirigé vers la connexion pour continuer.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!role) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-3xl font-bold mb-8 text-center">Rejoignez EduConnect maintenant en vous inscrivant !!!</h1>
        <p className="mb-6 text-lg text-center">Lequel des deux profils vous définit le mieux ?</p>
        <div className="flex space-x-4">
          <button onClick={() => setRole('Étudiant')} className="flex flex-col items-center space-y-2 p-8 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
            <User size={48} /> <span className="text-xl font-semibold">Je suis un Étudiant</span>
          </button>
          <button onClick={() => setRole('Directeur')} className="flex flex-col items-center space-y-2 p-8 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition">
            <Briefcase size={48} /> <span className="text-xl font-semibold">Je suis un Directeur</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <button onClick={() => setRole(null)} className="text-blue-500 hover:underline mb-4">← Changer de rôle</button>
        <h2 className="text-2xl font-bold text-center">Inscription - {role}</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative"><span className="absolute inset-y-0 left-0 pl-3 flex items-center"><User/></span><input name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleInputChange} className="w-full pl-10 p-2 border rounded"/></div>
          <div className="relative"><span className="absolute inset-y-0 left-0 pl-3 flex items-center"><User/></span><input name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleInputChange} className="w-full pl-10 p-2 border rounded"/></div>
          <div className="relative"><span className="absolute inset-y-0 left-0 pl-3 flex items-center"><Calendar/></span><input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} className="w-full pl-10 p-2 border rounded"/></div>
          <div className="relative"><span className="absolute inset-y-0 left-0 pl-3 flex items-center"><Mail/></span><input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 p-2 border rounded"/></div>
          <div className="relative"><span className="absolute inset-y-0 left-0 pl-3 flex items-center"><Briefcase/></span><input name="profession" placeholder="Profession" value={formData.profession} onChange={handleInputChange} className="w-full pl-10 p-2 border rounded"/></div>
          <div className="relative"><span className="absolute inset-y-0 left-0 pl-3 flex items-center"><Phone/></span><input type="tel" name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleInputChange} className="w-full pl-10 p-2 border rounded"/></div>
          <div className="relative"><span className="absolute inset-y-0 left-0 pl-3 flex items-center"><Lock/></span><input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleInputChange} className="w-full pl-10 p-2 border rounded"/></div>
          <div className="relative"><span className="absolute inset-y-0 left-0 pl-3 flex items-center"><Lock/></span><input type="password" name="confirmPassword" placeholder="Confirmer mot de passe" value={formData.confirmPassword} onChange={handleInputChange} className="w-full pl-10 p-2 border rounded"/></div>
        </div>
        <button onClick={handleRegister} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded">Créer mon compte</button>
      </div>
    </div>
  );
};
export default Register;