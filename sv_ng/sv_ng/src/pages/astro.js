import React, { useState } from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PhotoGrid from "../components/photogrid/grid"
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
  }
  `);
  let imageDetails = data.image_data.nodes[0].astro_image_details;
  let [currentSection, setCurrentSection] = useState("images");

  return (
    <Layout pageTitle="Space">
      <div className={styles.astroDescription}>Welcome to my astrophotography portfolio. I've been amazed by the cosmos my entire life, and I'm very lucky to have the priviledge of exploring them. The sky is home to many jewels, and it would be selfish of me not to share them with you. All photos have been taken and processed by myself.</div>
      <div className={styles.astroNav}>
        <div className={currentSection == "images" ? styles.astroNavButton + " " + styles.selected : styles.astroNavButton} onClick={() => setCurrentSection("images")}>Photos</div>
        <div className={currentSection != "images" ? styles.astroNavButton + " " + styles.selected : styles.astroNavButton}  onClick={() => setCurrentSection("blog")}>Blog</div>
      </div>
      <SEO title="Astrophotography" />
      { currentSection == "images" ? 
        <PhotoGrid thumbnails={data.thumbnails.edges} images={data.images.edges} imageDetails={imageDetails}></PhotoGrid> : ""}
    </Layout>
  );
}

export default SecondPage
