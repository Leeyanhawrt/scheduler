import React, { useState } from 'react'
import 'components/InterviewerListItem.scss'
import classNames from 'classnames'
import { action } from '@storybook/addon-actions'

const InterviewerListItem = (props) => {

  const selectedClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })

  return (
    <li onClick={props.setInterviewer} className={selectedClass}>
      <img
        src={props.avatar}
        alt={props.name}
        className="interviewers__item-image" 
        />
      {props.selected && props.name}
    </li>
  )
}
export default InterviewerListItem