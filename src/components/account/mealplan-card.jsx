import React from "react";
import { connect } from "react-redux";

const MealIcon = ({ source, notFirst }) => (
  <img
    src={source}
    className={`w-12 h-12 rounded-full ${notFirst && "-ml-10"}`}
    alt=""
  />
);

const MealPlanCard = (props) => {
  let currentDog = {};
  const { dogs, dogIndex, subscriptions, noPrice, user } = props;
  const { cooked_recipes, kibble_recipes } = user;

  if (!cooked_recipes || !kibble_recipes) return null;

  currentDog = dogs[dogIndex];
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
        key="turkey_recipe"
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
    portion = `${currentDog.cooked_portion}% fresh food & ${currentDog.kibble_portion} kibble`;
  }

  var subscriptionArray = Object.values(subscriptions);

  let price = subscriptionArray[dogIndex].invoice_estimate_total;

  price /= 100;

  const readableRecipe = recipeArray.join(" and ");
  return (
    <div className="w-full flex justify-between font-semibold text-base mb-14 md:flex-col xl:flex-row">
      <div className="flex">
        {iconArray}
        <div className="ml-9 md:ml-4 xl:ml-9">
          <div>{readableRecipe}</div>
          <div>{portion}</div>
        </div>
      </div>
      {!noPrice && <div>${price}</div>}
    </div>
  );
};

function mapStateToProps(state) {
  const { user } = state;
  const { subscriptions, dogs } = state.user;
  return {
    user,
    dogs,
    subscriptions,
  };
}

export default connect(mapStateToProps)(MealPlanCard);
