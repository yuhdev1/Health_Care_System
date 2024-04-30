import React from "react";

// components

import CardNewReservation from "components/Cards/CardNewReservation";

export default function NewReservation() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
        <CardNewReservation />
        </div>
      </div>
    </>
  );
}
