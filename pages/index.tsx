import Layout from "../components/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function IndexPage() {
  const [isInitialCondition, setIsInitialCondition] = useState(false); // état du checkbox without_differential_equation_initial

  const [inputEquaDiff, setInputEquaDiff] = useState("f' + f + x = 1");
  const [inputFunctionLetter, setInputFunctionLetter] = useState("f");
  const [inputVariable, setInputVariable] = useState("x");
  const [inputInitialValue, setInputInitialValue] = useState("f(0)=2");

  const [onLoad, setOnLoad] = useState(false);

  const createJSONToSend = (e: any) => {
    e.preventDefault();

    // Construire l'objet JSON à partir des valeurs récupérées
    const jsonData = {
      equationInput: inputEquaDiff,
      functionLetter: inputFunctionLetter,
      variable: inputVariable,
      initialCondition: {
        hasInitialCondition: isInitialCondition,
        initialValue: isInitialCondition ? inputInitialValue : null // si isInitialCondition est faux, on met null
      }
    };

    // Utiliser jsonData comme vous en avez besoin (envoi à l'API, etc.)
    console.log('JSON créé :', jsonData);


    // Mettre onLoad à true
    setOnLoad(true);

    // Simuler un délai de 3 secondes avant de mettre onLoad à false
    setTimeout(() => {
      setOnLoad(false);
    }, 3000);



  };





  async function testAPI(e: any) {
    e.preventDefault();

    // on recupere les données de l'input id = test
    let testy = document.getElementById("test") as HTMLInputElement;
    let testValue = testy.value;

    console.log("Valeur de test avant l'envoi :", testValue);

    const response = await fetch(`/api/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ test: testValue })
    });

    const data = await response.json();

    console.log("responde data", data.result);
  }





  return (
    <Layout>
      <Head>
        <title>Equa Diff</title>
        <meta name="description" content="Une application simple pour vous aider à ne plus rien oublier." />
      </Head>

      <div className="container">
        <div>
          <center>

            <form action="" onSubmit={createJSONToSend}>

              {/* Equadiff à resoudre */}
              <div>
                <label htmlFor="">Equadiff à résoudre</label>
                <input
                  id="differential_equation_input"
                  type="text"
                  value={inputEquaDiff}
                  onChange={(e) => setInputEquaDiff(e.target.value)}
                />
              </div>

              {/* Lettre fonction */}
              <label htmlFor="">Lettre représentant la fonction</label>
              <input
                id="differential_equation_function"
                type="text"
                value={inputFunctionLetter}
                onChange={(e) => setInputFunctionLetter(e.target.value)}
              />

              {/* Variable */}
              <label htmlFor="">Variable</label>
              <input
                id="differential_equation_variable"
                type="text"
                value={inputVariable}
                onChange={(e) => setInputVariable(e.target.value)}
              />


              {/* Condition initiale */}
              <label htmlFor="without_differential_equation_initial"> Sans condition initiale </label>
              <input id="without_differential_equation_initial" type="radio" name="condition" onChange={() => setIsInitialCondition(false)} checked={!isInitialCondition} />

              <label htmlFor="with_differential_equation_initial"> Avec condition initiale </label>
              <input id="with_differential_equation_initial" type="radio" name="condition" onChange={() => setIsInitialCondition(true)} />

              <input
                id="differential_equation_initial_value"
                className={isInitialCondition ? '' : 'disable'}
                type="text"
                value={inputInitialValue}
                onChange={(e) => setInputInitialValue(e.target.value)}
              />

              {/* Bouton envoyer */}
              <button type="submit"> SUBMIT </button>

              {onLoad && <Loader />}
            </form>


          </center>
        </div>
        <div>
          <h1> doiahqduqsfqsgo </h1>
        </div>
      </div>
    </Layout>
  );
}
