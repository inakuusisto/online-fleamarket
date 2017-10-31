import axios from 'axios';

export function receiveUserData() {
    return axios.get('/user').then( ({data}) => {
        return {
            type: 'RECEIVE_USER_DATA',
            user: data.user
        };
    });
}

export function showProfilePicloader() {
    return {
        type: 'SHOW_PROFILE_PIC_UPLOADER'
    };
}

export function hideProfilePicUploader() {
    return {
        type: 'HIDE_PROFILE_PIC_UPLOADER'
    };
}

export function updateProfilePic(formData) {
    return axios({
        method: 'post',
        url: '/updateProfilePic',
        data: formData
    }).then( ({data}) => {
        return {
            type: 'UPDATE_PROFILE_PIC',
            profilePic: data.fileName
        };
    });
}

export function uploadItemPic(formData) {
    return axios({
        method: 'post',
        url: '/uploadItemPic',
        data: formData
    }).then( ({data}) => {
        return {
            type: 'UPLOAD_ITEM_PIC',
            uploadedItemPic: data.fileName
        };
    });
}
