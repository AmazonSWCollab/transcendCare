import React from "react";
import DashBoardCard from "../Common/Card/DashBoardCard";

const CommunityForum = () => {
  return (
    <div className="mt-10">
      {/* This should be dynamic with data from API */}
      <DashBoardCard
        header="Community Forum"
        title="Share your story"
        subtitle=""
        color="#F6EAAA"
        shadow="#F0DF89"
        pic="/forum.svg"
        additionalText="Click to see more"
        link="/forum"
      />
    </div>
  );
};

export default CommunityForum;
