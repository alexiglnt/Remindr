import { useState, useEffect } from "react"
import Layout from "../../components/layout"
import { useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"
import { useRouter } from "next/router"
// @ts-ignore
import { Group, GroupUsers } from "@/interfaces"
import Head from "next/head"

// @ts-ignore
import { getGroups, getGroupsUsers, createGroupUser } from "../../functions/group"

export default function Groups() {
    const { data: session } = useSession()
    const [groups, setGroups] = useState([])
    const [groupUsers, setGroupUsers] = useState([])
    const router = useRouter();


    // Handle form submit
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { name, description, image } = e.target.elements
        createGroup(name.value, description.value, image.value);
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

            getGroups().then((groups) => {
                setGroups(groups)
            })

            return data.group || [];

        }
        catch (error) {
            console.log(error)
        }
    }

    // Go to group page
    const goToGroupPage = (id: number) => {
        router.push(`/Group/${id}`)
    }

    useEffect(() => {
        // Récupérer les groupes de l'utilisateur depuis la table intermédiaire
        getGroupsUsers().then((groupUsers) => {
            // Créer un tableau contenant uniquement les IDs des groupes auxquels l'utilisateur appartient
            const userGroupIds = groupUsers.filter((groupUser: GroupUsers) => groupUser.IdU === session?.user?.email).map((groupUser: GroupUsers) => groupUser.IdG);
            // Récupérer tous les groupes
            getGroups().then((groups) => {
                // Filtrer les groupes pour n'afficher que ceux auxquels l'utilisateur appartient
                const filteredGroups = groups.filter((group: Group) => userGroupIds.includes(group.id));
                setGroups(filteredGroups);
            });
        });
    }, []);

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
                        <img src={group.image} alt=""/>
                        <div>
                            <h3>{group.name}</h3>
                            <p>{group.description}</p>
                        </div>
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