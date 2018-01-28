export default function(state = {}, action) {

    if (action.type == 'RECEIVE_USER_DATA') {
        state = Object.assign({}, state, {
            user: action.user
        });
    }
    if (action.type == 'RECEIVE_FEED_ITEMS') {
        state = Object.assign({}, state, {
            feedItems: action.feedItems
        });
    }
    if (action.type == 'SHOW_PROFILE_PIC_UPLOADER') {
        state = Object.assign({}, state, {
            profilePicUploadVisible: true
        });
    }
    if (action.type == 'HIDE_PROFILE_PIC_UPLOADER') {
        state = Object.assign({}, state, {
            profilePicUploadVisible: false
        });
    }
    if (action.type == 'UPDATE_PROFILE_PIC') {
        const user = Object.assign({}, state.user, {
            image: action.profilePic
        });
        state = Object.assign({}, state, {
            profilePicUploadVisible: false
        });
        return Object.assign({}, state, { user });
    }
    if (action.type == 'UPLOAD_NEW_ITEM') {
        state = Object.assign({}, state, {
            showThankYouMessage: true
        });
    }
    if (action.type == 'HIDE_THANK_YOU_MESSAGE') {
        state = Object.assign({}, state, {
            showThankYouMessage: false
        });
    }
    if (action.type == 'RECEIVE_OWN_ITEMS_DATA') {
        state = Object.assign({}, state, {
            ownItems: action.ownItems.reverse()
        });
    }
    if (action.type == 'SHOW_DELETE_CONFIRMATION') {
        state = Object.assign({}, state, {
            deleteConfirmationVisible: true,
            itemToDelete: action.itemToDelete
        });
    }
    if (action.type == 'CLOSE_MODAL') {
        state = Object.assign({}, state, {
            deleteConfirmationVisible: false
        });
    }
    if (action.type == 'DELETE_ITEM') {
        state = Object.assign({}, state, {
            deleteConfirmationVisible: false,
            ownItems: state.ownItems.filter(item => item.id != action.itemId)
        });
    }
    return state;
}
