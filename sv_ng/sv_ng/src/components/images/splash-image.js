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

const SplashImage = ({pageTitle, isMobile}) => {
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
          fluid(maxWidth: 3000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      mobileEarthImage: file(relativePath: { eq: "rainier.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mobileAstroImage: file(relativePath: { eq: "hercules-mobile.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  
  let background = pageTitle == "Earth" ? data.earthImage : data.astroImage;
  if (isMobile) {
    background = pageTitle == "Earth" ? data.mobileEarthImage : data.mobileAstroImage;
  }
  if (isMobile == null) {
    return <Img fluid={undefined} backgroundColor={"#000"} />;
  }
  return <Img fluid={background.childImageSharp.fluid} className={styles.background} imgStyle={{objectFit: "cover"}} fadeIn={true} loading="eager"/>;
}



export default SplashImage
