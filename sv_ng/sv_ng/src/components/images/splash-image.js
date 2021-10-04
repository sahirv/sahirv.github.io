import React, { useEffect, useState } from "react"
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
  const [mobile, setMobile] = useState(null);
    useEffect(() => {
      setMobile(window.innerWidth > 615);
    }, []);

  const data = useStaticQuery(graphql`
    {
      astroImage: file(relativePath: { eq: "olympic-6.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 3000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      earthImage: file(relativePath: { eq: "earthbackground.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 3000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      mobileEarthImage: file(relativePath: { eq: "serenity.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mobileAstroImage: file(relativePath: { eq: "goldengate-mobile.jpg" }) {
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
  if (mobile == null) {
    return <Img fluid={undefined} backgroundColor={"#000"} className={styles.background} imgStyle={{objectFit: "cover"}}/>;
  }
  return <Img fluid={background.childImageSharp.fluid} className={styles.background} imgStyle={{objectFit: "cover"}} fadeIn={true} loading="eager"/>;
}



export default SplashImage
