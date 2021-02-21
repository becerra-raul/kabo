import React from 'react'
import { Link } from 'react-router-dom'

class OrderCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { invoice_id, items, total, payment_status, styles = "" } = this.props

    return (
      <div className={`pb-40 bg-white max-h-40 shadow-lg p-4 rounded-xl w-56 inline-block ${styles}`} >
        <div className="font-bold text-3xl">Order #{invoice_id}</div>
        <span className="text-sm my-1">{items.length} items ({total})</span>
        <br />
        <span className="text-sm my-1">Status: {payment_status}</span>
        <br />
        <Link to={`/orders/${invoice_id}`} className="font-bold text-primary">View Order</Link>
      </div>
    )
  }
}

export default OrderCard
