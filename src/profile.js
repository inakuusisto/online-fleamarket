import React from 'react';
import { LoggedInNavBar } from './loggedInHome';
import axios from 'axios';
const awsS3Url = "https://s3.amazonaws.com/inasfleamarket";

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
                userId: data.id,
                profilePicUrl: data.image ? awsS3Url + '/' + data.image : '../images/profile.png'
            })
        })
    }


    showUploader() {
        this.setState({uploadVisible: true})
    }


    submit(e) {

        // console.log(this.state.userId);
        // console.log(e.target.files[0]);

        var userId = this.state.userId;
        var file = e.target.files[0];

        var formData = new FormData();

        formData.append('file', file);
        formData.append('userId', userId);

        axios({
            method: 'post',
            url: '/upload',
            data: formData
        }).then(({data}) => {
            // console.log(data.fileName);
            if(data.success) {
                this.setState({
                    uploadVisible: false,
                    profilePicUrl: awsS3Url + '/' + data.fileName
                })
            }
        }).catch(function(err) {
            console.log(err);
        })
    };


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
