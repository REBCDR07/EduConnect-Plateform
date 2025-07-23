# EduConnect - Une Plateforme d'Inscription Universitaire

EduConnect est une interface frontend moderne pour une plateforme d'inscription universitaire, développée avec React, Vite et Tailwind CSS.

## Fonctionnalités

**Rôles Utilisateurs** : Étudiant et Directeur.
**Authentification** : Inscription et Connexion avec simulation de backend via `localStorage`.
**Tableaux de Bord** : Vues dédiées pour les étudiants et les directeurs.
**Gestion des Écoles** : Les directeurs peuvent créer, voir et gérer leurs écoles.
**Inscription des Étudiants** : Les étudiants peuvent s'inscrire aux écoles via un formulaire détaillé.
**Mode Sombre/Clair** : Thème commutable stocké dans `localStorage`.
**Upload par Glisser-Déposer** : Pour les images d'écoles.
**Export JSON** : Les directeurs peuvent exporter la liste des étudiants inscrits.

## Prérequis

[Node.js](https://nodejs.org/) (version 18.x ou supérieure)
[npm](https://www.npmjs.com/) (généralement inclus avec Node.js)

## Installation

1. **Clonez le dépôt** (ou extrayez les fichiers si vous les avez téléchargés) :

```bash
    git clone https://votre-repo/educonnect.git
    cd educonnect/client
```

2. **Installez les dépendances** :

    ```bash
    npm install
    ```

## Utilisation

1. **Lancez le serveur de développement** :

    ```bash
    npm run dev
    ```

    Cette commande démarre un serveur local (généralement sur `http://localhost:5173`).

2. **Ouvrez l'application** :

    Ouvrez votre navigateur et accédez à l'URL affichée dans le terminal.

## Build pour la Production

Pour créer une version optimisée de l'application pour le déploiement :

```bash
npm run build