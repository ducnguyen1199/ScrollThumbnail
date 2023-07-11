import React, { Fragment } from "react";
import { SliceContainer } from "./SliceScroll";

const App = () => {
  return (
    <Fragment>
      {[...Array(30)].map(() => (
        <br />
      ))}
      <SliceContainer />
      {[...Array(30)].map(() => (
        <br />
      ))}
    </Fragment>
  );
};

export default App;
