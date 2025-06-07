import React, { useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import Button from "@mui/material/Button";
import "react-alice-carousel/lib/alice-carousel.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const HomeSectionCarosel = ({ data, sectionName }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const responsive = {
    0: { items: 1 },
    450: { items: 2 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  const [itemsInSlide, setItemsInSlide] = useState(5);

  const handleResize = (e) => setItemsInSlide(e?.itemsInSlide);



  const slidePrev = () => {
    carouselRef.current?.slidePrev();
    setActiveIndex(prev => Math.max(prev - 1, 0));
  };

  const slideNext = () => {
    carouselRef.current?.slideNext();
    setActiveIndex(prev => Math.min(prev + 1, items.length - 1));
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data.slice(0, 15).map((item, index) => (
    <HomeSectionCard key={index} product={item} />
  ));

  return (
    <div className="">
      <h2 className="text-2xl font-extrabold font-gray-800 py-5">
        {sectionName}
      </h2>
      <div className="relative p-5">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
          mouseTracking
          onResized={handleResize}
          onInitialized={handleResize}
        />
        {activeIndex !== 0 && (
          <Button
            variant="contained"
            className="z-50"
            onClick={slidePrev}
            sx={{
              position: "absolute",
              left: "0rem",
              top: "8rem",
              transform: "translatex(-50%) rotate(90deg)",
              bgcolor: "#ca8a04",
              color: "white",
            }}
            aria-label="previous"
          >
            <KeyboardArrowRightIcon sx={{ transform: "rotate(90deg)" }} />
          </Button>
        )}
        {activeIndex < items.length - itemsInSlide && (
          <Button
            variant="contained"
            className="z-50"
            onClick={slideNext}
            sx={{
              position: "absolute",
              right: "0rem",
              top: "8rem",
              transform: "translatex(50%) rotate(90deg)",
              bgcolor: "#ca8a04",
              color: "white",
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)" }} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarosel;