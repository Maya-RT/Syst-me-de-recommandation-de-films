import pandas as pd
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, render_template, jsonify
import os

data = pd.read_csv('reco_final.csv')
# Entraînement pour NN
# Sélectionner les colonnes numériques
X = data[["num_majorite_H/F", "num_titleType", "num_popularity", "num_vote_average", "num_vote_count","num_runtime", "num_startYear",
                 'Action', 'Adventure', 'Animation', 'Biography',
                 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy',
                 'Game-Show', 'History', 'Horror', 'Music', 'Musical', 'Mystery',
                 'News', 'Reality-TV', 'Romance', 'Sci-Fi', 'Sport', 'Talk-Show',
                 'Thriller', 'War', 'Western', "\\\\N", 'Africa', 'Asia', 'Europe',
                 'North America', 'Oceania', 'South America', "Unknown", 'cn', 'de', 'en',
                 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'ru', 'zh']]
# Remplir les valeurs manquantes par 0 ou une valeur pertinente
X = X.fillna(0)
# Standardisation
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
# Créer un modèle de voisins les plus proches
model_NN = NearestNeighbors(n_neighbors=1000, algorithm='auto').fit(X_scaled)


def film_nn(movie):
    movie = movie.lower()  # Convertir le titre en minuscules
    df_1000_films = {}
    # Vérifier si le titre est dans la colonne 'opt_cat_original_title'
    if movie in data['titre_francais'].values:
        try:
            # Trouver l'index du film
            film_index = data[data['titre_francais'] == movie].index[0]
            # Trouver les voisins les plus proches avec le modèle Nearest Neighbors
            distances, indices = model_NN.kneighbors([X_scaled[film_index]])
            # Stocker les voisins proches dans un dictionnaire
            for distance, index in zip(distances[0], indices[0]):
                # if index != film_index:  # Ignorer le film lui-même
                df_1000_films[data['titre_francais'].iloc[index]] = distance
            # Convertir le dictionnaire en DataFrame
            df_1000_films = pd.DataFrame.from_dict(df_1000_films, orient='index', columns=['Distance'])
            df_1000_films.reset_index(inplace=True)
            df_1000_films.rename(columns={'index': 'Film'}, inplace=True)
            # Ajouter des colonnes supplémentaires à partir de df_nn_cosine2
            
            df_1000_films = pd.merge(
                df_1000_films,
                data,
                how="left",
                left_on="Film",
                right_on="titre_francais")

            # Calculer la Cosine Similarity sur la colonne 'param_cosine'
            vectorizer = TfidfVectorizer(stop_words="english")
            tfidf_matrix = vectorizer.fit_transform(df_1000_films['param_cosine'])
            similarity = cosine_similarity(tfidf_matrix)

            # Identifier les films les plus similaires à partir de la Cosine Similarity
            movie_index = df_1000_films[df_1000_films['titre_francais'] == movie].index[0]
            similarity_scores = list(enumerate(similarity[movie_index]))
            similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

            # Exclure le film d'origine et sélectionner les 5 films les plus proches
            similar_movies = [
                df_1000_films['titre_francais'].iloc[i[0]]
                for i in similarity_scores[1:9]
            ]

            return similar_movies
        except Exception as e:
            print(f"\nErreur lors de la recherche des voisins : {str(e)}")
            return None
    else:
        print(f"\nErreur : '{movie}' n'existe pas dans la base de données.")
        return None



def getAllMovies():
    data = pd.read_csv('reco_final.csv')
    return list(data['titre_francais'].str.capitalize())

app = Flask(__name__, static_folder=os.path.join('Frontend', 'dist'), static_url_path='/')
CORS(app)

@app.route('/api/movies', methods=['GET'])
@cross_origin()
def movies():
    # returns all the movies in the dataset
    movies = getAllMovies()
    result = {'arr': movies}
    return jsonify(result)


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/similarity/<name>')
@cross_origin()
def similarity(name):
    movie = name
    recommendations = film_nn(movie)
    if type(recommendations) == type('string'):
        resultArray = recommendations.split('---')
        apiResult = {'movies': resultArray}
        return jsonify(apiResult)
    else:
        movieString = '---'.join(recommendations)
        resultArray = movieString.split('---')
        apiResult = {'movies': resultArray}
        return jsonify(apiResult)


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
