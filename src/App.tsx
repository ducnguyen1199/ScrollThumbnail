import { Fragment } from "react";
import { SliderContainer, TSliderItem } from "./Slider";

const data: TSliderItem[] = [
  {
    id: 1,
    imgSrc: "https://source.unsplash.com/random/200x200?sig=1",
    content: (
      <Fragment>
        <h1>title 1</h1>
        <span>Lorem ipsum </span>
      </Fragment>
    ),
  },
  {
    id: 2,
    imgSrc: "https://source.unsplash.com/random/200x200?sig=2",
    content: (
      <Fragment>
        <h1>title 2</h1>
        <span>Lorem ipsum </span>
      </Fragment>
    ),
  },
  {
    id: 3,
    imgSrc: "https://source.unsplash.com/random/200x200?sig=3",
    content: (
      <Fragment>
        <h1>title 3</h1>
        <span>Lorem ipsum </span>
      </Fragment>
    ),
  },
  {
    id: 4,
    imgSrc: "https://source.unsplash.com/random/200x200?sig=4",
    content: (
      <Fragment>
        <h1>title 4</h1>
        <span>Lorem ipsum </span>
      </Fragment>
    ),
  },
  {
    id: 5,
    imgSrc: "https://source.unsplash.com/random/200x200?sig=5",
    content: (
      <Fragment>
        <h1>title 5</h1>
        <span>Lorem ipsum </span>
      </Fragment>
    ),
  },
];

const App = () => {
  return (
    <Fragment>
      {[...Array(20)].map(() => (
        <br />
      ))}
      <SliderContainer data={data} height={500} />
      {[...Array(20)].map(() => (
        <br />
      ))}
    </Fragment>
  );
};

export default App;
