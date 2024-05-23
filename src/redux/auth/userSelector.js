export const StatusLoginSelector = state => {
    return state.user.statusLogin;
}

export const UserDataSelector = state => {
    return state.user.userData;
}

export const AuthErrorSelector = state => {
    return state.user.error;
}

export const AuthDataLoadingStateSelector = state => {
    return state.user.dataLoadingState;
}

export const AuthRoleSelector = state => {
    return state.user.userData?.role;
}

export const AuthUIDSelector = state => {
    return state.user.userData?.uid;
}