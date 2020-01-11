import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import dynamic from 'next/dynamic'
import { themeColor } from '../css/theme'

const Avatar = dynamic(
    import('react-avatar-edit'),
    { ssr: false }
)





interface CropProfilePictureModal {
    closeButtonTitle: string
    confirmButtonTitle: string
    didPickImage: (data: HTMLImageElement) => void
    onHide: () => void
    show: boolean
}

export default function SelectImageModal(props: CropProfilePictureModal) {

    const [preview, setPreview] = useState<any>(undefined)
    let { closeButtonTitle, didPickImage, confirmButtonTitle, ...others } = props;

    function onCrop(preview: any) {
        setPreview(preview)
    }

    function onClose() {
        setPreview(undefined)
    }

    function onBeforeFileLoad(elem: any) {
        console.log('elem:', elem)
    }


    return (
        <Modal
            {...others}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >

            <style jsx>
                {`


                .imageUploaderContainer {
                    display: flex;
                    flex-direction: row;
                    flex: 1;
                }
                
                .avatarContainer {
                    height: 300px;
                    width: 300px;
                    justify-content: left;
                    display: flex;
                    flex-direction: row;
                    overflow: hidden;
                }
                
                .previewContainer {
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }

                .myButton {
                   height: 40px;
                   width: 100px;
                    margin-top:10px;
                    margin-bottom: 10px;
                    margin-left: 5px;
                    margin-right: 5px;
                    border-radius: 20px;
                    color: white;
                }
                
                .confirmButton {
               background:${themeColor};
                }

                .confirmButton:hover {
                    background: #1059C7;
                }

                .closeButton {
                    background: #ff3f34;
                    border: solid #ff3f34 1px;
                }

                .closeButton:hover {
                    background: #d63031;
                }

                
                @media only screen and (max-width: 700px) { 
                    .imageUploaderContainer {
                       
                        flex-direction: column;
                       
                    }
                }
                
                
                
                `}
            </style>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select Profile Picture
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="imageUploaderContainer">

                    <div className="avatarContainer">
                        <Avatar
                            imageHeight={300}
                            width={300}
                            height={300}
                            onImageLoad={(data: HTMLImageElement) => {
                                console.log('data:', data)
                            }}
                            onCrop={(data) => onCrop(data)}
                            onClose={() => onClose()}
                            onBeforeFileLoad={(elem: any) => onBeforeFileLoad(elem)}
                        />
                    </div>


                    <div className="previewContainer">

                        {preview !== undefined &&
                            <div>
                                <div style={{ marginBottom: 20 }}>Preview</div>
                                <div style={{ marginBottom: 20, fontSize: 12 }}>
                                    Some images uploaded on mobile may be turned the wrong way. This is a known issue and I'm working on a solution! To get around it you can use the web version or try uploading another image. Thanks for your patience!
                            </div>
                                <img src={preview} height={150} width={150} alt="Preview" />
                            </div>

                        }
                    </div>

                </div>


            </Modal.Body>
            <Modal.Footer>

                <button className="myButton closeButton" onClick={() => props.onHide()}>{props.closeButtonTitle}</button>
                <button className="myButton confirmButton" onClick={() => {
                    if (preview !== undefined) {
                        props.didPickImage(preview)
                    }
                    else {
                        alert('Please select an image!')
                    }
                }}>
                    {props.confirmButtonTitle}
                </button>
            </Modal.Footer>
        </Modal>
    );
}