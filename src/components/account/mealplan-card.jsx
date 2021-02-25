import React from "react";
import {connect} from "react-redux";
import {userSelectors} from "../../selectors/user.selectors";

const MealIcon = ({ source, notFirst }) => (
  <img
    src={source}
    className={`w-12 h-12 rounded-full ${notFirst && "-ml-10"}`}
    alt=""
  />
);

const MealPlanCard = ({ noPrice, cooked_recipes, kibble_recipes, subscription, currentDog, nextDelivery }) => {
  if (!cooked_recipes || !kibble_recipes) return null;

  let recipeArray = [];
  let iconArray = [];
  if (currentDog.chicken_recipe) {
    recipeArray.push(cooked_recipes[0].name);
    iconArray.push(
      <MealIcon
        key="chicken_recipe"
        notFirst={iconArray.length > 0}
        source={cooked_recipes[0].image_url}
      />
    );
  }
  if (currentDog.beef_recipe) {
    recipeArray.push(cooked_recipes[1].name);
    iconArray.push(
      <MealIcon
        key="beef_recipe"
        notFirst={iconArray.length > 0}
        source={cooked_recipes[1].image_url}
      />
    );
  }
  if (currentDog.turkey_recipe) {
    recipeArray.push(cooked_recipes[2].name);
    iconArray.push(
      <MealIcon
        key={"turkey_recipe" + cooked_recipes[2].name}
        notFirst={iconArray.length > 0}
        source={cooked_recipes[2].image_url}
      />
    );
  }
  if (currentDog.lamb_recipe) {
    recipeArray.push(cooked_recipes[3].name);
    iconArray.push(
      <MealIcon
        key="lamb_recipe"
        notFirst={iconArray.length > 0}
        source={cooked_recipes[3].image_url}
      />
    );
  }
  if (currentDog.kibble_recipe) {
    recipeArray.push(`${currentDog.kibble_recipe} kibble`);
    iconArray.push(
      <MealIcon
        key="turkey_recipe"
        notFirst={iconArray.length > 0}
        source={kibble_recipes[0].image_url}
      />
    );
  }

  let portion = "";

  if (currentDog.cooked_portion === 100) {
    portion = "Full meal";
  } else if (!currentDog.kibble_portion) {
    portion = `${currentDog.cooked_portion}% Kabo`;
  } else {
    portion = `${currentDog.cooked_portion}% fresh food & ${currentDog.kibble_portion}% kibble`;
  }

  let price = subscription
  && subscription.invoice_estimate_total
  && Number.isInteger(+subscription.invoice_estimate_total)
      ? subscription.invoice_estimate_total : 0;

  price /= 100;

  const readableRecipe = recipeArray.join(" and ");
  return (
    <div>
      <div>
        {nextDelivery && <p className="pb-8 font-messina text-gray-600 text-15 leading-20">Expected Arrival: {nextDelivery}</p>}

        <div className="w-full font-semibold text-base mb-6 md:flex-col xl:flex-row">
          <div className="flex items-center">
            {iconArray}
            <div className="ml-4 md:ml-4 xl:pr-9">
              <p className="font-normal text-17 leading-24">{readableRecipe}</p>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            {" "}
            <p className="font-normal text-gray-800 pr-4">{portion}</p> {!noPrice && <span className="font-medium">${price}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state, props) {
  const { cooked_recipes, kibble_recipes } = state.user;
  return {
    cooked_recipes,
    kibble_recipes,
    subscription: userSelectors.selectSubscriptionByDogIndex(state, props.dogIndex),
    currentDog: userSelectors.selectDogByIndex(state, props.dogIndex)
  };
}

export default connect(mapStateToProps)(MealPlanCard);
