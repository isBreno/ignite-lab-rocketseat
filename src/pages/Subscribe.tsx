// Imports

import { Logo } from "../components/Logo";
import codeImage from "../assets/code-images.png";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATE_SUBSCRIBER_MUTATION = gql`
mutation createSubscriber ($name: String!, $email: String!){
  createSubscriber(data: {name: $name, email: $email}) {
    id
  }
}
`

// Imports

export function Subscribe() {
  const navigate = useNavigate()
  const [ name, setName] = useState('')
  const [ email, setEmail] = useState('')
  const [ createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await createSubscriber({
      variables: {
        name,
        email
      }
    })

    navigate('/event')
    
  }
  return (
    <div className="min-h-screen bg-blur bg-cover  bg-no-repeat flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-[1110px] mt-14 mx-auto">
        <div className="flex max-w-[640px] flex-col gap-8">
          <Logo />

          <h1 className="text-[2.5rem] leading-tight">
            Construa uma{" "}
            <span className="text-blue-500">aplicação completa</span>, do zero,
            com <span className="text-blue-500">React JS</span>
          </h1>

          <p className="leading-tight">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>
        <div className="bg-[#121214] p-7 border border-[#323238] w-[360px]">
          <strong className="text-2xl block">Inscreva-se gratuitamente</strong>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <input
              className="p-3 px-4 rounded-md bg-gray-900"
              type="text"
              placeholder="Seu nome completo"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="p-3 px-4 rounded-md bg-gray-900"
              type="text"
              placeholder="Digite seu email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="mt-3 rounded-md bg-green-500 hover:bg-green-700 transition-colors text-white font-bold disabled:opacity-50 py-4"
            type="submit"
            disabled={loading}>
              GARANTIR MINHA VAGA
            </button>
          </form>
        </div>
      </div>
      <div className="w-full flex justify-center ">
        <img src={codeImage}></img>
      </div>
    </div>
  );
}
