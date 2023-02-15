import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "font-awesome/css/font-awesome.css"
import * as styles from "./index.module.css"
/* swithc mobile styles and styles and add style condition if mobile*/
import Img from "gatsby-image"
import { useStaticQuery, graphql, Link } from "gatsby"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
  {
    astroImage: file(relativePath: { eq: "milkywaypanorama.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    earthImage: file(relativePath: { eq: "tahoe.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    blogImage: file(relativePath: { eq: "rb16.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    videoImage: file(relativePath: { eq: "atv.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  `);

  return (
    <Layout pageTitle="Sahir Vellani">
      <SEO title="Home" />
      {/* <hr className={styles.mainDivider}></hr> */}
      <div className={styles.informationBlockContainer}>
      <div className={styles.astroTitleTextMobile}>Photography</div>
        <Link to={"/photography/"}>
          <div className={styles.informationBlock}>
            <div className={styles.astroTitle}>
              <Img fluid={{...data.earthImage.childImageSharp.fluid, aspectRatio: 1.75}} className={styles.astroTitleImage} imgStyle={{objectFit: "cover"}} fadeIn={true} loading="eager"/>
            </div>
            <div className={styles.astroDescription}>
            <div className={styles.astroTitleText}>Photography</div>
              Our planet as I see it. Here you will find images of human life, wildlife, and landscapes. 
            I try to document the images as best as I can, and share what they mean to me. You will also find a map that shows where each image 
            has been taken. Hopefully it is completely red at some point in my life.</div>
          </div>
        </Link>
        <div className={styles.astroTitleTextMobile}>Astrophotography</div>
        <Link to={"/astro/"}>
          <div className={styles.informationBlock}>
            <div className={styles.astroDescription}>
            <div className={styles.astroTitleText}>Astrophotography</div>
              My astrophotography portfolio. I've been amazed by the cosmos my entire life, 
            and I'm very lucky to have the priviledge of exploring them. The sky is home to many jewels, and it would be selfish of me not 
            to share them with you. All photos have been taken and processed by myself.</div>
            <div className={styles.astroTitle}>
              <Img fluid={{...data.astroImage.childImageSharp.fluid, aspectRatio: 1.75}} className={styles.astroTitleImage} imgStyle={{objectFit: "cover"}} fadeIn={true} loading="eager"/>
            </div>
          </div>
        </Link>
        <div className={styles.astroTitleTextMobile}>Blog</div>
        <Link to={"/blog/"}>
          <div className={styles.informationBlock}>
            <div className={styles.astroTitle}>
              <Img fluid={{...data.blogImage.childImageSharp.fluid, aspectRatio: 1.75}} className={styles.astroTitleImage} imgStyle={{objectFit: "cover"}} fadeIn={true} loading="eager"/>
            </div>
            <div className={styles.astroDescription}>
            <div className={styles.astroTitleText}>Blog</div>
              My musings. Blog posts that cover a range of topics from web development and programming to 
            astrophotography. I do this with the intention that the learnings over the course of my professional and recreational journies so far 
            can help others achieve their goals. </div>
          </div>
        </Link>
        <div className={styles.astroTitleTextMobile}>Videography</div>
        <Link to={"/videos/"}>
          <div className={styles.informationBlock}>
            <div className={styles.astroDescription}>
            <div className={styles.astroTitleText}>Videography</div>
              Documenting adventures in motion picture. </div>
            <div className={styles.astroTitle}>
              <Img fluid={{...data.videoImage.childImageSharp.fluid, aspectRatio: 1.75}} className={styles.astroTitleImage} imgStyle={{objectFit: "cover"}} fadeIn={true} loading="eager"/>
            </div>
          </div>
        </Link>
      </div>

      <div className={styles.about}>
        <h3>About</h3>
        <p>Welcome to my abode on the web. This website serves multiple purposes. First, it is the platform that I have chosen to share 
          images that I've taken of the heavens and earth. This is for me as much as it is for you. I've always wanted to explore not just 
          the world around me, but the universe as well. Maintaining this website allows me to record my journey, as I explore the universe. 
          Another purpose of the site is to offer insights as I navigate through my professional journey. I am a software engineer at 
          Microsoft, working on the Edge browser. As a developer on the web platform team, I've been able to learn quite a bit about how 
          browsers (especially chromium based ones) operate. Therefore, I will use this space to also share ideas and tools that I have 
          found interesting and useful as a developer of the browser and developer for the browser.
        </p>
      </div>
      
      <footer style={{background: 'rgb(248,248,248)', marginTop: '20px'}}>
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
              <a  href="http://instagram.com/sahirv.photos">
                <i class="fa fa-instagram"></i>
              </a>
            </div>
            <div class="footericon">
              <a  href="https://www.youtube.com/channel/UCQbjLiDQUu-gUJ-drcX-8MQ">
                <i class="fa fa-youtube"></i>
              </a>
            </div>
      </footer>
    </Layout>
  )
}

export default IndexPage
