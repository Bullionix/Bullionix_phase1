import React, { useState } from 'react'
//import Icon from 'react-icons-kit'
//import { user } from 'react-icons-kit/fa/user'
//import { updateUserProfilePicture } from '../../Queries/writes';

//import CachingImage from '../CachingImage/CachingImage';
//import SelectProfilePictureModal from '../Modals/SelectProfilePictureModal'
//import loadFirebase from '../../firebase';
//import { themeColor, darkThemeColor } from '../../Styles/theme';
import { useStateValue } from '../State/globalState';
import { darkThemeColor, themeColor } from '../css/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SelectProfilePictureModal from '../components/SelectProfilePictureModal'


const ReusableProfilePicUploader = () => {

    const [{ authUser, profilePic, displayID, }, dispatch] = useStateValue()

    const [showModal, setShowModal] = useState(false)
    const [profilePicData, setProfilePicData] = useState<any>(undefined)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    // type StateChanged = "paused" | "running"

    function stringGen(len) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));

        return text;
    }

    /*async function didPickImage(data: HTMLImageElement) {



        // console.log('data:', data)

        if (data !== undefined) {
            setProfilePicData(data)

            //Begin uploading 
            setShowModal(false)
            setUploading(true)


           // const firebase = await loadFirebase()
           // await import('firebase/storage')

            var storageRef = firebase.storage().ref().child(`${authUser.uid}/images/profile_${stringGen(5)}.png`)

            var metadata = {
                contentType: 'image/png',
                cacheControl: 'public,max-age=2592000'
            };

            let uploadTask = storageRef.putString(data.toString(), 'data_url', metadata)

            //let uploadTask = uploadProfilePicture(authUser.uid, data)

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed', // or 'state_changed'
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    setUploadProgress(progress)

                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused': // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case 'running': // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function (error) {

                    setUploading(false)
                    setUploadProgress(0)
                    console.log('error:', error)


                }, function () {

                    //Update user object with URL



                    setTimeout(() => {
                        setUploading(false)
                        setUploadProgress(0)
                    }, 1000);


                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

                        updateUserProfilePicture(authUser.uid, {
                            userID: authUser.uid,
                            profilePic: downloadURL,
                            displayID: displayID ? displayID : authUser.uid
                        })
                            .then((response) => {

                                console.log('response:', response)

                                if (response.status === "success") {

                                    dispatch({
                                        type: 'updateProfilePic',
                                        profilePic: downloadURL,
                                        profilePicMedium: downloadURL,
                                        profilePicSmall: downloadURL
                                    })

                                    console.log('profile pic successfully updated')
                                }
                                else {
                                    alert('Profile picture could not be updated!')
                                    console.log(response.message)
                                }


                            })
                            .catch((err) => {
                                console.log('pic could not be updated', err)
                            })
                        //console.log('File available at', downloadURL);
                    });
                });



        }
        else {
            alert('Please select an image')
        }


    }

    */


    return (

        <div>

            <style jsx>{`
                .userProfilePictureContainer {
                    margin-bottom: 20px;
                    display: flex;
                    flex-direction:column;
                    flex: 1;
                    justify-content: center;
                    align-items:center;
                }

                .userProfilePictureDefault {
                    padding: 0;
                background: none;
                border: solid rgba(0, 0, 0, 0.5) 1px;
                color: ${darkThemeColor};
                font-size: 30pt;
                height: 120px;
                width: 120px;
                border-radius: 60px;
                margin-bottom: 10px;
                }

                .userProfilePictureDefault:hover {
                    color: white;
                    background:  ${themeColor};
                    border: solid ${themeColor} 1px;
                }


            `}</style>

            <div className="userProfilePictureContainer">

                <button
                    className="userProfilePictureDefault"
                    onClick={() => setShowModal(true)}>

                    {profilePic === undefined && profilePicData === undefined &&
                        <FontAwesomeIcon icon={faUser} size="lg" />
                    }
                    {profilePic !== undefined && profilePicData === undefined &&
                        <img className="userProfilePictureDefault" src={profilePic} width={120} height={120} />
                    }

                    {profilePicData !== undefined && profilePic === undefined &&
                        <img className="userProfilePictureDefault" src={profilePicData} width={120} height={120} />
                    }

                    {profilePicData !== undefined && profilePic !== undefined &&
                        <img className="userProfilePictureDefault" src={profilePicData} width={120} height={120} />
                    }
                </button>

                {profilePicData === undefined && profilePic === undefined &&
                    <div>Select Profile Picture</div>
                }

                {profilePicData !== undefined && uploading &&
                    <div>Uploading: {uploadProgress}% complete</div>
                }


            </div>


            <div>

                <SelectProfilePictureModal
                    closeButtonTitle="Close"
                    confirmButtonTitle="Save"
                    didPickImage={(data: HTMLImageElement) => console.log('data')} /*didPickImage(data)}*/
                    onHide={() => setShowModal(false)}
                    show={showModal}
                />



            </div>

        </div>
    )
}

export default ReusableProfilePicUploader