import React, { Component } from "react"
import { differenceInDays, isAfter } from "date-fns"

import styles from "./styles.css"

export default class Gantt extends Component {
  getItemProps = item => {
    if (isAfter(this.props.startsAt, item.endsAt)) {
      return {
        style: {
          display: "none",
        },
        startsBeforePeriod: false,
        endsAfterPeriod: false,
        outOfBounds: true,
      }
    }

    const startsBeforePeriod = isAfter(this.props.startsAt, item.startsAt)
    const endsAfterPeriod = isAfter(item.endsAt, this.props.endsAt)

    let width = differenceInDays(
      item.endsAt,
      startsBeforePeriod ? this.props.startsAt : item.startsAt
    )
    let offset = differenceInDays(item.startsAt, this.props.startsAt) + 1

    if (startsBeforePeriod) {
      offset = 1
    }
    // console.log(
    //   "id: ",
    //   item.id,
    //   "width: ",
    //   width,
    //   ". offset: ",
    //   offset,
    //   ". startsAt: ",
    //   item.startsAt,
    //   ". endsAt: ",
    //   item.endsAt,
    //   ". periodStartsAt: ",
    //   this.props.startsAt,
    //   ". startsBeforePeriod: ",
    //   startsBeforePeriod,
    //   ". endsAfterPeriod: ",
    //   endsAfterPeriod
    // )
    if (endsAfterPeriod) {
      return {
        style: {
          gridColumn: `${offset} / -1`,
        },
        startsBeforePeriod,
        endsAfterPeriod,
      }
    }

    return {
      style: {
        gridColumn: `${offset} / span ${width}`,
      },
      startsBeforePeriod,
      endsAfterPeriod,
    }
  }

  render() {
    const { children, startsAt, endsAt } = this.props

    const width = differenceInDays(endsAt, startsAt) - 1

    return (
      <div
        className={styles.container}
        style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
      >
        {children(this.getItemProps)}
      </div>
    )
  }
}
