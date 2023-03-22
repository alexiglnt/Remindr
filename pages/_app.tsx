import { SessionProvider } from "next-auth/react"
import "./styles.css"

import type { AppProps } from "next/app"
import type { Session } from "next-auth"

import Head from "next/head"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Remindr</title>
        <meta name="description" content="Une application simple pour vous aider à ne plus rien oublier." />
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/3799/3799832.png" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
