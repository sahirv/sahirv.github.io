import React from 'react'
import styles from './grid.module.css'
import { render } from 'react-dom'
import { checkPropTypes } from 'prop-types'
import PropTypes from "prop-types"
import GridImage from "./gridimage"
import ImageModal from "./imageModal"

const PhotoGrid = ({thumbnails, images, imageDetails, continent, gridRef, pictureFromPin, isWildlife}) => {
    // Modal open/close
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [clickedImage, setClickedImage] = React.useState(undefined);
    const [currentImageSelectedFromPin, setPinImage] = React.useState(undefined);

    // Show images from all continents if in wildlife tab
    if (isWildlife) {
        continent = undefined;
    }

    let closeModal = () => {setIsModalOpen(false);}
    let openModal = () => {setIsModalOpen(true);}

    // Generate thumbnails
    let gridItems = [];
    for (var thumbnail in thumbnails) {

        // Fetch image detail for thumbnail to check continent (for earth pages)
        let detail = imageDetails.find(n => {return n.image.includes(thumbnails[thumbnail].node.childImageSharp.fluid.originalName)});

        if (continent 
            && continent == detail.continent 
            || !continent){
            if (isWildlife && detail.tags && (detail.tags.includes("wildlife")) || !isWildlife){
                gridItems.push(
                    <div 
                    className={styles.gridItem}
                    id={thumbnails[thumbnail].node.childImageSharp.fluid.originalName}
                    onClick={(e) => findClickedImageAndOpenModal(e)}>
                        <GridImage image={thumbnails[thumbnail]}></GridImage>
                    </div>);
            }
        }
    }

    let findClickedImageAndOpenModal = (e) => {
        let imageName = e.currentTarget.id;
        setClickedImage(images.find(n => {
            return n.node.childImageSharp.fluid.originalName.includes(imageName);
        }));
        openModal();
    }

    if (pictureFromPin != currentImageSelectedFromPin) {
        setPinImage(pictureFromPin);
        setClickedImage(images.find(n => {
            return n.node.childImageSharp.fluid.originalName.includes(pictureFromPin);
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