"use client";
import feedbackList from "@/utils/feedbackList.json";
import Slider from "react-slick";
import FeedbackCard from "./FeedbackCard";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:text-gray-500 dark:before:text-gray-400 before:content-['→'] !hidden lg:!block`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:text-gray-500 dark:before:text-gray-400 before:content-['←'] !hidden lg:!block`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

export default function FeedbackSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <div>
        <Slider {...settings}>
          {feedbackList.map((feedback, idx) => {
            return (
              <div key={idx}>
                <FeedbackCard
                  feedback={feedback}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
