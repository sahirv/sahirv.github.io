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
import NavDrawer from "./nav-drawer"
import NavDrawerButton from "./nav-drawer-button"
import "./layout.css"

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

  let handleScroll = (entries, observer) => {
    let intersectionRatio = entries[0].intersectionRatio;
    setTitleSize(intersectionRatio > 0.7 ? 1.0 : intersectionRatio + 0.2);
    setOpacityIndex(1.5 - intersectionRatio);
    let colorVal = isEarthPage() ? (1 - intersectionRatio ) * 226 + 10 : 'rgb(236, 236, 236)';
    setTitleColor('rgb(' + colorVal + ','+ colorVal + ','+ colorVal + ')');
  }

  let handleResize = (entries) => {
    let width;
    if (entries[0].contentBoxSize) {
      if (entries[0].contentBoxSize.inlineSize){
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
  let titleStyle = {
    textAlign: `left`,
    marginBottom: `16rem`,
    marginLeft: `2rem`,
    marginRight: `3rem`,
    //position: `sticky`,
    //fontSize: '7vw',//titleSize > 3.1 ? titleSize + "rem" : 3.1 + "rem",
    fontSize: '7vw',
    //transform: 'scale(' + titleSize + ')',
    transition: '0.15s ease-in-out',
    transformOrigin: 'top',
    top: `0.7rem`,
    color: 'rgb(236, 236, 236)',
    fontWeight: 300,
    zIndex: 2,
  };

  let thresholds = [];
  for (let i = 0.0; i <= 1.0; i+=0.1){
    thresholds.push(i);
  }

  useEffect(() => {
    let options = {
      rootMargin: '0px',
      threshold: thresholds
    }
    let resize_observer = new ResizeObserver(handleResize);
    let observer = new IntersectionObserver(handleScroll, options);
    if (ref.current) {
      observer.observe(ref.current);
      resize_observer.observe(ref.current);
    }
  }, [ref]);

  let toggle = () => {
    setShowDrawer(!showDrawer);
  }

  return (
    <>
      <Header opacityIndex={opacityIndex} pageTitle={pageTitle}/>
      <NavDrawerButton toggle={() => toggle()} className={styles.showDrawerButton}/>

      <div style={{height: '4rem', width: '100%', marginTop: '8rem'}} ref={ref} ></div>
      <div style={titleStyle} className='maintitle'>
        {pageTitle}
      </div>
      <SplashImage pageTitle={pageTitle} isMobile={isMobile}/>

      <div class="mainlinkbar" style={{display: pageTitle == "Sahir Vellani" ? "block" : "none"}}>
        <div class="mainlinkcontainer">
          <Link to={"/astro/"} class="mainlink">Space</Link>
        </div>
        <div class="mainlinkcontainer">
          <Link to={"/travel/"} class="mainlink">Earth</Link>
        </div>
      </div>
      
      <div
        style={{
          margin: `0 auto`,
          //maxWidth: 1200,
          padding: `0 1.0875rem 1.45rem`,
          background: '#fdfdfd',
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
