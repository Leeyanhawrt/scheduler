import React, { useState } from 'react'
import classNames from 'classnames'
import 'components/InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem'
import { action } from '@storybook/addon-actions'

const InterviewerList = (props) => {

  const eachInterviewer = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() => props.onChange(interviewer.id)}
        selected={interviewer.id === props.value}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {eachInterviewer}
      </ul>
    </section>
  )
}

export default InterviewerList