import React from 'react';
import { LoggedInNavBar } from './loggedInHome';
import { connect } from 'react-redux';
import { uploadItemPic } from './actions';
const awsS3Url = "https://s3.amazonaws.com/inasfleamarket";


class AddNewItem extends React.Component {
    constructor() {
        super();

        this.uploadItemPic = this.uploadItemPic.bind(this);
    }

    uploadItemPic(e) {

        var userId = this.props.user.id;
        var file = e.target.files[0];

        var formData = new FormData();

        formData.append('file', file);
        formData.append('userId', userId);

        this.props.dispatch(uploadItemPic(formData));

    }

    render() {


        if(!this.props.user) {
            return null;
        }

        console.log(this.props);


        return(
            <div>
                {this.props.uploadedItemPic ?
                    <div id='item-upload-container'>
                        <img id='uploaded-item-pic' src={awsS3Url + '/' + this.props.uploadedItemPic} />
                    </div>
                    : <ItemPicUpload submit={(e) => this.uploadItemPic(e)} />}
            </div>
        );
    }
}


const mapStateToProps = function(state) {
    return {
        user: state.user,
        uploadedItemPic: state.uploadedItemPic
    }
}

export default connect(mapStateToProps)(AddNewItem);


function ItemPicUpload(props) {
    return (
        <div id='item-upload-container'>
            <div>
                <label htmlFor='item-upload-input'>
                    <img src="../images/camera.png" id='item-upload-camera' />
                </label>
                <input type="file" id="item-upload-input" onChange={props.submit} />
            </div>
            <p id='item-pic-upload-text'>Select a picture</p>
        </div>
    )
}
