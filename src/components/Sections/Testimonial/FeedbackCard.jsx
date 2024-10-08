"use client";
import { useState, useRef, useEffect } from "react"; // Import necessary hooks
import { StarIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export default function FeedBackCard({ feedback }) {
  const { name, star, description, position, ref_comp, profile_image } =
    feedback || {};

  const totalStars = 5;
  const filledStars = Math.floor(star || totalStars);
  const hasHalfStar = star % 1 !== 0;

  const rating = [];
  for (let i = 0; i < totalStars; i++) {
    if (i < filledStars) {
      rating.push(
        <StarIcon
          className="h-4 w-4 md:h-5 md:w-5 text-yellow-700 dark:text-yellow-300"
          key={i}
        />,
      );
    } else if (i === filledStars && hasHalfStar) {
      rating.push(
        <StarIcon
          className="h-4 w-4 md:h-5 md:w-5 text-gray-300 dark:text-gray-600"
          key={i}
        />,
      );
    } else {
      rating.push(
        <StarIcon
          className="h-4 w-4 md:h-5 md:w-5 text-gray-300 dark:text-gray-600"
          key={i}
        />,
      );
    }
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const [showViewMore, setShowViewMore] = useState(false);
  const descRef = useRef(null);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const checkDescriptionHeight = () => {
      if (descRef.current) {
        const element = descRef.current;
        const lineHeight = parseInt(
          window.getComputedStyle(element).lineHeight,
          10,
        );
        const maxHeight = lineHeight * 4;
        if (element.scrollHeight > maxHeight) {
          setShowViewMore(true);
        } else {
          setShowViewMore(false);
        }
      }
    };

    checkDescriptionHeight();
    const resizeObserver = new ResizeObserver(() => checkDescriptionHeight());
    if (descRef.current) {
      resizeObserver.observe(descRef.current);
    }

    return () => {
      if (descRef.current) {
        resizeObserver.unobserve(descRef.current);
      }
    };
  }, [description]);

  return (
    <div className="mx-1">
      <Card
        color="transparent"
        shadow={false}
        className="w-full max-w-[50rem] mx-auto px-5 py-1 shadow-md mb-4 dark:bg-gray-800 backdrop-blur-xl bg-white/90 dark:border-gray-700 dark:text-white"
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-5"
        >
          <Avatar
            size="xl"
            variant="rounded"
            src={
              profile_image
                ? profile_image
                : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            }
            alt="candice wu"
            className="rounded-full"
          />
          <div className="flex w-full gap-0.5 justify-start md:justify-between flex-col md:flex-row">
            <div className="flex flex-col">
              <Typography
                variant="h5"
                color="blue-gray"
                className="dark:text-gray-300 font-semibold"
              >
                {name}
              </Typography>
              <Typography
                color="blue-gray"
                className="dark:text-gray-400 text-xs font-medium capitalize"
              >
                {position ? position : "Frontend Lead"} @{" "}
                {ref_comp ? ref_comp : "Google"}
              </Typography>
            </div>
            <div className="flex items-center gap-0">{rating}</div>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0">
          <Typography
            ref={descRef}
            className={`text-center dark:text-gray-300 ${
              isExpanded ? "" : showViewMore ? "line-clamp-3" : "line-clamp-4"
            }`}
          >
            {description}
          </Typography>

          {showViewMore && (
            <div className="text-center mt-1">
              <button
                onClick={toggleExpand}
                className="text-blue-500 hover:underline"
              >
                {isExpanded ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
