import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PhotoGrid from "../components/photogrid/grid"

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
            fluid(maxWidth: 3000, quality: 100) {
              originalName
              aspectRatio
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
  }
  `);
  let imageDetails = data.image_data.nodes[0].astro_image_details;
  return (
    <Layout pageTitle="Space">
      <SEO title="Astrophotography" />
      <PhotoGrid thumbnails={data.thumbnails.edges} images={data.images.edges} imageDetails={imageDetails}></PhotoGrid>
    </Layout>
  );
}

export default SecondPage
