import React, { useState } from "react";
import NavBar from "../components/NavBar";
import PurchaseSummary from "../components/ProcessPayComponents/PurchaseSummary";
import DeliveryDetails from "../components/ProcessPayComponents/DeliveryDetails";
import PayForm from "../components/ProcessPayComponents/PayForm";
import "./pagesStyles/process-pay.css";

export default function Processpay() {
  const [actualStep, setActualStep] = useState(0);
  return (
    <div className="process-pay-page">
      <NavBar />
      <article className="process-page-container">
        <header className="process-pay-header">
            <div className = {actualStep === 0?"tab": "tab tab-off"} onClick = {() => setActualStep(0)}>Resumen de Compra</div>
            <div className = {actualStep === 1?"tab": "tab tab-off"} onClick = {() => setActualStep(1)}>Detalles de Envio</div>
            <div className = {actualStep === 2?"tab": "tab tab-off"} onClick = {() => setActualStep(2)}>Formulario de Pago</div>
        </header>
        <section className = "process-pay-body">
          {actualStep === 0 ? (
            <PurchaseSummary />
          ) : actualStep === 1 ? (
            <DeliveryDetails />
          ) : (
            <PayForm />
          )}
        </section>
      </article>
    </div>
  );
}
