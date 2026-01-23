import HeadFootLayout from "@/components/common/head-foot-layout";
import InstructorDashboard from "@/lms-pages/instructor/instructor-dashboard";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <HeadFootLayout> */}
      <InstructorDashboard />
      {/* </HeadFootLayout> */}
    </div>
  );
};

export default page;
