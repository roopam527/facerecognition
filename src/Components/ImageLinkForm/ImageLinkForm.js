import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({OnInputChange,OnButtonSubmit}) => {
    return (
        <div className="w-50 mx-auto">
        <p className="text-center ">
        {"This magic brain will detect faces in your pictures. Get it a try."}
        </p>
        <div className="w-100" >
        <input type="text" className="p-2 w-75 text-center"  placeholder="Enter the URL here" onChange={OnInputChange}/>
        <button className=" button-bg p-2 w-25 button" onClick={OnButtonSubmit}> Detect </button>
        </div>
        </div>
    )
}

export default ImageLinkForm;