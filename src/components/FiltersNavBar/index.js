import CategoriesFilter from "../Filters/CategoriesFilter";
import PriceFilter from "../Filters/PriceFilter";
import AllFilter from "../Filters/AllFilter";
import React from "react";
import "./index.css";

export default function FIltersNavBar() {
  return (
    <div className = "FiltersNavBar">
        <AllFilter/>
        <CategoriesFilter/>
        <PriceFilter/>
    </div>
  );
}
