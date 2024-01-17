import { useNavigate } from "react-router";

import "../App.css";
const Home = () => {
  const nav = useNavigate();
  return (
    <div className="bg-environmental-protection bg-cover bg-center min-h-svh z-0">
      <div className="bg-base-100 bg-opacity-70 min-h-svh p-8 z-1 ">
        <div className="flex flex-col lg:flex-row z-2 mt-8">
          <div className="rounded-xl lg:basis-1/6 grow text-base-100-content p-6 text-center m-2 flex flex-col justify-between glass">
            <h1 className="text-3xl font-bold">Assess</h1>
            <hr />
            <p>
              Use our assessment tool to identify areas of your home that
              contribute an outsized environmental impact and figure out how to
              make smart changes.
            </p>
            <button
              className="btn btn-primary btn-lg mx-auto"
              onClick={() => nav("/energy-assessment")}
            >
              Start Your Assessment
            </button>
          </div>
          <div className="glass rounded-xl lg:basis-1/2 text-base-100-content p-6 text-center m-2 lg:mt-20 ">
            <h1 className="text-4xl font-bold">Your Impact</h1>
            <hr />
            <p>
              We all contribute to environmental degradation in one way or
              another. Understanding what aspects of your life have the greatest
              impact is the first step toward improvement. Use our assessments
              to analyze your home and lifestyle, and use our project system to
              chart your progress and share it with others.
            </p>
          </div>
          <div className="glass rounded-xl lg:basis-1/6 grow text-base-100-content p-6 text-center m-2 flex justify-between flex-col">
            <h1 className="text-3xl font-bold">Reduce</h1>
            <hr />
            <p>
              Undertake projects based on our suggestions (or not!) to reduce
              your environmental impact.
            </p>
            <button
              className="btn btn-primary btn-lg mx-auto"
              onClick={() => nav("/projects")}
            >
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
