import React, { useContext} from "react";
import OrdersTable from "../OrdersTable";
import NavBar from "../../../NavBar";
import OptionsNavBar from "../OptionsNavBar";
import InfoUserContext from "../../../../context/InfoUserContext";
import "./index.css";
import "../user-dashboard-panel-styles.css"

export default function ListOfOrders() {
  const { infoUser } = useContext(InfoUserContext);

  return (
    <div className="user-dashboard-panel-container">
      <NavBar />
      <OptionsNavBar />
      {infoUser.info === null ? (
        <div className = "user-dashboard-panel">
          <p className="mensaje-debes-ser-vendedor">
            Inicia sesion para ver las ordenes
          </p>
        </div>
      ) : (
        <div>
          {infoUser.info.is_seller ? (
            <OrdersTable />
          ) : (
            <div className = "user-dashboard-panel">
              <p className="mensaje-debes-ser-vendedor">
                Debes ser vendedor para ver los pedidos
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
