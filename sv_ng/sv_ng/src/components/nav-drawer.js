import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./layout.module.css"

const NavDrawer = ({showDrawer, toggle}) => {
    
    let open = styles.navDrawerContainer + " draweropen";
    let drawerClass = showDrawer ? open : styles.navDrawerContainer;
    return (
        <div className={drawerClass}>
            <div className={styles.navDrawer}>
                <div className={styles.drawerCloseButton}>
                    <svg width="40" height="40" version="1.1" onClick={() => toggle()}>
                        <g><path d="M 2,6 4,4 34,34 32,36 " /></g> 
                        <g><path d="M 32,4 34,6 4,36 2,34 " /></g> 
                    </svg>
                </div>
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
