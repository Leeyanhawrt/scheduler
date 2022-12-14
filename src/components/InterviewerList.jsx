import React from 'react'
import 'components/InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem'
import PropTypes from 'prop-types'

const InterviewerList = (props) => {

  // Map over all available interviewers and displays them as selection

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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList