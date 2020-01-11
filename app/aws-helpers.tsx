import Auth from "@aws-amplify/auth";

export function authUserPayload(authUser) {
    return authUser.attributes
}

export async function handleLogout() {

    return Auth.signOut().then(() => {
        return "success"
    }).catch(e => {
        console.log(e);
        return "error"

    });

}
