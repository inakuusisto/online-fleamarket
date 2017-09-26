import React from 'react';
import { LoggedInNavBar } from './loggedInHome';


export default class AddNewItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <LoggedInNavBar />
            </div>
        );
    }
}
