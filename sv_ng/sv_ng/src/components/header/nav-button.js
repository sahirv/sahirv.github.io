import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import * as styles from "./header.module.css"

const NavButton = props => (

    <div className={styles.navbutton}>
        <Link to={props.to} className={styles.navlink}>{props.children}</Link>
    </div>
)

NavButton.propTypes = {
  
}

NavButton.defaultProps = {
 
}

export default NavButton
