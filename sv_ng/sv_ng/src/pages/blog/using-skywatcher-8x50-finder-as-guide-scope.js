import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import * as styles from "./blog.module.css"

import Img from "gatsby-image"

const SecondPage = () => {
  const data = useStaticQuery(graphql`
  {
      assembly: file(relativePath: { eq: "finder-guide/full_assembly.JPG" }) {
        childImageSharp {
          fluid(maxWidth: 3000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      adapters: file(relativePath: { eq: "finder-guide/adapters.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 3000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      sharpcap: file(relativePath: { eq: "finder-guide/sharpcap.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
  }
  `);

  let blogDescription = "Many Sky-Watcher telescopes come with a decent quality 8x50 finder scope. I converted my scope into a guide scope for use with an ZWO ASI 120mm Mini."
  return (
  <Layout pageTitle="Sky-Watcher 8x50 Finder to Guide scope">
    <SEO title="Sky-Watcher 9x50 Finder to Guide scope" description={blogDescription}/>
    <div className={styles.childrenContainer}>
        <h1>How to Convert your Sky-Watcher 8x50 Finder into a Guide Scope</h1>
        <div className={styles.blogDescription}>{blogDescription}</div>
        <div className={styles.mediumLink}><a href="https://sahirvellani.medium.com/how-to-convert-your-sky-watcher-8x50-finder-into-a-guide-scope-56c62a81e710">Find this article on Medium here</a></div>
        <div className={styles.blogText}>The telescope I use for backyard astronomy and astrophotography is a Sky-Watcher EvoStar 100ED.
        It came with an 8x50 right angle finder scope (8x magnification with an aperture of 50mm). Since this is roughly the size of the average guidescope,
        I thought I could convert this to one. There are many people who have done this and there are plenty of posts about it in forums such as CloudyNights.
        Most people use <a href="https://www.firstlightoptics.com/adapters/astro-essentials-sky-watcher-9x50-finder-to-c-adapter.html">this</a> adapter to connect their camera to the scope. 
        I thought I could save money and have it 3D printed instead.
        </div>
        <div className={styles.blogText}>I'm not much of an expert in CAD so I looked on Thingiverse to see if I could find an STL file of the adapter.
        I found <a href="https://www.thingiverse.com/thing:3483611/files">this part</a> and thought it looked promising. Some quick searches revealed that the Datyson
        was similar to the ZWO 120mm Mini camera I own, so I had it printed from a local 3D printing shop for $5. Below on the left is the 3D printed part.
        </div>
        <div className={styles.blogImage}>
          <Img fluid={{...data.adapters.childImageSharp.fluid}} loading="eager"></Img>
        </div>
        <div className={styles.blogText}>The part threaded well into the Sky-Watcher finder, but didn't fit properly into the 1.25" thread on the camera.
        So I had to improvise. The 120mm Mini came with a 1.25" to C thread adapter. I simply took this adapter and super glued the female C thread side to the 
        1.25" side on the 3D printed adapter.</div>
        <div className={styles.blogText}>Unfortunately I hit one more snag. As I tested the camera and new guide scope on random objects in my room, I was unable
        to achieve focus. Turns out the camera was too close to the objective lens of the finder scope. In order to solve this issue, I used a junk 
        Celestron 1.25" T adapter I had lying around. I unscrewed the silver extension bit and T adapter, and was able to thread in the camera from one end.
        In the other end, I slid in the guide scope with the 3D printed adapter + superglued C adapter + 1.25" extension tube that came with the ZWO camera. 
        See the full assembly below.</div>
        <div className={styles.blogImage}>
          <Img fluid={{...data.assembly.childImageSharp.fluid}} loading="eager"></Img>
        </div>
        <div className={styles.blogText}>This solution was put together with things lying around my house, but overall the connection
        from the guide scope to the camera is very sturdy. I plugged my new guide scope into my computer, switched on Sharpcap, and the whole
        thing worked well. Here's a screenshot of Sharpcap as I pointed the scope to a trophy in my room.</div>
        <div className={styles.blogImage}>
          <Img fluid={{...data.sharpcap.childImageSharp.fluid}} loading="eager"></Img>
        </div>
        <div className={styles.blogText}>I had to do a lot of googling to find the right 3D printable adapter, as well as to determine whether the 8x50 finder
        would even work at all as a guide scope. I hope this post has helped to inform you that it is possible to convert your 8x50 finder into a guide scope, and
        that it works well! Some improvisation may be necessary to achieve correct focus, but that's all part of the fun. Clear skies!</div>
    </div>
  </Layout>)
}

export default SecondPage
