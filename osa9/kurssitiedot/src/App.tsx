import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartNormalBase extends CoursePartBase{
  description: string;
}

interface CourseNormalPart extends CoursePartNormalBase {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartNormalBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartNormalBase {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

interface HeaderProps {
  courseName: string
}

interface TotalProps {
  parts: CoursePart[]
}

interface ContentProps {
  parts: CoursePart[]
}

interface PartProps {
  part: CoursePart
}

const Header = (props:HeaderProps) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const assertNever = (value: never): never => {
  throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props:PartProps) => {
  switch (props.part.type) {
    case "normal":
      return <div><p><b>{props.part.name} {props.part.exerciseCount}</b><br/><i>{props.part.description}</i></p></div>;
      break;
    case "groupProject":
      return <div><p><b>{props.part.name} {props.part.exerciseCount}</b><br/>Project excercises {props.part.groupProjectCount}</p></div>;
      break;
    case "special":
        return <div><p><b>{props.part.name} {props.part.exerciseCount}</b><br/><i>{props.part.description}</i><br/>Required skills: {Object.values(props.part.requirements).join(", ")}</p></div>;
        break;
    case "submission":
      return <div><p><b>{props.part.name} {props.part.exerciseCount}</b><br/><i>{props.part.description}</i><br/>{props.part.exerciseSubmissionLink}</p></div>;
      break;
    default:
      return assertNever(props.part);
      break;
  }
}

const Content = (props:ContentProps) => {
  return (
     <div>
       {props.parts.map((part:CoursePart) => <Part key={part.name} part={part}/>)}
     </div>
  );
};

const Total = (props:TotalProps) => {
  const numberOfExercises:number = props.parts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return (
      <div>
          <p>
            Number of exercises {numberOfExercises}
          </p>
      </div>
    )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  )
};

export default App;