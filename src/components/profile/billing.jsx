import React from "react";
import Button from "../global/button.jsx";
import PaymentCardIcon from "../global/payment-card-icon.jsx";
import OrderCard from "../global/order-card.jsx";
import ChangePaymentMethodModal from "./change-payment-method-modal";
import { Link } from 'react-router-dom'
import PauseMealModal from "../account/PauseMealModal";
import Modal from "../global/modal";
import CancelMealModal from "../account/cancel-meal-modal";

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showManageSubscriptionsBox: false,
      showManageButton: true,
    };
    this.toggleCancelBox = this.toggleCancelBox.bind(this);
  }

  getCalculateShowButtons = (subscriptions) => {
      // getting array with subscription statuses
    let statuses = Object.keys(subscriptions).map(key => subscriptions[key].status);
    let showPause = statuses.filter(s => s === 'paused').length !== statuses.length;
    let showCancel = statuses.filter(s => s === 'cancelled').length !== statuses.length;
    // and return if all of them cancelled or paused
    return { showPause, showCancel };
  }

  componentDidMount() {
      // initially describing if displaying pause button
    const { subscriptions } = this.props.user;
    const { showPause } = this.getCalculateShowButtons(subscriptions);
    this.setState({ showManageButton: showPause})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { subscriptions } = this.props.user;
    const { showPause } = this.getCalculateShowButtons(subscriptions);
      // describing if displaying pause button with props update
    if (prevState.showManageButton !== showPause) {
      this.setState({ showManageButton: showPause })
    }
  }

  toggleCancelBox() {
    this.setState({ showManageSubscriptionsBox: !this.state.showManageSubscriptionsBox });
  }

  toggle = () => {
    const { open_payment_modal } = this.props;
    this.props.openUpdatePaymentModal(!open_payment_modal);
  };

  render() {
    const { user } = this.props;
    const { showManageButton } = this.state;
    const { orders } = user;

    const ccLastFour = user.card.last4;

    return (
      <div>
        <div className="flex-auto text-2xl font-cooper mb-6">Billing</div>
        {this.props.payment_method_updated && (
          <div
            className="mb-3 bg-green-500 border-t-4 border-green-500 rounded-b text-white px-4 py-3 shadow-md"
            role="alert"
          >
            <div class="flex">
              <div class="py-1">
                <svg
                  className="fill-current h-6 w-6 text-teal-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Payment Method Updated Successfully</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex my-6">
          <PaymentCardIcon icon="visa" />
          <span className="inline-block ml-3">Card ending in {ccLastFour}</span>
        </div>
        <Button
          text="Change Payment Method"
          onClick={this.toggle}
          styles="focus:outline-none"
        />
        <div className="flex-auto text-lg font-semibold my-4">
          Recent Orders
        </div>
        <div className="mb-5 grid md:grid-cols-2 grid-cols-1 gap-2">
          {orders.map((order, index) => {
            if (index > 1) return null;
            return <OrderCard {...order} styles="w-full" />;
          })}
        </div>
        <Link to={`/orders`} className="font-bold text-primary border rounded-xl py-2 px-6 text-base font-bold text-primary button-border focus:outline-none">View All Orders</Link>

        <div className="flex justify-between px-7 mt-7">
          <span> </span>
          {showManageButton
            ? <button
              type="button"
              onClick={this.toggleCancelBox}
              className="text-primary font-bold"
            >
              Manage subscription
                </button> : <span> </span>}
        </div>

        <Modal title="Manage subscription"
          isOpen={this.state.showManageSubscriptionsBox}
          onRequestClose={this.toggleCancelBox}
        >
          <PauseMealModal closeModal={() => this.setState({ showManageSubscriptionsBox: false })} />
        </Modal>

        <ChangePaymentMethodModal
          isOpen={this.props.open_payment_modal}
          toggle={this.toggle}
          payment_billing_address={this.props.payment_billing_address}
          setBillingAddress={this.props.setBillingAddress}
          updatePaymentMethod={this.props.updatePaymentMethod}
          updating_payment_method={this.props.updating_payment_method}
        />
      </div>
    );
  }
}

export default Billing;
