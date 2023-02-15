import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import * as styles from "./blog.module.css"
import Card from "../../components/blogcard/card"

const SecondPage = () => (
  <Layout pageTitle="Blog">
    <SEO title="Blog" />
    <div className={styles.childrenContainer}>
        <h1>Blog</h1>
        {/* <div className={styles.entry}>
          <Card title={"Performance Tracing in Chrome and Edge"}
          description={"The tracing tab is a powerful tool that can be harnessed by web developers looking to streamline their websites and web-apps."}
          link={"/blog/performance-tracing-in-chrome-and-edge"}></Card>
        </div> */}
        <div className={styles.entry}>
          <Card title={"Detecting when an element changes size with ResizeObserver"}
          description={"ResizeObserver is a JavaScript web API that allows you to run code whenever an element's size changes."}
          link={"/blog/resize-observer"}></Card>
        </div>
        <div className={styles.entry}>
          <Card title={"Using a Sky-Watcher 8x50 Finder as Guide Scope"}
          description={"Some Sky-Watcher telescopes come with a good quality finder scope that can be converted into a guide scope."}
          link={"/blog/using-skywatcher-8x50-finder-as-guide-scope"}></Card>
        </div>
    </div>
  </Layout>
)

export default SecondPage
