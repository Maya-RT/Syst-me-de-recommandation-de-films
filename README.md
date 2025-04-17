# 🎬 Système de recommandation de films - Projet Data Analyst

## 📌 Contexte  
Ce projet a été réalisé dans le cadre de la **Wild Code School**. L’objectif était de concevoir un **système de recommandation de films** pour un client fictif, propriétaire d’un cinéma situé dans **la Creuse**, souhaitant **attirer davantage de spectateurs** en personnalisant son offre.

Nous avons travaillé en équipe pour couvrir **l’ensemble du pipeline data**, de l’analyse de marché jusqu’à la mise en ligne d’un site de recommandations, en passant par la création de dashboards interactifs et le développement d’algorithmes de machine learning.

---

## 🧠 Étude de marché & Personae  
Nous avons commencé par une **étude de marché sur le secteur du cinéma dans la Creuse**, en exploitant des données publiques de l’**INSEE**. Cette phase nous a permis de définir plusieurs **personae** (profils types de spectateurs) afin d’orienter les recommandations.

---

## 📊 Dashboard interactif (Power BI)

Nous avons conçu un tableau de bord interactif sous Power BI pour analyser le monde du cinéma à l’échelle mondiale :

### Page 1 : 🎭 Acteurs & métiers du cinéma  
- Âge moyen des acteurs et actrices  
- Acteur le plus présent par décennie  
- Métiers secondaires des acteurs
- Ainsi que d'autres KPIs  

### Page 2 : 🎞️ Films  
- Durée moyenne des films par décennie  
- Note médiane des films  
- Filtres par décennie et genre  


---

## 💻 Site de recommandation

Nous avons ensuite développé un **site web complet** avec une **interface en React** et un **backend en Flask**, qui permet de rechercher un film et de découvrir des recommandations personnalisées.

### 🔹 Fonctionnalités :
- **Landing page** immersive avec une vidéo de scènes cultes  
- **Barre de recherche** dynamique avec auto-complétion  
- **Page de résultats** avec :  
  - Détails du film sélectionné  
  - Bande-annonce via un bouton vers YouTube  
  - Liste de **8 films similaires recommandés** (avec notes TMDB)

📷 *Voir les captures d’écran ci-dessous*

---

## 🤖 Machine Learning & Algorithmes

Pour le système de recommandation, nous avons utilisé deux approches :
- **Similarité cosinus** (basée sur les vecteurs de caractéristiques des films)  
- **KNN (K-Nearest Neighbors)** pour identifier les films les plus proches selon plusieurs critères (genres, casting, notes, etc.)

Ces modèles permettent de proposer des recommandations cohérentes avec les préférences exprimées par l’utilisateur.

---

## 🛠️ Stack technique

- **Analyse de données** : Excel, Python (pandas, numpy)  
- **Data viz** : Power BI  
- **Machine Learning** : Scikit-learn  
- **Backend** : Flask  
- **Frontend** : React.js  
- **API** : TMDB (The Movie Database)

---

## 📸 Screenshots

### Landing Page  
![Landing](https://github.com/Maya-RT/Syst-me-de-recommandation-de-films/blob/master/landing_page.jpg?raw=true)

### Barre de recherche  
![Search](https://github.com/Maya-RT/Syst-me-de-recommandation-de-films/blob/master/page_acceuil1.jpg?raw=true)

### Résultats de la recherche  
![Infos](https://github.com/Maya-RT/Syst-me-de-recommandation-de-films/blob/master/infos_films.jpg?raw=true)  
![Reco](https://github.com/Maya-RT/Syst-me-de-recommandation-de-films/blob/master/films_reco.jpg?raw=true)

---

## 🙌 Auteurs  
Projet réalisé par notre groupe dans le cadre de la Wild Code School.  
*Merci à toute l’équipe pour le travail collaboratif !*

