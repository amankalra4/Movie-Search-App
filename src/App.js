import React, { useState } from "react";
import "./App.css";
import Search from "./Conatiners/Search";
import homepic from "./Logos/HomePage.png";

function App() {
    const [check, setCheck] = useState(false);

    const handleChange = () => {
        setCheck((prevState) => !prevState);
        let getTrailerClass = document.getElementsByClassName("trailerButtonClass");
        if (check === true) {
            document.body.style.backgroundColor = "#fbdb89";
            document.getElementById("root").style.backgroundColor = "#fbdb89";
            document.getElementById("root").style.color = "#000000";
            for (let i = 0; i < getTrailerClass.length; i++) {
                getTrailerClass[i].style.color = "#19191b";
            }
        } else {
            // #19191b - black background
            document.body.style.backgroundColor = "#19191b";
            document.getElementById("root").style.backgroundColor = "#19191b";
            document.getElementById("root").style.color = "#efeaea";
            for (let i = 0; i < getTrailerClass.length; i++) {
                getTrailerClass[i].style.color = "#efeaea";
            }
        }
    };

    return (
        <React.Fragment>
            <div className="rootContainer">
                <div className="logoContainer">
                    <img src={homepic} alt="movie-logo" height={50} width={50} style={{ borderRadius: "10px" }} />
                    <h1 style={{ margin: "auto 8px" }}>Cinemaite</h1>
                </div>
                <div className="darkThemeContainer">
                    <label htmlFor="toggle" className="mode">
                        <strong>Dark Theme</strong>
                    </label>
                    <label className="switch" htmlFor="toggle">
                        <input name="checkbox" id="toggle" value={check} type="checkbox" onChange={handleChange} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <Search />
        </React.Fragment>
    );
}

export default App;
