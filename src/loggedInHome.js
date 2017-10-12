import React from 'react';
import { Link } from 'react-router';

export default class LoggedInHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div>
            <LoggedInNavBar />
            </div>
        )
    }
}


export function LoggedInNavBar() {
    return (
        <div id='nav-container'>
            <h2 id='nav-header'>ClothesCircle</h2>
            <ul id='nav-ul'>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/newItem'>Add a new item</Link></li>
            </ul>
        </div>
    );
}
