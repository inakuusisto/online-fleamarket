import React from 'react';
import { connect } from 'react-redux';
import { receiveUserData } from './actions';
import { Link } from 'react-router';


class App extends React.Component {

    componentDidMount() {
        this.props.dispatch(receiveUserData());
    }


    render() {

        if(!this.props.user) {
            return null;
        }

        // console.log(this.props.user);

        return (
            <div>
                <LoggedInNavBar />
                {this.props.children}
            </div>
        )
    }

}


const mapStateToProps = function(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(App);


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
