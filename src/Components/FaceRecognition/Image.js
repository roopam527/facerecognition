import React from "react";

const Image = ({imageUrl}) => {
    if(imageUrl !== ""){
    return (
        <div>
           <img id="inputImage" src={`${imageUrl}`} alt={"img"} width="100%" height="100%" />
        </div>
    )
}else{
    return(
    <div>
    </div>
    )
}
}

export default Image;