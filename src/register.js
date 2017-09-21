import React from 'react';

export default class Register extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        return (
            <div id='reg-container'>
                <form>
                    <input type='text' name='userName' placeholder='Username' />
                    <input type='email' name='email' placeholder='Email' />
                    <input type='password' name='password' placeholder='Password' />
                </form>
            </div>
        )
    }

}
