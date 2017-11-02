export default function(state = {}, action) {

    if (action.type == 'RECEIVE_USER_DATA') {
        state = Object.assign({}, state, {
            user: action.user
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

    return state;
}
