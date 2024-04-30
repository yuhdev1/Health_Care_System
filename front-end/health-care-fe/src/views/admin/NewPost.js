import React from "react";

// components

import CardNewPost from "components/Cards/CardNewPost";

export default function NewPost() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
        <CardNewPost />
        </div>
      </div>
    </>
  );
}
