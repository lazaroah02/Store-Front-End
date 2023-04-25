import React, { useContext, useState, useEffect } from "react";
import OrdersTable from "../OrdersTable";
import NavBar from "../../../NavBar";
import OptionsNavBar from "../OptionsNavBar";
import InfoUserContext from "../../../../context/InfoUserContext";
import "./index.css";

export default function ListOfOrders() {
  const { infoUser } = useContext(InfoUserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(infoUser.info);
  }, [infoUser]);

  return (
    <div className="Orders-Container">
      <NavBar />
      <OptionsNavBar />
      {user === null ? (
        <p className="mensaje-debes-ser-vendedor">
          Inicia sesion para ver las ordenes
        </p>
      ) : (
        <div>
          {infoUser.info.is_seller ? (
            <OrdersTable />
          ) : (
            <p className="mensaje-debes-ser-vendedor">
              Debes ser vendedor para ver los pedidos
            </p>
          )}
        </div>
      )}
    </div>
  );
}
