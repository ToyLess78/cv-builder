import React, { useState } from 'react';
import { BiHide } from 'react-icons/bi';
import { MdOutlineVisibility } from 'react-icons/md';
import { LuUpload } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo } from '~/slices/infoSlice';
import { selectThemeColor } from '~/slices/themeSlice';
import ImageUploading from '~/components/Image/ImageUploading';
import { ImageType } from '~/types/image-uploading.types';

interface IImageProps {
    styles: string;
}

export const Image: React.FC<IImageProps> = ({ styles }) => {

    const [ image, setImage ] = React.useState<ImageType | null>(null);
    const [ opacity, setOpacity ] = useState(true);
    const info = useSelector((state: RootState) => selectInfo(state));
    const themeColor = useSelector((state: RootState) => selectThemeColor(state));

    const onChange = (imageList: ImageType[]) => {
        setImage(imageList[0] || null);
    };

    return (
        <ImageUploading
            value={ image ? [ image ] : [] }
            onChange={ onChange }
        >
            { ({
                   onImageUpdate,

               }) => (
                <section className={ styles }>
                    <div className='polygon' style={ { background: themeColor, opacity: Number(!opacity) } }>
                        <h2>{ info.firstname.trim().charAt(0) }</h2>
                        <h2>{ info.lastname.trim().charAt(0) }</h2>
                    </div>
                    { opacity &&
                        <>
                            <LuUpload
                                className='edite'
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Upload Photo'
                                data-tooltip-offset={ 0 }
                                onClick={ () => onImageUpdate(0) }
                            />
                            <BiHide
                                size='1.2rem'
                                className='hide'
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Hide Photo'
                                data-tooltip-offset={ 20 }
                                onClick={ () => setOpacity(!opacity) }
                            />
                        </> }

                    { !opacity &&
                        <MdOutlineVisibility
                            size='1.2rem'
                            className='hide'
                            data-tooltip-id='tooltip'
                            data-tooltip-content='Return Photo'
                            data-tooltip-offset={ 0 }
                            onClick={ () => setOpacity(!opacity) }
                        /> }
                    <img src={ image?.dataURL || 'avatar.jpg' } alt='photo' style={ { opacity: Number(opacity) } }/>
                </section>
            ) }
        </ImageUploading>
    );
};