"use client";
import educationList from "../../../utils/educationList.json";
import workList from "../../../utils/workList";
import Title from "../Title";
import Education from "./Education";
import WorkExperience from "./WorkExperience";

export default function Qualifications() {
  let experience;
  let university;

  experience = workList
    .sort((b, a) => a.id - b.id)
    .map((work, idx) => {
      return (
        <span key={idx}>
          <WorkExperience work={work} />
        </span>
      );
    });

  university = educationList
    .sort((b, a) => a.id - b.id)
    .map((education, idx) => {
      return (
        <span key={idx}>
          <Education education={education} />
        </span>
      );
    });

  return (
    <>
      <div className="containerCustom gap">
        <Title title="qualifications" titleDes="Expertise and Credentials" />

        {/* Work Experience Section */}
        <div className="p-6 md:p-8 bg-white dark:bg-[#111c35]/40 border border-gray-200/60 dark:border-[#1d2d55]/40 rounded-2xl shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.05)] transition-all duration-300 mb-8">
          <div className="border-l-4 border-cyan-500 dark:border-cyan-400 pl-3 mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">
              Work Experience
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800/60 space-y-6">
            {experience}
          </div>
        </div>

        {/* Education Section */}
        <div className="p-6 md:p-8 bg-white dark:bg-[#111c35]/40 border border-gray-200/60 dark:border-[#1d2d55]/40 rounded-2xl shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.05)] transition-all duration-300">
          <div className="border-l-4 border-cyan-500 dark:border-cyan-400 pl-3 mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">
              Education & Degrees
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800/60 space-y-6">
            {university}
          </div>
        </div>
      </div>
    </>
  );
}
