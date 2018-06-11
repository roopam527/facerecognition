import React from "react";
import brain from "../Logo/brain.png";
import "./Register.css";
class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            name:""
        }
    }
    onEmailChange =(event) =>{
        this.setState({
            email:event.target.value
        })
    }

    onPasswordChange =(event) =>{
        this.setState({
            password:event.target.value
        })
    }
    onNameChange =(event) =>{
        this.setState({
            name:event.target.value
        })
    }
     onSubmitSignUp = (event) =>{
        fetch(" https://intense-hamlet-33152.herokuapp.com/register",{
            method:"post",
            headers : {'Content-type' : 'application/json'},
            body:JSON.stringify({
                email:this.state.email,
                password:this.state.password,
                name:this.state.name
            })
        })
        .then(response => response.json())
        .then(user =>{
            
            if(user.id){
                this.props.loadUser(user);
                this.props.setRouteChange("home");
            }
        }).catch(console.log)
        
       
    }
render(){
  const {setRouteChange}=this.props;
    return (

        <div className="text-center d-flex justify-content-center">
        <div className="w-sm-75 w-md-25  p-5 Register-tab mt-5 shadow-lg">
            <div >
                <img className="bg-light rounded-circle p-2 shadow" src={brain} alt="logo" />
            </div>
            <div>
               <p className="card-label mt-4"> Register </p>
            </div>
            <div>
                <input
                 type="text"
                 className="input rounded p-2 w-100" 
                 placeholder="Enter your User Name"
                onChange={this.onNameChange}
                 required />
            </div>
            <div>
                <input
                 type="email"
                  className="input rounded p-2 mt-3 w-100"
                   placeholder="Enter your email"
                   onChange={this.onEmailChange}
                   required />
            </div>
            <div>
                <input
                 type="password" 
                 className="input rounded p-2 w-100 mt-3" 
                 placeholder="Enter your password" 
                 onChange={this.onPasswordChange}
                 />
            </div>
            <div>
                <div className="button button-bg rounded p-2 bg-light mt-4" onClick={()=>{this.onSubmitSignUp()}}>Register &rarr;</div>
            </div>
            <div>
                <div className="button rounded p-2 bg-light mt-4"  onClick={()=>{setRouteChange("signIn")}}>Log In &rarr;</div>
            </div>
        </div>
        </div>
    );
}
}

export default Register;