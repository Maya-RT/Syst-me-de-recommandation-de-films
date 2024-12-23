import SearchBar from "./Components/SearchBar";
import NavBar from "./Components/NavBar";
import "./Components/styles/HomeStyles.css";
import { useEffect, useState } from "react";

const Home = () => {
    
    const [list, setList] = useState([]);

    useEffect(() => {
        setList([]);
        //getting the list of all movies from our flask server for our searchbar
        fetch("/api/movies").then((Response) =>
            Response.json().then((data) => setList(data.arr))
        );
    }, []);


    return (
        <div className="container-fluid">
            <div className="HomePage">
                <NavBar isHome={false} />
                <h1 className="mt-4">Le Moviegator</h1>
                <div className="HomeSearch">
                    {/*Rendering the searchbar */}
                    <SearchBar movies={list} placeholder="Chercher un film..." />
                </div>

               
            </div>
            
        </div>
    );
};

export default Home;
