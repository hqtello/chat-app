/* eslint-disable */
import React, { useState, useRef } from 'react'
import { Alert, Modal, Button } from 'rsuite'
import AvatarEditor from 'react-avatar-editor'

import { storage, database } from '../../misc/firebase'
import { useModalState } from '../../misc/custom-hooks'
import { useProfile } from '../../context/profile.context'


const fileInputTypes = '.png, .jpeg, .jpg'
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg', 'image/jpg']
const isValidFile = file => {
    return acceptedFileTypes.includes(file.type)
}

const getBlob = canvas => {
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob)
                resolve(blob)
            else
                reject(new Error('File process error'))
        })
    })
}

function AvatarUploadBtn() {
    const { isOpen, open, close } = useModalState()
    const [img, setImg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const avatarEditorRef = useRef()
    const { profile } = useProfile()

    const handleFileInputChange = ({ target }) => {
        const allFiles = target.files

        if (allFiles.length === 1) {
            const file = allFiles[0]

            if (isValidFile(file)) {
                setImg(file)
                open()
            }
            else
                return Alert.warning(`Wrong file type ${file.type}`, 4000)
        }
    }

    const onUploadClick = async () => {
        const canvas = avatarEditorRef.current.getImageScaledToCanvas()

        setIsLoading(true)

        // Convert canvas to Blob file
        try {
            const blob = await getBlob(canvas)
            const avatarFileRef = storage
                .ref(`/profile/${profile.uid}`)
                .child('avatar')

            const uploadAvatarResult = await avatarFileRef.put(blob, {
                cacheControl: `public, max-age=${3600 * 24 * 3}`
            })

            const downloadUrl = await uploadAvatarResult.ref.getDownloadURL()
            // Here we can finally save it in our DB
            const userAvatarRef = database
                .ref(`/profiles/${profile.uid}`)
                .child('avatar')

            userAvatarRef.set(downloadUrl)

            setIsLoading(false)
            Alert.info('Avatar has been uploaded', 4000)
        } catch (err) {
            setIsLoading(false)
            Alert.error(err.message, 4000)
            console.log('UPLOAD ERROR: ', err)
        }
    }

    return (
        <div className='mt-3 text-center'>
            <div>
                <label
                    htmlFor='avatar-upload'
                    className='d-block cursor-pointer padded'
                >
                    Select new avatar
                    <input
                        id='avatar-upload'
                        type='file'
                        className='d-none'
                        accept={fileInputTypes}
                        onChange={handleFileInputChange}
                    />
                </label>

                <Modal show={isOpen} onHide={close}>
                    <Modal.Header>
                        <Modal.Title>
                            Adjust and upload new avatar
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            {img && (
                                <AvatarEditor
                                    ref={avatarEditorRef}
                                    image={img}
                                    width={200}
                                    height={200}
                                    border={10}
                                    borderRadius={100}
                                    rotate={0}
                                />
                            )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            block
                            appearance='ghost'
                            disabled={isLoading}
                            onClick={onUploadClick}
                        >
                            Upload new avatar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default AvatarUploadBtn