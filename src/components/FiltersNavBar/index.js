import CategoriesFilter from "../Filters/CategoriesFilter";
import DateFilter from "../Filters/DateFilter";
import PlaceFilter from "../Filters/PlaceFilter";
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
        <DateFilter/>
        <PlaceFilter/>
    </div>
  );
}
