/* eslint-disable semi */
import React from "react";
import { connect } from "react-redux";
import { isMobile } from 'react-device-detect';

import { ReactComponent as DeliveryBox } from "../../assets/images/box-colour.svg";
import { ReactComponent as Arrow } from "../../assets/images/Vectorarrow.svg";
import { ReactComponent as MealBox } from "../../assets/images/food-colour.svg";
import { ReactComponent as BowlIcon } from "../../assets/images/bowl-colour.svg";

import DeliveryModal from "../../components/account/delivery-modal.jsx";
import MealPlanModal from "../../components/account/meal-modal.jsx";
import FrequencyModal from "../../components/account/delivery-frequency.jsx";
import DogImage from "../../assets/images/Badge-Labrador-Retriever.svg";
import HomeLoader from "../../loaders/homeLoader";
import { userActions } from "../../actions";
import { userSelectors } from "../../selectors/user.selectors";

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextExpanded: !isMobile,
      mealExpanded: false,
      frequencyExpanded: false,
      dogsIndex: 0,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal(name, isCardDisable) {
    if (
      name === "frequencyExpanded" && isCardDisable ||
      (name === "mealExpanded" && isCardDisable)
    ) {
      return;
    }
    this.setState({
      [name]: !this.state[name],
    });
  }

  componentDidMount() {
    this.props.getAccountData();
    this.props.getSubscriptionData();
    this.props.getRecipeData();
  }
  setDogIndex = (i) => {
    this.setState({ dogsIndex: i });
  };

  render() {
    if (!this.props.dogs.length) return <HomeLoader />;
    const { user, subscriptions, dogs, globalState } = this.props;

    let dogNames = dogs.map((dog, i) => {
      return dog.name + `'s`;
    });

    let readableNames = dogNames.join(" + ");
    let dogSubscription = userSelectors.selectSubscriptionByDogIndex(
      globalState,
      this.state.dogsIndex
    );
    let isCardDisable =
      dogSubscription.status === "cancelled" ||
      dogSubscription.status === "paused";

    const sectionHeader = (stateValue, Icon, text, Modal) => {
      let expanded = this.state[stateValue];

      return (
        <div>
          <div
            onClick={() => this.openModal(stateValue, isCardDisable)}
            className={`flex bg-account justify-between items-center h-12 text-xl font-light p-3 cursor-pointer 
              ${expanded
                ? "rounded-t-xl border-t border-l border-r border-gray-300"
                : "rounded-xl"
              } ${stateValue === "frequencyExpanded" && isCardDisable || stateValue === "mealExpanded" && isCardDisable ? "opacity-40" : ""}`}
          >
            <div className="flex justify-between items-center  h-full">
              <div className="w-8 h-8 mr-6">
                <Icon className="w-full h-full" />
              </div>
              <p className="text-base sm:text-xs xl:text-base">{text}</p>
            </div>
            <Arrow
              className="w-8 h-3"
              style={{ transform: expanded ? "rotateX(180deg)" : null }}
            />
          </div>
          {expanded && <Modal setDogIndex={this.setDogIndex} />}
        </div>
      );
    };

    const profileImages = dogs.map((dog, i) => {
      return (
        <img
          key={i}
          src={DogImage}
          alt=""
          className="md:mr-9 h-16 w-16 rounded-full"
        />
      );
    });

    return (
      <div className="pb-40 bg-white px-3 md:px-0 md:w-11/12 mx-auto xl:w-full">
        <div className="account-dashboard w-full bg-account flex items-center md:justify-start justify-center md:h-28 rounded-xl p-5 md:p-8 text-5x1 font-bold mb-6 font-messina">
          <div className="flex justify-center items-center flex-col md:flex-row">
            <div className="flex justify-around w-3/4 md:w-auto md:justify-center">
              {profileImages}
            </div>
            <div className="h-full text-xl text-center md:text-left font-bold md:m-6 font-messina">
              {readableNames} plan
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5 md:gap-4 xl:gap-10 grid-cols-1">
          {sectionHeader(
            "nextExpanded",
              MealBox,
            "Next Delivery",
            DeliveryModal
          )}
          {sectionHeader("mealExpanded", BowlIcon, "Meal Plan", MealPlanModal)}
          {sectionHeader(
            "frequencyExpanded",
            DeliveryBox,
            "Delivery Frequency",
            FrequencyModal
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAccountData: () => dispatch(userActions.getAccountData()),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData()),
  getRecipeData: () => dispatch(userActions.getRecipeData()),
});

const mapStateToProps = (state) => {
  const { user } = state.authentication;
  const { subscriptions, dogs } = state.user;
  return {
    user,
    globalState: state,
    subscriptions,
    dogs,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
