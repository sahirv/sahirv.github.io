import React from 'react'
import { render } from 'react-dom'
import PropTypes from "prop-types"
import * as styles from './grid.module.css'
import { GatsbyImage } from "gatsby-plugin-image"
import Modal from 'react-modal'
import { useStaticQuery, graphql } from "gatsby"

const ImageModal = ({image, imageDetails, isModalOpen, onClose}) => {
    let detail = imageDetails.find(n => {return n.image.includes(image.node.childImageSharp.parent.relativePath)});
    let equipmentDetails = [];
    if (detail && detail.equipment) {
        detail.equipment.forEach((e) => equipmentDetails.push(<p className={styles.equipmentText}>{e}</p>));
    }
    return(
        <Modal isOpen={isModalOpen} shouldCloseOnOverlayClick={true} onRequestClose={onClose} className={styles.modal} overlayClassName={styles.overlay}>
            <div className={styles.imageContainer}>
                <a href={image.node.childImageSharp.gatsbyImageData.images.fallback.src} target="_blank">
                    {/* <img className={styles.modalImage} src={image.node.childImageSharp.fluid.src} /> */}
                    <GatsbyImage image={{...image.node.childImageSharp.gatsbyImageData}} imgStyle={{objectFit: 'contain'}} className={styles.image} loading="eager"></GatsbyImage>
                </a>
            </div>
            {detail ? 
                <div className={styles.imageDetails}>
                    <div className={styles.showDetails}>...</div>
                    <h4>{detail.title}</h4>
                    <h5>{detail.location}</h5>
                    <p className={styles.description}>{detail.description}</p>
                    {equipmentDetails.length > 0 ? <p>You can learn more about {detail.title} <a href={detail.link} target="_blank">here</a>.</p> : <></>}
                    {equipmentDetails.length > 0 ? <h5 className={styles.equipmentTitle} >Equipment</h5> : <></>}
                    {equipmentDetails}
                </div> 
                : <div className={styles.imageDetails}>No image details found</div>
            }
            <div className={styles.moreTextIndicator}></div>
        </Modal>);
}

ImageModal.propTypes = {
    imageName: PropTypes.object,
    imageDetails: PropTypes.object,
    isModalOpen: PropTypes.bool,
    onClose: PropTypes.func,
}

export default ImageModal