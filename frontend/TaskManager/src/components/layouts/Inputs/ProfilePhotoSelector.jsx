import React from 'react'
import { useState, useRef } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }
  return (
    <div className=''>
        <input 
            type="file" 
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            className=''
        />

        (!image ? (
            <div className=''>
                <LuUser className='' />

                <button
                    type='button'
                    className=''
                    onClick={onChooseFile}
                >
                    <LuUpload />  
                </button>
            </div>
        ) : (
            <div className=''>
                <img  
                    src={previewUrl} 
                    alt="Profile photo" 
                />
                <button
                    type='button'
                    className=''
                    onClick={handleRemoveImage}
                >
                    <LuTrash />
                </button>

            </div>
        ))
    </div>
  )
}

export default ProfilePhotoSelector