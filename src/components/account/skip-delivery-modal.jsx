import React from "react";
import LoadingCircle from "../partials/loading";
import Stepper from "../partials/stepper";
import MealplanCard from "./mealplan-card";
import {connect} from "react-redux";
import {userSelectors} from "../../selectors/user.selectors";
import {userActions} from "../../actions";

// dogs, dogIndex, subscriptions, noPrice, user
const SkipDeliveryModal = ({
  dogIndex,
  User,
  currentDog,
  //dogSubscription,
  skipping_dog_delivery,
  skipDogDelivery,
}) => {
  const getNextDeliveryDates = () => {
    console.log(currentDog)
    return (
      User.delivery_starting_date_options &&
      User.delivery_starting_date_options.map((item) => {
        return {
          main: item.label,
          sub: new Date(item.value * 1000).toDateString(),
        };
      })
    );
  };

  return (
    <>
      {skipping_dog_delivery && <LoadingCircle />}

      <div className="py-3 px-24 overflow-x-hidden">
        <div className="mb-5">
          <p className="text-base text-gray-700 text-lg font-medium">
            Upcoming Delivery Date
          </p>
          <p className="text-lg text-gray-700 text-2xl font-medium">
            {User &&
              User.starting_date &&
              new Date(User.starting_date * 1000).toDateString()}
          </p>
        </div>
        <div className="bg-white border p-5 rounded-md shadow-md">
          <MealplanCard dogIndex={dogIndex}/>
          <div>
            <button
              className="bg-green-600 text-white py-2 px-10 rounded-md focus:outline-none font-medium"
              onClick={() => skipDogDelivery(currentDog.id)}
            >
              Skip Delivery
            </button>
          </div>

          <div className="mt-3">
            <p className="text-base text-gray-700 text-base font-medium mb-1">
              Your Next Delivery Date
            </p>
            {User && !User.next_delivery_date_showable && (
              <Stepper labels={getNextDeliveryDates()} />
            )}
            <p className="text-sm text-gray-400 mt-3">
              We will send you a delivery on this date
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state, props) {
  const { user: User, user } = state;
  const {
    skipping_dog_delivery,
  } = state.user;
  return {
    User,
    dogSubscription: userSelectors.selectSubscriptionByDogIndex(state, props.dogIndex),
    currentDog: userSelectors.selectDogByIndex(state, props.dogIndex),
    skipping_dog_delivery,
  }
}

const mapDispatchToProps = (dispatch) => ({
  skipDogDelivery: (payload) => dispatch(userActions.skipDogDelivery(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkipDeliveryModal);
