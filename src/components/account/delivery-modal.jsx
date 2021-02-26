import React from "react";
import { connect } from "react-redux";
import MealPlanCard from "./mealplan-card.jsx";
import DogSelector from "./dog-selector.jsx";
import { userActions } from "../../actions";
import Stepper from "../partials/stepper.jsx";
import GlobalButton from '../global/button.jsx';
import UnpauseMealPlanModal from './unpause-modal.jsx';
import Modal from '../global/modal';
import SkipDeliveryModal from "./skip-delivery-modal.jsx";
import { userSelectors } from "../../selectors/user.selectors";


class DeliveryModalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogIndex: 0,
      showUnpauseBox: false
    };
    this.setDog = this.setDog.bind(this);
    this.showUnpauseBoxCallBack = this.showUnpauseBoxCallBack.bind(this);
  }

  setDog(i) {
    this.setState({
      dogIndex: i,
    });
    this.props.setDogIndex(i)
  }
  showUnpauseBoxCallBack(val) {
    this.setState({ showUnpauseBox: val })
  }
  render() {
    const { dogIndex } = this.state
    return <ConnectedModal
      dogIndex={dogIndex}
      setDog={this.setDog}
      showUnpauseBox={this.state.showUnpauseBox}
      showUnpauseBoxCallBack={this.showUnpauseBoxCallBack}
    />
  }
}

const DeliveryModal = ({
  dogSubscription,
  dogsLength,
  setDog,
  dogIndex,
  dogs,
  openSkipDeliveryModal,
  open_skip_delivery_modal,
  user,
  User,
  showUnpauseBox,
  showUnpauseBoxCallBack,
}) => {
  let readableNames = dogs && dogs.map((dog) => dog.name).join(' and ')

  const PAUSED = dogSubscription.status == "paused";
  const CANCELLED = dogSubscription.status == 'cancelled'

  let deliveryStatus;
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
      {PAUSED || CANCELLED ?
        <>
          { dogsLength > 1 && <DogSelector dogs={dogs} setDog={setDog} dogIndex={dogIndex} />}
          <span className="mb-5 text-base font-semibold">{readableNames}'s delivery is currently paused. Unpause to schedule your next delivery</span>
          <div className="my-8">
            <MealPlanCard dogIndex={dogIndex} noPrice />
          </div>
          <GlobalButton filled={true} styles="mb-7" text={PAUSED ? 'Unpause Meal Plan' : CANCELLED && 'Reactivate Meal Plan'}
            handleClick={() => showUnpauseBoxCallBack(true)}
          />
          <br />
          <span className="text-base font-semibold" >Next available delivery date</span>
          <br />
          <span className="font-cooper text-25xl">{nextDelivery}</span>

          <Modal
            title={PAUSED ? "Unpause Kabo" : CANCELLED ? 'Reactivate Kabo' : ""}
            isOpen={showUnpauseBox}
            onRequestClose={() => showUnpauseBoxCallBack(false)}
          >
            <UnpauseMealPlanModal dogs={dogs} dogIndex={dogIndex} isCancelled={CANCELLED} />
          </Modal>
        </>
        :
        <>
          {dogsLength > 1 && (
            <DogSelector dogs={dogs} setDog={setDog} dogIndex={dogIndex} />
          )}
          <MealPlanCard dogIndex={dogIndex} nextDelivery={nextDelivery} />
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
              onClick={() => openSkipDeliveryModal(!open_skip_delivery_modal)}
            >
              Skip this delivery
            </button>
          )}
          <Modal
            isOpen={open_skip_delivery_modal}
            onRequestClose={() => openSkipDeliveryModal(!open_skip_delivery_modal)}
          // title={`Skip ${portion.name} Meal Plan`}
          >
            <SkipDeliveryModal dogIndex={dogIndex} />
          </Modal>
        </>
      }
    </div>
  );
}


const mapDispatchToProps = (dispatch) => ({
  openSkipDeliveryModal: (payload) =>
    dispatch(userActions.openSkipDeliveryModal(payload)),
});

function mapStateToProps(state, props) {
  const { user: User, user } = state; // whole state of user reducer and named User
  const {
    dogs,
    open_skip_delivery_modal,
  } = state.user;
  return {
    User,
    user,
    dogs,
    subscriptions: userSelectors.selectSubscriptions(state),
    dogSubscription: userSelectors.selectSubscriptionByDogIndex(state, props.dogIndex),
    dogsLength: dogs.length,
    open_skip_delivery_modal,
  }
}

const ConnectedModal = connect(mapStateToProps, mapDispatchToProps)(DeliveryModal);

export default DeliveryModalWrapper;
