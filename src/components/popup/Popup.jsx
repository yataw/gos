import React from 'react';

class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
    }

    componentDidMount() {
        const trigger = document.getElementById('popup-trigger');

        setTimeout(() => {
            trigger.click();
            window.history.replaceState(null, null, ' ');
        }, 0);
    }

    onChange = (e) => {
        const text = e.target.value;

        if (text.length <= 20)
            this.setState({text});
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text)
            this.props.onChooseName(this.state.text);

        this.setState({text: ''});
    };

    render() {
        return (
            <div className="popup" id="popup">
                <div className="popup__content">
                    <form action="#" className="form" onSubmit={this.onSubmit}>
                        <h3 className='u-margin-bottom-medium'>Введите ваше имя</h3>
                        <div className="form__group">
                            <div className="form__input-cont">
                                <input type="text" className="form__input" placeholder="Your name" id="name"
                                       required
                                       autoComplete="off"
                                       value={this.state.text}
                                       onChange={this.onChange}
                                       autoFocus
                                />
                                <button onClick={this.onSubmit}>Выбрать</button>
                            </div>
                            <label htmlFor="name" className="form__label">Max 20 characters</label>
                        </div>
                    </form>
                </div>
                <a href="#popup" style={{display: 'none'}} id='popup-trigger'></a>
            </div>
        )
    }
}

export default Popup;