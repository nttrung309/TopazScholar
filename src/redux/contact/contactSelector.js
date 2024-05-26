export const MessageDataSelector = state => {
    return state.contact.msgData;
}

export const ContactDataSelector = state => {
    return state.contact.contactData;
}

export const SelectedContactIDDataSelector = state => {
    return state.contact.selectedContactID;
}

export const AllContactDataSelector = state => {
    return state.contact.allContactData;
}

// export const UserDataSelector = state => {
//     return state.user.userData;
// }

// export const AuthErrorSelector = state => {
//     return state.user.error;
// }

// export const AuthDataLoadingStateSelector = state => {
//     return state.user.dataLoadingState;
// }

// export const AuthRoleSelector = state => {
//     return state.user.userData?.role;
// }