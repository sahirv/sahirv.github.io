/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

import Header from "./header/header"
import SplashImage from "./images/splash-image"
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

  let handleScroll = (entries, observer) => {
    let intersectionRatio = entries[0].intersectionRatio;
    setTitleSize(intersectionRatio > 0.7 ? 1.0 : intersectionRatio + 0.2);
    setOpacityIndex(1.5 - intersectionRatio);
    let colorVal = isEarthPage() ? (1 - intersectionRatio ) * 226 + 10 : 'rgb(236, 236, 236)';
    setTitleColor('rgb(' + colorVal + ','+ colorVal + ','+ colorVal + ')');
  }
  const [titleSize, setTitleSize] = useState(1);
  const [opacityIndex, setOpacityIndex] = useState(0.5);
  const [titleColor, setTitleColor] = useState(isEarthPage() ? 'rgb(10,10,10)' : 'rgb(236, 236, 236)');

  const ref = useRef();
  let titleStyle = {
    textAlign: `center`,
    marginBottom: `10rem`,
    marginLeft: `1rem`,
    marginRight: `3rem`,
    position: `sticky`,
    fontSize: '7vw',//titleSize > 3.1 ? titleSize + "rem" : 3.1 + "rem",
    transform: 'scale(' + titleSize + ')',
    transition: '0.15s ease-in-out',
    transformOrigin: 'top',
    top: `0.7rem`,
    color: titleColor,
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
    
    let observer = new IntersectionObserver(handleScroll, options);
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  return (
    <>
      <Header opacityIndex={opacityIndex} pageTitle={pageTitle}/>
      <div style={{height: '4rem', width: '100%', marginTop: '8rem'}} ref={ref} ></div>
      <div style={titleStyle}>
        {pageTitle}
      </div>
      <SplashImage pageTitle={pageTitle}/>

      <div class="mainlinkbar" style={{display: pageTitle == "Sahir Vellani" ? "block" : "none"}}>
        <div class="mainlinkcontainer">
          <Link to={"/astro/"} class="mainlink">Astrophotography</Link>
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
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
}

export default Layout
