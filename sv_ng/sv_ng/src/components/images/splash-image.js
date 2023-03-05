import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from "./home-background.module.css"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

// const StyledImage = styled(Img)`

// `

const SplashImage = ({pageTitle, isMobile}) => {
  if (isMobile)
    return <StaticImage src="../../images/splash/gc-mobile.jpg" className={styles.background}/>;
  return <StaticImage src="../../images/earth/gc-2.jpg" className={styles.background}/>;
}



export default SplashImage
