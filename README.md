# EDUCONNECT - Plateforme d'Inscription Scolaire

[![État du Déploiement](https://img.shields.io/vercel/deployment/rebcdr07/educonnect-sandy/main?style=for-the-badge)](https://educonnect-sandy.vercel.app/)

**Une plateforme web moderne et entièrement fonctionnelle qui digitalise et simplifie le processus d'inscription pour les étudiants et les directeurs d'établissements, construite avec React et propulsée par Google Firebase.**

## 🚀 **[Accéder à la Démo Live](https://educonnect-sandy.vercel.app/)** 🚀

<br/>

![Showcase de l'application EDUCONNECT](https://i.ibb.co/68Z0WnJ/educonnect-showcase.png)

---

## 🎯 À Propos du Projet

EDUCONNECT a été conçu pour résoudre une problématique commune : la complexité et la lenteur des inscriptions scolaires. Ce projet propose une solution centralisée, exploitant une architecture **serverless** moderne avec Firebase pour garantir scalabilité, sécurité et performances en temps réel.

L'application est une **Single-Page Application (SPA)** où le frontend React communique directement avec les services cloud de Firebase pour l'authentification, la gestion de base de données et la manipulation des données.

---

## ✅ Fonctionnalités

### Expérience Utilisateur
-   **Interface d'Accueil Dynamique :** Une page de présentation pour les visiteurs, qui se transforme en portail des écoles pour les utilisateurs connectés.
-   **Authentification Complète & Sécurisée :** Gérée par **Firebase Authentication** (Email/Mot de passe).
-   **Mode Sombre / Clair :** Thème adaptable pour le confort visuel.
-   **Design Entièrement Responsive :** Expérience utilisateur fluide sur ordinateur, tablette et mobile.

### 🎓 Pour les Étudiants
-   **Parcours d'Inscription Simplifié :** Consultation des écoles depuis **Firestore** et formulaire de candidature complet.
-   **Tableau de Bord Personnel :** Suivi en temps réel du statut de chaque candidature ("En attente", "Accepté", "Rejeté").
-   **Limites d'Inscription :** Logique métier intégrée pour empêcher de s'inscrire plus de 3 fois ou plusieurs fois à la même école.

### 💼 Pour les Directeurs
-   **Gestion d'Établissements (CRUD) :** Créez, lisez, **modifiez** et **supprimez** les profils de vos écoles dans **Firestore**.
-   **Upload d'Images Personnalisées :** La photo de chaque école est convertie en **Base64** et stockée.
-   **Tableau de Bord Centralisé :** Vue complète et en temps réel de toutes les inscriptions reçues.
-   **Système d'Approbation Interactif :** Acceptez ou rejetez les inscriptions, mettant à jour le statut dans la base de données instantanément.

---

## 🛠️ Stack Technique

-   **Framework Frontend :** [React.js](https://reactjs.org/) (avec Hooks & Context API)
-   **Outil de Build :** [Vite](https://vitejs.dev/)
-   **Styling :** [Tailwind CSS](https://tailwindcss.com/)
-   **Routage :** [React Router DOM](https://reactrouter.com/) (v6)
-   **Backend & Services :**
    -   [**Google Firebase**](https://firebase.google.com/)
        -   **Authentication :** Pour la gestion des utilisateurs.
        -   **Firestore Database :** Pour le stockage des données.
-   **Déploiement :** [Vercel](https://vercel.com/)

---

## ⚙️ Installation et Lancement Local

Pour lancer ce projet en local, vous n'avez besoin que de la partie cliente connectée à votre propre projet Firebase.

### Prérequis
-   Un compte [Google Firebase](https://console.firebase.google.com/).
-   [Node.js](https://nodejs.org/) (v18+) & npm

### Étapes d'installation

1.  **Clonez le dépôt**
    ```bash
    git clone https://github.com/REBCDR07/EduConnect-Plateform.git
    ```

2.  **Naviguez jusqu'au dossier du projet client**
    ```bash
    cd EduConnect-Plateform/client
    ```

3.  **Installez les dépendances**
    ```bash
    npm install
    ```

4.  **Configurez votre environnement Firebase**
    *   Créez un projet sur la console [Firebase](https://console.firebase.google.com/).
    *   Activez **Authentication (Email/Password)** et **Firestore Database (en mode test)**.
    *   Enregistrez une nouvelle application web pour obtenir vos clés de configuration.
    *   À la racine du dossier `client/`, créez un fichier nommé `.env`.
    *   Collez vos clés dans ce fichier en les préfixant avec `VITE_` :
        ```env
        VITE_FIREBASE_API_KEY="AIzaSy..."
        VITE_FIREBASE_AUTH_DOMAIN="VOTRE_PROJET.firebaseapp.com"
        VITE_FIREBASE_PROJECT_ID="VOTRE_PROJET_ID"
        VITE_FIREBASE_STORAGE_BUCKET="VOTRE_PROJET.appspot.com"
        VITE_FIREBASE_MESSAGING_SENDER_ID="..."
        VITE_FIREBASE_APP_ID="..."
        ```

5.  **Lancez l'application**
    ```bash
    npm run dev
    ```
    L'application sera accessible sur [http://localhost:5173](http://localhost:5173).

---

## 🌐 Dépôts et Projets Associés

Ce projet est hébergé sur GitHub et une démo live est disponible :

-   **Dépôt GitHub :** [REBCDR07/EduConnect-Plateform](https://github.com/REBCDR07/EduConnect-Plateform)
-   **Démo Live :** [EduConnect sur Vercel](https://educonnect-sandy.vercel.app/)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une *issue* ou une *pull request*.
Pour toute modification majeure, merci d'ouvrir une *issue* au préalable pour en discuter.

---
Ce projet a été un incroyable parcours d'apprentissage, couvrant le développement frontend moderne, l'intégration de services backend cloud et la mise en production.

**Auteur :** N. E. RONALD BILL HOUNNOU


