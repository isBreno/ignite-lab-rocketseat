import { gql, useQuery } from "@apollo/client";
import { client } from "./lib/apollo";

const GET_LESSONS_QUERY = gql`
  query {
    lessons {
      id
      title
    }
  }
`;

interface Lesson {
  id: string;
  title: string;
}

function App() {
  const { data } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY);
  console.log(data);

  return (
    <div>
      {data?.lessons.map((lesson: Lesson) => {
        return <li key={lesson.id}>{lesson.title}</li>;
      })}
    </div>
  );
}

export default App;
