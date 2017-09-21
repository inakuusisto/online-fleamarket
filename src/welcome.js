import React from 'react';
import Register from './register';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return(
            <div id='welcome-container'>
                <h2>Welcome to ClothesCircle!</h2>
                <p id='welcome-text'>Ready to find your next favourite piece of clothing or make more space to your wardrobe?</p>
            </div>
        )
    }

}
