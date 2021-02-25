import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CancelDelivery from './cancel-delivery';
import CancelReason from './cancel-reasons';
import SorryMessage from './sorry-message';
import { userActions } from '../../actions/user.action';
import DogSelector from './dog-selector';
import {userSelectors} from '../../selectors/user.selectors';
import {userConstants} from "../../constants/user.constants";

const CancelMealModal = ({
  dogs,
  subscriptions,
  cancelSubscription,
  closeHandler,
  loading,
  error,
  resetUserError
}) => {
  const [cancelType, setCancelType] = useState('1-delivery');
  const [step, setStep] = useState(1);
  const [dogIndex, setDogIndex] = useState(0);
  const [requestInitiated, setRequestInitiated] = useState(false);
  const [reason, setReason] = useState("");
  const [isCancelled, setIsCancelled] = useState("");

  const currentDog = dogs[dogIndex] || {};
  let dogSubscription = {};
  Object.keys(subscriptions).forEach(key => {
    if (subscriptions[key].dog_id === currentDog.id) {
      dogSubscription = subscriptions[key];
    }
  });

  useEffect(() => {
    const statuses = Object.keys(subscriptions).map(key =>
        ({dog_id: subscriptions[key].dog_id, status: subscriptions[key].status}));
    setIsCancelled(!!statuses.filter(s => +s.dog_id === +currentDog.id && s.status === 'cancelled').length);
  }, [dogIndex])

  useEffect(() => {
    setStep(1);
    resetUserError();
  }, [])

  useEffect(() => {
    if (!loading && requestInitiated && step === 2 && !error) {
      setStep(step + 1);
    }
  }, [loading]);

  const handleStep = () => {
    if (step + 1 === 3) {
      setRequestInitiated(true);
      cancelSubscription({userId: currentDog.user_id, dog_id: currentDog.id, reason, type: cancelType})
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="p-6">
      {step === 1 && (
      <>
        <div className="p-6">
          {dogs.length > 1 && (
              <DogSelector
                  dogs={dogs}
                  setDog={setDogIndex}
                  dogIndex={dogIndex}
              />
          )}
        </div>
        <CancelDelivery
          dogIndex={dogIndex}
          dogName={currentDog.name}
          cancelType={cancelType}
          setCancelType={setCancelType}
          subscription={dogSubscription}
        />
      </>
      )}

      {step === 2 && <CancelReason
          reason={reason}
          setReason={setReason}
          dogName={currentDog.name}
          lastName={""}
      />}
      {step === 3 && <SorryMessage closeHandler={closeHandler} />}
      {step !== 3 && (
      <div>
        {error || dogSubscription.status === "cancelled" && (
            <div className="text-red-500 text-xs mt-1">
              {dogSubscription.status === "cancelled"
                  ? "This subscription already cancelled"
                  : "An error occured please try again later"}
            </div>
        )}
        <button
          className={`rounded-xl py-3 px-8 text-base font-bold bg-primary ${
              isCancelled || loading 
              ? "opacity-50" : ''} focus:outline-none text-white mt-2`}
              // onClick={() => cancelUserSubscription(currentDog.id)}
          onClick={() => handleStep(step)}
          disabled={isCancelled || loading}
        >
          {loading && <i className="fas fa-circle-notch fa-spin mr-2" />}
          {step === 2 ? 'Confirm' : 'Next'}
        </button>
      </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  resetUserError: () => dispatch(userActions.resetUserError()),
  pauseSubscription: async (data) => dispatch(userActions.pauseSubscription(data)),
  cancelSubscription: async (userId) => dispatch(userActions.cancelSubscription(userId)),
});

const mapStateToProps = (state) => {
  const {
    subscriptions, dogs, error, user
  } = state.user;
  return {
    dogs,
    subscriptions,
    error,
    userName: user.last_name ? user.last_name : user.first_name ? user.first_name : 'Customer',
    loading: userSelectors.selectUserLoadingByKey(state, userConstants.CANCEL_SUBSCRIPTION_REQUESTED),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelMealModal);
