export const StatusLoginSelector = state => {
    return state.user.statusLogin;
}

export const UserDataSelector = state => {
    return state.user.userData;
}

export const AuthErrorSelector = state => {
    return state.user.error;
}