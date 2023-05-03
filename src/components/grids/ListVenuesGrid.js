import React from "react";
import ListCard from "../cards/list";

const ListVenuesGrid = () => {
  return (
    <>
      <div class="w-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        <ListCard />
      </div>
    </>
  );
};

export default ListVenuesGrid;
