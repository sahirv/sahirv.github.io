import React, { useRef } from "react"
import styles from "./videos.module.css"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { useStaticQuery, graphql } from "gatsby"
import PhotoGrid from "../components/photogrid/grid"

import Map from "../components/map/map"

const SecondPage = () => {
  const data = useStaticQuery(graphql`
  {
    thumbnails: allFile(filter: {sourceInstanceName: {eq: "earth"}}) {
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
    images: allFile(filter: {sourceInstanceName: {eq: "earth"}}) {
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
    image_data: allEarthJson {
      nodes {
        earth_image_details {
          continent
          description
          image
          title
          location
          x
          y
          tags
        }
      }
    }
    map_data: allMapJson {
      nodes {
        map_data {
          continent
          path
        }
      }
    }
    
  }
  `);
  let imageDetails = data.image_data.nodes[0].earth_image_details;
  let continents = data.map_data.nodes[0].map_data;

  const [currentContinent, setCurrentContinent] = React.useState("none");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [currentPictureFromPin, setCurrentPictureFromPin] = React.useState(undefined);
  let [currentSection, setCurrentSection] = React.useState("all");

  const gridRef = useRef();

  let selectImageCallback = (i) => {
    setCurrentPictureFromPin(i);
    console.log(i);
  }

  let continentClickCallback = (c) => {
    setCurrentContinent(c);
    // scrollToGrid(gridRef);
    setFilterOpen(!filterOpen);
  }
  
  return(
  <Layout pageTitle="Earth">
    <SEO title="Earth - Travel" />
    <div className={styles.childrenContainer}>

      <div className={styles.videoContainer}>
        <h4>Olympic National Park - Summer 2021</h4>
        <iframe src="https://www.youtube.com/embed/ltZlmji4frI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>
      </div>
    </div>
  </Layout>
  );
}
export default SecondPage
