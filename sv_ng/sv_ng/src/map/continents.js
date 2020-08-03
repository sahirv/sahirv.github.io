import React, { useState } from "react"
import styles from "./continents.module.css"

const Continents = props => {
   let draw_continent = (entry) => {
      let path_html = [];
      for (let e in entry){
         path_html.push(
            <path d={entry[e]} />
         );
      }
      return path_html;
   }

   let continent_elements = {};
   let continents = props.continents;
   for (let c in continents) {
      continent_elements[continents[c].continent] = draw_continent(continents[c].path)
   }

   const [clickedContinent, setClickedContinent] = useState(undefined);

   return(
<svg
   onClick={() => {props.onContinentClick(undefined); setClickedContinent(undefined);}}
   version="1.0"
   width="100%"
   viewBox="0 0 468 200"
   preserveAspectRatio="xMidYMid meet"
   id="worldMap"
   className={styles.mapSVG}>
  {/*Africa */}
  <g
     onClick={(e) => {e.stopPropagation(); props.onContinentClick("africa"); setClickedContinent("africa");}}
     id="africa"
     transform="matrix(1.6963e-2,0,0,-1.6963e-2,0,239)"
     className={clickedContinent == "africa" ? styles.selected : null }>
     {continent_elements["africa"]}
  </g>
  {/*Asia*/}
  <g
     onClick={(e) => {e.stopPropagation(); props.onContinentClick("asia"); setClickedContinent("asia");}}
     id="asia"
     transform="matrix(1.6963e-2,0,0,-1.6963e-2,0,239)"
     className={clickedContinent == "asia" ? styles.selected : null }>
    {continent_elements["asia"]}
  </g>
  {/*Australia*/}
  <g
     onClick={(e) => {e.stopPropagation(); props.onContinentClick("australia"); setClickedContinent("australia");}}
     id="australia"
     transform="matrix(1.6963e-2,0,0,-1.6963e-2,0,239)"
     className={clickedContinent == "australia" ? styles.selected : null }>
    {continent_elements["australia"]}
  </g>
  {/*Europe*/}
  <g
     onClick={(e) => {e.stopPropagation(); props.onContinentClick("europe"); setClickedContinent("europe");}}
     id="europe"
     transform="matrix(1.6963e-2,0,0,-1.6963e-2,0,239)"
     className={clickedContinent == "europe" ? styles.selected : null }>
    {continent_elements["europe"]}
  </g>
  {/*South America*/}
  <g
     onClick={(e) => {e.stopPropagation(); props.onContinentClick("south america"); setClickedContinent("south america");}}
     id="south_america"
     transform="matrix(1.6963e-2,0,0,-1.6963e-2,0,239)"
     className={clickedContinent == "south america" ? styles.selected : null }>
    {continent_elements["south america"]}
  </g>
  {/*North America*/}
  <g
     onClick={(e) => {e.stopPropagation(); props.onContinentClick("north america"); setClickedContinent("north america");}}
     id="north_america"
     transform="matrix(1.6963e-2,0,0,-1.6963e-2,0,239)"
     className={clickedContinent == "north america" ? styles.selected : null }>
    {continent_elements["north america"]}
  </g>
</svg>
)
}

export default Continents