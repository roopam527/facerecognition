import React from "react";
import Tilt from 'react-tilt';
import brain from "./brain.png";
const Logo = () => {
    return (
        <div className="m-0 ml-4 ">
        <Tilt className="Tilt shadow-lg d-flex justify-content-center align-items-center" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner "><img src={brain} alt="logo"/>  </div>
            </Tilt>
        </div>
    )
}

export default Logo;