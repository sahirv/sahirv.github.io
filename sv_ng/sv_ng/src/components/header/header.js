import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import NavButton from "./nav-button"

class Header extends React.Component {
  constructor(props) {
    super(props);
    
  }

  propTypes = {
    siteTitle: PropTypes.string,
    opacityIndex: PropTypes.number,
    pageTitle: PropTypes.string,
  };
  
  defaultProps = {
    siteTitle: ``,
    opacityIndex: 0.5,
    pageTitle: "Sahir Vellani",
  };

  render() {
    return (<header
      style={{
        position: 'fixed',
        width: '100%',
        background: 'rgba(10, 10, 10, 0.9)',
        opacity: this.props.opacityIndex + 0.3,
        transition: 'opacity 0.2s ease-in-out',
        zIndex: 1,
        top: 0,
      }}
    >
      <div style={{
        padding: `0.2rem 1.0875rem`,
        float: "left",
        display: this.props.pageTitle === "Sahir Vellani" ? "none" : "inline-block",
      }}>
        <NavButton to="/">Sahir Vellani</NavButton>
      </div>
      <div
        style={{
          maxWidth: 960,
          padding: `0.2rem 1.0875rem`,
          float: "right",
        }}
      >
        <NavButton to="/astro/">Space</NavButton>
        <NavButton to="/travel/">Earth</NavButton>
        {/* <NavButton to="/tech/">Tech</NavButton> */}
      </div>
    </header>);
  }
}

export default Header
