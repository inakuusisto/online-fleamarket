import React from 'react';
import { LoggedInNavBar } from './loggedInHome';
import axios from 'axios';

export default class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            profilePicUrl: ''
        }

        this.showUploader = this.showUploader.bind(this);
        this.submit = this.submit.bind(this);
        this.hidePicUpload = this.hidePicUpload.bind(this);
    }

    componentDidMount() {

        axios.get('/profile').then(({data}) => {
            this.setState({
                userName: data.username,
                profilePicUrl: data.image ? data.image : '../images/profile.png'
            })
        })
    }


    showUploader() {
        this.setState({uploadVisible: true})
    }


    submit() {
        alert('submit');
    }

    hidePicUpload() {
        this.setState({uploadVisible: false})
    }

    render() {

        return(
            <div id='profile-container'>
                <LoggedInNavBar />
                <img id='profile-big-img' src={this.state.profilePicUrl} alt={this.state.userName} onClick={this.showUploader} />
                <p id='profile-username'>{this.state.userName}</p>
                {this.state.uploadVisible && <ProfilePicUpload submit={this.submit} hidePicUpload={this.hidePicUpload} />}
            </div>
        )
    }
}


function ProfilePicUpload(props) {
    return (
        <div id='profile-pic-upload-container'>
            <p id='hide-pic-upload' onClick={props.hidePicUpload}>X</p>
            <p id='profile-pic-upload-text'>Change your profile picture</p>
            <div id="pic-file-upload">
                <span>Upload</span>
                <input type="file" id="pic-upload-button" onChange={props.submit} />
            </div>
        </div>
    )
}
