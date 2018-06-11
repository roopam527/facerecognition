import React, { Component } from 'react';
import './App.css';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Clarifai from 'clarifai';
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
const app = new Clarifai.App({
  apiKey: 'f16b1e1b62754a52aa9763fc3bada49a'
 });

const initialState = {
  input:"",
  imageUrl:"",
  box:[],
  route:"signIn",
  isSignedIn:false,
  user :{
    id:"",
    name:"",
    email:"",
    entries:0,
    joined:""
  }


}
class App extends Component {
  constructor(){
    super();
    this.state =initialState;
    this.boxesArr=[];
  }
  loadUser =(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }
  
  OnInputChange = (event) =>{
   
    this.setState({
      input:event.target.value
    });
  }

  calculateFaceLocation =(clarifai) =>{
   
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifai.left_col * width,
        topRow : clarifai.top_row *height,
        rightCol:width - (clarifai.right_col * width),
        bottomRow:height - (clarifai.bottom_row * height)
      }
    }
    displayFacebox = (newBox) =>{
     
      this.boxesArr.push(newBox)
      this.setState({box:this.boxesArr});
    }
  OnButtonSubmit =() =>{
   this.boxesArr=[];
    this.setState({imageUrl:this.state.input})
    fetch(" https://intense-hamlet-33152.herokuapp.com/imageUrl",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        input:this.state.input
      })
    })
    .then(response =>{

 return   response.json()
  })
    .then(response=>{

        if(response){
          fetch(" https://intense-hamlet-33152.herokuapp.com/image",{
            method:"put",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              id:this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
          .catch(console.log)
        }


        const resultArr=response.outputs[0].data.regions.map(cur=>{
          return cur.region_info.bounding_box;
        })
        for(let i=0;i<resultArr.length;i++){
      this.displayFacebox(this.calculateFaceLocation(resultArr[i]))
        }
     })
    .catch(err => console.log(err));
    
  
  }

  setRouteChange = (route) =>{
    if(route !== "signIn"  && route !== 'Register'){
      this.setState({
        isSignedIn:true
      })
    }else{
      this.setState(initialState)
    }
    this.setState({
      route:route
    })
  }
 
  render() {
    
  {if(this.state.route==="signIn"){
  return(  <div>
        <Login loadUser={this.loadUser} setRouteChange={this.setRouteChange}/>
      </div>
  )
  } else if(this.state.route==="Register"){
    return(
    <div>
  <Register loadUser={this.loadUser} setRouteChange={this.setRouteChange}/>
  </div>)
}
  else{
  return (
    <div className="App">
      <Navigation setRouteChange={this.setRouteChange} />
       
         <Logo />
         <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm OnInputChange={this.OnInputChange} OnButtonSubmit={this.OnButtonSubmit}/>
     <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> 
 
      </div>
  )
   } }
    
  }
}

export default App;
