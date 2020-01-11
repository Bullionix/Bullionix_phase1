import React, { useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";
import NextStyledInput from "../components/NextStyledInput";
import NextStyledButton from "../components/NextStyledButton";
import { useStateValue } from "../State/globalState";
import { themeColor } from "../css/theme";
import { authUserPayload, handleLogout } from "../aws-helpers";
import Router from "next/router";
import { createUser, } from '../src/graphql/mutations'
import { getUser } from '../src/graphql/queries'
//import { API, graphqlOperation } from "aws-amplify"

import API, { graphqlOperation } from "@aws-amplify/api"
import { UserObject } from "../types";

interface AuthPageProps {

}

type AuthType = "login" | "signup" | "verifyCode"

const AuthPage = (props: AuthPageProps) => {

    const [{ authUser, authenticating }, dispatch] = useStateValue()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")

    const [authType, setAuthType] = useState<AuthType>("login")
    const [submitting, setSubmitting] = useState(false)

    async function createNewUser(authUser) {

        const queryResult = await (API.graphql(graphqlOperation(getUser, { email: authUser.attributes.email })) as unknown) as {
            data: {
                getUser: UserObject
            }
        }

        console.log('GET USER RESULT:', queryResult)

        if (queryResult.data.getUser) {

            dispatch({
                type: 'updateUserInfo',
                userInfo: queryResult.data.getUser
            })

            console.log('dont need to add')
        }
        else {
            console.log('add new user')

            const payload = {

                uid: authUser.username,
                email: authUser.attributes.email,

            }

            console.log('payload:', payload)

            //  const newUserResult = await API.graphql(graphqlOperation(createUser, {
            //      input: payload
            //  }))

            try {
                const newUserResult = await (API.graphql(graphqlOperation(createUser, { input: payload })) as unknown) as {
                    data: any
                }
                console.log('new user result', newUserResult.data)
            } catch (error) {
                alert(error.data)
                console.log('error:', error)
            }




        }



        console.log('result:', queryResult)

        //check if user exists, if not create



    }

    async function handleLogin() {

        setSubmitting(true)

        try {
            const userSession = await Auth.signIn(email, password);

            console.log('user session:', userSession)

            dispatch({
                type: 'updateAuthUser',
                authUser: userSession
            })
            setSubmitting(false)
            alert("Logged in ");

            //Add new user if doesn't exist

            createNewUser(userSession)

            Router.replace("/")


        } catch (e) {
            setSubmitting(false)
            alert(e.message);

        }
    }
    async function handleSignup() {

        setSubmitting(true)

        try {
            await Auth.signUp(email, password);

            setAuthType("verifyCode")


            // Router.replace("/")

        } catch (e) {
            setSubmitting(false)
            alert(e.message);

        }
    }


    async function handleSubmitCode() {

        try {

            const userSession = await Auth.confirmSignUp(email, code)

            alert("Code verified. Please login")

            if (userSession === "SUCCESS") {
                setAuthType("login")
            }

            setSubmitting(false)

        } catch (error) {
            alert(error)
            setSubmitting(false)
        }






    }

    function _renderTitle() {
        if (authenticating) return "Please wait ..."
        else if (authUser) return "Signed in"
        else if (!authUser && authType === "login") return "Login"
        else if (!authUser && authType === "signup") return "Sign Up"
    }

    if (authenticating) return <div></div>

    else if (!authenticating && !authUser) return (
        <div className="container">

            <div className="sixteen columns" style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {_renderTitle()}
            </div>

            <div className="sixteen columns">

                <NextStyledInput
                    value={email}
                    placeHolderText="Email"
                    inputFieldStyles={`
                    background:whitesmoke;
                    height:60px;
                    `}
                    onChangeText={(text) => setEmail(text)}

                />

                <NextStyledInput
                    value={password}
                    inputType="password"
                    placeHolderText="Password"
                    inputFieldStyles={`
                    background:whitesmoke;
                    height:60px;
                    `}
                    onChangeText={(text) => setPassword(text)}

                />

                <NextStyledButton
                    title={authType === "login" ? "Log In" : "Sign Up"}
                    submitting={submitting}
                    submittingTitle="Loading..."
                    onClick={() => {

                        if (authType === "login") {
                            handleLogin()
                        }
                        else if (authType === "signup") {
                            handleSignup()
                        }

                    }}
                    defaultStyle={`
                        background:${themeColor};
                        color:white;
                        margin-top:10px;
                        width:100px;
                        height:40px;
                `}
                />

                {authType === "verifyCode" &&
                    <div>
                        <NextStyledInput
                            value={code}
                            placeHolderText="Code"
                            inputFieldStyles={`
                  background:whitesmoke;
                  `}
                            onChangeText={(text) => setCode(text)}

                        />

                        <NextStyledButton
                            title="Submit"
                            onClick={() => handleSubmitCode()}
                            defaultStyle={`
                                background:${themeColor};
                                color:white;
                            `}
                        />
                    </div>
                }


                {authType === "login" &&
                    <div style={{ marginTop: 10 }}>
                        <span>Don't have an account?</span>
                        <span><button onClick={() => setAuthType("signup")}>Sign Up</button></span>
                    </div>
                }

                {authType === "signup" &&
                    <div style={{ marginTop: 10 }}>
                        <span>Log in to your account</span>
                        <span><button onClick={() => setAuthType("login")}>Log in</button></span>
                    </div>
                }


            </div>

        </div>
    );

    else {
        return <div className="container">

            <div className="sixteen columns">
                <div>Signed in as {authUser ? authUserPayload(authUser).email : undefined}</div>

                <button onClick={() => {
                    handleLogout()
                        .then((result) => {
                            if (result === "success") {
                                dispatch({
                                    type: 'updateAuthUser',
                                    authUser: undefined
                                })
                            }
                        })


                }}>Log out</button>
            </div>
        </div>

    }
}
export default AuthPage;