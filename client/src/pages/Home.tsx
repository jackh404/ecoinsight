import "../App.css";
const Home = () => {
  return (
    <div className="bg-environmental-protection bg-cover bg-center grow z-0">
      <div className="bg-base-100 bg-opacity-80 h-full p-8 z-1 ">
        <div className="md:flex z-2 mt-8">
          <div className="text-base-100-content p-6 rounded text-center m-2 ">
            <h1 className="text-3xl font-bold">Assess</h1>
            <hr />
            <p>
              Use our assessment tool to identify areas of your home that
              contribute an outsized environmental impact and figure out how to
              make smart changes.
            </p>
          </div>
          <div className=" text-base-100-content p-6 rounded text-center m-2 md:mt-10 ">
            <h1 className="text-4xl font-bold">Your Impact</h1>
            <hr />
            <p>
              We all contribute to environmental degradation in one way or
              another. Understanding what aspects of your life have the greatest
              impact is the first step toward improvement.
            </p>
          </div>
          <div className="text-base-100-content p-6 rounded text-center m-2 ">
            <h1 className="text-3xl font-bold">Reduce</h1>
            <hr />
            <p>
              Undertake projects based on our suggestions (or not!) to reduce
              your environmental impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
