import React, { useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";

import { getUser, byUsername } from '../src/graphql/queries'
import { useStateValue } from "../State/globalState";
import API, { graphqlOperation } from "@aws-amplify/api"
import { UserObject } from "../types";

interface AWSAuthProps {
    children: any
}

const AWSAuth = (props: AWSAuthProps) => {

    //Keys https://aws-amplify.github.io/docs/cli-toolchain/graphql
    //https://janhesters.com/sorting-queries-with-aws-amplifys-key-directive/

    const [{ authUser }, dispatch] = useStateValue()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    //  const [authenticated, setAuthenticated] = useState(false);

    //Docs https://aws-amplify.github.io/docs/js/authentication#sign-up


    useEffect(() => {
        loadUser()
    }, [])


    async function loadUser() {

        try {
            const authUser = await Auth.currentAuthenticatedUser();

            const userInfo = await (API.graphql(graphqlOperation(getUser, { email: authUser.attributes.email })) as unknown) as {
                data: {
                    getUser: UserObject
                }
            }

            console.log('User info:', userInfo.data.getUser)


            dispatch({
                type: 'updateAuthUser',
                authUser: authUser
            })
            dispatch({
                type: 'updateAuthenticating',
                authenticating: false
            })

            dispatch({
                type: 'updateUserInfo',
                userInfo: userInfo.data.getUser
            })



            console.log('is authenticated')
        }


        catch (e) {

            dispatch({
                type: 'updateAuthenticating',
                authenticating: false
            })


            if (e !== 'No current user') {
                // alert(e);
            }
        }



    }

    return props.children
}
export default AWSAuth;