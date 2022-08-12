export const getAppointmentsForDay = (state, day) => {
  const result = [];
  for (const stateDay of state.days) {
    if (stateDay.name === day) {
      for (const appointment of stateDay.appointments) {
        for (const appointmentDay in state.appointments) {
          if (appointment == appointmentDay) {
            result.push(state.appointments[appointmentDay])
          }
        }
      }
    }
  }
  return result
}

export const getInterview = (state, interview) => {
  const result = {}

  if (!interview) {
    return null
  }

  result.student = interview.student
  if (interview.interviewer) {
    result.interviewer = state.interviewers[interview.interviewer.toString()]
  }
  return result
}

export const getInterviewersForDay = (state, day) => {
  const result = [];
  for (const stateDay of state.days) {
    if (stateDay.name === day) {
      for (const appointment of stateDay.interviewers) {
        for (const appointmentDay in state.interviewers) {
          if (appointment == appointmentDay) {
            result.push(state.interviewers[appointmentDay])
          }
        }
      }
    }
  }
  return result
}