import React from "react";
import 'components/DayListItem.scss'
import classNames from "classnames";

export default function DayListItem(props) {

  // Pluralizes and assigns correct class if number of spots is greater than 1 and shows no spots remaining if spots = 0
  const dayListClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  return (
    <li className={dayListClass} onClick={props.setDay} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
      {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}
      {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
    </li>
  );
}