import React, { useState } from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import PhotoGrid from "../../components/photogrid/grid"
import AstroLayout from "./astrolayout"
import styles from "./astro.module.css"

const SecondPage = () => {
  const data = useStaticQuery(graphql`
  {
    thumbnails: allFile(filter: {sourceInstanceName: {eq: "astro"}}) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 500, quality: 80, cropFocus: CENTER) {
              originalName
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    images: allFile(filter: {sourceInstanceName: {eq: "astro"}}) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 72) {
              originalName
              ...GatsbyImageSharpFluid
              src
            }
          }
        }
      }
    }
    image_data: allAstroJson {
      nodes {
        astro_image_details {
          description
          equipment
          image
          link
          title
        }
      }
    }
    astroImage: file(relativePath: { eq: "milkywaypanorama.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  `);
  let imageDetails = data.image_data.nodes[0].astro_image_details;

  return (
    <AstroLayout section="images">
        <PhotoGrid thumbnails={data.thumbnails.edges} images={data.images.edges} imageDetails={imageDetails}></PhotoGrid> 
    </AstroLayout>
  );
}

export default SecondPage
