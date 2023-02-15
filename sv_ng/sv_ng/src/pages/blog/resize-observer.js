import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import * as styles from "./blog.module.css"

import Img from "gatsby-image"

const SecondPage = () => {
  const data = useStaticQuery(graphql`
  {
    images: allFile(filter: {sourceInstanceName: {eq: "blog"}, relativeDirectory: {in: "resize-observer"}}) {
      edges {
        node {
          childImageSharp {
            fluid(maxHeight: 2000, quality: 72) {
              originalName
              ...GatsbyImageSharpFluid
              src
            }
          }
        }
      }
    }
  }
  `);
  let image = data.images.edges[0];
  let blogDescription = "ResizeObserver is a JavaScript web API that allows you to run code whenever an element's size changes."
  return (
  <Layout pageTitle="Resize Observer">
    <SEO title="Resize Observer" description={blogDescription}/>
    <div className={styles.childrenContainer}>
        <h1>Detecting when an element changes size with ResizeObserver</h1>
        <div className={styles.blogDescription}>{blogDescription}</div>
        <div className={styles.blogText}>Before getting into the ResizeObserver, let's first get refreshed on the different boxes HTML elements are made of.
        A standard element, take a <code>{"  <div> "}</code>for example, consists of a content box, and border box. The content box, depicted in blue in the image below,
        consists of all the content within the padding of the element. The border box consists of the border and everything within it.</div>
        <div className={styles.blogImage}>
          <Img fluid={{...image.node.childImageSharp.fluid}} loading="eager"></Img>
        </div>
        <div className={styles.blogText}>As a web developer, you may want to choose which box size is relevant for your application. If it's just the 
        content-box, then you can use ResizeObserver to observe only the content box. If you anticipate changes to padding or border, then the
        border-box can be observed as well.</div>
        <div className={styles.blogText}>If you want to observe SVG elements, ResizeObserver is able to track changes to the SVG bounding box. The bounding box, according
        to the <a href="https://www.w3.org/TR/SVG2/coords.html#BoundingBoxes">W3 SVG spec</a>, is "the tightest fitting rectangle aligned with the axes of that element's user coordinate system that entirely encloses it and its descendants."
        This means that ResizeObserver will report the bounding box size as the content box and border box for SVG elements. The ResizeObserver can also track changes to the device-pixel-content-box. I'll touch on this later on.</div>
        <div className={styles.blogSubheading}>How it works</div>
        <div className={styles.blogText}>In order to use the API, you need to do two things. First, register the callback that is to be run.</div>
        <pre>
          {`
var ro = new ResizeObserver( entries => {
  for (let entry of entries) {
    let cs = window.getComputedStyle(entry.target);
    console.log('watching element:', entry.target);
    console.log(entry.borderBoxSize[0].inlineSize,' is ', cs.width);
    console.log(entry.borderBoxSize[0].blockSize,' is ', cs.height);
  }
}`}
          
        </pre>
        <div className={styles.blogText}>As you create a ResizeObserver instance, pass in your callback, which takes an array of ResizeObserverEntry 
        objects. Here, we're simply logging the newly reported border box size to the console via an anonymous callback.
        To take a deeper dive into what properties ResizeObserverEntry has, check out its prototype in dev tools!
        Or you can also see the spec <a href="https://www.w3.org/TR/resize-observer/#resize-observer-entry-interface">here</a>.</div>
        <div className={styles.blogText}>Next, start observing the element in question by calling <br /><code>{`ro.observe(element, box: [box-type]);`}</code>
        <br />Box type can be: "border-box", "content-box" or "device-pixel-content-box". Now, everytime our element changes its observed box, ResizeObserver
         will run our code above. Pretty simple in the end right?</div>
        <div className={styles.blogSubheading}>Device-Pixel-Content-Box</div>
        <div className={styles.blogText}>As seen earlier, ResizeObserver can also watch for changes to the device pixel (dp) content box.
        This box visually is the same as content-box, but its dimensions are recorded in physical device pixels rather than CSS pixels, which are what 
        CSS normally uses.</div>
        <div className={styles.blogText}>This is useful for obtaining pixel snapped dimensions, which are essential for graphics related purposes; for example,
        setting the right canvas size which avoids Moire patterns. Let's say we have a canvas that is 50px wide, but located at (0.5, 0). Its width
        in device pixels would be 51 because it is covering half of the 0th pixel and half of the 51st pixel (in order to avoid anti-aliasing, the browser
        rounds up 0.5 to 1 and fully allocates that pixel as part of the canvas. In this case, we will want to resize the canvas width to 51px, so that
        everything inside it is drawn correctly.</div>
        <div className={styles.blogText}>Another application of dp content-box is on high DPI (dots per inch) displays. Due to pixel snapping described
        earlier, element.width * window.devicePixelRatio is not as accurate as getting the pixel snapped width from ResizeObserver. Check out this excellent
        <a href="https://web.dev/device-pixel-content-box/"> article</a> for further details on device-pixel-content-box.</div>
        <div className={styles.blogSubheading}>Example Usage In sahirvellani.com</div>
        <div className={styles.blogText}>I use ResizeObserver for my personal website in order to run some code when the page changes size. Here
        is how I did it, and how it can be used if you are using React.</div>
        <pre>
          {`
const MyComponent = ({ children }) => {
  let handleResize = (entries) => {
    let width;
    if (entries[0].contentBoxSize) {
      if (entries[0].contentBoxSize.inlineSize != undefined){
        width = entries[0].contentBoxSize.inlineSize;
      } else {
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

  useEffect(() => {
    let resize_observer = new ResizeObserver(handleResize);
    if (ref.current) {
      resize_observer.observe(ref.current);
    }
  }, [ref]);

  return (
    <div ref={ref}>
      ...
    </div>
  )
}
          `}
        </pre>
        <div className={styles.blogText}>I use the <a href="https://reactjs.org/docs/hooks-effect.html">UseEffect</a> hook to initialize the ResizeObserver 
        and set it to observe the element I'm interested in via <a href="https://reactjs.org/docs/hooks-reference.html#useref">ref</a>. 
        It is re-initialized whenever the referenced element changes.</div>
</div>
  </Layout>)
}

export default SecondPage
