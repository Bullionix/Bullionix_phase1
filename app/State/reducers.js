export const reducer = (state, action) => {

    switch (action.type) {

        case 'updateAuthUser':
            return {
                ...state,
                authUser: action.authUser
            }

        case 'updateAuthenticating':
            return {
                ...state,
                authenticating: action.authenticating
            }

        case 'updateUserInfo':
            return {
                ...state,
                userInfo: action.userInfo
            }

        default:
            return state;
    }
};