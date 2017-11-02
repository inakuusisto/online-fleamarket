import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
    }


    handleSubmit(e) {

        e.preventDefault();

        axios.post('/login', {
            email: this.state.email,
            password: this.state.password
        }).then(({data}) => {
            if(data.success) {
                location.replace('/')
            } else {
                this.setState({
                    error: true
                })
            }
        }).catch((err) => {
            this.setState({
                error: true
            })
        })

    }

    render() {

        return (
            <div id='login-container'>
                {this.state.error && <p className="error-message">Oops, something went wrong. Please try again!</p>}
                <form onSubmit={this.handleSubmit}>
                    <input className='reg-input' type='text' name='email' placeholder='email' onChange={this.handleInputChange} /><br />
                    <input className='reg-input' type='password' name='password' placeholder='Password' onChange={this.handleInputChange} /><br />
                    <input className='reg-button' type='submit' value='Login' />
                </form>
            </div>
        );
    }
}
