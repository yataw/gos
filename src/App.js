import React from 'react';
import './App.css';
import io from 'socket.io-client'
import {Events} from './general/general';

class App extends React.Component {
    constructor(props) {
        super(props);

        const isDevelopment = process.env.NODE_ENV === 'development';
        const hostname = isDevelopment ? `localhost:${process.env.REACT_APP_DEV_BACKEND_PORT}` : '';
        const socket = io.connect(hostname);

        this.state = {
            players: {},
            votes: {},
            answer: {},
            task: {},
            showPopup: true,
            socket,
            offline: false,
            name: '',
            messages: []
        };

        this.listenSocket(socket);
    }

    listenSocket = (socket) => {
        socket.on(Events.taskstart, ({task}) => this.setState({task}));
        socket.on(Events.taskend, ({answer, votes, players}) => this.setState({answer, votes, players}));
        socket.on(Events.getplayers, ({players}) => console.log(players) || this.setState({players}));
        socket.on(Events.chat_message, this.addMessage);
    };


    render() {
        return (
            <div>hello</div>
        )
    }
}

export default App;
