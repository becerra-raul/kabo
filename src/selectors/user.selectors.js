const selectSubscriptions = (state) =>  state.user.subscriptions ? state.user.subscriptions : {};

const selectSubscriptionByDogId = (state, dogId) => {
    const subscriptions = selectSubscriptions(state);
    let subscription = null;

    for (let key in subscriptions) {
        if (subscriptions[key] && +subscriptions[key].dog_id === +dogId) {
            subscription = subscriptions[key];
        }
    }
    return subscription;
};

const selectDogs = (state) => state.user.dogs || [];

const selectDogByIndex = (state, index) => {
    let dogs = selectDogs(state);
    return dogs[index] || {}
}

const selectSubscriptionByDogIndex = (state, index) => {
    let dog = selectDogByIndex(state, index);
    if (dog && dog.id) {
        return selectSubscriptionByDogId(state, dog.id)
    } else {
        return null;
    }
};

export const userSelectors = {
    selectSubscriptions,
    selectSubscriptionByDogId,
    selectDogs,
    selectDogByIndex,
    selectSubscriptionByDogIndex,
}