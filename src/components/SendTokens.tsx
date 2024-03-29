import React from "react";
import { FixMeLater } from "../types/general";
import AddressValidationForm from "./AddressValidationForm";
import ConnectToMetamask from "./ConnectToMetamask";
import SendEthPayment from "./SendEthPayment";
import "./SendTokens.css";

export default function SendTokens() {
  const handleSubmit = (event: FixMeLater) => {
    event?.preventDefault();
  };

  return (
    <div className="checkout-container animate__animated animate__rotateInUpLeft">
      <h1>Send ETH</h1>
      <div className="checkout-container__div">
        <section className="send-eth">
          <h2>Send ETH payments</h2>
          <SendEthPayment />
        </section>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <section>
            <fieldset className="metamask-connect">
              <h2>Connect to Metamask</h2>
              <ConnectToMetamask />
            </fieldset>
          </section>

          <section>
            <fieldset className="delivery-details">
              <h2>Check Address</h2>
              <p>Please provide a valid ETH address.</p>
              <AddressValidationForm />
            </fieldset>
          </section>
        </form>
      </div>
    </div>
  );
}
