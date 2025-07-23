import React from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, School } from 'lucide-react';

const HomePublic = () => {
    const features = [
        {
            icon: <User className="h-10 w-10 text-blue-500" />,
            title: "Pour les Étudiants",
            description: "Trouvez l'établissement de vos rêves, consultez les détails et inscrivez-vous en quelques clics via un formulaire simplifié.",
        },
        {
            icon: <Briefcase className="h-10 w-10 text-green-500" />,
            title: "Pour les Directeurs",
            description: "Enregistrez vos établissements en un seul endroit, vous facilitant ainsi la gestion sur d'éplacement de ses dernières.",
        },

        {
            icon: <User className="h-10 w-10 text-blue-500" />,
            title: "Pour les Étudiants",
            description: "Trouvez vos inscriptions aux écoles de votre choix dans votre tableau de bord, qui vous est réservé.",
        },

        {
            icon: <Briefcase className="h-10 w-10 text-green-500" />,
            title: "Pour les Directeurs",
            description: "Gérez les inscriptions des étudiants qui ont optés pour votre école via la plateforme en temps réel efficacement. Choisir d'accepter la demande d'inscription ou la laisser en attente. et exportez vos données facilement.",
        },

        {
            icon: <User className="h-10 w-10 text-blue-500" />,
            title: "Pour les Étudiants",
            description: "Choisissez un ou plusieurs écoles de votre choix et inscrivez vous y. Contrôler l'avancement de vos inscriptions via la fonction 'Accepté' & 'En attente' sur votre tableau de bord.",
        },
        {
            icon: <Briefcase className="h-10 w-10 text-green-500" />,
            title: "Pour les Directeurs",
            description: "Choisissez qui accepté dans votre école et exportez les données de votre tableau de bord avec la listes de vos inscrits facilement via un service de JSON.",
        },





    ];

    return (
        <div className="space-y-16">
            {/* Section de bienvenue */}
            <div className="text-center py-16">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-white">
                    Bienvenue sur <span className="text-blue-500">Edu</span><span className="text-green-500">Connect</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    La plateforme qui simplifie les inscriptions scolaires et universitaires pour tout le monde.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        to="/register"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                    >
                        Commencer l'aventure
                    </Link>
                    <Link
                        to="/login"
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-lg transition"
                    >
                        Se connecter
                    </Link>
                </div>
            </div>

            {/* Section des fonctionnalités */}
            <div>
                <h2 className="text-3xl font-bold text-center mb-10">Une plateforme, deux profils et multiples fonctionnalités !</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                            <div className="flex justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePublic