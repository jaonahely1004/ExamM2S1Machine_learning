
# 📝 Éditeur de Texte Intelligent pour la Langue Malgache (NLP)
**Projet de Master 2 - Semestre 1 : Machine Learning**

Ce projet consiste en la création d'un éditeur de texte assisté par une IA spécialisée dans le traitement du langage naturel (NLP) malgache. Il intègre du web scraping de données linguistiques, une correction orthographique avancée, de la reconnaissance vocale et un chatbot de conjugaison.

---

## 👥 Membres du Groupe
* **Harijaona** (IGGLIA N°20)
* **Rollando** (IGGLIA N°21)
* **Fandresena** (IGGLIA N°7)
* **Ziana** (ESIIA N°15)
* **Tovomanandrafale** (ESIIA N°25)

---

## 🛠️ Stack Technique
* **Backend :** Python 3.x, Flask (API REST)
* **Frontend :** React.js, Quill.js (Éditeur de texte)
* **Data Science & NLP :** Pandas, RapidFuzz (Levenshtein), BeautifulSoup4 (Scraping), Regex
* **Communication :** Axios / Fetch API (Port 3000 -> 5000)

---

## 🕸️ Documentation du Web Scraping
Les données sources proviennent du site [tenymalagasy.org](http://tenymalagasy.org/). L'objectif était d'extraire et de structurer le patrimoine linguistique malgache.

### 1. Collecte des Données
* **`scraper_Fototeny.py`** : Extrait les racines (*fototeny*) et leurs dérivés.
    * *Sorties :* Fichiers CSV contenant plus de 18 000 relations racine/dérivés.
* **`scraper_toerana.py`** : Récupère les noms de lieux (*anaran-toerana*) via les listes géographiques.
    * *Sorties :* Base de données des lieux de Madagascar.

### 2. Logique de Scraping
* **Gestion des requêtes :** Utilisation de `User-Agent` et `time.sleep` pour respecter la charge du serveur source.
* **Nettoyage :** Filtrage par expressions régulières pour supprimer les doublons et les caractères spéciaux.
* **Structuration :** Exportation en format CSV via **Pandas** (format riche et format par paires).

---

## 🧠 Fonctionnalités IA & NLP

### 1. Analyse Phonotactique Symbolique
Vérification en temps réel de la validité de la structure syllabique malgache via RegEx (ex: détection des combinaisons interdites comme `nb`, `mk`, `sz`).

### 2. Correction Orthographique (Levenshtein)
Calcul de la distance entre le mot saisi et le dictionnaire via l'algorithme de **Levenshtein** (Bibliothèque `RapidFuzz`). Suggestions automatiques pour les mots inconnus avec un seuil de score optimisé.

### 3. Lemmatisation (Extraction de Racine)
Liaison dynamique des mots dérivés vers leur racine (*fototeny*) grâce à une cartographie issue du scraping, permettant une meilleure compréhension morphologique.

### 4. Reconnaissance Vocale (Speech-to-Text)
Saisie textuelle par la voix utilisant la **Web Speech API**, avec une optimisation pour le filtrage des pauses et des bruits ambiants.

### 5. Assistant Chatbot : Spécialiste en Conjugaison
Agent conversationnel capable de générer les formes verbales malgaches :
* **Temps gérés :** Présent (`m-`), Passé (`n-`), Futur (`h-`).
* **Voix :** Active, Passive et Relative.
* **Euphonie :** Gestion automatique des modifications de lettres lors de l'ajout de suffixes.

---

## 🚀 Guide de Lancement Rapide

Pour exécuter le projet, vous devez lancer les deux serveurs simultanément :

### Terminal 1 : Backend (IA & API)
```bash
cd backend
python app.py
```
*Le serveur Flask démarrera sur `http://127.0.0.1:5000`*

### Terminal 2 : Frontend (Interface)
```bash
cd frontend
npm install
npm start
```
*L'interface React s'ouvrira sur `http://localhost:3000`*

---

## 📚 Bibliographie
* **Données :** [Dictionnaire Teny Malagasy](http://tenymalagasy.org/)
* **Langage :** [Python Documentation](https://docs.python.org/3/)
* **NLP :** [RapidFuzz - Distance de Levenshtein](https://maxbachmann.github.io/RapidFuzz/)
* **Parsing :** [BeautifulSoup Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)





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

