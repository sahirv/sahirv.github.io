import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./layout.module.css"

const NavDrawerButton = ({toggle}) => {
    return (
        <div className={styles.navDrawerButton} onClick={() => toggle()}>
            <i class="fa fa-bars"></i>
        </div> 
    );
}

NavDrawerButton.propTypes = {
    toggle: PropTypes.func
}

export default NavDrawerButton
