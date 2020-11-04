/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState, useRef } from "react"
import PropTypes, { nominalTypeHack } from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import styles from "./layout.module.css"

import Header from "./header/header"
import SplashImage from "./images/splash-image"
import NavDrawer from "./drawer/nav-drawer"
import NavDrawerButton from "./drawer/nav-drawer-button"
import "./layout.css"
import "./drawer/drawer.css"

const Layout = ({ children, pageTitle }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  
  let isEarthPage = () => {return pageTitle == 'Earth';}
  let isHomePage = () => {return pageTitle == 'Sahir Vellani';}
  let isAstroPage = () => {return pageTitle == 'Astro';}

  let handleResize = (entries) => {
    let width;
    if (entries[0].contentBoxSize) {
      if (entries[0].contentBoxSize.inlineSize != undefined){
        width = entries[0].contentBoxSize.inlineSize;
      }
      else {
        width = entries[0].contentBoxSize[0].inlineSize;
      }
    } else {
      width = entries[0].contentRect.width;
    }
    if (width < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  const [titleSize, setTitleSize] = useState(1);
  const [opacityIndex, setOpacityIndex] = useState(0.5);
  const [titleColor, setTitleColor] = useState(isEarthPage() ? 'rgb(10,10,10)' : 'rgb(236, 236, 236)');
  const [showDrawer, setShowDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const ref = useRef();


  useEffect(() => {
    let resize_observer = new ResizeObserver(handleResize);
    if (ref.current) {
      resize_observer.observe(ref.current);
    }
  }, [ref]);

  let toggle = () => {
    setShowDrawer(!showDrawer);
  }

  let classToShow = isHomePage() ? styles.maintitle + " " + styles.mainTitleHome : styles.maintitle + " " + styles.mainTitleOther

  return (
    <>
      {!isMobile ? <Header opacityIndex={opacityIndex} pageTitle={pageTitle}/> : "" }
      {isMobile ? <NavDrawerButton toggle={() => toggle()} showDrawer={showDrawer} className={styles.showDrawerButton}/> : ""}
      <div className={classToShow} ref={ref}>
        {pageTitle}
      </div>
      <SplashImage pageTitle={pageTitle} isMobile={isMobile}/>

      {!isMobile ? 
        <div class="mainlinkbar" style={{display: isHomePage() ? "block" : "none"}}>
          <div class="mainlinkcontainer">
            <Link to={"/astro/"} class="mainlink">Space</Link>
          </div>
          <div class="mainlinkcontainer">
            <Link to={"/travel/"} class="mainlink">Earth</Link>
          </div>
        </div> 
        : "" }
      
      <div
        style={{
          margin: `0 auto`,
          padding: `0 1.0875rem 1.45rem`,
          background: '#fdfdfd',
          zIndex: 1
        }}
      >
        <main>{children}</main>
      </div>
      <NavDrawer showDrawer={showDrawer} toggle={() => toggle()}/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
}

export default Layout
