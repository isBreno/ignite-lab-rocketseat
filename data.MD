import { gql, useQuery } from "@apollo/client";
import { client } from "./lib/apollo";

const GET_LESSONS_QUERY = gql` query { lessons { id title } }`;

interface Lesson {
id: string;
title: string;
}

const { data } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY);

### Tema FIGMA
