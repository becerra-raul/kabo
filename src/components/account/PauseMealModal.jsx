import React, {useEffect, useState} from 'react';
import DogSelector from "./dog-selector";
import MealPlanCard from "./mealplan-card";
import Radio from "../global/radio";
import moment from "moment";
import DatePicker from "react-datepicker";
import {ReactComponent as FilledCircle} from "../../assets/images/filled-circle.svg";
import {userActions} from "../../actions";
import {connect} from "react-redux";

const PauseMealModal = ({dogIndex, dogs, subscriptions, error, loading, resetUserLoading, resetUserError, pauseSubscription, closeModal}) => {
    const [currentDogIndex, setCurrentDogIndex] = useState(dogIndex ? dogIndex : 0);
    const [pauseBoxType, setPauseBoxType] = useState("MAIN");
    const [pauseType, setPauseType] = useState("1_delivery");
    const [pauseDisplay, setPauseDisplay] = useState("");
    const [pauseUntil, setPauseUntil] = useState(null);
    const [pauseProcessing, setPauseProcessing] = useState(null);

    const currentDog = dogs[currentDogIndex] ? dogs[currentDogIndex] : {};

    const pauseMeal = () => {
        const dogId = dogs[currentDogIndex].id;
        const pauseUntilToSend =
            pauseType === "1_delivery" ||
            pauseType === "2_deliveries" ||
            pauseType === "forever"
                ? pauseType
                : moment(pauseUntil).format("YYYY-MM-DD");
        setPauseProcessing(true);
        resetUserLoading();
        if (error) {
            resetUserError();
        }
        pauseSubscription({
            dogId: dogId,
            pauseUntil: pauseUntilToSend,
        })
    };

    useEffect(() => {
        if (pauseProcessing) {
            if (!error && !loading && pauseProcessing) {
                setPauseBoxType("SUCCESS")
            }
        }
    }, [loading]);

    const statuses = Object.keys(subscriptions).map(key =>
        ({dog_id: subscriptions[key].dog_id, status: subscriptions[key].status}));
    const isPaused = statuses.filter(s => +s.dog_id === +currentDog.id && s.status !== 'active').length;
    return pauseBoxType === "MAIN"
        ?
        <div className="p-6">
            <div className="p-6">
                {dogs.length > 1 && (
                    <DogSelector
                        dogs={dogs}
                        setDog={setCurrentDogIndex}
                        dogIndex={currentDogIndex}
                    />
                )}
            </div>

            <div className="lg:flex justify-between lg:mb-12 mb-8">
                <div className="lg:w-96">
                    <MealPlanCard noPrice dogIndex={currentDogIndex} />
                </div>
                <div className="mt-6 sm:mt-0">
                    <a
                        className="text-sm font-semibold text-primary lg:mr-2 cursor-pointer"
                        href={`/edit-plan/${currentDogIndex}`}
                    >
                        Select a different meal plan
                    </a>
                </div>
            </div>
            {isPaused ? <div className="text-red-500 text-s mt-1">Plan already paused or Cancelled.</div> : null}
            <div className="lg:flex justify-between lg:mb-9">
                <div className="lg:w-80">
                    <Radio
                        value="1_week"
                        text={`Pause ${currentDog.name} account for 1 delivery`}
                        onChange={() => {
                            setPauseType("1_delivery")
                            setPauseDisplay("for 1 delivery")
                        }}
                        selected={pauseType === "1_delivery"}
                        className="mb-7"
                    />
                    <Radio
                        value="2_week"
                        text={`Pause ${currentDog.name} account for 2 deliveries`}
                        onChange={() => {
                            setPauseType("2_deliveries")
                            setPauseDisplay("for 2 deliveries")
                        }}
                        selected={pauseType === "2_deliveries"}
                        className="mb-7"
                    />
                    <Radio
                        value="forever"
                        text={`Pause ${currentDog.name} account indefinitley`}
                        onChange={() => {
                            setPauseType("forever")
                            setPauseDisplay("forever")
                        }}
                        selected={pauseType === "forever"}
                        className="mb-7"
                    />
                    <Radio
                        value="specific"
                        text={
                            <>
                      <span>
                        Pause until &nbsp;
                          {pauseUntil === null
                              ? "a specific date"
                              : moment(pauseUntil).format(
                                  "MMM DD, YYYY"
                              )}
                      </span>
                                &nbsp;
                                {pauseUntil !== null && (
                                    <span
                                        className="text-primary text-sm"
                                        onClick={() => setPauseBoxType("TIME")}
                                    >
                          Edit Date
                        </span>
                                )}
                            </>
                        }
                        onChange={() => {
                            if (pauseUntil === null) {
                                setPauseBoxType("TIME")
                            } else {
                                setPauseType("specific")
                            }
                        }}
                        selected={pauseType === "specific"}
                    />
                </div>
                <div className="mt-7 mb-6 sm:m-0">
                    <div className="lg:w-72 p-6 bg-promptYellow rounded-1lg">
                        <h3 className="text-base font-semibold mb-1.3">
                            You can unpause anytime
                        </h3>
                        <p className="text-sm">
                            Keep in mind you can pause your account at anytime
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <button
                    className={`rounded-xl py-3 px-8 ${isPaused ? 'opacity-50' : ''} text-base font-bold bg-primary text-white`}
                    onClick={pauseMeal}
                    disabled={!isPaused}
                >
                    Save Changes
                </button>
            </div>
            {error && (
                <div className="text-red-500 text-xs mt-1">
                    An error occured please try again later
                </div>
            )}
        </div>
        : pauseBoxType === "TIME"
            ?
            <div className="p-6">
                <h2 className="ml-0 sm:ml-8 text-xl font-bold">
                    Choose the date you'd like to pause until
                </h2>
                <div className="flex justify-center mt-6 mb-4">
                    <DatePicker
                        dateFormat="YYYY-MM-DD"
                        startDate
                        selected={
                            pauseUntil === null
                                ? new Date()
                                : pauseUntil
                        }
                        onChange={(date) => setPauseUntil(date)}
                        inline
                        useWeekdaysShort={true}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="rounded-xl py-3 px-8 text-base font-bold bg-primary text-white"
                        onClick={() => {
                            setPauseType("specific");
                            setPauseBoxType("MAIN")
                        }}
                    >
                        Pick Date
                    </button>
                </div>
            </div>
            :  pauseBoxType === "SUCCESS"
                ?
                <div className="py-6 px-16">
                    <div className="flex items-center flex-col mb-4">
                        <FilledCircle className="rounded-full h-7.3 w-7.3 mb-6" />
                        <h2 className="text-xl font-bold mb-4">
                            Your account has been successfully paused
                        </h2>
                        <p className="text-sm mb-5 text-center">
                            Your account is paused {pauseDisplay}
                        </p>
                        <div className="w-full p-6 bg-promptYellow rounded-1lg">
                            <h4 className="text-center text-base font-semibold mb-1">
                                You can unpause anytime
                            </h4>
                            <p className="text-center text-sm">
                                Keep in mind you can pause your account at anytime
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="rounded-xl py-3 px-8 text-base font-bold bg-primary text-white"
                            onClick={closeModal}
                        >
                            Done
                        </button>
                    </div>
                </div>
                : null;
}


const mapDispatchToProps = (dispatch) => ({
    pauseSubscription: async (data) => dispatch(userActions.pauseSubscription(data)),
    resetUserError: () => dispatch(userActions.resetUserError()),
    resetUserLoading: () => dispatch(userActions.resetUserLoading()),
});

const mapStateToProps = (state) => {
    const { subscriptions, dogs, error, loading } = state.user;
    return {
        dogs,
        subscriptions,
        error,
        loading,
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PauseMealModal)