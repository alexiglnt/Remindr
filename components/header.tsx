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
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${!session && loading ? styles.loading : styles.loaded
            }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
                {/* // THEME MODE BUTTON */}
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>

      <nav>
        <ul className={styles.navItems}>
          <div>
            <li className={styles.navItem}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/client">Client</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/server">Server</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/protected">Protected</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/api-example">API</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/admin">Admin</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/me">Me</Link>
            </li>
          </div>
          <button type="button" className={styles['no-style-btn']} onClick={changeThemeMode} >
            <span className={`material-symbols-outlined ${styles.toggleBtn}`} >
              {toggleState}
            </span>
            {toggleState === 'toggle_on' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </ul>
      </nav>
    </header>
  )
}
