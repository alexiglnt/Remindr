import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import { useEffect, useState } from "react"

// @ts-ignore
import Head from "next/head"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const [toggleState, setToggleState] = useState('toggle_off')


  // Change the theme mode
  const changeThemeMode = () => {
    if (localStorage.getItem('theme')) {
      localStorage.getItem('theme') === 'dark' ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark')
    }

    const body = document.querySelector('body')
    body?.classList.toggle('dark-theme')

    setToggleState(toggleState === 'toggle_on' ? 'toggle_off' : 'toggle_on')
  }


  // Check if the user has already selected a theme
  const setThemeMode = () => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light')
    } else {
      const body: any = document.querySelector('body')
      localStorage.getItem('theme') === 'dark' ? body.classList.add('dark-theme') : body.classList.remove('dark-theme')
      setToggleState(localStorage.getItem('theme') === 'dark' ? 'toggle_on' : 'toggle_off')
    }
  }


  useEffect(() => {
    setThemeMode();
  }, []);



  return (
    <header>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link rel="icon" href="../assets/logo.png" />
      </Head>

      <div className={styles.loaded} >

        {/* ----- BOUTON DARK MODE ----- */}

        <div>
          <h2> Equa-Diff-Resolve </h2>
        </div>


        <button type="button" className={styles['no-style-btn']} onClick={changeThemeMode} >
          <span className={`material-symbols-outlined ${styles.toggleBtn}`} >
            {toggleState}
          </span>
          {toggleState === 'toggle_on' ? 'Dark Mode' : 'Light Mode'}
        </button>

      </div>

      <br /> <br />

    </header>
  )
}
