import Layout from "../components/layout"
import Image from "next/image"
import image1 from "../assets/reminder.svg"
import image2 from "../assets/push.svg"
// @ts-ignore
import Head from "next/head"


export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Remindr</title>
        <meta name="description" content="Une application simple pour vous aider à ne plus rien oublier." />
      </Head>


      <center>
        <h1 className="big-title" >Bienvenue sur Remindr</h1>
        <h2>Une application simple pour vous aider à ne plus rien oublier.</h2>

        <div className="presentation-big-bloc" >
          <p className="bloc-blue" >
            <b>Bienvenue sur notre plateforme</b>, qui a pour but de simplifier la gestion de vos projets, devoirs et autres attendus à rendre. Avec <b>Remindr</b>, vous pouvez facilement créer des <b>rappels</b> pour vous-même et pour les autres membres de votre <b>groupe</b>, en fournissant toutes les informations nécessaires, telles que la date de rendu, une description, une couleur et même une photo si vous le souhaitez. <br />
          </p>
          <Image src={image1} alt="Picture of the author" width={400} height={400} />
        </div>

        <div className="presentation-big-bloc" >
          <Image src={image2} alt="Picture of the author" width={400} height={400} />
          <p className="bloc-blue" >
            <b>Remindr</b> offre une fonctionnalité de groupe unique, qui vous permet d'inviter d'autres utilisateurs à rejoindre votre groupe sans avoir besoin de leurs adresses e-mail. Une fois qu'ils ont accepté votre invitation, vous pouvez tous <b>ajouter et modifier des rappels dans le groupe</b>. Vous pouvez également recevoir des rappels par e-mail une semaine avant la date limite, afin de ne jamais manquer un rendu important.<br />
          </p>
        </div>
      </center>

    </Layout>
  )
}


