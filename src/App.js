import React from 'react';
import './App.css';
import io from 'socket.io-client'
import {Events} from './general/general';
import Popup from "./components/popup/Popup";


class App extends React.Component {
    constructor(props) {
        super(props);

        const isDevelopment = process.env.NODE_ENV === 'development';
        const hostname = isDevelopment ? `localhost:${process.env.REACT_APP_DEV_BACKEND_PORT}` : '';
        const socket = io.connect(hostname);

        const name = localStorage.getItem('name', 1);

        this.state = {
            name,
            socket,
            text: '',
            messages: [],
            showPopup: !name,
        };

        if (name)
            this.state.socket.emit(Events.setname, {name});

        this.listenSocket(socket);
    }

    onChooseName = (name) => {
        this.setState({
            showPopup: false,
            name
        }, () => {
            localStorage.setItem('name', name);
            this.setState({name})
            this.state.socket.emit(Events.setname, {name});
        })
    };

    listenSocket = (socket) => {
        socket.on(Events.chat_message, this.addMessage);

    };

    addMessage = (message) => {
        this.setState(state => ({messages: [...state.messages, message]}));
        console.log(message);
    };

    onChange = (e) => {
        this.setState({
            text: e.target.value
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text)
            this.onMessage(this.state.text);

        this.setState({text: ''});
    };

    onMessage = text => {
        this.state.socket.emit(Events.chat_message, text);
    };

    render() {
        const form = (
            <React.Fragment>

                <div className={'username'}>{this.state.name}</div>

                {this.state.messages.map(({id, text, author, me}) => {
                    return (
                        <div className={'message' + (me ? ' message_my' : '')} key={id}>
                            <div className="message__author">
                                {me ? 'me': author}
                            </div>
                            <div className="message__text">
                                {text}
                            </div>
                        </div>
                    )
                })}

                <form className="chat__create-msg" onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="chat__input"
                        value={this.state.text}
                        onChange={this.onChange}
                        placeholder={'Введите сообщение'}
                    />

                    <button>Отправить</button>
                </form>
            </React.Fragment>
        );

        return (
            <React.Fragment>
                {this.state.showPopup ? <Popup onChooseName={this.onChooseName}></Popup> : form}
            </React.Fragment>
        )
    }
}

export default App;
