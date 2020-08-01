import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styles from "./home-background.module.css"

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

const SplashImage = ({pageTitle}) => {
  const data = useStaticQuery(graphql`
    {
      astroImage: file(relativePath: { eq: "moon6-1-2020.png" }) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      earthImage: file(relativePath: { eq: "venice.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 3000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  
  let background = pageTitle == "Earth" ? data.earthImage : data.astroImage;

  return <Img fluid={background.childImageSharp.fluid} className={styles.background}/>
}



export default SplashImage
