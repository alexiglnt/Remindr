import { useState, useEffect } from "react"
import Layout from "../../../components/layout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import AccessDenied from "../../../components/access-denied"

// @ts-ignore
import { Group } from "@/interfaces"
import Head from "next/head"

export default function GroupPage() {
    const { data: session } = useSession()
    const router = useRouter();
    const { id } = router.query;

    const [currentGroup, setCurrentGroup]: Group = useState([])

    // Validation de l'id
    const isValidId = !isNaN(parseInt(id as string));

    // Récupération des informations du groupe actuel en fonction de l'id passé en paramètre
    const getGroupInformations = async () => {
        const response = await fetch(`/api/groups/${id}`)
        const data = await response.json()
        console.log("response", data.group)
        return data.group || [];
    }


    useEffect(() => {
        getGroupInformations().then((group) => {
            setCurrentGroup(group)
        })
    }, [])


    // If no session exists, display access denied message
    if (!session || !isValidId) {
        return (
            <Layout>
                <AccessDenied />
            </Layout>
        )
    }

    // If session exists, display content
    return (
        <Layout>
            <Head>
                <title>Remindr | Groups </title>
                <meta name="description" content="Une application simple pour vous aider à ne plus rien oublier." />
                <link rel="icon" href="../assets/logo.png" />
            </Head>

            <div>
                {isValidId ? (
                    <>
                        <div style={{ display: 'flex' }}>
                            <img src={currentGroup.image} alt="" width="10%" />
                            <h1 style={{ fontSize: '3em' }} > {currentGroup.name} </h1>
                        </div>
                        <p> {currentGroup.description} </p>
                    </>
                ) : (
                    <p>L'id n'est pas un nombre valide.</p>
                )}
            </div>



        </Layout>
    )

}