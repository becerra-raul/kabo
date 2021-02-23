import React from "react";
import Radio from "../global/radio";
import beefIcon from "../../assets/images/recipe/beef-100@2x.jpg";

const CancelDelivery = ({ cancelType, setCancelType, dogIndex }) => {
  return (
    <React.Fragment>
      <div className="lg:flex justify-between lg:mb-4 mb-4">
        <div className="flex justify-between lg:w-80">
          <div className="flex">
            <img className="w-13 mr-5.5" src={beefIcon} />
            <div>
              <h5 className="text-base font-semibold ">Savoury Beef</h5>
              <p className="text-sm">14 days worth of full-meal</p>
            </div>
          </div>
          <h5 className="text-base font-semibold ">$43.12</h5>
        </div>
        <div className="">
          <a
              className="text-sm font-semibold text-primary lg:mr-2 cursor-pointer"
              href={`/edit-plan/${dogIndex}`}
          >
            Select a different meal plan
          </a>
        </div>
      </div>
      {/* <div className="bg-green-300 text-center rounded-md py-4 mb-8">
          <h3 className="text-3xl font-light mb-2">
            Get 50% off your next delivery
          </h3>
          <p>claim this offer (today)</p>
        </div> */}

      <div className="lg:flex justify-between lg:mb-2 mt-8">
        <div className="lg:w-80">
          <Radio
            value="1-delivery"
            className="mb-7"
            text="Pause Blake’s account for 1 delivery"
            onChange={() => setCancelType("1-delivery")}
            selected={cancelType === "1-delivery"}
          />
          <Radio
            value="2-delivery"
            className="mb-7"
            text="Pause Blake’s account for 2 delivery"
            onChange={() => setCancelType("2-delivery")}
            selected={cancelType === "2-delivery"}
          />
          {/* <Radio
              value="indefinitely"
              text="Pause Blake’s account indefinitely"
              onChange={() => setCancelType("indefinitely")}
              selected={cancelType === "indefinitely"}
            /> */}
          <Radio
            value="specific-date"
            className="mb-7"
            text="Cancel Blake's deliveries"
            onChange={() => setCancelType("specific-date")}
            selected={cancelType === "specific-date"}
          />
        </div>
        <div>
          <div className="lg:w-72 p-6 bg-yellow-100 rounded-1lg">
            <h3 className="text-base font-semibold mb-1.3">
              You can unpause anytime
            </h3>
            <p>
              Placeholder keep in mind you can pause your account at anytime
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CancelDelivery;
