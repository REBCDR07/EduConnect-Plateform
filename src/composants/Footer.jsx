import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} <strong><em>EduConnect</em></strong> - Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;