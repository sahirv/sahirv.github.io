import React, { useState } from "react"
import AstroLayout from "../astrolayout"
import * as styles from "../astro.module.css"


const AstroBlog = () => {
  return (
    <AstroLayout section="equipment">
        <div className={styles.astroDescription}></div>
    </AstroLayout>
  );
}

export default AstroBlog
