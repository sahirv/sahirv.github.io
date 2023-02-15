import React, { useState, useEffect } from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import * as styles from "./astro.module.css"
import { Link } from "gatsby"

const AstroLayout = ({children, section}) => {
    return (
        <Layout pageTitle="Space">
            <div className={styles.astroNav}>
                <div className={section == "images" ? styles.astroNavButton + " " + styles.selected : styles.astroNavButton}>
                    <Link to={"/astro/"}>Gallery</Link>
                </div>
                {/* <div className={section == "equipment" ? styles.astroNavButton + " " + styles.selected : styles.astroNavButton}>
                    <Link to={"/astro/equipment"}>Equipment</Link>
                </div>
                <div className={section == "blog" ? styles.astroNavButton + " " + styles.selected : styles.astroNavButton}>
                    <Link to={"/astro/blog"}>Blog</Link>
                </div> */}
            </div>
            <SEO title="Astrophotography" />
            <div className={styles.childrenContainer}>
                <main>{children}</main>
            </div>
        </Layout>
    );
}

export default AstroLayout
