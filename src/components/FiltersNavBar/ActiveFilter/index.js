import React from "react";

export default function ActiveFilter({filterName, handleRemoveFilter}){
    return(
        <div>
            {filterName}
            <button className = "btn" onClick={() => handleRemoveFilter(filterName)}>x</button>
        </div>
    )
}