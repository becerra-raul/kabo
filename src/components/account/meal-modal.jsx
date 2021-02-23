import React from "react";
import {connect} from "react-redux";

import DogSelector from "./dog-selector";
import MealPlanCard from "./mealplan-card";
import PortionDisplay from "./portion-display";

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
    } = this.props;
    const dogsLength = dogs.length;
    const currentDog = dogs[dogIndex];
    const { portion } = currentDog;

    return (
      <>
        <div className="py-8 px-5 relative border-r border-l rounded-b-xl border-b border-gray-300">
          {dogsLength > 1 && (
            <DogSelector dogs={dogs} setDog={this.setDog} dogIndex={dogIndex} />
          )}
          <MealPlanCard dogIndex={dogIndex} portion={portion} />
          <div className="text-primary w-full font-bold">
            <a href={`/edit-plan/${dogIndex}`}>
              Select a different meal plan
            </a>
          </div>
          <div className="text-lightGrey text-xs text-semibold mt-7">
            PORTIONS
          </div>
          <PortionDisplay portion={portion} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { dogs } = state.user;
  return {
    dogs,
  };
};

export default connect(mapStateToProps, {})(MealPlanModal);
