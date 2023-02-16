import React, { useRef } from "react"
import * as styles from "./travel.module.css"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { useStaticQuery, graphql } from "gatsby"
import PhotoGrid from "../components/photogrid/grid"

import Map from "../components/map/map"

const SecondPage = ({location}) => {
  const data = useStaticQuery(graphql`
  {
    thumbnails: allFile(filter: {sourceInstanceName: {eq: "earth"}}) {
      edges {
        node {
          childImageSharp {
            parent {
              ... on File {
                relativePath
              }
            }
            gatsbyImageData(layout: CONSTRAINED, width: 500, quality: 80, transformOptions: {fit: COVER, cropFocus: ATTENTION}, aspectRatio: 1.2, placeholder: BLURRED)
          }
        }
      }
    }
    images: allFile(filter: {sourceInstanceName: {eq: "earth"}}) {
      edges {
        node {
          childImageSharp {
            parent {
              ... on File {
                relativePath
              }
            }
            gatsbyImageData(layout: CONSTRAINED, width: 3000, quality: 72, placeholder: BLURRED)
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

  let urlParams = new URLSearchParams(location.search);
  let urlImage = urlParams ? urlParams.get('image') : undefined;

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
    <div className={styles.travelNav}>
        <div className={currentSection == "landscape" ? styles.travelNavButton + " " + styles.selected : styles.travelNavButton} onClick={() => setCurrentSection("landscape")}>Landscape</div>
        <div className={currentSection == "wildlife" ? styles.travelNavButton + " " + styles.selected : styles.travelNavButton} onClick={() => setCurrentSection("wildlife")}>Wildlife</div>
        <div className={currentSection == "portraits" ? styles.travelNavButton + " " + styles.selected : styles.travelNavButton} onClick={() => setCurrentSection("portraits")}>Portraits</div>
        <div className={currentSection == "all" ? styles.travelNavButton + " " + styles.selected : styles.travelNavButton}  onClick={() => setCurrentSection("all")}>All Photos</div>
        {/* <div className={currentSection == "map" ? styles.travelNavButton + " " + styles.selected : styles.travelNavButton} onClick={() => setCurrentSection("map")}>Map </div> */}
    </div>
    <div className={styles.childrenContainer}>
    { currentSection == "map" ?
      <div>
        <div className={styles.earthDescription}>This page is for me as much as it is for you. Here I present to you the pictures I've taken of everything that we can find on our own wonderful planet. I'm not a photographer by any means, but I'm trying to learn. Some of the pictures here are taken with smartphone cameras, and others with a DSLR. The map is there for me to document where I've been; ultimately the goal is to cover the whole thing with pins. Feel free to zoom in and click on a pin to see what I took a picture of at that spot on Earth. If you just want to see photos, check out the Wildlife and Photos tabs.</div>
        <div className={styles.continentContainer}>
          <Map continents={continents} onContinentClick={continentClickCallback} imageDetails={imageDetails} selectImageCallback={selectImageCallback}/>
        </div>
      </div> : <></> }
      <PhotoGrid
        location={location}
        gridRef={gridRef}
        continent={currentSection == "all" ? undefined : currentContinent} 
        thumbnails={data.thumbnails.edges} 
        images={data.images.edges} 
        imageDetails={imageDetails}
        pictureFromPin={currentPictureFromPin}
        imageCategory={currentSection}></PhotoGrid>
    </div>
  </Layout>
  );
}
export default SecondPage
