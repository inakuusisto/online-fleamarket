import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div id='login-container'>
                <form>
                    <input className='reg-input' type='text' name='userName' placeholder='Username' /><br />
                    <input className='reg-input' type='password' name='password' placeholder='Password' /><br />
                    <input className='reg-button' type='submit' value='Login' />
                </form>
            </div>
        );
    }
}
