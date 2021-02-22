import React from "react";
import { connect } from "react-redux";
import MealPlanCard from "./mealplan-card.jsx";
import DogSelector from "./dog-selector.jsx";
import { reduxForm } from "redux-form";
import { userActions } from "../../actions";
import Stepper from "../partials/stepper.jsx";
import { Button } from "../../stories/Button.js";
import GlobalButton from '../global/button.jsx';
import UnpauseMealPlanModal from './unpause-modal.jsx';
import Modal from '../global/modal';
import SkipDeliveryModal from "./skip-delivery-modal.jsx";


class DeliveryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogIndex: 0,
      showUnpauseBox: false
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
    const { dogIndex } = this.state
    const { dogs, user, subscriptions, userDetails, User } = this.props

    const dogsLength = dogs.length
    const currentDog = dogs[dogIndex]
    const { portion } = currentDog;

    let dogNames = dogs.map((dog, i) => { return dog.name })
    let readableNames = dogNames.join(' and ')

    const PAUSED = (user.subscription.status == "paused");
    // const PAUSED = true;

    let deliveryStatus;
    console.log(currentDog)
    const nextDelivery = user.next_occurrencies[0];

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

        {PAUSED &&
          <>
            { dogsLength > 1 && <DogSelector dogs={dogs} setDog={this.setDog} dogIndex={dogIndex} />}
            <span className="mb-5 text-base font-semibold">{readableNames}'s delivery is currently paused. Unpause to schedule your next delivery</span>
            <div className="my-8">
              <MealPlanCard dogIndex={dogIndex} portion={portion} />
            </div>
            <GlobalButton filled={true} styles="mb-7" text="Unpause Meal Plan"
              handleClick={() => {
                this.setState({ showUnpauseBox: true });
              }}
            />
            <br />
            <span className="text-base font-semibold" >Next available delivery date</span>
            <br />
            <span className="font-cooper text-25xl">{nextDelivery}</span>

            <Modal
              title="Unpause Kabo"
              isOpen={this.state.showUnpauseBox}
              onRequestClose={() => this.setState({ showUnpauseBox: false })}
            >
              <UnpauseMealPlanModal dogs={dogs} dogIndex={dogIndex} />
            </Modal>
          </>

        }

        {!PAUSED &&
          <>
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
          </>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  openSkipDeliveryModal: (payload) =>
    dispatch(userActions.openSkipDeliveryModal(payload)),
  skipDogDelivery: (payload) => dispatch(userActions.skipDogDelivery(payload)),
  getAccountData: () => dispatch(userActions.getAccountData()),
  getSubscriptionData: () => dispatch(userActions.getSubscriptionData())
});

function mapStateToProps(state) {

  const { user: User, user } = state; // whole state of user reducer and named User
  const {
    subscriptions,
    dogs,
    userDetails,
    open_skip_delivery_modal,
    skipping_dog_delivery,
  } = state.user;
  return {
    User,
    user,
    subscriptions,
    dogs,
    userDetails,
    open_skip_delivery_modal,
    skipping_dog_delivery,
  }
}

// DeliveryModal = reduxForm({ form: 'nextDelivery' })(DeliveryModal)
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryModal);
