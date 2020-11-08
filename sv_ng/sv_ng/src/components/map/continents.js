import React, { useState, createRef, useRef, useEffect } from "react"
import styles from "./continents.module.css"
import Thumbtack from "./thumbtack.js"

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

    let mapRef = useRef(null);

    for (let c in continents) {
        continent_elements[continents[c].continent] = draw_continent(continents[c].path)
    }

    let matrix = props.matrix;  

    // generate pins
    let pins = [];
    for (var i in props.imageDetails){
        let image = props.imageDetails[i];
        pins.push(<Thumbtack matrix={props.matrix} imageDetails={image} clickCallback={props.selectImageCallback}/>);
    }

    useEffect(() => {
        if (matrix && mapRef.current){
            if (mapRef.current.transform.baseVal.numberOfItems){
                mapRef.current.transform.baseVal.getItem(0).setMatrix(matrix);
            } else {
                mapRef.current.transform.baseVal.appendItem(mapRef.current.createSVGTransformFromMatrix(matrix));
            }
        }
    });

    const [clickedContinent, setClickedContinent] = useState(undefined);

    return(
        <div id="worldMapContainer">
            <svg
                onClick={() => {props.onContinentClick(undefined); setClickedContinent(undefined);}}
                version="1.0"
                width="100%"
                viewBox="40 0 385 205"
                id="worldMap"
                ref={mapRef}
                style={{transformOrigin: "0 0"}}>
                
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
                {pins}
            </svg>
            
        </div>
    )
}

export default Continents