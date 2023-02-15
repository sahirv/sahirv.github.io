import React, { useState, createRef, useRef, useEffect } from "react"
import * as styles from "./continents.module.css"

const Thumbtack = props => {

    let pinRef = useRef(null);

    useEffect(() => {
        if (props.matrix && pinRef.current){
            let icon = pinRef.current.children[0].children[0];
            let pinhead = icon.children[1];
            let pin = icon.children[0];
 
            pinhead.rx.baseVal.value = pinhead.ry.baseVal.value = 20 / props.matrix.a;
            pinhead.cx.baseVal.value =  34 + 3 - (3 / props.matrix.a);
            pinhead.cy.baseVal.value = 40 + 50 - (50 / props.matrix.a);
            pinhead.style.strokeWidth = 3 / props.matrix.a;

            pin.width.baseVal.value = 2 / props.matrix.a;
            pin.height.baseVal.value = 50 / props.matrix.a;
            pin.x.baseVal.value = 34 + 3 - 1.5*(3 / props.matrix.a);
            pin.y.baseVal.value = 40 + 50 - (50 / props.matrix.a);
        }
    });

    return(
        <svg ref={pinRef}>
            <svg
                version={"1.1"}
                style={{position: "absolute",top: 0, left: 0, height: "85px", width: "60px"}}
                onClick={(e) => {
                    e.stopPropagation();
                    props.clickCallback(props.imageDetails.image)}}>
                <g
                    className={styles.thumbtack}
                    style={{transform: "translate(" + props.imageDetails.x + "px, " + props.imageDetails.y + "px) scale(0.2)"}}>
                    <rect
                    style={{fill:"#9b9b9b",fillOpacity:1,fillRule:"evenodd"}}
                    id={"rect3348"}
                    width={"3"}
                    height={"50"}
                    x={"34"}
                    y={"40"} />
                    <ellipse
                    className={styles.pinhead}
                    id={"path3338"}
                    cx={"36"}
                    cy={"40"}
                    rx={"20"}
                    ry={"20"} />
                </g>
            </svg>
        </svg>
    )
}

export default Thumbtack