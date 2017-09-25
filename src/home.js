import React from 'react';
import Welcome from './welcome';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return(
            <div id='home-container'>
                <Welcome />
            </div>
        )
    }
}
