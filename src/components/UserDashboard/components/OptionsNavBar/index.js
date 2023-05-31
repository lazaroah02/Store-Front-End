import React, {useContext} from "react";
import makeUserSeller from "../../../../services/makeUserSeller";
import quitUserSeller from "../../../../services/quitUserSeller";
import LogoutLink from "../../../LogoutLink";
import { useMyNavigate } from "../../../../customHooks/useMyNavigate";
import InfoUserContext from "../../../../context/InfoUserContext";
import "./index.css";

//icons import
import YourProductsIcon from "../../../../assets/products-of-seller-icon.svg";
import ListOfOrdersIcon from "../../../../assets/list-of-orders-icon.svg";
import MakeYouSellerIcon from "../../../../assets/navBarIcons/LogoProfile.png";
import DejarDeSerVendedorIcon from "../../../../assets/dejar-de-ser-vendedor-icon.svg";
import UserIcon from '../../../../assets/logo-profile.svg'

export default function OptionsNavBar() {
  const myNavigate = useMyNavigate();
  const { infoUser } = useContext(InfoUserContext);

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
      <div className = "options-nav-bar">
          {infoUser.info?<>
            {infoUser.info.is_seller?
              <div className = "is-seller-message">Felicidades ahora eres vendedor</div> 
            :
              null
            }
          </>:null}
          {infoUser.info === null ? null: (
            <>
              <button
                    className="btn button-option"
                    onClick={() => {
                     myNavigate("/user/info");
                    }}
                  >
                    <img alt="icon" src={UserIcon} />
                    <span>Tu perfil</span>
                </button>
              {infoUser.info.is_seller? (
                <>
                  <button
                    className="btn button-option"
                    onClick={() => {
                     myNavigate("/user/seller/products");
                    }}
                  >
                    <img alt="icon" src={YourProductsIcon} />
                    <span>Productos en venta</span>
                  </button>
                  <button
                    className="btn button-option"
                    onClick={() => {
                     myNavigate("/user/seller/list-of-orders");
                    }}
                  >
                    <img alt="icon" src={ListOfOrdersIcon} />
                    <span>Lista de Ordenes</span>
                  </button>
                  <button
                    className="btn button-option"
                    onClick={() => handleQuitUserSeller()}
                  >
                    <img alt="icon" src={DejarDeSerVendedorIcon} />
                    <span>Dejar de vender</span>
                  </button>
                </>
              ) : (
                <button
                  className="btn button-option"
                  onClick={() => handleMakeUserSeller()}
                >
                  <img alt="icon" src={MakeYouSellerIcon} />
                  <span>Convertirte en vendedor</span>
                </button>
              )}
              <LogoutLink />
            </>
          ) }
    </div>
  );
}
