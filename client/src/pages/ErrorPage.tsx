// import React from 'react'

import NavBar from "../components/NavBar.tsx";

const ErrorPage = () => {
  return (
    <div>
      <NavBar />
      <h1>Whoopsie Daisy!</h1>
      <p>
        I don't know what came over me. Why don't you try a good old fashioned
        refresh?
      </p>
    </div>
  );
};

export default ErrorPage;
