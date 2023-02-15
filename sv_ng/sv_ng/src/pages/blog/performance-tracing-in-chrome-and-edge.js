import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import * as styles from "./blog.module.css"

import Img from "gatsby-image"

const SecondPage = () => {
  const data = useStaticQuery(graphql`
  {
      splash: file(relativePath: { eq: "tracing/tracing-splash.png" }) {
        childImageSharp {
          fluid(maxWidth: 3000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
  }
  `);
  let blogDescription = "The tracing tab is a powerful tool that can be harnessed by web developers looking to streamline their websites and web-apps."
  return (
  <Layout pageTitle="Rendering Performance Tracing in Chromium-based Browsers">
    <SEO title="Rendering Performance Tracing in Chrome and Edge" description={blogDescription}/>
    <div className={styles.childrenContainer}>
        <h1>[chrome | edge]://tracing</h1>
        <div className={styles.blogDescription}>{blogDescription}</div>
        <div className={styles.blogText}>In this article, I explore what the Chromium renderer process is doing during a scroll, as an exercise for
        learning how browser tracing works. Think of the
        ://tracing tab as Dev Tools performance but on heavy steroids. For many web developers, dev tools is adequate in pointing out bottlenecks in
        scripts, page loads, networking and rendering. However, if one needs more information than what devtools provides, then tracing can definitely help.</div>
        <div className={styles.blogImage}>
          <Img fluid={{...data.splash.childImageSharp.fluid}} loading="eager"></Img>
        </div>
        <div className={styles.blogSubheading}>Chromium Multiprocess Architecture</div>
        <div className={styles.blogText}>A browser is a vastly complicated piece of software, and one would require an entire textbook to explain how it works
        in detail. However, knowing the <a href="https://www.chromium.org/developers/design-documents/multi-process-architecture">high level process architecture</a>
        &nbsp;will help us in understanding what we see in our traces.</div>
        <div className={styles.blogText}> In order to keep the browser reliable and secure, Chromium employs a multi-process architecture. There's one browser
        process, a renderer process for each tab (and cross domain iframes), and one gpu process. The browser process is the "main" process, responsible for
        running the ui and managing tabs and plugins. This includes processing user input and delegating it to the right tab. The renderer process is where
        a lot of the magic happens. It houses Blink, the Chromium rendering engine, responsible for executing the document lifecycle - a process which converts
        HTML and CSS to data structures that can be converted into bitmaps and subsequently shown on screen. The role of the&nbsp;
        <a href="https://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome">GPU process</a> is to provide
        the renderer, which is sandboxed, access to OS specific 3D APIs. The renderer process issues commands via the Command Buffer to communicate with the
        GPU process, which can call on GL or D3D.</div>
        <div className={styles.blogSubheading}>Renderer Process and the Document Lifecycle</div>
        <div className={styles.blogText}>The renderer is the primary process responsible for producing output. It is a multithreaded process, with two important
        threads - main thread and compositor thread. The main thread houses Blink, the Chrome (and now Edge) rendering engine. Blink executes V8 compiled JavaScript, 
        such as invoking callbacks and dispatching events, and runs the document lifecycle; a process which involves computing style, layout, compositing, and painting outputs.
        In addition to the aforementioned, Blink also handles input events if they are routed to the main thread.
        </div>
        <div className={styles.blogText}> A bulk of the conversion from HTML/CSS code to data structures that the browser can use to generate a bitmap happens 
        during the document lifecycle. The first step is building the Document Object Model (DOM) tree. HTML is parsed, and Blink converts it into a DOM tree 
        with nodes being elements. An element's <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM">Shadow DOM</a> is parsed as
        its own tree; therefore, the DOM tree is thought of as a "composed tree", or a tree of trees. A composed tree can be thought of as one big tree; however, the
        distinction here is that a shadow host can not see a shadow root, but the opposite is possible. Once the DOM tree is built, styles are resolved for each
        node. Here, the style engine is responsible for aggregating all rules from stylesheets and default rules, resolving conflicts, and computing the final style
        of the element. These styles are stored in a big map called&nbsp;
        <a href="https://source.chromium.org/chromium/chromium/src/+/master:third_party/blink/renderer/core/style/computed_style.h;l=199">ComputedStyle</a>. After styles
        are resolved, the DOM tree is converted into a layout tree. In this process, the visual geometry of all the objects is determined. Upon the construction of our
        layout tree, the Compositing lifecycle begins. Compositing is the process of composing a layer tree from the layout tree. Rather than paint the entire layout
        tree in one go, Blink splits the page into layers. The main advantage here is that the browser can update only the layers it needs to when parts of the page
        change, rather than the everything.
        </div>
        <div className={styles.blogText}>
        Finally, it's painting time. Paint issues a series of "paint operations" to a DisplayItem list. A paint op would be something like "draw a rectangle
        at these coordinates, in this color". It is important to note that painting is done in a stacking order, rather than DOM order. This means that items with the
        lowest z-index are painted first. Additionally, it is possible that different parts within an element can be painted at different times. 
        </div>
        <div className={styles.blogText}>Everything mentioned above happens on the main thread of the renderer. Painted output is committed to the compositor
        thread, where it is rasterized. Rasterization invloves splitting the layer into tiles and converting the tiles painted output into a bitmap. Once a 
        tile is rasterized, the compositor thread creates a draw quad for it; which is a command to draw the tile at its particular location. These quads then
        get packaged into a "Compositor Frame", which is the output of the renderer process, and sent to the browser process to be presented to the screen; with the help
        of the GPU process.</div>
        <div className={styles.blogSubheading}>The Tracing Tab</div>
        Now that you have some background on what your browser does, we can move on to tracing. Here are step by step instructions on how to collect a trace.
        <ol>
        <li>If using Google Chrome, the tracing tab can be reached by navigating to chrome://tracing. On Microsoft Edge it would be edge://tracing. </li>
        </ol>
        <div className={styles.blogSubheading}>Using //tracing to Understand What Your Website is Doing</div>
        <div className={styles.blogSubheading}>References</div>
        <div className={styles.blogText}>
        https://www.chromium.org/developers/design-documents/multi-process-architecture
        https://docs.google.com/presentation/d/1i1Brb5FTmjStDpnUeKBphKZOJVjZzpM_rv5Wb3TMMtU/edit#slide=id.g28a69a47b7_0_18
        https://docs.google.com/document/d/1aitSOucL0VHZa9Z2vbRJSyAIsAz24kX8LFByQ5xQnUg/edit
        </div>
    </div>
  </Layout>)
}

export default SecondPage
