ExamM2S1Machine_learning

A.	MEMBRE DU GROUPE :
- Harijaona IGGLIA N°20 
- Rollando IGGLIA N°21
- Fandresena IGGLIA N°7
- Ziana ESIIA N°15
- Tovomanandrafale ESIIA N°25

B.	DOCUMENTATION TECHNIQUE
scraping sur le site 👉 http://tenymalagasy.org/
Objectif :
- Extraire les fototeny et leurs dérivés (racines de mots)
- Extraire les anaran-toerana (noms de lieux)
- Les données sont ensuite structurées et exportées en fichiers CSV

1)	Technologies utilisées
- Python 3
- requests : pour envoyer des requêtes HTTP
- BeautifulSoup (bs4) : pour parser le HTML
pandas : pour manipuler les données et exporter en CSV
re (regex) : pour nettoyer les textes
urllib.parse : pour construire des URLs complètes

2)	Architecture du projet
Scripts principaux :
3.1 scraper_Fototeny.py
  	Fonction : récupérer les racines de mots et leurs dérivés.
  	Fonctionnement :
  	Connexion au site via requests
Récupération du HTML
Analyse avec BeautifulSoup
Extraction :
root_text → fototeny
deriv_texts → mots dérivés
Nettoyage des données
Export CSV
Fonctions principales :
normalize_term(text)
Supprime les espaces inutiles dans les mots
fetch_html(session, url)
Télécharge le contenu HTML d’une page
parse_rootlists_page(html, page_url, option)
Analyse les tableaux HTML
Extrait les racines et leurs dérivés
scrape_rootlists(options)
Parcourt les différentes lettres
Agrège les résultats dans un DataFrame
Sorties :
tenymalagasy_rootLists_all_letters.csv
tenymalagasy_rootLists_pairs_all_letters.csv

3.2 scraper_toerana.py
Fonction : récupérer les noms de lieux.
Fonctionnement :
Accès à /bins/geoLists
Extraction des liens contenant les lieux
Nettoyage et suppression des doublons
Export CSV
Fonctions principales :
parse_geolists_page(html, page_url, option)
Extrait les noms de lieux depuis les balises <a>
scrape_geolists(options)
Parcourt les lettres et collecte les données
Sorties :
tenymalagasy_geoLists_all_letters.csv
tenymalagasy_geoLists_toerana_only.csv
3)	Logique de scraping
4.1 Gestion des requêtes
Utilisation d’un User-Agent personnalisé
Pause (time.sleep) entre requêtes pour éviter le blocage
4.2 Filtrage des données
Sélection des liens contenant /bins/teny2/
Suppression des doublons
Nettoyage des chaînes avec regex
4.3 Structuration des données
Utilisation de pandas DataFrame
Transformation en :
format riche
format simplifié (1 ligne = 1 relation)

C.	FONCTIONNALITE IA
1. Analyse Phonotactique Symbolique
L'IA vérifie en temps réel si la structure des mots respecte les règles de construction syllabique du malgache.
•	Mécanisme : Utilisation d'expressions régulières (RegEx) pour détecter les combinaisons de consonnes interdites (ex: nb, mk, bp, sz).
•	Utilité : Identifier immédiatement des fautes de frappe ou des mots étrangers non adaptés phonétiquement.
2. Correction Orthographique (Algorithme de Levenshtein)
En cas de mot inconnu, le moteur suggère les corrections les plus probables.
•	Algorithme : Distance de Levenshtein via la bibliothèque RapidFuzz.
•	Fonctionnement : Calcule le nombre minimal de manipulations (insertion, suppression, substitution) pour transformer le mot saisi en un mot valide du dictionnaire.
•	Optimisation : Filtrage intelligent avec un seuil de distance (Score ) pour garantir la pertinence des suggestions.
3. Lemmatisation et Extraction de Racine (Fototeny)
Le moteur est capable de lier un mot dérivé ou conjugué à sa racine originale.
•	Base de connaissances : Cartographie dynamique (Mapping) issue d'un dictionnaire de paires Racine/Dérivés (plus de 18 000 entrées).
•	Utilité : Permet à l'utilisateur de comprendre la structure morphologique du mot et facilite l'analyse sémantique.
4. Reconnaissance Vocale (Speech-to-Text)
L'éditeur permet la saisie de texte par la voix, facilitant l'accessibilité et la rapidité de rédaction en langue malgache.
•	Technologie : Web Speech API (ou intégration d'un modèle de reconnaissance phonétique).
•	Fonctionnalité : Transcription instantanée de la parole en texte directement dans l'éditeur Quill.
•	Optimisation : Filtrage des bruits ambiants et gestion des pauses pour une ponctuation fluide.
5. Assistant Chatbot : Spécialiste en Conjugaison
Un agent conversationnel dédié à l'assistance morphologique pour aider l'utilisateur à conjuguer correctement les verbes malgaches.
•	Fonctionnalité principale : Génération automatique des formes verbales à partir d'une racine (fototeny).
•	Modes traités : Capacité à transformer un verbe selon les temps (Présent, Passé, Futur) et les voix (Active, Passive, Relative).
•	Logique Algorithmique : * Détection des préfixes temporels (m-, n-, h-).
o	Gestion des modifications euphoniques lors de l'ajout de suffixes.

API Rest Intégrée (Flask)
Une passerelle de communication robuste pour l'intégration multi-plateforme.
•	Technologie : Flask avec support CORS (Cross-Origin Resource Sharing).
•	Fonctionnalité : Permet au frontend (React/Port 3000) de communiquer de manière asynchrone avec le moteur Python (Port 5000) via des requêtes JSON.

📂 Structure des Fonctionnalités IA (Résumé final)
FonctionnalitéAlgorithme / TechnologieÉtatAnalyse PhonotactiqueRegex (Filtres symboliques)OpérationnelCorrection OrthographiqueDistance de Levenshtein (RapidFuzz)OpérationnelLemmatisationMapping Racine/Dérivés (Dictionnaire)OpérationnelSaisie VocaleWeb Speech APIOpérationnelChatbot ConjugaisonTraitement MorphologiqueOpérationnel
📂 Structure du Projet (Multi-Ports)
Pour faire fonctionner l'ensemble de ces modules, le projet est segmenté comme suit :
ComposantTechnologiePort par défautRôleFrontendReact.js3000Interface utilisateur, Éditeur Quill, Chatbot UIMoteur IAPython / Flask5000Analyse Levenshtein, Phonotactique, LemmatisationAssistantAPI / Services5000Logique du Chatbot et traitement des requêtes vocales
🛠️ Stack Technique
•	Langage : Python 3.x
•	Bibliothèques clés : Pandas (Gestion de données), RapidFuzz (Logique floue), Flask (API).
•	Interface : Éditeur Quill.js intégré sous React.
🚀 Guide de lancement rapide
Pour exécuter le projet complet, ouvrez deux terminaux :
1.	Terminal IA (Backend) :
cd backend
python app.py
2.	Terminal Interface (Frontend) :
cd frontend
npm start

📚 Bibliographie
Sources web
Site source des données :
http://tenymalagasy.org/
Documentation officielle :
Python : https://docs.python.org/3/
Requests : https://docs.python-requests.org/
BeautifulSoup : https://www.crummy.com/software/BeautifulSoup/bs4/doc/
Pandas : https://pandas.pydata.org/docs/





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======

