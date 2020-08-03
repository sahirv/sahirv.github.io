import React, { useRef } from "react"
import styles from "./travel.module.css"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { useStaticQuery, graphql } from "gatsby"
import PhotoGrid from "../components/photogrid/grid"

import Map from "../map/map"

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
            fluid(maxWidth: 3000, quality: 100) {
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

  const gridRef = useRef();

  const scrollToGrid = (ref) => {
    console.log(ref);
    if (ref.current) { window.scrollTo(0, ref.current.offsetTop); }
  }

  let continentClickCallback = (c) => {
    setCurrentContinent(c);
    scrollToGrid(gridRef);
  }

  return(
  <Layout pageTitle="Earth">
    <SEO title="Earth - Travel" />
    <div className={styles.earthDescription}>What should we do with our time but to explore? I haven't seen much of the world, but the parts I have seen offered plenty of beautiful scenes and moments. Click on the continents to filter.</div>
    <Map continents={continents} onContinentClick={continentClickCallback}/>
    <hr className={styles.hrStyle}></hr>
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
