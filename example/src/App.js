import React, { Component } from "react"

import Gantt from "react-gantt-chart"
import poser, { PoseGroup } from "react-pose"
import { format, addDays } from "date-fns"
import cx from "classnames"

function randomDate(start, end) {
  return new Date(+start + Math.random() * (end - start))
}

class Row extends Component {
  render() {
    const { id, startsBeforePeriod } = this.props

    console.log(`Row with ID ${id} rendered`)
    return <div className={cx("row", { "row-early": startsBeforePeriod })} />
  }
}

const Item = poser.div({
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
})

export default class App extends Component {
  state = {
    periodStartsAt: "2018-01-01",
    periodEndsAt: "2018-12-31",
    startsAt: "2018-01-01",
    endsAt: "2018-12-01",
    name: "",
    items: Array.apply(null, { length: 50 })
      .map(Number.call, Number)
      .map(i => {
        const startsAt = randomDate(
          new Date(2018, 0, 1),
          new Date(2018, 12, 30)
        )

        const endsAt = randomDate(addDays(startsAt, 1), new Date(2018, 12, 31))

        return {
          id: i,
          project: { name: `Project ${i}` },
          startsAt: format(startsAt, "yyyy-MM-dd"),
          endsAt: format(endsAt, "yyyy-MM-dd"),
        }
      }),
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
    const {
      periodEndsAt,
      periodStartsAt,
      name,
      startsAt,
      endsAt,
      items,
    } = this.state

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

        <div>
          <label>
            <span>Period Stars at</span>
            <input
              onChange={this.handleChange}
              name="periodStartsAt"
              value={periodStartsAt}
            />
          </label>

          <label>
            <span>Period Ends at</span>
            <input
              onChange={this.handleChange}
              name="periodEndsAt"
              value={periodEndsAt}
            />
          </label>
        </div>

        <Gantt startsAt={periodStartsAt} endsAt={periodEndsAt}>
          {getItemProps => (
            <PoseGroup>
              {items.map(item => {
                const itemProps = getItemProps(item)

                return (
                  <Item key={item.id} style={itemProps.style}>
                    <Row {...item} {...itemProps} />
                  </Item>
                )
              })}
            </PoseGroup>
          )}
        </Gantt>
      </div>
    )
  }
}
