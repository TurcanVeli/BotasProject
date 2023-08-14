import React from "react";

//Css
import './navbar.css'

import { Link } from "react-router-dom";


const Navbar = () => {

    return (
        <div className="navbar">

            <div className="navbar-container">

                <span className="logo">BOTAŞ</span>
                <div className="navItems">
                    <Link to="/">
                        <button Link className="navButton">HOME</button>
                    </Link>
                    <Link to='roottree'>
                        <   button className="navButton">ROOTID</button>
                    </Link>
                </div>

            </div>



        </div>
    )



}




export default Navbar