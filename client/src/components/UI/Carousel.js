import React from "react";
import { UncontrolledCarousel } from "reactstrap";

/*Simple Slide Show*/
const items = [
  {
    src:

      "/images/slide1.jpg",
    altText: "Slide 1",
    key: "1",
  },
  {
    src:

        "/images/slide2.jpeg",
    altText: "Slide 2",

    key: "2",
  },
  {
    src:
        "/images/slide3.jpg",
    altText: "Slide 3",
    key: "3",
  },
];

const Carousel = () => (
  <div style={{ margin: "20px" }}>
    <UncontrolledCarousel controls={false} items={items} />
  </div>
);

export default Carousel;
