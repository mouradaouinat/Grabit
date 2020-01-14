/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, createRef } from 'react'
import uuid from 'uuid'
import Map from './Map'
import { ReactComponent as Add } from '../img/add.svg'

class RequestForm extends Component {
  constructor(props) {
    super(props)
    this.addInput = createRef()
    this.state = {
      item: '',
      items: [],
      location: {},
      description: '',
      date: '',
      schedule: '',
      cost: ''
    }
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude } = position.coords
        const { longitude } = position.coords

        const currentPosition = { lat: latitude, lng: longitude }

        this.setState({ location: currentPosition })
      })
    } else {
      console.log(`there's no geolocator`)
    }
  }

  handleAddItem = () => {
    const { value: item } = this.addInput.current
    const newItems = [...this.state.items]
    newItems.unshift({ id: uuid(), value: item })
    this.setState({ items: newItems, item: '' })
  }

  handleRemoveItem = id => {
    const newItems = [...this.state.items]
    const flitered = newItems.filter(item => item.id !== id)
    this.setState({ items: flitered })
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()

    console.log(this.state)

    this.setState({ description: '', date: '', schedule: '', cost: '' })
  }

  render() {
    const { item, items, location, description, date, schedule, cost } = this.state
    return (
      <>
        <h1 className="settings__heading">Request</h1>
        <div className="row p-5">
          <div className="col-lg-6">
            <form className="request-form" onSubmit={this.handleSubmit}>
              <div className="request-form__group">
                <label htmlFor="details">Describe your Order</label>
                <textarea
                  className="form-control"
                  id="details"
                  rows="3"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>
              <div className="request-form__add-item">
                <div>
                  <Add className="request-form__add-item-icon" />
                  <input
                    type="text"
                    ref={this.addInput}
                    placeholder="Add Item"
                    className="request-form__add-item-input"
                    name="item"
                    value={item}
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  type="button"
                  className="request-form__add-item-button"
                  onClick={this.handleAddItem}
                >
                  Add
                </button>
              </div>
              <div className="mt-4">
                {items.map(singleItem => (
                  <div key={singleItem.id} className="request-form__item">
                    <p>{singleItem.value}</p>
                    <div>
                      <button type="button" onClick={() => this.handleRemoveItem(singleItem.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row my-5">
                <div className="request-form__group col-lg-6">
                  <label htmlFor="text">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="date"
                    name="date"
                    placeholder="ASAP"
                    value={date}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="request-form__group col-lg-6">
                  <label htmlFor="text">Schedule</label>
                  <input
                    type="date"
                    className="form-control"
                    id="schedulle"
                    name="schedulle"
                    value={schedule}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="request-form__group">
                <label htmlFor="text">Order Cost</label>
                <input
                  type="text"
                  className="form-control"
                  id="cost"
                  name="cost"
                  placeholder="$50 - $60"
                  value={cost}
                  onChange={this.handleChange}
                />
              </div>
              <input
                type="submit"
                value="Request"
                className="button button__primary button__block mt-5"
              />
            </form>
          </div>
          <div className="col-lg-6">
            <Map location={location} />
          </div>
        </div>
      </>
    )
  }
}

export default RequestForm
