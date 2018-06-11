import React from "react";
import "./Rank.css"
const  Rank= ({name,entries}) => {
    return (
        <div className="rank m-4 mt-0 text-center ">
            <div className="rank__text display-4">
                {`${name} your current Entries are...  `}
            </div>
            <div className="rank__num display-3">
                {entries}
            </div>
        </div>

    )
}

export default Rank;
