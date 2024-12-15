import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Components/styles/SearchResultsStyles.css";
import MovieCard from "./Components/MovieCard";
import NavBar from "./Components/NavBar";
import ReactPlayer from "react-player";

const SearchResult = () => {
    const params = useParams();
    const apiKey = "api_key=7212cc714eacf62263334b404a1fc587";
    const inputValue = params.id; // retrieving the searched movie name
    const [searchedMovie, setSearchedMovie] = useState({});
    const [recommendedMovies, setRecommendedMovies] = useState([{}]);
    const [director, setDirector] = useState("");
    const [castMembers, setCastMembers] = useState([{}]);
    const [genreList, setGenreList] = useState([{}]);
    const [currGenre, setCurrGenre] = useState([{}]);
    const [videoData, setVideoData] = useState([]);
    const [playTrailer, setPlayTrailer] = useState(0);
    const gotCast = (castData) => {
        setCastMembers([]);

        let counter = 3;
        for (let cast of castData) {
            setCastMembers((castMembers) => [...castMembers, cast]);
            counter--;
            if (counter === 0) break;
        }
    };
    const gotVideo = (data) => {
        if (data.videos && data.videos.results) {
            // Cherche une vidéo avec la langue française
            const frenchTrailer = data.videos.results.find(
                (vid) => vid.language === "fr" && vid.name === "Official Trailer"
            );
    
            // Si une bande-annonce en français existe, utilise-la
            setVideoData(frenchTrailer ? frenchTrailer : data.videos.results[0]);
        }
    };

    const gotRecommendedData = (apiData) => {
        setRecommendedMovies([]);
        let counter = 16;
        // getting data for each of the recommened movies
        for (let movie of apiData.movies) {
            fetch(
                `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${movie}&language=fr`
            ).then((Response) =>
                Response.json().then((data) =>
                    setRecommendedMovies((recommendedMovies) => [
                        ...recommendedMovies,
                        data.results[0],
                    ])
                )
            );
            counter--;
            if (counter === 0) break;
        }
    };

    useEffect(
        () => {
            const gotTMDBData = (apiData) => {
                const realMovieData = apiData.results[0];
                setCurrGenre([]);
                setCurrGenre(realMovieData.genre_ids);

                setSearchedMovie(realMovieData);
                fetch(
                    `https://api.themoviedb.org/3/movie/${realMovieData.id}/credits?${apiKey}`
                ).then((Response) =>
                    Response.json().then((data) => {
                        gotCast(data.cast);
    
                        // Find the director in the crew
                        const director = data.crew.find(member => member.job === "Director");
                        if (director) {
                            setDirector(director.name); // Affiche le nom du réalisateur
                        }
                    })
                );

                fetch(
                    `https://api.themoviedb.org/3/movie/${realMovieData.id}?${apiKey}&append_to_response=videos&language=fr`
                ).then((Response) =>
                    Response.json().then((data) => gotVideo(data))
                );
            };
            // getting data for the searched movie from tmdb
            fetch(
                `https://api.themoviedb.org/3/search/movie?${apiKey}&query=${inputValue}&language=fr`
            ).then((Response) =>
                Response.json().then((data) => gotTMDBData(data))
            );
            // getting list of recommended movie from our flask server
            fetch(`/api/similarity/${inputValue}`).then((Response) =>
                Response.json().then((data) => gotRecommendedData(data))
            );
            // getting the list of all genres
            fetch(
                `https://api.themoviedb.org/3/genre/movie/list?${apiKey}&language=fr`
            ).then((Response) =>
                Response.json().then((data) => setGenreList(data.genres))
            );
        },
        [inputValue] /*Making api call whenever the searched movie changes */
    );

    const RenderMovies = () =>
        recommendedMovies.map((movie) => {
            if (movie) {
                return (
                    <MovieCard
                        key={movie.id + movie.original_title}
                        movie={movie}
                    />
                );
            } else {
                return null;
            }
        });
    const RenderTrailer = () => {
        return (
            <div>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoData.key}-U`}
                    playing={true}
                    width= "60%"
                    height="100%"
                    controls={true}
                    className="youtube-container"
                />
            </div>
        );
    };
    const displayGenre = () =>
        currGenre.map((movieId, ind) => {
            if (ind >= 3) return null;
            if (movieId) {
                for (let obj of genreList) {
                    if (obj.id === movieId) {
                        if (ind === 2) {
                            return <span>{obj.name}</span>;
                        } else {
                            return (
                                <span>
                                    {obj.name}
                                    {","}{" "}
                                </span>
                            );
                        }
                    }
                }
            } else {
                return null;
            }
            return null;
        });

    const imgLink = "https://image.tmdb.org/t/p/original";
    const backdropPath = "https://image.tmdb.org/t/p/w1280";

    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(22, 21, 21, 0), rgba(0, 0, 0, 1)), url(${backdropPath}${searchedMovie.backdrop_path})`,
            }}
            className="MainBackGround"
        >
            <NavBar isHome={true} />

            <div className="container trailerContainer">
                {
                    videoData && playTrailer
                        ? RenderTrailer()
                        : null /*Rendering the trailer*/
                }
                <div className="container .movie-details">
                    <div className="row ">
                        <div className="col-md-6 left-box col-md-push-6">
                            <h1 className="topTitle-Movie">
                                {searchedMovie.title}{" "}
                            </h1>

                            <p className="overviewContent">
                                {searchedMovie.overview}
                            </p>
                            
                            <div className="casting">
                                {/* Affiche le nom du réalisateur en premier */}
                                {director && (
                                    <p><b>Réalisateur:</b> {director}</p>
                                    )}
                                    <div className="actors_list">    
                                {/* Affiche les noms des acteurs */}
                                    <p>Distribution: </p>
                                    {castMembers.map((member) => {
                                        if (member) {
                                            return (
                                            <p key={member.cast_id + member.id}>
                                                {member.name}
                                            </p>
                                            );
                                        }
                                        return null;
                                    })}
                                    </div>
                            </div>

                            <div>
                                <b>Note moyenne: {" : "}</b>
                                {searchedMovie.vote_average}
                                {"/10 "}

                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div>
                                <b> Date de sortie: </b>
                                {"  "} {searchedMovie.release_date}
                            </div>
                            <div>
                                <b>Genres</b>
                                {" : "}
                                {currGenre ? displayGenre() : null}
                            </div>
                            <div>
                                <button
                                    className="trailer-bttn "
                                    onClick={() => setPlayTrailer(true)}
                                >
                                    <i className="fa-solid fa-play"></i>
                                    {" Regarder la bande d'annonce"}
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6 col-md-pull-6 text-center">
                            <img
                                className="main-img"
                                src={`https://image.tmdb.org/t/p/w500${searchedMovie.poster_path}`}
                                alt="Movie"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/*Trailer Close Button */}
            <div className={playTrailer ? "DisplayOn" : "DisplayOFF"}>
                <button
                    className="close-bttn"
                    onClick={() => setPlayTrailer(false)}
                >
                    Fermer Bande d'Annonce
                </button>
            </div>

            <div className="container-fluid recommendedMovies">
                <h2 className=" container RecommendHeading">
                    Vous pourriez être interéssé également par les films suivants :
                </h2>
                {/*Rendering the recommended movie cards */}
                <div className="container recommendedGrid">
                    {RenderMovies()}
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
