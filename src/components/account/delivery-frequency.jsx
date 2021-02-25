import React from 'react';
import MealPlanCard from './mealplan-card.jsx'
import DogSelector from './dog-selector.jsx'
import { Field, reduxForm } from 'redux-form'
import { ReactComponent as SelectDown } from '../../assets/images/select-down.svg'
import { connect } from 'react-redux';
import { userActions } from '../../actions/index.js';
import moment from 'moment'

class FrequencyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogIndex: 0,
      changed: {
        amount_of_food: false,
        how_often: false,
        starting_date: false
      },
      submitted: false,
    };
    this.setDog = this.setDog.bind(this)
  }

  setDog(i) {
    this.setState({
      dogIndex: i,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      submitted: true
    })
    let submitData = {
      amount_of_food: event.target[0].value,
      how_often: event.target[1].value,
      starting_date: moment.unix(event.target[2].value).format('YYYY-MM-DD')
    }
    this.props.updateDelivery(submitData)
  }

  handleChange = (event) => {
    let key = event.target.name
    console.log(key);
    ///Blocking confirm button if no changes in state.
    if (key && this.props.user) {
      let originalValue = this.props.user[key]
      this.setState({
        changed: { ...this.state.changed, [key]: `${event.target.value}` !== `${originalValue}` }
      })
    }
  }

  render() {
    const { dogIndex, submitted, changed } = this.state
    const { dogs, user } = this.props
    const { amount_of_food_options, amount_of_food, how_often_options, delivery_starting_date_options, how_often, error, loading } = user
    const currentDog = dogs[dogIndex]
    const disabled = !changed.starting_date && !changed.how_often && !changed.amount_of_food;

    const SelectOptions = (array,) => (array.map((delayOption, i) => (
      <option className="w-full" key={i} value={delayOption.value}>{delayOption.label}  </option>
    )))

    return (
      <div className="py-8 px-5 relative border-r border-l rounded-b-xl border-b border-gray-300">
        <div className="text-black font-messina bg-promptYellow p-6 rounded-xl">
          <div className="font-semibold">
            Reminder about Deliveries
          </div>
          <div className="text-black text-sm font-normal mt-3">
            Keep in mind, changes made to your account will be reflected in your next delivery date
          </div>
        </div>
        <form
          onSubmit={this.handleSubmit}>
          <div
            className="text-lightGrey font-messina w-100 text-xs leading-4 font-semibold mt-5"
          >
            Amount of Food Per dog
          </div>
          <select
            initialvalue={amount_of_food}
            className="w-full" name="amount_of_food"
            label="How Often"
            component="select"
            onChange={this.handleChange}
          >
            {SelectOptions(amount_of_food_options)}
          </select>
          <div
            className="text-lightGrey font-messina w-100 text-xs leading-4 font-semibold mt-5"
          >
            How Often?
          </div>
          <select initialvalue={how_often} onChange={this.handleChange}
            className="w-full" name="how_often" label="How Often"
            component="select"
          >
            {SelectOptions(how_often_options)}
          </select>
          <div
            className="text-lightGrey font-messina w-100 text-xs leading-4 font-semibold mt-5"
          >
            Next Delivery Date
          </div>
          <select className="w-full " onChange={this.handleChange}
            name="starting_date" label="How Often"
            component="select"
          >
            {SelectOptions(delivery_starting_date_options)}
          </select>
          <button
            type="submit"
            disabled={disabled}
            className={`bg-primary ${disabled ? "opacity-50 cursor-not-allowed" : ""} text-white rounded-xl font-semibold py-2.5 px-6 mt-8`}
          >
            Save Changes
          </button>
        </form>
        {!error && !loading && submitted && (
          <div className="text-primary text-xs mt-1">
            Your changes have been saved
          </div>
        )}
        {error && !loading && submitted && (
          <div className="text-red-500 text-xs mt-1">
            An error occured please try again later
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state
  const { subscriptions, dogs, next_occurrencies, error, loading } = state.user
  return {
    user,
    subscriptions,
    dogs,
    next_occurrencies,
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    updateDelivery: (data) => dispatch(userActions.updateDeliveryFrequency(data))
  }
)


export default connect(mapStateToProps, mapDispatchToProps)(FrequencyModal)
