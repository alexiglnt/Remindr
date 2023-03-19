import Link from "next/link"
import styles from "./footer.module.css"
import packageJSON from "../package.json"
import Head from "next/head"

export default function Footer() {
  return (

    <>
      <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      </Head>

      <footer className={styles.footer}>
        <hr />
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <a href="https://github.com/alexiglnt/Remindr" target="_blank" >
            <i className="fa fa-github" style={{fontSize: '24px', color: 'black', marginRight: '5px'}} ></i>
              Repository GitHub
            </a>
          </li>
          <li className={styles.navItem}>
            <em>next-auth@{packageJSON.dependencies["next-auth"]}</em>
          </li>
        </ul>
      </footer></>
  )
}
