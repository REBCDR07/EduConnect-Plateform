import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 
import { User, Briefcase } from 'lucide-react';

const HomePublic = () => {
    const features = [
      {
            icon: <User className="h-12 w-12 text-blue-500" />,
            title: "Pour les Étudiants",
            description: "Découvrez des écoles, inscrivez-vous à vos formations préférées et suivez vos candidatures en un clin d'œil. EduConnect vous accompagne vers votre avenir éducatif.",
      },
      {
            icon: <Briefcase className="h-12 w-12 text-green-500" />,
            title: "Pour les Directeurs",
            description: "Gérez vos écoles, suivez les inscriptions en temps réel, et explorez facilement les données de vos étudiants. Avec EduConnect, simplifiez la gestion et mettez en valeur votre établissement.",
      },
       {
            icon: <User className="h-12 w-12 text-blue-500" />,
            title: "Inscription rapide et intuitive",
            description: "Remplissez un formulaire simple pour vous inscrire à votre formation préférée et suivez votre candidature en un clic.",
      },
       {
            icon: <Briefcase className="h-12 w-12 text-green-500" />,
            title: "Suivi des inscriptions simplifié",
            description: "Visualisez en temps réel les inscrits par école et accédez aux détails de chaque étudiant pour une gestion efficace.",
      },
    ];

    return (
        <> 
            <Helmet>
                <title>EduConnect - Plateforme d'Inscription Scolaire Simplifiée</title>
                <meta name="description" content="Découvrez EDUCONNECT, la plateforme qui révolutionne l'inscription scolaire. Trouvez l'établissement de vos rêves, postulez en ligne et suivez vos candidatures en toute simplicité. Pour les directeurs, gérez vos inscriptions avec efficacité. Rejoignez-nous !" />
                <meta name="keywords" content="inscription en ligne, plateforme éducative, educonnect, trouver école, candidature étudiant, gestion scolaire" />
            </Helmet>

            <div className="min-h-screen w-full relative overflow-hidden">
                {/* Éléments de fond décoratifs optimisés */}
                <div className="fixed top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-float"></div>
                <div className="fixed bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-green-400/8 to-blue-400/8 rounded-full blur-3xl animate-float-delayed"></div>
                <div className="fixed top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/6 to-pink-400/6 rounded-full blur-2xl animate-float-slow"></div>

                {/* Container principal avec largeur maximale */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
                    
                    {/* Hero Section */}
                    <section className="py-12 sm:py-16 lg:py-24 xl:py-32">
                        <div className="text-center max-w-7xl mx-auto">
                            {/* Titre principal optimisé pour desktop */}
                            <div className="relative mb-8 sm:mb-12">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight animate-fade-in">
                                    <span className="block mb-2 sm:mb-4">Bienvenue sur</span>
                                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                                        Edu<span className="text-blue-500">Connect</span>
                                    </span>
                                </h1>
                            </div>
                            
                            {/* Description avec largeur optimisée */}
                            <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
                                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up px-4">
                                    Votre passerelle vers l'éducation de demain. Que vous soyez étudiant à la recherche de la formation idéale ou directeur souhaitant gérer et promouvoir votre établissement, EduConnect simplifie chaque étape de votre parcours éducatif.
                                </p>
                            </div>
                            
                            {/* Boutons d'action optimisés */}
                            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 animate-fade-in-up max-w-2xl mx-auto">
                                <Link 
                                    to="/register" 
                                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 text-lg sm:text-xl"
                                >
                                    <span className="relative z-10">Commencer l'aventure</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>
                                
                                <Link 
                                    to="/login" 
                                    className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg sm:text-xl"
                                >
                                    <span className="relative z-10">Se connecter</span>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Features Section avec largeur étendue */}
                    <section className="py-12 sm:py-16 lg:py-24">
                        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent animate-fade-in-up mb-6">
                                Une plateforme, deux profils
                            </h2>
                            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
                        </div>
                        
                        {/* Grid responsive optimisé pour desktop */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 max-w-7xl mx-auto">
                            {features.map((feature, index) => (
                                <div 
                                    key={index} 
                                    className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-6 sm:p-8 lg:p-10 xl:p-12 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 text-center transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:bg-white/95 dark:hover:bg-gray-800/95 animate-fade-in-up"
                                    style={{ 
                                        animationDelay: `${index * 150}ms`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    {/* Effet de bordure subtil */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
                                    
                                    <div className="relative z-10">
                                        {/* Icône avec meilleure proportion */}
                                        <div className="flex justify-center mb-6 sm:mb-8 transform transition-transform duration-300 group-hover:scale-110">
                                            <div className="p-4 sm:p-6 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 shadow-xl">
                                                {feature.icon}
                                            </div>
                                        </div>
                                        
                                        {/* Titre avec meilleure hiérarchie */}
                                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        
                                        {/* Description avec meilleure lisibilité */}
                                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    33% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    66% {
                        transform: translateY(10px) translateX(-10px);
                    }
                }
                
                @keyframes float-delayed {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    33% {
                        transform: translateY(15px) translateX(-15px);
                    }
                    66% {
                        transform: translateY(-10px) translateX(15px);
                    }
                }
                
                @keyframes float-slow {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    50% {
                        transform: translateY(-15px) translateX(15px);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out;
                }
                
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                
                .animate-float-delayed {
                    animation: float-delayed 10s ease-in-out infinite;
                    animation-delay: 2s;
                }
                
                .animate-float-slow {
                    animation: float-slow 12s ease-in-out infinite;
                    animation-delay: 4s;
                }
                
                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </>
    );
};

export default HomePublic;