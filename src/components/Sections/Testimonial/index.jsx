import Title from "../Title";
import FeedbackSlider from "./FeedbackSlider";

export default function Testimonial() {
  return (
    <>
      <div className="containerCustom gap">
        <Title
          title="CLIENT FEEDBACK"
          titleDes="Here are a few testimonials given by some of my amazing clients, which inspire and motivate me to be better everyday."
        />
        <FeedbackSlider />
      </div>
    </>
  );
}
