import React from "react";

const Navigation = ({setRouteChange}) => {
    return (
        <nav className="text-right">
        <p className="p-3" onClick={()=>setRouteChange("signIn")}>Sign out</p>
        </nav>
    )
}

export default Navigation;