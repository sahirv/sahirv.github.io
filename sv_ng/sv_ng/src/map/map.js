import React from "react"
import Continents from "./continents.js"

const Map = props => {
    return (
        <div>
            <Continents continents={props.continents} onContinentClick={props.onContinentClick}/>
        </div>
    );
}

export default Map