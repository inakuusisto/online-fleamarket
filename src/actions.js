import axios from 'axios';

export function receiveUserData() {
    return axios.get('/user').then( ({data}) => {
        return {
            type: 'RECEIVE_USER_DATA',
            user: data.user
        };
    });
}

export function receiveFeedItems() {
    return axios.get('/feedItems').then( ({data}) => {
        return {
            type: 'RECEIVE_FEED_ITEMS',
            feedItems: data.feedItems
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


export function uploadNewItem(formData) {
    return axios({
        method: 'post',
        url: '/uploadNewItem',
        data: formData
    }).then( ({data}) => {
        if(data.success) {
            return {
                type: 'UPLOAD_NEW_ITEM'
            };
        }
    });
}

export function hideThankYouMessage() {
    return {
        type: 'HIDE_THANK_YOU_MESSAGE'
    };
}

export function receiveOwnItemsData() {
    return axios.get('/ownItems').then( ({data}) => {
        return {
            type: 'RECEIVE_OWN_ITEMS_DATA',
            ownItems: data.ownItems
        };
    });
}

export function showDeleteConfirmation(itemToDelete) {
    return {
        type: 'SHOW_DELETE_CONFIRMATION',
        itemToDelete: itemToDelete
    };
}

export function closeModal() {
    return {
        type: 'CLOSE_MODAL'
    };
}

export function deleteItem(itemId) {
    return axios.post('/deleteItem', {itemToDelete: itemId}).then(function() {
        return {
            type: 'DELETE_ITEM',
            itemId
        };
    });
}
