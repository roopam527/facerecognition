import React from "react";
import "./FaceRecognition.css";
import Image from "./Image";
const  FaceRecognition = ({ imageUrl ,box}) => {

    return (
        <div className="d-flex justify-content-center align-items-center position-relative">
       <div className="position-relative">
       
         <Image imageUrl={imageUrl}/>
         {(box.length)?
            box.map((cur,i)=>
           <div key={i} className="bounding-box" style={{top :box[i].topRow , right: box[i].rightCol ,bottom:box[i].bottomRow,left:box[i].leftCol}}></div>):<div></div>
        }  </div>   </div>
    )
}

export default  FaceRecognition;