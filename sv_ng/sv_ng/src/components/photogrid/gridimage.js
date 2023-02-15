import React from 'react'
import { render } from 'react-dom'
import PropTypes from "prop-types"
import * as styles from './grid.module.css'
import { GatsbyImage } from "gatsby-plugin-image"

const GridImage = ({image}) => {
    return(
        <GatsbyImage image={{...image.node.childImageSharp.gatsbyImageData}} loading="eager" />);
}

GridImage.propTypes = {
    image: PropTypes.object
}

export default GridImage