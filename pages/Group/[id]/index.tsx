import { useState, useEffect } from "react"
import Layout from "../../../components/layout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import AccessDenied from "../../../components/access-denied"

// @ts-ignore
import { Group, Reminder, User, GroupUsers } from "@/interfaces"
// @ts-ignore
import { getUsers } from "../../../functions/user"
// @ts-ignore
import { getGroupsUsers } from "../../../functions/group"
import Head from "next/head"

export default function GroupPage() {
    const { data: session } = useSession()
    const router = useRouter();
    const { id } = router.query;

    const [currentGroup, setCurrentGroup] = useState<Group>({})
    const [reminders, setReminders] = useState<Reminder[]>([])
    const [groupUsers, setGroupUsers] = useState([])
    const [users, setUsers] = useState([])
    const [colors, setColors] = useState(['red', 'violet', 'green', 'yellow'])
    const [nbMembers, setNbMembers] = useState(0)


    // Validation de l'id
    const isValidId = !isNaN(parseInt(id as string));


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { titre, description, daterendu, couleur } = e.target.elements
        console.log(titre.value, description.value, daterendu.value, couleur.value);

        const newReminder: Reminder = {
            title: titre.value,
            description: description.value,
            dateRendu: daterendu.value,
            couleur: couleur.value,
            groupId: id
        }

        createReminder(newReminder);
    }


    // Récupération des informations du groupe actuel en fonction de l'id passé en paramètre
    const getGroupInformations = async () => {
        const response = await fetch(`/api/groups/${id}`)
        const data = await response.json()
        console.log("response", data.group)
        return data.group || [];
    }


    const getReminders = async () => {
        const response = await fetch(`/api/reminders`)
        const tmp = await response.json()
        const data = tmp.reminders.filter((reminder: Reminder) => reminder.groupId == id)

        // on change la date pour qu'elle soit au format français
        data.forEach((reminder: Reminder) => {
            const date = new Date(reminder.dateRendu)
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            reminder.dateRendu = `${day}/${month}/${year}`
        })

        console.log("reminders", data)
        return data || [];
    }

    const createReminder = async (reminder: Reminder) => {
        const response = await fetch('/api/reminders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reminder),
        })

        const data = await response.json()
        console.log("data.reminder", data.reminder)

        // On vide le formulaire
        document.querySelector("form")?.reset();

        getReminders().then((reminders) => {
            setReminders(reminders)
        })

        return data.groupUser || [];

    }

    // Go to group page
    const goToReminderPage = (id: number) => {
        router.push(`/Reminder/${id}`)
    }

    // Check if user is in group
    const verifyUserInGroup = (email: number, groupId: number) => {
        const groupUser = groupUsers.find((groupUser: any) => groupUser.IdU == email && groupUser.IdG == groupId)
        return groupUser ? true : false
    }

    const addUserToGroup = async (email: string, groupId: number) => {

        // On vérifie que l'utilisateur n'est pas déjà dans le groupe
        const user: User = users.find((user: User) => user.email == email)
        if (user) {
            const groupUser: GroupUsers = {
                IdU: user.email,
                IdG: groupId
            }

            const response = await fetch('/api/groups/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupUser),
            })

            const data = await response.json()
            console.log("data.groupUser", data.groupUser)

            getGroupsUsers().then((groupsUsers) => {
                setGroupUsers(groupsUsers)
            })

            return data.groupUser || [];
        }
    }

    const initNbmembers = () => {
        let nb = 0;
        groupUsers.forEach((groupUser: GroupUsers) => {
            if (groupUser.IdG == id) {
                nb++;
            }
        })
        setNbMembers(nb);
    }



    useEffect(() => {
        getGroupInformations().then((group) => {
            setCurrentGroup(group)
        })

        getReminders().then((reminders) => {
            setReminders(reminders)
        })

        getUsers().then((users: User) => {
            setUsers(users)
        })

        getGroupsUsers().then((groupsUsers) => {
            setGroupUsers(groupsUsers)
        })
    }, [])

    useEffect(() => {
        initNbmembers();
    }, [groupUsers])


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
                        {/* IMAGE + TITRE + DESCRIPTION */}
                        <div style={{ display: 'flex' }}>

                            {/* IMAGE */}
                            <div style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', marginRight: '30px' }}>
                                <img src={currentGroup.image} style={{ maxWidth: '110%', maxHeight: '110%', objectFit: 'cover' }} />
                            </div>

                            {/* TITRE + DESCRIPTION */}
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                                {/* TITRE */}
                                <h1 style={{ fontSize: '3em', color: 'var(--main-color)' }} >
                                    {currentGroup.name} &nbsp;
                                    <span style={{ fontSize: '20px', color: 'var(--font-color)' }} >
                                        ({nbMembers} membres)
                                    </span>
                                </h1>

                                {/* DESCRIPTION */}
                                <p style={{ fontStyle: 'italic' }} >
                                    {currentGroup.description}
                                </p>
                            </div>
                        </div>



                        <br /> <hr /> <br />

                        <h1> Vos reminders </h1>
                        {reminders.length > 0 ?
                            reminders.map((reminder: Reminder) => (
                                <div key={reminder.id} className="ReminderItem" onClick={() => goToReminderPage(reminder.id)} >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingRight: '15px'
                                    }}
                                    >
                                        <h3>{reminder.title} • <span> {reminder.dateRendu} </span> </h3>
                                        <div
                                            style={{
                                                background: `${colors[parseInt(reminder.couleur) - 1]}`,
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%'
                                            }}
                                        >
                                        </div>
                                    </div>
                                    <p>{reminder.description}</p>
                                </div>
                            ))
                            :
                            <p> Vous n'avez pas encore de reminders </p>
                        }

                        <br /> <hr /> <br />

                        {/* // Créer un reminder */}
                        <h1>  Créer un nouveau Reminder </h1>
                        <form onSubmit={handleSubmit} >
                            <label htmlFor="name">Titre</label>
                            <input type="text" name="titre" id="titre" placeholder="Titre du reminder" />

                            <label htmlFor="description"> Description </label>
                            <input type="text" name="description" id="description" placeholder="Description du reminder" />

                            <label htmlFor="daterendu">Date de rendu</label>
                            <input type="date" name="daterendu" id="daterendu" />

                            <label htmlFor="couleur"> Couleur </label>
                            <select name="couleur" id="couleur">
                                <option value="1"> Rouge 🔴 </option>
                                <option value="2"> Violet 🟣 </option>
                                <option value="3"> Vert 🟢 </option>
                                <option value="4"> Jaune 🟡 </option>
                            </select>

                            <button type="submit" > Create Reminder </button>
                        </form> <br /> <br />

                        <br /> <hr /> <br />

                        <h1>  Inviter des amis </h1>

                        <div className="users-grid" >
                            {users.map((user: User) => (
                                <>
                                    <div key={user.id} className="UserItem" >
                                        <img src={user.image} alt="" width="100px" />
                                        <h3>{user.name}</h3>
                                        <p>{user.email}</p>

                                        {verifyUserInGroup(user.email, currentGroup.id) ? (
                                            <button type="button" disabled > Déjà dans le groupe </button>
                                        ) : (
                                            <button type="button" onClick={() => addUserToGroup(user.email, currentGroup.id)} >
                                                Ajouter au groupe
                                            </button>
                                        )}
                                    </div> <br />
                                </>
                            ))}
                        </div>

                    </>
                ) : (
                    <p>L'id n'est pas un nombre valide.</p>
                )}
            </div>



        </Layout>
    )

}