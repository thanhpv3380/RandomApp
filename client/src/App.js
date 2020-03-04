import React, { Component } from 'react';
import io  from 'socket.io-client';
import SelectRoom from './components/selectRoom/SelectRoom';
import Room from './components/rooms/Room';
class App extends Component {
    constructor(){
        super();
        this.state = {
            socket : io.connect('/'),
            user: false
        }
    }
    getRoom = (data) => {
        this.state.socket.emit('client-send-roomName', data);
        this.setState({
            user: true
        });
    }
    render(){
        return (
            <div className="App">
                {!this.state.user ? <SelectRoom getRoom={this.getRoom}/> : <Room socket={this.state.socket} /> }
            </div>
        );
    }
}

export default App;
