import React, { Component } from 'react';
import ListRandom from './ListRandom';
export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            rooms: [],
            showButton: false,
        }
    }
    handleChange = (e) => {
        if (e.target.name === 'pass') {
            this.props.socket.emit('client-send-pass', e.target.value);
            this.props.socket.on('server-send-pass', (data) => {
                this.setState({ showButton: data })
            });
        }
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleClick = (e) => {
        e.preventDefault();
        let { name, phone, email } = this.state;
        let data = { name, phone, email };
        this.props.socket.emit('client-send-info', data);
        this.setState({
            name: '',
            phone: '',
            email: ''
        });
    }
    componentDidMount() {
        this.props.socket.on('server-send-initData', (rooms) => {
            this.setState({
                rooms
            });
        });
        this.props.socket.on('server-send-data', (data) => {
            let { rooms } = this.state;
            rooms.push(data);
            this.setState({
                rooms
            });
        });

    }
    render() {
        return (
            <div className="container">
                <div className='container d-flex mt-5 '>
                    <form className='mr-5'>
                        <div className="form-group form-inline">
                            <label className='mr-1'>Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}

                            />

                        </div>
                        <div className="form-group form-inline">
                            <label className='mr-1'>Email: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />

                        </div>
                        <div className="form-group form-inline">
                            <label className='mr-1'>Phone: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleChange}
                            />

                        </div>

                        <button type="submit" className="btn btn-black" onClick={this.handleClick}>Enter</button>
                        <div className="form-group form-inline mt-5">
                            <label className='mr-1'>Pass: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="pass"
                                name="pass"
                                value={this.state.pass}
                                onChange={this.handleChange}
                            />

                        </div>
                    </form>
                    <table className="table table-light">
                        <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.rooms.map((room, index) => {
                                    return (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{room.name}</td>
                                            <td>{room.email}</td>
                                            <td>{room.phone}</td>

                                        </tr>
                                    );
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <hr />
                <ListRandom socket={this.props.socket} showButton = {this.state.showButton} />
            </div>

        );
    }
}