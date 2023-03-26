import React from "react";
import {Link} from 'wouter'
import "./index.css";
import Cart from "../Cart";

export default function LogoProfile() {

  return (
    <div>
      <div>
        <Cart />
        <Link to = '/user-profile'>
          <div className="LogoProfile" ></div>
        </Link>
      </div>
    </div>
  );
}
