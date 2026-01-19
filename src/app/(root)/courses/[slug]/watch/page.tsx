import VideoCoursePlayer from "@/lms-pages/video-player-page";
import React from "react";

const page = () => {
  const sampleData = {
    title: "The React Full Course",
    chapters: [],
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  };
  return (
    <div>
      <VideoCoursePlayer data={sampleData} />
    </div>
  );
};

export default page;
