import React, { useState, useContext, useEffect } from "react";
import makeUserSeller from "../../../../services/makeUserSeller";
import quitUserSeller from "../../../../services/quitUserSeller";
import LogoutLink from "../../../LogoutLink";
import { useNavigate } from "react-router-dom";
import InfoUserContext from "../../../../context/InfoUserContext";
import "./index.css";

//icons import
import LeftArrow from "../../../../assets/left-arrow-icon.svg";
import RightArrow from "../../../../assets/right-arrow-icon.svg";
import LogoProfile from "../../../../assets/navBarIcons/logo-profile.svg";
import YourProductsIcon from "../../../../assets/products-of-seller-icon.svg";
import ListOfOrdersIcon from "../../../../assets/list-of-orders-icon.svg";
import ProductsSoldIcon from "../../../../assets/products-sold-icon.svg";
import MakeYouSellerIcon from "../../../../assets/navBarIcons/LogoProfile.png";
import DejarDeSerVendedorIcon from "../../../../assets/dejar-de-ser-vendedor-icon.svg";

export default function OptionsNavBar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { infoUser } = useContext(InfoUserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(infoUser);
  }, [infoUser]);
  function handleMakeUserSeller() {
    makeUserSeller().then((res) => {
      if (res.status === 200) {
        alert("Action Successfully");
        window.location.reload();
      }
    });
  }
  function handleQuitUserSeller() {
    quitUserSeller().then((res) => {
      if (res.status === 200) {
        alert("Action Successfully");
        window.location.reload();
      }
    });
  }

  return (
    <div>
      {expanded ? (
        <div className="options-nav-bar-expanded">
          <LogoutLink />
          <button
            className="btn button-expanded"
            onClick={() => setExpanded(false)}
          >
            <img alt="icon" src={LeftArrow} />
          </button>
          <button
            className="btn button-show-info-expanded"
            onClick={() => {
              navigate("/user/info");
              setExpanded(false);
            }}
          >
            <img alt="icon" src={LogoProfile} />
            Your Info
          </button>

          {user === null ? null: (
            <div>
              {user.is_seller === true ? (
                <div>
                  <button
                    className="btn button-show-info-expanded"
                    onClick={() => {
                      navigate("/user/seller/products");
                      setExpanded(false);
                    }}
                  >
                    <img alt="icon" src={YourProductsIcon} />
                    Your Products
                  </button>
                  <button
                    className="btn button-show-info-expanded"
                    onClick={() => {
                      navigate("/user/seller/products");
                      setExpanded(false);
                    }}
                  >
                    <img alt="icon" src={ProductsSoldIcon} />
                    Sold products
                  </button>
                  <button
                    className="btn button-show-info-expanded"
                    onClick={() => {
                      navigate("/user/seller/list-of-orders");
                      setExpanded(false);
                    }}
                  >
                    <img alt="icon" src={ListOfOrdersIcon} />
                    List of orders
                  </button>
                  <button
                    className="btn button-show-info-expanded"
                    onClick={() => handleQuitUserSeller()}
                  >
                    <img alt="icon" src={DejarDeSerVendedorIcon} />
                    Dejar de ser vendedor
                  </button>
                </div>
              ) : (
                <button
                  className="btn button-show-info-expanded"
                  onClick={() => handleMakeUserSeller()}
                >
                  <img alt="icon" src={MakeYouSellerIcon} />
                  Make you seller
                </button>
              )}
            </div>
          ) }
        </div>
      ) : (
        <div className="options-nav-bar">
          <button
            className="btn button-expand"
            onClick={() => setExpanded(true)}
          >
            <img alt="icon" src={RightArrow} />
          </button>
        </div>
      )}
    </div>
  );
}
