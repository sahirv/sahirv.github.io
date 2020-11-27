import React, { useState } from "react"
import AstroLayout from "../astrolayout"
import styles from "../astro.module.css"


const AstroBlog = () => {
  return (
    <AstroLayout section="equipment">
        <div className={styles.astroDescription}>Welcome to my astrophotography portfolio. I've been amazed by the cosmos my entire life, and I'm very lucky to have the priviledge of exploring them. The sky is home to many jewels, and it would be selfish of me not to share them with you. All photos have been taken and processed by myself.</div>
    </AstroLayout>
  );
}

export default AstroBlog
