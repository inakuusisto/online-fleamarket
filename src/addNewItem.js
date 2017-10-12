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
                <ItemPicUpload />
            </div>
        );
    }
}


function ItemPicUpload(props) {
    return (
        <div id='item-upload-container'>
            <div>
                <label htmlFor='item-upload-input'><img src="../images/camera.png" id='item-upload-camera' /></label>
                <input type="file" id="item-upload-input" />
            </div>
            <p>Select a picture</p>
        </div>
    )
}
