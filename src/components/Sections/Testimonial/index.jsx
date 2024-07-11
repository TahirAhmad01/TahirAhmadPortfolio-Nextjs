import Title from "../Title";
import FeedbackSlider from "./FeedbackSlider";

export default function Testimonial() {
  return (
    <>
      <div className="containerCustom gap">
        <Title title="CLIENT FEEDBACK" />
        <FeedbackSlider />
      </div>
    </>
  );
}
