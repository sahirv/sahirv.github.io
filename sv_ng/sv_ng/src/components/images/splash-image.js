import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
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
  const [mobile, setMobile] = useState(null);
    useEffect(() => {
      setMobile(window.innerWidth > 615);
    }, []);

  const data = useStaticQuery(graphql`
    {
      astroImage: file(relativePath: { eq: "olympic-6.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 3000, quality: 100)
        }
      }

      earthImage: file(relativePath: { eq: "earthbackground.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 3000)
        }
      }

      mobileEarthImage: file(relativePath: { eq: "serenity.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 3000)
        }
      }
      mobileAstroImage: file(relativePath: { eq: "goldengate-mobile.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, width: 3000)
        }
      }
    }
  `);
  
  let background = pageTitle == "Earth" ? data.earthImage.childImageSharp.gatsbyImageData : data.astroImage.childImageSharp.gatsbyImageData;
  if (isMobile) {
    background = pageTitle == "Earth" ? data.mobileEarthImage : data.mobileAstroImage;
  }
  if (mobile == null) {
    return <GatsbyImage fluid={undefined} backgroundColor={"#000"} className={styles.background} imgStyle={{objectFit: "cover"}}/>;
  }
  return <GatsbyImage image={background} className={styles.background}/>;
}



export default SplashImage
