import React, { useRef, useEffect } from 'react'
import * as styles from './grid.module.css'
import { render } from 'react-dom'
import { checkPropTypes } from 'prop-types'
import PropTypes from "prop-types"
import GridImage from "./gridimage"
import ImageModal from "./imageModal"

const PhotoGrid = ({location, thumbnails, images, imageDetails, continent, gridRef, pictureFromPin, isWildlife}) => {
    // Modal open/close
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [clickedImage, setClickedImage] = React.useState(undefined);
    const [currentImageSelectedFromPin, setPinImage] = React.useState(undefined);
    let urlParams = new URLSearchParams(location.search);
    let urlImage = urlParams ? urlParams.get('image') : undefined;
    let urlRef = useRef(urlImage);

    // Show images from all continents if in wildlife tab
    if (isWildlife) {
        continent = undefined;
    }


    let closeModal = () => {
        urlParams.delete('image');
        urlRef.current = undefined;
        setIsModalOpen(false);
        window.history.back();
    }
    let openModal = (image) => {
        let url = window.location.href + image;
        setIsModalOpen(true);
        window.history.pushState({}, "", url);
        urlRef.current = image;
    }

    // Generate thumbnails
    let gridItems = [];
    for (var detail in imageDetails) {

        // Fetch image detail for thumbnail to check continent (for earth pages)
        let thumbnail = thumbnails.find(n => {return n.node.childImageSharp.parent.relativePath.includes(imageDetails[detail].image)});
        if (!thumbnail){
            continue;
        }
        if (continent 
            && continent == imageDetails[detail].continent 
            || !continent){
            if (isWildlife && imageDetails[detail].tags && (imageDetails[detail].tags.includes("wildlife")) || !isWildlife){
                gridItems.push(
                    <div 
                    className={styles.gridItem}
                    id={thumbnail.node.childImageSharp.parent.relativePath}
                    onClick={(e) => findClickedImageAndOpenModal(e)}>
                        <GridImage image={thumbnail}></GridImage>
                    </div>);
            }
        }
    }

    if (urlImage && !isModalOpen && urlRef.current) {
        let i = images.find(n => {
            return n.node.childImageSharp.parent.relativePath.includes(urlImage);
        });
        if (i) {
            setClickedImage(i);
            openModal(urlImage);
        }

    }

    useEffect(() => {
        window.addEventListener("popstate", () => {
            // closeModal();
        });
    }, []);

    let findClickedImageAndOpenModal = (e) => {
        let imageName = e.currentTarget.id;
        setClickedImage(images.find(n => {
            return n.node.childImageSharp.parent.relativePath.includes(imageName);
        }));
        openModal(imageName);
    }

    if (pictureFromPin != currentImageSelectedFromPin) {
        setPinImage(pictureFromPin);
        setClickedImage(images.find(n => {
            return n.node.childImageSharp.parent.relativePath.includes(pictureFromPin);
        }));
        openModal();
    }
    
    return(
    <>
        <div className={styles.gridContainer} ref={gridRef}>
            {gridItems}
        </div>
        {clickedImage ? <ImageModal image={clickedImage} isModalOpen={isModalOpen} onClose={closeModal} imageDetails={imageDetails}></ImageModal> : <></>}
    </>
    );
}

PhotoGrid.prototypes = {
    thumbnails: PropTypes.object,
    images: PropTypes.object,
    imageDetails: PropTypes.object,
}

export default PhotoGrid