import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import LoadingCircle from "../../partials/loading";
import Input from "../../global/input";
import "./style.css";

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const StripeForm = ({
  isAppend,
  setIsAppend,
  updatePaymentMethod,
  updating_payment_method,
  payment_billing_address,
  setBillingAddress,
}) => {
  const [cardErrorMessage, setCardErrorMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (key, value) => {
    let address = { ...payment_billing_address };
    address[key] = value;
    setBillingAddress(address);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      setCardErrorMessage(result.error.message);
    } else {
      stripeTokenHandler(result.token);
      card.clear();
    }
  };

  const stripeTokenHandler = async (token) => {
    let data = payment_billing_address;
    data.stripe_token = token.id;
    data.same_as_shipping_address = isAppend;
    updatePaymentMethod(data);
  };
  return (
    <React.Fragment>
      {updating_payment_method && <LoadingCircle />}
      <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
      {cardErrorMessage && (
        <p className="text-red-500 p-1 font-medium">{cardErrorMessage}</p>
      )}
      <div className="mb-5 mt-5">
        <p className="text-xl md:text-lg">Billing Address</p>
        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={isAppend}
            onChange={() => setIsAppend(!isAppend)}
          />
          <span className="ml-2">same as shipping address</span>
        </label>
      </div>

      {!isAppend && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              required
              name="FIRST NAME"
              onChange={(e) =>
                handleChange("billing_first_name", e.target.value)
              }
              inputValue={payment_billing_address.billing_first_name}
            />
            <Input
              required
              name="LAST NAME"
              onChange={(e) =>
                handleChange("billing_last_name", e.target.value)
              }
              inputValue={payment_billing_address.billing_last_name}
            />
            <Input
              required
              name="PHONE NUMBER"
              onChange={(e) =>
                handleChange("billing_phone_number", e.target.value)
              }
              inputValue={payment_billing_address.billing_phone_number}
            />
            <Input
              name="APT/SUITE"
              onChange={(e) =>
                handleChange("billing_apt_suite", e.target.value)
              }
              inputValue={payment_billing_address.billing_apt_suite}
            />
            <Input
              required
              name="CITY"
              onChange={(e) => handleChange("billing_city", e.target.value)}
              inputValue={payment_billing_address.billing_city}
            />
            <Input
              required
              name="POSTAL CODE"
              inputValue={payment_billing_address.billing_postal_code}
              onChange={(e) =>
                handleChange("billing_postal_code", e.target.value)
              }
            />
          </div>
          <div className="mb-3">
            <Input
              type="large"
              required
              name="STREET ADDRESS"
              onChange={(e) =>
                handleChange("billing_street_address", e.target.value)
              }
              inputValue={payment_billing_address.billing_street_address}
            />
          </div>
        </>
      )}
      <button
        className="w-full py-3 px-6 text-center text-white focus:outline-none transition-colors duration-150 bg-green-600 rounded-md focus:shadow-outline hover:bg-green-700"
        onClick={(e) => handleSubmit(e)}
      >
        Update Payment Method
      </button>
    </React.Fragment>
  );
};

export default StripeForm;
