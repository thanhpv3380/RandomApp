import React, { Component } from 'react';
import './CreateRoom.css';
class CreateRoom extends Component {
    constructor(){
        super(); 
    }
    handleChange = (e) => {
        //console.log(e);
        this.setState({
            [e.target.name] : e.target.value
        });
        this.setState({
            errorName : false
        });

    }
    handleClick = (e) => {
        e.preventDefault();
        let roomName = this.state.roomName;
        if (roomName === ''){
            this.setState({
                errorName: true
            })
        }
        else {
            this.props.getRoom(roomName);
        }
    }
    render() {
        return (
            <div>
                <div className="sidenav">
                    <div className="login-main-text">
                        <h1>Random App</h1>
                        <p>Code by #Chimsedimua</p>
                    </div>
                </div>
                <div className="main">
                    <div className="col-md-6 col-sm-12">
                        <div className="login-form">
                            {
                                this.state.errorName 
                                ?
                                    <div className="alert alert-warning">
                                        Username can not empty
                                    </div>
                                :
                                    ''
                            }
                            
                            <form >
                                <div className="form-group form-inline">
                                    <input 
                                        type="text" 
                                        className="form-control form-user" 
                                        placeholder="Room Name" 
                                        name="roomName"
                                        value={this.state.roomName}
                                        onChange={this.handleChange}
                                    />
                                    <button type="submit" className="btn btn-black" onClick={this.handleClick}>Enter</button>
                                </div>
                                {/* <div className="form-group">
                                    <a href="#">+ Create Room</a>
                                </div>    */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CreateRoom;