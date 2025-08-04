import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Assurez-vous que ce chemin est correct
import { User, Briefcase, Mail, Phone, Calendar, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '', // Gardé pour le design
    email: '',
    profession: '', // Gardé pour le design
    phone: '',      // Gardé pour le design
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth(); // Vient de AuthContext
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logique asynchrone corrigée pour Firebase
  const handleRegister = async () => {
    // 1. Validations des champs requis
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Prénom, Nom, Email et Mot de passe sont requis.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // 2. Préparation des données pour Firebase (seulement ce dont Firebase a besoin)
      const userDataToRegister = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: role, // Le rôle sélectionné à l'étape précédente
      };
      
      // 3. Appel de la fonction asynchrone et attente de la réponse
      await register(userDataToRegister);
      
      // 4. Si tout réussit, affichage du message et redirection
      setSuccess('Inscription réussie ! Vous serez redirigé vers la connexion.');
      setTimeout(() => navigate('/login'), 2500);

    } catch (err) {
      // 5. Gestion des erreurs renvoyées par Firebase
      let errorMessage = "Une erreur est survenue. Veuillez réessayer.";
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = "Cet email est déjà utilisé. Essayez de vous connecter.";
      } else if (err.code === 'auth/weak-password') {
        errorMessage = "Le mot de passe doit contenir au moins 6 caractères.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Le format de l'email est invalide.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // La partie de sélection du rôle (votre design)
  if (!role) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
        <style>{`@keyframes fade-in-up{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}.animate-fade-in-up{animation:fade-in-up 1s ease-out}`}</style>
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-green-500/8 to-blue-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-2xl"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto w-full">
          <div className="mb-16 animate-fade-in-up">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-green-500/15 rounded-full blur-xl"></div>
              <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-6 leading-tight">
                Rejoignez EduConnect maintenant en vous inscrivant !!!
              </h1>
            </div>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full mb-12"></div>
            <p className="text-xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-300 animate-fade-in-up font-light" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              Lequel des deux profils vous définit le mieux ?
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 justify-center items-center animate-fade-in-up max-w-5xl mx-auto" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <button onClick={() => setRole('Étudiant')} className="group relative w-full lg:w-96 xl:w-[420px] p-10 lg:p-12 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/20">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative z-10 flex flex-col items-center space-y-6">
                <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm group-hover:bg-white/25 transition-all duration-500"><User size={64} className="group-hover:scale-110 transition-transform duration-500" /></div>
                <span className="text-2xl lg:text-3xl font-semibold">Je suis un Étudiant</span>
                <p className="text-blue-100 text-base lg:text-lg opacity-90 max-w-xs text-center">Trouvez votre formation idéale et explorez de nouveaux horizons</p>
              </div>
            </button>
            <button onClick={() => setRole('Directeur')} className="group relative w-full lg:w-96 xl:w-[420px] p-10 lg:p-12 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-green-500/20">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative z-10 flex flex-col items-center space-y-6">
                <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm group-hover:bg-white/25 transition-all duration-500"><Briefcase size={64} className="group-hover:scale-110 transition-transform duration-500" /></div>
                <span className="text-2xl lg:text-3xl font-semibold">Je suis un Directeur</span>
                <p className="text-green-100 text-base lg:text-lg opacity-90 max-w-xs text-center">Gérez votre établissement avec efficacité</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // La partie formulaire d'inscription (votre design)
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      <style>{`@keyframes fade-in-up{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}@keyframes shake{0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-3px)}20%,40%,60%,80%{transform:translateX(3px)}}.animate-fade-in-up{animation:fade-in-up 1s ease-out}.animate-shake{animation:shake .6s ease-in-out}`}</style>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/6 to-purple-500/6 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-green-500/6 to-blue-500/6 rounded-full blur-3xl"></div>
      <div className="relative z-10 w-full max-w-5xl xl:max-w-6xl">
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 lg:p-12 xl:p-16 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 animate-fade-in-up">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl opacity-10 blur-sm"></div>
          <div className="relative z-10 space-y-8">
            <button onClick={() => setRole(null)} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-300 group"><ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" /> <span className="text-lg">Changer de rôle</span></button>
            <div className="text-center"><h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4"> Inscription - {role}</h2><div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div></div>
            {error && (<div className="animate-shake bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"><p className="text-red-600 dark:text-red-400 text-center font-medium">{error}</p></div>)}
            {success && (<div className="animate-bounce bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4"><p className="text-green-600 dark:text-green-400 text-center font-medium">{success}</p></div>)}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              <div className="group"><div className="relative"><span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" /></span><input name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleInputChange} className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg"/></div></div>
              <div className="group"><div className="relative"><span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" /></span><input name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleInputChange} className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg"/></div></div>
              <div className="group xl:col-span-1 lg:col-span-2"><div className="relative"><span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" /></span><input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white text-lg"/></div></div>
              <div className="group xl:col-span-1 lg:col-span-2"><div className="relative"><span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" /></span><input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg"/></div></div>
              <div className="group"><div className="relative"><span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" /></span><input name="profession" placeholder="Profession" value={formData.profession} onChange={handleInputChange} className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg"/></div></div>
              <div className="group"><div className="relative"><span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" /></span><input type="tel" name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleInputChange} className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg"/></div></div>
              <div className="group lg:col-span-2 xl:col-span-1"><div className="relative"><span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" /></span><input type={showPassword ? "text" : "password"} name="password" placeholder="Mot de passe" value={formData.password} onChange={handleInputChange} className="w-full pl-12 pr-14 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg"/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></div>
              <div className="group lg:col-span-2 xl:col-span-2"><div className="relative"><span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" /></span><input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirmer mot de passe" value={formData.confirmPassword} onChange={handleInputChange} className="w-full pl-12 pr-14 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white text-lg"/><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></div>
            </div>
            <div className="flex justify-center pt-4">
              <button onClick={handleRegister} disabled={isLoading} className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white font-semibold py-4 px-12 lg:px-16 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed text-lg lg:text-xl min-w-[280px]">
                <span className="relative z-10 flex items-center justify-center">{isLoading ? (<><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>Création en cours...</>) : ('Créer mon compte')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;