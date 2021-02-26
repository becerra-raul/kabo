import React from "react";
import { connect } from "react-redux";

import DogSelector from "./dog-selector";
import MealPlanCard from "./mealplan-card";
import PortionDisplay from "./portion-display";
import { userSelectors } from "../../selectors/user.selectors";


class MealPlanModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogIndex: 0,
    };
    this.setDog = this.setDog.bind(this);

  }

  setDog(i) {
    this.setState({
      dogIndex: i,
    });
  }

  render() {
    const { dogIndex } = this.state;
    const {
      dogs,
      subscriptions
    } = this.props;
    const dogsLength = dogs.length;
    const currentDog = dogs[dogIndex];
    const { portion_adjustment, cooked_portion, kibble_portion } = currentDog;

    let cbID = currentDog.chargebee_subscription_id
    let status = subscriptions[cbID].status
    let inTrial = status.includes('future') || status.includes('trial')
    let portion = portion_adjustment === 'higher' ? 110 : cooked_portion ? cooked_portion : 0;

    return (
      <>
        <div className="py-8 px-5 relative border-r border-l rounded-b-xl border-b border-gray-300">
          {dogsLength > 1 && (
            <DogSelector dogs={dogs} setDog={this.setDog} dogIndex={dogIndex} />
          )}
          <MealPlanCard dogIndex={dogIndex} portion={portion} />
          {!inTrial && (
            <div className="text-primary w-full font-bold">
              <a href={`/edit-plan/${dogIndex}`}>
                Select a different meal plan
            </a>
            </div>
          )}
          {!kibble_portion ? <React.Fragment>
            <div className="text-lightGrey text-xs text-semibold mt-7">
              PORTIONS
            </div>
            <PortionDisplay portion={portion} />
          </React.Fragment> : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { dogs } = state.user;
  return {
    subscriptions: userSelectors.selectSubscriptions(state),
    dogs,
  };
};

export default connect(mapStateToProps, {})(MealPlanModal);
