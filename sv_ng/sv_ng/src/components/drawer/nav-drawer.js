import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./drawer.module.css"
import HomeIcon from "../../svg/homelogo.svg"
import "./drawer.css"

const NavDrawer = ({showDrawer, toggle}) => {
    
    let drawer_open = styles.navDrawerContainer + " draweropen";
    let drawerClass = showDrawer ? drawer_open : styles.navDrawerContainer;
    return (
        <div className={drawerClass}>
            <div className={styles.navDrawer}>
                <div className={styles.drawerLinksContainerGroup}>
                    <div className={styles.drawerLinkContainer}>
                        <Link to="/" className={styles.drawerLink} onClick={() => toggle()}>Home</Link>
                    </div>
                    <div className={styles.drawerLinkContainer}>
                        <Link to="/astro/" className={styles.drawerLink} onClick={() => toggle()}>Space</Link>
                    </div>
                    <div className={styles.drawerLinkContainer}>
                        <Link to="/travel/" className={styles.drawerLink} onClick={() => toggle()}>Earth</Link>
                    </div>
                    <div className={styles.drawerLinkContainer}>
                        <Link to="/blog/" className={styles.drawerLink} onClick={() => toggle()}>Blog</Link>
                    </div>
                </div>
            </div>
            <div className={styles.drawerOverlay} onClick={() => toggle()}></div>
        </div> 
    );
}

NavDrawer.propTypes = {
    toggle: PropTypes.func
}

export default NavDrawer
