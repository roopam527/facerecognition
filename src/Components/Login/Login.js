import React from "react";
import brain from "../Logo/brain.png";
import "./Login.css";
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            signInEmail:"",
            signInPassword:""
        }
    }
    onEmailChange =(event) =>{
        this.setState({
            signInEmail:event.target.value
        })
    }

    onPasswordChange =(event) =>{
        this.setState({
            signInPassword:event.target.value
        })
    }

    onSubmitSignIn = (event) =>{
        fetch(" https://intense-hamlet-33152.herokuapp.com/signin",{
            method:"post",
            headers : {'Content-type' : 'application/json'},
            body:JSON.stringify({
                email:this.state.signInEmail,
                password:this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user =>{
            if(user.id){
                this.props.loadUser(user);
                this.props.setRouteChange("home");
            }else{
                console.log(user);
            }
        })
        
       
    }



    render(){
        const {setRouteChange} = this.props;
    return (
        <div className="text-center d-flex justify-content-center">
        <div className="w-sm-75 w-md-25 p-5 login-tab mt-5 shadow-lg">
            <div >
                <img className="bg-light rounded-circle p-2 shadow" src={brain} alt="logo" />
            </div>
            <div>
               <p className="card-label mt-4"> Login </p>
            </div>
            <div>
                <input 
                type="email"
                 className="input rounded p-2 w-100" 
                 placeholder="Enter your email" 
                 onChange={this.onEmailChange}
                 required 
                 />
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
                <div 
                className="button button-bg rounded p-2 bg-light  mt-4" 
                onClick={this.onSubmitSignIn}>Log In &rarr;</div>
            </div>
            <div>
                <div
                 className="button rounded p-2 bg-light mt-4" 
                 onClick={()=>{setRouteChange("Register")}}>Register &rarr;</div>
            </div>
        </div>
        </div>
    );
}
}

export default Login;