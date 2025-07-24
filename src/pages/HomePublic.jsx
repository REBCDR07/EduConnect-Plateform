import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 
import { User, Briefcase } from 'lucide-react';

const HomePublic = () => {
    const features = [
      {
            icon: <User className="h-10 w-10 text-blue-500" />,
            title: "Pour les Étudiants",
            description: "Découvrez des écoles, inscrivez-vous à vos formations préférées et suivez vos candidatures en un clin d'œil. EduConnect vous accompagne vers votre avenir éducatif.",
      },
      {
            icon: <Briefcase className="h-10 w-10 text-green-500" />,
            title: "Pour les Directeurs",
            description: "Gérez vos écoles, suivez les inscriptions en temps réel, et explorez facilement les données de vos étudiants. Avec EduConnect, simplifiez la gestion et mettez en valeur votre établissement.",
      },
       {
            icon: <User className="h-10 w-10 text-blue-500" />,
            title: "Inscription rapide et intuitive",
            description: "Remplissez un formulaire simple pour vous inscrire à votre formation préférée et suivez votre candidature en un clic.",
      },
       {
            icon: <Briefcase className="h-10 w-10 text-green-500" />,
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

            <div className="space-y-16">
                <div className="text-center py-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-white">
                        Bienvenue sur <span className="text-blue-500">Edu</span><span className="text-green-500">Connect</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Votre passerelle vers l'éducation de demain. Que vous soyez étudiant à la recherche de la formation idéale ou directeur souhaitant gérer et promouvoir votre établissement, EduConnect simplifie chaque étape de votre parcours éducatif.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                            Commencer l'aventure
                        </Link>
                        <Link to="/login" className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg">
                            Se connecter
                        </Link>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-center mb-10">Une plateforme, deux profils</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                                <div className="flex justify-center mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePublic;