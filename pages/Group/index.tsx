import { useState, useEffect } from "react"
import Layout from "../../components/layout"
import { useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"
import { useRouter } from "next/router"

// @ts-ignore
import { Group } from "@/interfaces"

import Head from "next/head"

export default function Groups() {
    const { data: session } = useSession()
    const [groups, setGroups] = useState([])
    const router = useRouter();


    // Handle form submit
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { name, description, image } = e.target.elements
        createGroup(name.value, description.value, image.value);
    }

    const getUserGroups = async () => {
        const response = await fetch('/api/groups')
        const data = await response.json()
        console.log(data.groups)
        return data.groups || [];
    }


    // Create a group
    const createGroup = async (name: string, description: string, image: string) => {
        const response = await fetch('/api/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                image,
            }),
        })

        try {

            const data = await response.json()
            console.log(data.group)

            let userIdEmail: any = session?.user?.email
            createGroupUser(data.group.id, userIdEmail);

            // On vide le formulaire
            document.querySelector("form")?.reset();
            alert("Le groupe a bien été créé !");

            getUserGroups().then((groups) => {
                setGroups(groups)
            })

            return data.group || [];

        }
        catch (error) {
            console.log(error)
        }
    }

    // Add userId and groupId to groupUser intermediate table
    const createGroupUser = async (IdG: number, IdU: string) => {
        const response = await fetch('/api/groups/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                IdG,
                IdU,
            }),
        })
        const data = await response.json()
        console.log("data.groupUser", data.groupUser)

        return data.groupUser || [];
    }

    // Go to group page
    const goToGroupPage = (id: number) => {
        router.push(`/Group/${id}`)
    }

    useEffect(() => {
        getUserGroups().then((groups) => {
            setGroups(groups)
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

            <h1> Vos groupes </h1>
            <div>
                {groups.map((group: Group) => (
                    <div key={group.id} className="GroupItem" onClick={() => goToGroupPage(group.id)} >
                        <h3>{group.name}</h3>
                        <p>{group.description}</p>
                    </div>
                ))}
            </div>

            <br /> <br /> <hr /> <br /> <br />

            {/* // Créer un groupe */}
            <h1>  Créer un nouveau groupe </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nom</label>
                <input type="text" name="name" id="name" placeholder="Nom du groupe" />

                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" placeholder="Description du groupe" />

                <label htmlFor="image">Image</label>
                <input type="text" name="image" id="image" placeholder="Lien de l'image du groupe" /> <br />

                <button type="submit" > Create groupe </button>
            </form> <br /> <br />


        </Layout>
    )
}