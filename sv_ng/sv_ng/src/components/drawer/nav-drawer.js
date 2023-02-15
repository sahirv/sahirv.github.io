import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import * as styles from "./drawer.module.css"
import AstroIcon from "../../svg/astrologo.svg"
import HomeIcon from "../../svg/homelogo.svg"
import TechIcon from "../../svg/techlogo.inline.svg"
import PhotosIcon from "../../svg/camera.svg"
import FilmIcon from "../../svg/film.svg"
import "./drawer.css"

const NavDrawer = ({showDrawer, toggle}) => {
    
    let drawer_open = styles.navDrawerContainer + " draweropen";
    let drawerClass = showDrawer ? drawer_open : styles.navDrawerContainer;
    return (
        <div className={drawerClass}>
            <div className={styles.navDrawer}>
                <div className={styles.drawerLinksContainerGroup}>
                    <div className={styles.drawerLinkContainer}>
                        <Link to="/" className={styles.drawerLink} onClick={() => toggle()}><div className={styles.iconContainer}><HomeIcon /></div>Home</Link>
                    </div>
                    <div className={styles.drawerLinkContainer}>
                        <Link to="/astro/" className={styles.drawerLink} onClick={() => toggle()}><div className={styles.iconContainer}><AstroIcon /></div>Astrophotography</Link>
                    </div>
                    <div className={styles.drawerLinkContainer}>
                        <Link to="/photography/" className={styles.drawerLink} onClick={() => toggle()}><div className={styles.iconContainer}><PhotosIcon /></div>Photography</Link>
                    </div>
                    <div className={styles.drawerLinkContainer}>
                        <Link to="/videos/" className={styles.drawerLink} onClick={() => toggle()}><div className={styles.iconContainer}><FilmIcon /></div>Videography</Link>
                    </div>
                    <div className={styles.drawerLinkContainer}>
                        <Link to="/blog/" className={styles.drawerLink} onClick={() => toggle()}><div className={styles.iconContainer}><TechIcon /></div>Blog</Link>
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
