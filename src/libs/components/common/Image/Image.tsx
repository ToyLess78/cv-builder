import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectInfo } from '~/slices/info.slice';
import { selectTheme } from '~/slices/theme.slice';
import { ImageType } from '~/types/image-uploading.types';
import classes from './Image.module.scss';
import ImageUploading from './ImageUploading';
import { HideButton, ShowButton, UploadButton } from '~/components/common/Buttons/Buttons';

interface IImageProps {
    styles: string;
}

export const Image: React.FC<IImageProps> = ({styles}) => {

    const [image, setImage] = React.useState<ImageType | null>(null);
    const [opacity, setOpacity] = useState(true);
    const info = useSelector((state: RootState) => selectInfo(state));
    const themeColor = useSelector((state: RootState) => selectTheme(state));

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
                <section className={styles}>
                    <div className={classes.polygon} style={ { background: themeColor, opacity: Number(!opacity) } }>
                        <h2>{ info.firstname.trim().charAt(0) }</h2>
                        <h2>{ info.lastname.trim().charAt(0) }</h2>
                    </div>
                    { opacity &&
                        <>
                            <UploadButton
                                onClick={ () => onImageUpdate(0) }
                            />
                            <HideButton
                                offset={ 0 }
                                title="Photo"
                                onClick={ () => setOpacity(!opacity) }
                            />
                        </> }

                    { !opacity &&
                        <ShowButton
                            title="Photo"
                            onClick={ () => setOpacity(!opacity) }
                        /> }
                    <img src={ image?.dataURL || 'avatar.jpg' } alt='photo' style={ { opacity: Number(opacity) } }/>
                </section>
            ) }
        </ImageUploading>
    );
};