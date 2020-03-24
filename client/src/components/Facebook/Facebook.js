import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
class Facebook extends Component{
    state =  {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }
    responseFacebook = (res) =>{
        console.log(res);
        this.setState({
            name: res.name,
            userID: res.userID,
            email: res.email,
            picture: res.picture.data
        });
    }
    componentClicked = () =>{
         console.log('clicked');
    }
    render(){
        let fbContent;
        if (this.state.isLoggedIn){
            fbContent = (
                <div>
                    <div><img src={this.state.picture.url} height={this.state.picture.height}/></div>
                    <div>{this.state.name}</div>
                    <div>{this.state.email}</div>
                </div>
            );
        } else {
            fbContent = (<FacebookLogin
                appId="147086596627072"
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);
        }
        return(
            <div>
                {fbContent}
            </div>
        )
    }
}
export default Facebook;