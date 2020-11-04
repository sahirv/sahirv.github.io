import React, { useRef, useEffect, useState } from "react"
import Continents from "./continents.js"
import styles from "./continents.module.css"

const Map = props => {
    let ref = useRef(null);
    let matrixRef = useRef();
    let [scale, setScale] = useState({val: 0, x: 0, y: 0});

    let func = (event) => {
            event.preventDefault();
            let map = event.currentTarget.children.worldMapContainer.children.worldMap;
            let zoom = event.deltaY > 0 ? -1 : 1;
            let scale_factor = 1 + 0.035 * zoom;
            let x = event.pageX - event.currentTarget.offsetLeft;
            let y = event.pageY - event.currentTarget.offsetTop;
            let transform = map.transform.baseVal[0];

            if (transform != undefined){
                let totalZoom = transform.matrix.a;

                if (zoom < 1 && totalZoom <= 1) {
                    return;
                }

                let tx = transform.matrix.e;
                let ty = transform.matrix.f;
                
                let transformedWidth = map.scrollWidth * totalZoom;
                let transformedHeight = map.scrollHeight * totalZoom;

                // Configure zoom out, latch to one corner once it is visible
                if (zoom < 1) {
                    if (tx >= 0) {
                        x = 0;
                    }
                    if (transformedWidth + tx - map.scrollWidth <= 0) {
                        x = map.scrollWidth;
                    }
                    if (ty >= 0) {
                        y = 0;
                    }
                    if (transformedHeight + ty - map.scrollHeight <= 0) {
                        y = map.scrollHeight;
                    }
                }
            }
            let mat = map.createSVGMatrix()
                .translate(x, y)
                .scale(scale_factor, scale_factor)
                .translate(-x, -y);
            if (matrixRef.current){
                mat = mat.multiply(matrixRef.current);
            }
            matrixRef.current = mat;

            //trigger render
            setScale(matrixRef.current);
    }
    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener("wheel", func);
            return function () {
                ref.current.removeEventListener("wheel", func);
              }
        }
    }, [ref]);

    return (
        <div ref={ref} className={styles.map} id="mapcontainer">
            <Continents continents={props.continents} 
                        onContinentClick={props.onContinentClick} 
                        matrix={matrixRef.current} 
                        imageDetails={props.imageDetails}/>
        </div>
    );
}

export default Map