# dash-carousel

Un carrousel automatisé de dashboards pour vos écrans de supervision (NOC / SOC).
Dash Carousel se charge de se connecter automatiquement à vos applications, d’ouvrir les dashboards souhaités dans un navigateur et de les faire défiler en plein écran (mode kiosque).

✨ Fonctionnalités

🔐 Connexion automatique avec gestion des identifiants

📊 Rotation entre plusieurs dashboards dans différents onglets

🖥️ Affichage en plein écran (mode kiosque F11)

⏳ Délais configurables pour l’affichage de chaque dashboard

🧩 Support de sélecteurs personnalisés (username, password, submit, readyCheck, etc.)

⚡ Fonction de saisie robuste (safeType) pour éviter les erreurs de login

🔄 Possibilité d’ajouter des pages secondaires (extraPage, linkId)

✅ Activation/désactivation de dashboards via un simple booléen (enabled)


📦 Installation
1. Cloner le repo
git clone https://github.com/ton-compte/dash-carousel.git
cd dash-carousel

2. Installer les dépendances
npm install

3. Lancer le projet
node App.js
