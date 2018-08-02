import React, { Component } from "react"
import { differenceInDays } from "date-fns"

import styles from "./styles.css"

export default class Gantt extends Component {
  optionsForItem = item => {
    const width = differenceInDays(item.endsAt, item.startsAt)
    const offset = differenceInDays(item.startsAt, this.props.startsAt)

    console.log("width: ", width, ". offset: ", offset)
    return {
      gridColumn: `${offset} / span ${width}`,
    }
  }

  render() {
    const { items, renderItem, startsAt, endsAt } = this.props

    const width = differenceInDays(endsAt, startsAt)

    console.log(width, `repeat(${width}, 1fr)`)
    return (
      <div
        className={styles.container}
        style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
      >
        {items.map(item => renderItem(item, this.optionsForItem(item)))}
      </div>
    )
  }
}
