import React, { Component } from 'react';
export default class ListRandom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: '',
            amount: '',
            rooms: [],
            showButton: false,
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleClick = (e) => {
        e.preventDefault();
        let { start, end, amount } = this.state;
        let data = { start, end, amount };
        this.props.socket.emit('client-send-infoRandom', data);
    }
    componentDidMount(){
        this.props.socket.on('server-send-infoRandom', (data) => {
            this.setState({
                rooms : data
            });
        })
    }
    render() {
        return (
            <div>
                <h1 className='text-success d-block'> List Random</h1>
                { 
                    this.props.showButton ?    
                        <div className="d-flex m-2">
                            <form className="form-inline" action="/action_page.php">
                                <label>Start: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter start" 
                                    name="start"
                                    value={this.state.start}
                                    onChange={this.handleChange}
                                />
                                <label className= 'ml-2'>End: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter End"
                                    name="end"
                                    value={this.state.end}
                                    onChange={this.handleChange}  
                                />
                                <label className= 'ml-2'>Amount: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter amount" 
                                    name="amount"
                                    value={this.state.amount}
                                    onChange={this.handleChange}
                                />
                                <button type="submit" className="btn btn-primary ml-2" onClick={this.handleClick}>Submit</button>
                            </form>
                        </div>
                        : 
                        ''
                }
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


        );
    }
}