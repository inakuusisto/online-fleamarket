import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        })
    }


    handleSubmit(e) {

        e.preventDefault();

        axios.post('/register', {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
        }).then(({data}) => {
            if(data.success) {
                location.replace('/');
            } else {
                this.setState({
                    error: true
                });
            }
        }).catch(() => {
            this.setState({
                error: true
            });
        })

    }


    render() {

        return (
            <div id='reg-container'>
                {this.state.error && <p className="error-message">Oops, something went wrong. Please try again!</p>}
                <form onSubmit={this.handleSubmit}>
                    <input className='reg-input' type='text' name='userName' placeholder='Username' value={this.state.userName} onChange={this.handleInputChange} /><br />
                    <input className='reg-input' type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.handleInputChange} /><br />
                    <input className='reg-input' type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleInputChange} /><br />
                    <input className='reg-button' type='submit' value='Submit' />
                </form>
                <p>If you already have an account, please <Link to='/login'>Login</Link></p>
            </div>
        )
    }
}
