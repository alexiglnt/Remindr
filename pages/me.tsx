import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import { useEffect } from "react"

export default function MePage() {
  const { data } = useSession()

  useEffect(() => {
    console.log(data)
  }, [])

  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}
