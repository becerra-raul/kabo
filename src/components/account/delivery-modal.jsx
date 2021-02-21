import React from "react";
import { connect } from "react-redux";
import MealPlanCard from "./mealplan-card.jsx";
import DogSelector from "./dog-selector.jsx";
import { reduxForm } from "redux-form";
import { userActions } from "../../actions";
import Stepper from "../partials/stepper.jsx";
import { Button } from "../../stories/Button.js";
import SkipDeliveryModal from "./skip-delivery-modal.jsx";

class DeliveryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogIndex: 0,
    };
    this.setDog = this.setDog.bind(this);
    this.toggleDeliveryModal = this.toggleDeliveryModal.bind(this);
  }

  setDog(i) {
    this.setState({
      dogIndex: i,
    });
  }

  toggleDeliveryModal() {
    this.props.openSkipDeliveryModal(!this.props.open_skip_delivery_modal);
  }

  render() {
    const { dogIndex } = this.state;
    const { dogs, user, User } = this.props;
    const dogsLength = dogs.length;
    const portion = dogs[dogIndex];

    let deliveryStatus = "";

    if (user.subscription_phase && user.subscription_phase.status && user.subscription_phase.status.includes('deliver')) {
      deliveryStatus = 3
    } else if (user.subscription_phase && user.subscription_phase.status && user.subscription_phase.status.includes('prepar')) {
      deliveryStatus = 2
    }
    else {
      deliveryStatus = 1
    }

    if (dogsLength === 0) return null;

    return (
      <div className="py-8 px-5 relative border-r border-l rounded-b-xl border-b border-gray-300">
        {dogsLength > 1 && (
          <DogSelector dogs={dogs} setDog={this.setDog} dogIndex={dogIndex} />
        )}
        <MealPlanCard dogIndex={dogIndex} />
        <nav aria-label="Progress">
          <Stepper
            labels={[
              { main: "Scheduled", sub: "We have your order" },
              { main: "Preparing", sub: "We're getting things ready" },
              { main: "Delivering", sub: "Your order is out for delivery" },
            ]}
            current={deliveryStatus}
          />
        </nav>
        {User && User.is_trial && (
          <button
            className="text-primary mt-7 font-bold focus:outline-none"
            onClick={this.toggleDeliveryModal}
          >
            Skip this delivery
          </button>
        )}

        <SkipDeliveryModal
          isOpen={this.props.open_skip_delivery_modal}
          toggle={this.toggleDeliveryModal}
          dogs={dogs}
          dogIndex={dogIndex}
          user={this.props.user}
          User={this.props.User}
          portion={portion}
          skipping_dog_delivery={this.props.skipping_dog_delivery}
          skipDogDelivery={this.props.skipDogDelivery}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  openSkipDeliveryModal: (payload) =>
    dispatch(userActions.openSkipDeliveryModal(payload)),
  skipDogDelivery: (payload) => dispatch(userActions.skipDogDelivery(payload)),
});

function mapStateToProps(state) {
  const { user: User } = state; // whole state of user reducer and named User
  const {
    subscriptions,
    dogs,
    user,
    open_skip_delivery_modal,
    skipping_dog_delivery,
  } = state.user;
  return {
    User,
    user,
    subscriptions,
    dogs,
    open_skip_delivery_modal,
    skipping_dog_delivery,
  };
}

// DeliveryModal = reduxForm({ form: 'nextDelivery' })(DeliveryModal)
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryModal);
