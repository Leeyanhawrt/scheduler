import React from 'react'
import DayListItem from './DayListItem'

const DayList = (props) => {

  //Map over all given days and create an item for each one
  const eachDay = props.days.map(each => {
    return (
      <DayListItem
        key={each.id}
        name={each.name}
        spots={each.spots}
        selected={each.name === props.value}
        setDay={() => props.onChange(each.name)}
      />
    )
  })

  return (
    <ul>
      {eachDay}
    </ul>
  )
}

export default DayList;