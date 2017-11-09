import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { showProfilePicloader, updateProfilePic, hideProfilePicUploader, receiveOwnItemsData } from './actions';
const awsS3Url = "https://s3.amazonaws.com/inasfleamarket";

class Profile extends React.Component {
    constructor() {
        super();

        this.showProfilePicloader = this.showProfilePicloader.bind(this);
        this.hideProfilePicUploader = this.hideProfilePicUploader.bind(this);
    }


    componentDidMount() {
        this.props.dispatch(receiveOwnItemsData());
    }

    componentWillUnmount() {

        if(this.props.profilePicUploadVisible) {
            this.props.dispatch(hideProfilePicUploader());
        }
    }

    showProfilePicloader() {
        this.props.dispatch(showProfilePicloader());
    }

    hideProfilePicUploader() {
        this.props.dispatch(hideProfilePicUploader());
    }

    updateProfilePic(e) {

        var userId = this.props.user.id;
        var file = e.target.files[0];

        var formData = new FormData();

        formData.append('file', file);
        formData.append('userId', userId);

        this.props.dispatch(updateProfilePic(formData));
    }


    render() {

        if(!this.props.user || !this.props.ownItems) {
            return null;
        }

        console.log(this.props);

        const ownItems = (
            <div id='profile-items-container'>
                {this.props.ownItems.map((item) =>
                    <div className='profile-item-container'>
                        <img className='profile-item-image' src={item.image} alt={item.title} />
                        <p className='profile-item-title'>{item.title}</p>
                        <p>{item.price + ' €'}</p>
                        <p className='profile-item-description'>{item.description}</p>
                    </div>
                )}
            </div>
        )

        return(
            <div id='profile-container'>
                <img id='profile-big-img' src={awsS3Url + '/' + this.props.user.image} alt={this.props.user.username} onClick={this.showProfilePicloader} />
                <p id='profile-username'>{this.props.user.username}</p>
                {this.props.profilePicUploadVisible && <ProfilePicUpload hideProfilePicUploader={this.hideProfilePicUploader} submit={(e) => this.updateProfilePic(e)} />}
                {ownItems}
            </div>
        )
    }
}


const mapStateToProps = function(state) {
    return {
        user: state.user,
        profilePicUploadVisible: state.profilePicUploadVisible,
        ownItems: state.ownItems
    }
}

export default connect(mapStateToProps)(Profile);


function ProfilePicUpload(props) {
    return (
        <div id='profile-pic-upload-container'>
            <p id='hide-pic-upload' onClick={props.hideProfilePicUploader}>X</p>
            <p id='profile-pic-upload-text'>Change your profile picture</p>
            <div id="pic-file-upload">
                <span>Upload</span>
                <input type="file" id="pic-upload-button" onChange={props.submit} />
            </div>
        </div>
    )
}
