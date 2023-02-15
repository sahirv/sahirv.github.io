import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import NavButton from "./nav-button"
import * as styles from "./header.module.css"
import AstroIcon from "../../svg/astrologo.svg"
import EarthIcon from "../../svg/landscapelogo.svg"
import HomeIcon from "../../svg/homelogo.svg"
import TechIcon from "../../svg/techlogo.inline.svg"
import PhotosIcon from "../../svg/camera.svg"
import FilmIcon from "../../svg/film.svg"

const Header = (props) => {

  const [count, setCount] = useState(false);

  useEffect(() => {
    setCount(true);
  }, [])

  return (<header
    style={{
      position: 'fixed',
      width: '100%',
      background: 'rgba(10, 10, 10, 0.98)',
      transition: 'opacity 0.2s ease-in-out',
      zIndex: 1,
      top: 0,
    }}
  >
  { count ?
    <div style={{
      paddingLeft: "11%",
      float: "left",
    }}>
      <NavButton to="/"><HomeIcon /></NavButton>
    </div>
    : ""}
    <div
      className={"a"}
      style={{
        maxWidth: 960,
        paddingRight: `12%`,
        float: "right",
      }}
    >
      <NavButton to="/astro/"><AstroIcon /></NavButton>
      <NavButton to="/photography/"><PhotosIcon /></NavButton>
      <NavButton to="/videos/"><FilmIcon /></NavButton>
      <NavButton to="/blog/"><TechIcon /></NavButton>
    </div>
  </header>);
}

export default Header
