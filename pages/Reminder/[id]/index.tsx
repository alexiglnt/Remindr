import { useState, useEffect } from "react"
import Layout from "../../../components/layout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import AccessDenied from "../../../components/access-denied"
// @ts-ignore
import { Reminder } from "@/interfaces"
import Head from "next/head"

export default function ReminderPage() {
    const { data: session } = useSession()
    const router = useRouter();
    const { id } = router.query;
    const [currentReminder, setCurrentReminder] = useState<Reminder>({})

    const getReminderInformations = async () => {
        const response = await fetch(`/api/reminders/${id}`)
        const data = await response.json()

        // On modifie la date pour qu'elle soit plus lisible
        const date = new Date(data.reminder.dateRendu)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const dateRendu = day + "/" + month + "/" + year
        data.reminder.dateRendu = dateRendu

        console.log("Reminder informations : ", data.reminder)
        return data.reminder || [];
    }

    useEffect(() => {
        getReminderInformations().then((reminder) => {
            setCurrentReminder(reminder)
        })
    }, [])




    // If no session exists, display access denied message
    if (!session) {
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
                <h1> {currentReminder.title} </h1>
                <p> {currentReminder.description} </p>
                <p> {currentReminder.dateRendu} </p>

            </div>



        </Layout>
    )

}