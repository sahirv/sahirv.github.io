import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import PhotoGrid from "../../components/photogrid/grid"
import AstroLayout from "./astrolayout"
import * as styles from "./astro.module.css"

const SecondPage = ({location}) => {
  const data = useStaticQuery(graphql`
  {
    thumbnails: allFile(filter: {sourceInstanceName: {eq: "astro"}}, sort: {fields: name, order: ASC}) {
      edges {
        node {
          childImageSharp {
            parent {
              ... on File {
                relativePath
              }
            }
            gatsbyImageData(layout: CONSTRAINED, width: 500, quality: 100, transformOptions: {fit: COVER, cropFocus: ATTENTION}, aspectRatio: 1.2)
          }
        }
      }
    }
    images: allFile(filter: {sourceInstanceName: {eq: "astro"}}) {
      edges {
        node {
          childImageSharp {
            parent {
              ... on File {
                relativePath
              }
            }
            gatsbyImageData(layout: CONSTRAINED, width: 3000, quality: 100)
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
          id
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
  // sort based on priority id in image details
  imageDetails.sort((a,b) => {return b.id - a.id;})

  return (
    <AstroLayout section="images">
        <PhotoGrid location={location} thumbnails={data.thumbnails.edges} images={data.images.edges} imageDetails={imageDetails}></PhotoGrid> 
    </AstroLayout>
  );
}

export default SecondPage
