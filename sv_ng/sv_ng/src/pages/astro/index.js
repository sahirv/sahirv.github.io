import React, { useState } from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import PhotoGrid from "../../components/photogrid/grid"
import AstroLayout from "./astrolayout"
import { useQueryParam, StringParam } from "use-query-params";
import styles from "./astro.module.css"

const SecondPage = () => {
  const data = useStaticQuery(graphql`
  {
    thumbnails: allFile(filter: {sourceInstanceName: {eq: "astro"}}, sort: {fields: name, order: ASC}) {
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

  const [urlImage, setUrlImage] = useQueryParam("image", StringParam);

  return (
    <AstroLayout section="images">
        <PhotoGrid thumbnails={data.thumbnails.edges} images={data.images.edges} imageDetails={imageDetails} urlImage={urlImage}></PhotoGrid> 
    </AstroLayout>
  );
}

export default SecondPage
