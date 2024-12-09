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
                <div className="HomeSearch">
                    {/*Rendering the searchbar */}
                    <SearchBar movies={list} placeholder="Cherchez un film" />
                </div>

               
            </div>
            
        </div>
    );
};

export default Home;
