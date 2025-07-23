import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center min-h-[70vh] flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-gray-800 dark:text-white tracking-widest">404 No Found</h1>
      <div className="bg-blue-500 px-2 text-sm rounded rotate-12 absolute">
        Page non trouvée
      </div>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Désolé, la page que vous recherchez n'existe pas.</p>
      <Link 
        to="/"
        className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;