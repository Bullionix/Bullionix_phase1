import React, { useState, useEffect } from "react";
import { useStateValue } from "../State/globalState";
import { authUserPayload, handleLogout } from "../aws-helpers";
import NextStyledButton from "../components/NextStyledButton";
import { themeColor } from "../css/theme";
import Router from 'next/router'
import Footer from "../components/NextStyledFooter";
import ReusableProfilePicUploader from "../components/ReusableProfilePicUploader";
import '../css/modal.css'
import NextStyledInput from "../components/NextStyledInput";
import API, { graphqlOperation } from "@aws-amplify/api"
import { updateUser } from "../src/graphql/mutations";
import { UserObject } from "../types";

interface SettingsPageProps {

}

const SettingsPage = (props: SettingsPageProps) => {

    const [{ authUser, userInfo, authenticating }, dispatch] = useStateValue()

    const [newUsername, setNewUsername] = useState(userInfo ? userInfo.username ? userInfo : "" : "")

    const [newBio, setNewBio] = useState(userInfo ? userInfo.bio ? userInfo : "" : "")

    const [newETHAddress1, setNewETHAddress1] = useState(userInfo ? userInfo.ethAddress1 ? userInfo : "" : "")



    const [usernameSaving, setUsernameSaving] = useState(false)
    const [bioSaving, setBioSaving] = useState(false)
    const [eth1Saving, setEth1Saving] = useState(false)


    const [initialLoadComplete, setInitialLoadComplete] = useState(false)

    console.log('userinfo:', userInfo)

    async function logout() {
        handleLogout()
            .then((result) => {
                if (result === "success") {
                    dispatch({
                        type: 'updateAuthUser',
                        authUser: undefined
                    })
                }
            })
    }
    useEffect(() => {
        if (userInfo !== undefined && userInfo !== null && !initialLoadComplete) {
            setInitialLoadComplete(true)
            setNewUsername(userInfo.username)
            setNewBio(userInfo.bio)
            setNewETHAddress1(userInfo.ethAddress1)

            // setNewEmail(authUser.email)
            // setNewBio(bio)
            // setNewID(displayID)
            //setNewFullname(fullName)
            // setNewAmazonCodes(amazonCodes)
        }
        if (userInfo) return

    }, [userInfo])

    async function updateUsername() {

        if (disableSaveUsername()) {
            alert("Please change your username")
            return
        }


        setUsernameSaving(true)

        try {
            const payload = {
                email: userInfo.email,

                username: newUsername
            }

            const usernameMutation = await (API.graphql(graphqlOperation(updateUser, { input: payload })) as unknown) as {
                data: {
                    updateUser: UserObject
                }
            }

            if (usernameMutation.data.updateUser) {
                dispatch({
                    type: 'updateUserInfo',
                    userInfo: usernameMutation.data.updateUser
                })
            }

            setUsernameSaving(false)

            alert("Username updated successfully")


            console.log('username:', usernameMutation)
        } catch (error) {
            setUsernameSaving(false)
            console.log('error:', error)
        }




    }

    async function updateBio() {

        if (disableSaveBio()) {
            alert("Please change your bio")
            return
        }


        setBioSaving(true)

        try {
            const payload = {
                email: userInfo.email,
                bio: newBio
            }

            const usernameMutation = await (API.graphql(graphqlOperation(updateUser, { input: payload })) as unknown) as {
                data: {
                    updateUser: UserObject
                }
            }

            if (usernameMutation.data.updateUser) {
                dispatch({
                    type: 'updateUserInfo',
                    userInfo: usernameMutation.data.updateUser
                })
            }

            setBioSaving(false)

            alert("Bio updated successfully")


            console.log('username:', usernameMutation)
        } catch (error) {
            setBioSaving(false)
            console.log('error:', error)
        }




    }

    async function updateETHAddress() {

        if (disableSaveETH()) {
            alert("Please change your ETH addresss")
            return
        }


        setEth1Saving(true)

        try {
            const payload = {
                email: userInfo.email,
                ethAddress1: newETHAddress1
            }

            const usernameMutation = await (API.graphql(graphqlOperation(updateUser, { input: payload })) as unknown) as {
                data: {
                    updateUser: UserObject
                }
            }

            if (usernameMutation.data.updateUser) {
                dispatch({
                    type: 'updateUserInfo',
                    userInfo: usernameMutation.data.updateUser
                })
            }

            setEth1Saving(false)

            alert("ETH Address updated successfully")


            console.log('username:', usernameMutation)
        } catch (error) {
            setEth1Saving(false)
            console.log('error:', error)
        }




    }

    const disableSaveUsername = () => {

        if (userInfo && userInfo.username) {
            return userInfo.username === newUsername
        }
        else {
            return false
        }


    }

    const disableSaveBio = () => {

        if (userInfo && userInfo.bio) {
            return userInfo.bio === newBio
        }
        else {
            return false
        }


    }

    const disableSaveETH = () => {
        if (userInfo && userInfo.ethAddress1) {
            return userInfo.ethAddress1 === newETHAddress1
        }
        else {
            return false
        }
    }

    if (authenticating) {
        return null
    }

    else if (!authenticating && !authUser) {

        Router.replace("/")

        return null
    }



    else return (
        <div>

            {/*} <Head>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                />
            </Head>

    {*/}

            <div className="container">

                <div className="sixteen columns" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>



                    <div>
                        Signed in as {authUserPayload(authUser).email}
                    </div>

                    {userInfo &&
                        <div>
                            User info: {userInfo.username}
                        </div>
                    }


                    <NextStyledButton
                        title="Sign out"
                        defaultStyle={`
                        background:${themeColor};
                        color:white;
                        width:100px;
                        height:40px;
                        margin-top:10px;
                    `}
                        onClick={() => logout()}
                    />

                    <ReusableProfilePicUploader />


                    {/* Username Field */}
                    <NextStyledInput
                        value={newUsername}
                        buttonTitle="Save"
                        placeHolderText="Username"
                        onChangeText={(text) => setNewUsername(text)}
                        inputFieldStyles={`
                            background:white;
                            height:80px;
                           
                            border:solid 1px gray;
                        `}
                        buttonStyles={`
                            background:${themeColor};
                            color:black;
                            width:80px;
                        `}
                        buttonSubmittingTitle="Saving"
                        buttonDisabled={disableSaveUsername()}
                        buttonDisabledStyles={`
                            background:gray !important;
                            color:white !important;
                        `}
                        submitting={usernameSaving}
                        onSubmit={() => updateUsername()}
                    />

                    {/* Bio Field */}
                    <NextStyledInput
                        value={newBio}
                        buttonTitle="Save"
                        placeHolderText="Bio"
                        onChangeText={(text) => setNewBio(text)}
                        inputFieldStyles={`
                            background:white;
                            height:80px;
                           
                            border:solid 1px gray;
                        `}
                        buttonStyles={`
                            background:${themeColor};
                            color:black;
                            width:80px;
                        `}
                        buttonSubmittingTitle="Saving"
                        buttonDisabled={disableSaveBio()}
                        buttonDisabledStyles={`
                            background:gray !important;
                            color:white !important;
                        `}
                        submitting={bioSaving}
                        onSubmit={() => updateBio()}
                    />

                    {/* ETH Addresses */}

                    <div style={{ marginBottom: 30, marginTop: 30 }}>ETH Addresses</div>

                    <NextStyledInput
                        value={newETHAddress1}
                        buttonTitle="Save"
                        placeHolderText="Enter your ETH address"
                        onChangeText={(text) => setNewETHAddress1(text)}
                        inputFieldStyles={`
                            background:white;
                            height:80px;
                           
                            border:solid 1px gray;
                        `}
                        buttonStyles={`
                            background:${themeColor};
                            color:black;
                            width:80px;
                        `}
                        buttonSubmittingTitle="Saving"
                        buttonDisabled={disableSaveETH()}
                        buttonDisabledStyles={`
                            background:gray !important;
                            color:white !important;
                        `}
                        submitting={eth1Saving}
                        onSubmit={() => updateETHAddress()}
                    />

                </div>

            </div>

            <Footer />

        </div>
    );
}
export default SettingsPage;