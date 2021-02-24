import React, { useState } from "react";
import Radio from "../global/radio";
import RadioMessage from "./RadioMessage";

const CancelReason = ({reason, setReason, dogName, lastName}) => {
  return (
    <React.Fragment>
      <p className="text-lg text-center font-medium text-gray-800">
        Please select a reason why you'd like to cancel your subscription
      </p>
      <div className="mt-5 grid lg:grid-cols-2 sm:grid-cols-1">
        <div>
          <Radio
            value="expectations"
            className="mb-7"
            text="Recipes didn't meet my expectations"
            onChange={() => setReason("expectations")}
            selected={reason === "expectations"}
          />
          {reason === "expectations" && (
            <RadioMessage
              title="Let us make things right!"
              text={`Our Dog Care & Nutrition team is eager to listen to your feedback and concerns. Schedule an appointment today and we will do our best to make sure your issue is resolved as quickly as possible!`}
              buttonTitle="Get 50% off now"
            />
          )}
        </div>

        <div>
          <Radio
            value="expectations"
            className="mb-7"
            text="My dog had a health reaction"
            onChange={() => setReason("1")}
            selected={reason === "1"}
          />
          {reason === "1" && (
            <RadioMessage
              title="Book an appointment with Dr. Suzee!"
              text={`We encourage you to take advantage of Kabo's certified veternarian to discuss any health-related matters regarding ${dogName}. Schedule a virtual appoinment with Dr. Suzee ${lastName} to evaluate all of ${dogName}'s dietary needs!`}
              buttonTitle="Get 50% off now"
            />
          )}
        </div>

        <div>
          <Radio
            value="expectations"
            className="mb-7"
            text="Switching to a different food type/brand"
            onChange={() => setReason("2")}
            selected={reason === "2"}
          />
          {reason === "2" && (
            <RadioMessage
              title={`Need help finding the perfect diet for ${dogName}?`}
              text={`We're sad to see ${dogName} go but we want to continue to help you find the best diet for ${dogName}. Check out our blogs where our Research & Development team share their thoughts on all things dog food!`}
              buttonTitle="Get 50% off now"
            />
          )}
        </div>

        <div>
          <Radio
            value="expectations"
            className="mb-7"
            text="Unsatisfied with shipping and handling"
            onChange={() => setReason("3")}
            selected={reason === "3"}
          />
          {reason === "3" && (
            <RadioMessage
              title="Let us make things right!"
              text="Our customer support team is eager to listen to your feedback and concerns. We will do our best to make sure your issue is resolved as quickly as possible!"
              buttonTitle="Get 50% off now"
            />
          )}
        </div>

        <div>
          <Radio
            value="expectations"
            className="mb-7"
            text="I'm moving to another city"
            onChange={() => setReason("4")}
            selected={reason === "4"}
          />
          {reason === "4" && (
            <RadioMessage
              title="We're available across Canada!"
              text="If you decide to reactivate your Kabo subscription after you settled into your new home, you can do that directly here "
              buttonTitle="Get 50% off now"
            />
          )}
        </div>

        <div>
          <Radio
            value="expectations"
            className="mb-7"
            text="I just wanted to try it out"
            onChange={() => setReason("5")}
            selected={reason === "5"}
          />
          {reason === "5" && (
            <RadioMessage
              title="Let us know your initial experience!"
              text="Our customer support team is eager to listen to your feedback. Let us know what you'd like to see from your perfect dog food!"
              buttonTitle="Get 50% off now"
            />
          )}
        </div>

        <div>
          <Radio
            value="other"
            className="mb-7"
            text="Other"
            onChange={() => setReason("6")}
            selected={reason === "6"}
          />
          {reason === "6" && (
            <RadioMessage
              title="Let us make things right!"
              text="Our customer support team is eager to listen to your feedback and concerns. We will do our best to make sure your issue is resolved as quickly as possible!"
              buttonTitle="Get 50% off now"
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CancelReason;
