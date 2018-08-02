import React, { Component } from "react"

import Gantt from "react-gantt-chart"

class Row extends Component {
  render() {
    const { project, startsAt, endsAt, options } = this.props

    console.log(options)

    return (
      <div className={"row"} style={options}>
        {project.name}. {startsAt}. {endsAt}
      </div>
    )
  }
}

export default class App extends Component {
  state = {
    startsAt: "2018-01-01",
    endsAt: "2018-12-01",
    name: "",
    items: [
      {
        id: 1,
        project: { name: "Doorling" },
        startsAt: "2018-03-01",
        endsAt: "2018-07-01",
      },
      {
        id: 2,
        project: { name: "SpiderAds 2.0" },
        startsAt: "2018-01-01",
        endsAt: "2018-01-31",
      },
    ],
  }

  addItem = item => this.setState({ items: [...this.state.items, item] })

  handleChange = ({ target }) => this.setState({ [target.name]: target.value })

  handleSubmit = event => {
    event.preventDefault()
    const { name, startsAt, endsAt } = this.state

    this.addItem({
      project: { name },
      startsAt,
      endsAt,
      id: Math.floor(Math.random() * 100000),
    })
    this.setState({ name: "" })
  }

  render() {
    const { name, startsAt, endsAt, items } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span>Name</span>
            <input onChange={this.handleChange} name="name" value={name} />
          </label>

          <label>
            <span>Starts at</span>
            <input
              onChange={this.handleChange}
              name="startsAt"
              value={startsAt}
            />
          </label>

          <label>
            <span>Ends at</span>
            <input onChange={this.handleChange} name="endsAt" value={endsAt} />
          </label>

          <input type="submit" value="Add project" />
        </form>

        <Gantt
          renderItem={(item, options) => (
            <Row key={item.id} {...item} options={options} />
          )}
          items={items}
          startsAt="2018-01-01"
          endsAt="2019-12-31"
        />
      </div>
    )
  }
}
