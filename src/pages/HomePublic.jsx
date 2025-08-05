import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 
import { User, Briefcase, Zap, GraduationCap, Building, Users, BookOpen } from 'lucide-react';

const HomePublic = () => {
    const features = [
      {
            icon: <GraduationCap className="h-12 w-12 text-blue-500" />,
            title: "Pour les Étudiants",
            description: "Découvrez des écoles, inscrivez-vous à vos formations préférées et suivez vos candidatures en un clin d'œil. EduConnect vous accompagne vers votre avenir éducatif.",
            gradient: "from-blue-500 to-purple-500"
      },
      {
            icon: <Building className="h-12 w-12 text-emerald-500" />,
            title: "Pour les Directeurs",
            description: "Gérez vos écoles, suivez les inscriptions en temps réel, et explorez facilement les données de vos étudiants. Avec EduConnect, simplifiez la gestion et mettez en valeur votre établissement.",
            gradient: "from-emerald-500 to-blue-500"
      },
       {
            icon: <Users className="h-12 w-12 text-purple-500" />,
            title: "Inscription rapide et intuitive",
            description: "Remplissez un formulaire simple pour vous inscrire à votre formation préférée et suivez votre candidature en un clic.",
            gradient: "from-purple-500 to-pink-500"
      },
       {
            icon: <BookOpen className="h-12 w-12 text-amber-500" />,
            title: "Suivi des inscriptions simplifié",
            description: "Visualisez en temps réel les inscrits par école et accédez aux détails de chaque étudiant pour une gestion efficace.",
            gradient: "from-amber-500 to-orange-500"
      },
    ];

    return (
        <> 
            <Helmet>
                <title>EduConnect - Plateforme d'Inscription Scolaire Simplifiée</title>
                <meta name="description" content="Découvrez EDUCONNECT, la plateforme qui révolutionne l'inscription scolaire. Trouvez l'établissement de vos rêves, postulez en ligne et suivez vos candidatures en toute simplicité. Pour les directeurs, gérez vos inscriptions avec efficacité. Rejoignez-nous !" />
                <meta name="keywords" content="inscription en ligne, plateforme éducative, educonnect, trouver école, candidature étudiant, gestion scolaire" />
            </Helmet>

            <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">


                {/* décors de fond */}


                <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-400/6 dark:to-purple-400/6 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-64 lg:h-64 bg-gradient-to-tl from-emerald-500/8 to-blue-500/8 dark:from-emerald-400/6 dark:to-blue-400/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-500/6 to-pink-500/6 dark:from-purple-400/4 dark:to-pink-400/4 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                
                

                <div className="absolute top-0 left-0 right-0 h-px sm:h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 via-purple-500/40 via-emerald-500/40 to-transparent animate-gradient-x"></div>

                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
                    
                    {/* Hero Section */}
                    <section className="py-12 sm:py-16 lg:py-24 xl:py-32">
                        <div className="text-center max-w-7xl mx-auto">


                            {/* Logo et branding */}

                            <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-8 lg:mb-12 animate-fade-in">
                                <div className="relative group/logo">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/25 dark:shadow-blue-400/20 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:shadow-2xl">
                                        <Zap className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-white drop-shadow-sm" />
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 bg-clip-text text-transparent">
                                        EduConnect
                                    </h2>
                                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full opacity-60"></div>
                                </div>
                            </div>
                            
                            {/* Titre  pour desktop */}
                            <div className="relative mb-8 sm:mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight">
                                    <span className="block mb-2 sm:mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">Bienvenue sur</span>
                                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                        Votre Plateforme Éducative
                                    </span>
                                </h1>
                            </div>
                            
                            {/* Description */}

                            <div className="max-w-5xl mx-auto mb-12 sm:mb-16 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 leading-relaxed px-4 font-medium">
                                    Votre passerelle vers l'éducation de demain. Que vous soyez étudiant à la recherche de la formation idéale ou directeur souhaitant gérer et promouvoir votre établissement, EduConnect simplifie chaque étape de votre parcours éducatif.
                                </p>
                            </div>
                            
                            {/* Boutons d'action */}


                            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                                <Link 
                                    to="/register" 
                                    className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-4 sm:py-6 px-8 sm:px-12 rounded-2xl shadow-xl shadow-blue-500/25 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl text-lg sm:text-xl"
                                >
                                    <span className="relative z-10">Commencer l'aventure</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                </Link>
                                
                                <Link 
                                    to="/login" 
                                    className="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold py-4 sm:py-6 px-8 sm:px-12 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl text-lg sm:text-xl"
                                >
                                    <span className="relative z-10">Se connecter</span>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}


                    <section className="py-12 sm:py-16 lg:py-24">
                        <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in-up">
                            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-6 lg:mb-8">
                                <div className="relative group/icon">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/50 dark:to-blue-900/50 rounded-2xl flex items-center justify-center group-hover/icon:scale-105 transition-transform duration-300">
                                        <Users className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                                    Une plateforme, deux profils !
                                </h2>
                            </div>
                            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-400 dark:to-blue-400 mx-auto rounded-full opacity-60"></div>
                        </div>
                        
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 max-w-7xl mx-auto">
                            {features.map((feature, index) => (
                                <div 
                                    key={index} 
                                    className="group relative animate-fade-in-up"
                                    style={{ 
                                        animationDelay: `${0.8 + index * 0.15}s`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-sm transition-opacity duration-500`}></div>
                                    <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-6 sm:p-8 lg:p-10 xl:p-12 rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 text-center transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                                        {/* Icône avec meilleure proportion */}
                                        <div className="flex justify-center mb-6 sm:mb-8 transform transition-transform duration-300 group-hover:scale-110">
                                            <div className={`relative group/feature-icon p-4 sm:p-6 rounded-full bg-gradient-to-br ${feature.gradient} shadow-xl`}>
                                                <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3 sm:p-4">
                                                    {feature.icon}
                                                </div>
                                                <div className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} rounded-full blur-md opacity-0 group-hover/feature-icon:opacity-100 transition-opacity duration-500`}></div>
                                            </div>
                                        </div>
                                        
                                        {/* Titre avec meilleure hiérarchie */}
                                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent transition-all duration-300`}>
                                            {feature.title}
                                        </h3>
                                        
                                        {/* Description avec meilleure lisibilité */}
                                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
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
                
                .animate-fade-in {
                    animation: fade-in 1.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 1.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .animate-gradient-x {
                    animation: gradient-x 6s ease infinite;
                }
                
                /* Amélioration du focus pour l'accessibilité */
                a:focus, button:focus {
                    outline: 2px solid theme('colors.blue.500');
                    outline-offset: 2px;
                }
                
                /* Animation de pulse améliorée */
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
            `}</style>
        </>
    );
};

export default HomePublic;

