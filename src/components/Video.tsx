import { ClickToPlay, DefaultControls, DefaultUi, Player, Ui, Youtube } from "@vime/react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Image,
  Lightning,
} from "phosphor-react";
import React from "react";
import "@vime/core/themes/default.css";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
  lesson(where: {slug: $slug}) {
    title
    teacher {
      avatarURL
      bio
      name
    }
    videoId
    description
  }
}
`;

interface GetLessonBySlugQueryResponse {
  lesson: {
    teacher: {
      avatarURL: string;
      bio: string;
      name: string;
    };
    title: string;
    videoId: string;
    description: string;
  };
}


export default function Video() {
  const { slug } = useParams<{ slug: string}>();
  const { data } = useQuery<GetLessonBySlugQueryResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: slug,
    },
  });

  console.log(data)
  console.log(slug)
  

  return (
    <div className="flex-1 mt-4">
      <div className=" flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video  ">
         {data ? (
           <Player>
           <Ui>
           <Youtube videoId={data.lesson.videoId} />
            <ClickToPlay />
            <DefaultControls />
           </Ui>
         </Player>
         ): <Skeleton height={563}/>}
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-6 lg:gap-16 flex-col lg:flex-row ">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{data ? data.lesson.title : <Skeleton />}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data ? data.lesson.description : <Skeleton />}
            </p>

            <div className="flex items-center gap-4 mt-6">
              {data ? (
                <img
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src={data.lesson.teacher.avatarURL}
                alt=""
              />
              ) : <Skeleton />}

              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                  {data ? data.lesson.teacher.name : <Skeleton />}
                </strong>
                <span className="text-gray-200 text-sm block">
                  {data ? data.lesson.teacher.bio : <Skeleton />}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <a
              href=""
              className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors w-full"
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>
            <a
              href=""
              className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 transition-colors hover:text-gray-900"
            >
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className="gap-8 mt-20 grid grid-cols-0 lg:grid-cols-2">
          <a
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
            href=""
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o desenvolvimento
                do desafio.
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
          <a
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
            href="https://github.com/isBreno/ignite-lab-rocketseat"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers Exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalizar a sua
                m??quina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
