import React, { useState } from 'react';
import ImageUploading, { ImageType } from 'react-images-uploading';
import { BiHide } from 'react-icons/bi';
import { MdOutlineVisibility } from 'react-icons/md';
import { LuUpload } from 'react-icons/lu';

interface IImageProps {
    styles: string;
}

export const Image: React.FC<IImageProps> = ({ styles }) => {

    const [image, setImage] = React.useState<ImageType | null>(null);
    const [opacity, setOpacity] = useState(true)

    const onChange = (imageList: ImageType[]) => {
        setImage(imageList[0] || null);
        console.log('Number', Number(true))
    };

    return (
        <ImageUploading
            value={image ? [image] : []}
            onChange={onChange}
        >
            {({
                  onImageUpdate,

              }) => (
                <section className={styles}>
                    <div className='polygon' style={{ background: '#1976D2', opacity: Number(!opacity) }}>
                        <h2>Y</h2>
                        <h2>N</h2>
                    </div>
                    {opacity &&
                        <>
                            <LuUpload
                                className='edite'
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Upload Photo'
                                data-tooltip-offset={0}
                                onClick={() => onImageUpdate(0)}
                            />
                            <BiHide
                                size='1.2rem'
                                className='hide'
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Hide Photo'
                                data-tooltip-offset={20}
                                onClick={() => setOpacity(!opacity)}
                            />
                        </>}

                    {!opacity &&
                        <MdOutlineVisibility
                            size='1.2rem'
                            className='hide'
                            data-tooltip-id='tooltip'
                            data-tooltip-content='Return Photo'
                            data-tooltip-offset={0}
                            onClick={() => setOpacity(!opacity)}
                        />}
                    <img src={image?.dataURL || 'avatar.jpg'} alt='photo' style={{ opacity: Number(opacity) }}/>
                </section>
            )}
        </ImageUploading>
    )
}