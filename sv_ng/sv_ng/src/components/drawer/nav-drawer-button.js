import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./drawer.module.css"

const NavDrawerButton = ({toggle, showDrawer}) => {
    let top_open = styles.rect_top_active  + " " + styles.rectstyle ;
    let middle_open = styles.rect_middle_active  + " " + styles.rectstyle ;
    let bottom_open = styles.rect_bottom_active  + " " + styles.rectstyle ;
    return (
        <div className={styles.navDrawerButton}>
                        {/* Made with Inkscape */}
            <svg className={styles.buttonContainer} onClick={() => toggle()}>
                <g id="layer1">
                    <path
                    className={showDrawer ? top_open : styles.rectstyle}                
                    d="m 4.8823464,4.1102541 34.2857196,0 0,2.57142 -34.2857196,0 z"
                    id="rect_top"
                    />
                    <path
                    id="rect_middle"
                    d="m 4.9966364,13.938824 34.2857196,0 0,2.57142 -34.2857196,0 z"
                    className={showDrawer ? middle_open : styles.rectstyle} />
                    <path
                    className={showDrawer ? bottom_open : styles.rectstyle}   
                    d="m 4.9966364,23.338824 34.2857196,0 0,2.57142 -34.2857196,0 z"
                    id="rect_bottom" />
                </g>
            </svg>
        </div> 
    );
}

NavDrawerButton.propTypes = {
    toggle: PropTypes.func
}

export default NavDrawerButton
