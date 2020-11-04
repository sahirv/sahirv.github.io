import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "font-awesome/css/font-awesome.css"
import styles from "./index.module.css"

const IndexPage = () => (
  <Layout pageTitle="Sahir Vellani">
    <SEO title="Home" />
    <div className={styles.about}>
      <h3>About</h3>
      <p>This website serves as a repository containing images of things that I found beautiful in our universe. As I document the world around and above me, 
        I'll also share my learnings so that they may benefit others as well. 
      </p>
      <p>To learn about me or my professional work, check out my LinkedIn and Github profiles.</p>
    </div>
    <footer style={{background: '#fdfdfd',}}>
          <div class="footericon">
            <a  href="http://github.com/sahirv">
              <i class="fa fa-github"></i>
            </a>
          </div>
          <div class="footericon">
            <a  href="http://linkedin.com/in/sahirvellani">
              <i class="fa fa-linkedin"></i>
            </a>
          </div>
          <div class="footericon">
            <a  href="http://instagram.com/sahir.vellani">
              <i class="fa fa-instagram"></i>
            </a>
          </div>
        </footer>
  </Layout>
)

export default IndexPage
