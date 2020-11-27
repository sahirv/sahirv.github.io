import React from 'react'
import { render } from 'react-dom'
import PropTypes from "prop-types"
import styles from './grid.module.css'
import Img from "gatsby-image"

const GridImage = ({image}) => {
    return(
        <Img fluid={{...image.node.childImageSharp.fluid, aspectRatio: 1.2}} loading="eager"></Img>);
}

GridImage.propTypes = {
    image: PropTypes.object
}

export default GridImage