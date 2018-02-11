import React from 'react';
import Register from './register';
import { Link } from 'react-router';

export default function Welcome(props) {

    return (
        <div id='welcome-container'>
            <h2>Welcome to ClothesCircle!</h2>
            <p id='welcome-text'>Ready to find your next favourite piece of clothing or make more space to your wardrobe?</p>
            <Link to='/register' id='register-link'>Register Now</Link>
        </div>
    );
}
