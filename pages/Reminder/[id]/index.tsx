import { useState, useEffect } from "react"
import Layout from "../../../components/layout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import AccessDenied from "../../../components/access-denied"
// @ts-ignore
import { Reminder } from "@/interfaces"
import Head from "next/head"
import { group } from "console"

export default function ReminderPage() {
    const { data: session } = useSession()
    const router = useRouter();
    const { id } = router.query;
    const [currentReminder, setCurrentReminder] = useState<Reminder>({})
    const [newReminder, setNewReminder] = useState<Reminder>({})
    const [colors, setColors] = useState(['red', 'violet', 'green', 'yellow'])

    const [dateFormatInput, setDateFormatInput] = useState("");


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


    const modifyReminder = async (e: any) => {
        e.preventDefault()

        const { newTitle, newDescription, newDateRendu, newCouleur } = e.target.elements

        const newReminder: Reminder = {
            title: newTitle.value,
            description: newDescription.value,
            dateRendu: newDateRendu.value,
            couleur: newCouleur.value,
            groupId: currentReminder.groupId,
            id: currentReminder.id
        }

        console.log("New reminder : ", newReminder)

        const response = await fetch(`/api/reminders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReminder)
        })

        const data = await response.json()
        console.log("Data : ", data)

        getReminderInformations().then((reminder) => {
            setCurrentReminder(reminder);

            // Format the date for input
            const dateParts = reminder.dateRendu.split('/');
            const formattedDate = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;

            console.log("Formatted date : ", formattedDate)
            setDateFormatInput(formattedDate);
        });
    }

    // Delete a reminder
    const deleteReminder = async (e: any) => {
        e.preventDefault()

        const confirmation = prompt("Pour confirmer la suppression, veuillez taper le mot 'supprimer' : ")
        if (confirmation === "supprimer") {
            const response = await fetch(`/api/reminders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            })

            const data = await response.json()
            console.log("Data : ", data)

            alert("Le rappel a bien été supprimé ! Vous allez être redirigé vers la page des groupes.")
            router.push(`/Group`)
        } else {
            alert("La reminder n'a pas été annulé !")
        }
    }



    useEffect(() => {
        getReminderInformations().then((reminder) => {
            setCurrentReminder(reminder);
            setNewReminder(reminder);

            // Format the date for input
            const dateParts = reminder.dateRendu.split('/');
            const formattedDate = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;

            console.log("Formatted date : ", formattedDate)
            setDateFormatInput(formattedDate);
        });

        if (!session) {
            router.push("/");
        }
    }, []);



    // If session exists, display content
    return (
        <Layout>
            <Head>
                <title>Remindr | Groups </title>
                <meta name="description" content="Une application simple pour vous aider à ne plus rien oublier." />
                <link rel="icon" href="../assets/logo.png" />
            </Head>

            <div>
                <div className="colorPlusTitle" style={{ display: 'flex', alignItems: 'center' }} >
                    <div style={{
                        background: `${colors[parseInt(currentReminder.couleur) - 1]}`,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        marginRight: '20px'
                    }} >
                    </div>
                    <h1 style={{ fontSize: '40px', color: 'var(--main-color)' }} > {currentReminder.title} </h1>
                </div>
                <fieldset style={{ borderRadius: '5px', border: '1px solid #ccc' }} >
                    <legend style={{ fontWeight: '600', fontSize: '22px' }} > Description </legend>
                    <p style={{ fontSize: '20px' }} > <i> {currentReminder.description} </i> </p> <br /> <br />
                    <p> {currentReminder.dateRendu} </p>
                </fieldset>

            </div> <br /> <br />

            <br /> <hr /> <br />

            <h1>  Modifier le reminder </h1>

            <form onSubmit={modifyReminder}>
                <label htmlFor="newTitle">Title</label>
                <input
                    type="text"
                    name="newTitle"
                    id="newTitle"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    placeholder="Titre du reminder"
                />

                <label htmlFor="newDescription">Description</label>
                <input
                    type="text"
                    name="newDescription"
                    id="newDescription"
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                    placeholder="Description du reminder"
                />

                <label htmlFor="newDateRendu"> Date rendu du reminder </label>
                <input
                    type="date"
                    name="newDateRendu"
                    id="newDateRendu"
                    value={dateFormatInput}
                    onChange={(e) => setNewReminder({ ...newReminder, dateRendu: e.target.value })}
                    onInput={(e: React.FormEvent<HTMLInputElement>) => setDateFormatInput(e.currentTarget.value)}
                    placeholder="Date de rendu du reminder"
                />


                <label htmlFor="newCouleur"> Couleur </label>
                <select name="newCouleur" id="newCouleur"
                    value={newReminder.couleur}
                    onChange={(e) => setNewReminder({ ...newReminder, couleur: e.target.value })}
                >
                    <option value="1"> Rouge 🔴 </option>
                    <option value="2"> Violet 🟣 </option>
                    <option value="3"> Vert 🟢 </option>
                    <option value="4"> Jaune 🟡 </option>
                </select>

                <button type="submit" > Modifier le groupe </button>
            </form> <br /> <br />

            <br /> <hr /> <br />

            <h1>  Supprimer ce reminder </h1>
            <button type="button" onClick={deleteReminder} > 
                Supprimer &nbsp;
                <span className="material-symbols-outlined" style={{transform: 'translateY(4px)', fontSize: '18px'}} > delete </span>
            </button>



        </Layout>
    )

}