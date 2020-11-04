import React, { useRef } from "react"
import styles from "./travel.module.css"

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

  const [currentContinent, setCurrentContinent] = React.useState(undefined);
  const [filterOpen, setFilterOpen] = React.useState(false);

  const gridRef = useRef();

  const scrollToGrid = (ref) => {
    console.log(ref);
    if (ref.current) { window.scrollTo(0, ref.current.offsetTop); }
  }

  let continentClickCallback = (c) => {
    setCurrentContinent(c);
    // scrollToGrid(gridRef);
    setFilterOpen(!filterOpen);
  }

  let toggleFilter = () => {
    setFilterOpen(!filterOpen);
  }

  return(
  <Layout pageTitle="Earth">
    <SEO title="Earth - Travel" />
    <div className={styles.earthDescription}>What should we do with our time but to explore? I haven't seen much of the world, but the parts I have seen offered plenty of beautiful scenes and moments.</div>
    <hr className={styles.hrStyle}></hr>
    <div >
      <h4 className={styles.continentLabel}>Showing {currentContinent ? currentContinent : "All Continents"}</h4>
      <div className={styles.continentFilterButton} onClick={() => toggleFilter()}>
          <i class="fa fa-filter"></i>
      </div>
      <div className={filterOpen ? styles.continentFilterContainer + " " + styles.filterOpen : styles.continentFilterContainer}>
        <p className={styles.filterInstructions}>Click on the continents to filter.</p>
        <Map continents={continents} onContinentClick={continentClickCallback} imageDetails={imageDetails}/>
      </div>
    </div>
    <PhotoGrid
      gridRef={gridRef}
      continent={currentContinent} 
      thumbnails={data.thumbnails.edges} 
      images={data.images.edges} 
      imageDetails={imageDetails}></PhotoGrid>
  </Layout>
);
  }

export default SecondPage
