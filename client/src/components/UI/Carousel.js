import React from "react";
import { UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src:
      //   "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      "/images/slide1.jpg",
    altText: "Slide 1",
    key: "1",
  },
  {
    src:
      //   "https://images.pexels.com/photos/285171/pexels-photo-285171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
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
