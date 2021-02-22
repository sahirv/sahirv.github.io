import React, { useRef, useEffect } from 'react'
import styles from './grid.module.css'
import { render } from 'react-dom'
import { checkPropTypes } from 'prop-types'
import PropTypes from "prop-types"
import GridImage from "./gridimage"
import ImageModal from "./imageModal"
import { useQueryParam, StringParam } from "use-query-params";

const PhotoGrid = ({thumbnails, images, imageDetails, continent, gridRef, pictureFromPin, isWildlife}) => {
    // Modal open/close
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [clickedImage, setClickedImage] = React.useState(undefined);
    const [currentImageSelectedFromPin, setPinImage] = React.useState(undefined);
    const [urlImage, setUrlImage] = useQueryParam("image", StringParam);
    const urlRef = useRef(urlImage);

    // Show images from all continents if in wildlife tab
    if (isWildlife) {
        continent = undefined;
    }

    let closeModal = () => {
        setUrlImage(undefined);
        urlRef.current = undefined;
        setIsModalOpen(false);
    }
    let openModal = (img) => {
        setUrlImage(img);
        setIsModalOpen(true);
        urlRef.current = img;
    }

    // Generate thumbnails
    let gridItems = [];
    for (var detail in imageDetails) {

        // Fetch image detail for thumbnail to check continent (for earth pages)
        let thumbnail = thumbnails.find(n => {return n.node.childImageSharp.fluid.originalName.includes(imageDetails[detail].image)});

        if (continent 
            && continent == imageDetails[detail].continent 
            || !continent){
            if (isWildlife && imageDetails[detail].tags && (imageDetails[detail].tags.includes("wildlife")) || !isWildlife){
                gridItems.push(
                    <div 
                    className={styles.gridItem}
                    id={thumbnail.node.childImageSharp.fluid.originalName}
                    onClick={(e) => findClickedImageAndOpenModal(e)}>
                        <GridImage image={thumbnail}></GridImage>
                    </div>);
            }
        }
    }

    if (urlImage && !isModalOpen && urlRef.current) {
        let i = images.find(n => {
            return n.node.childImageSharp.fluid.originalName.includes(urlImage);
        });
        if (i) {
            setClickedImage(i);
            openModal(urlImage);
        }

    }

    useEffect(() => {
        window.addEventListener("popstate", () => {
            closeModal();
        });
    }, []);

    let findClickedImageAndOpenModal = (e) => {
        let imageName = e.currentTarget.id;
        setClickedImage(images.find(n => {
            return n.node.childImageSharp.fluid.originalName.includes(imageName);
        }));
        openModal(imageName);
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