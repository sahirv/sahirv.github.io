import React from "react"
import * as styles from "./card.module.css"
import {Link} from "gatsby"

const Card = ({title, description, image, link}) => {
    return (
        <Link to={link}>
        <div className={styles.cardContainer}>
            <div className={styles.cardTitle}>{title}</div>
            <div className={styles.cardDescription}>{description}</div>
        </div>
        </Link>
    )
}

export default Card;