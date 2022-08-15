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

  for (const eachInterviewer in state.interviewers) {
    if (state.interviewers[eachInterviewer].id === interview.interviewer) {
      result.student = interview.student
      result.interviewer = state.interviewers[eachInterviewer]
    }
  }

  return result
}

export const getInterviewersForDay = (state, day) => {
  const found = state.days.find(d => d.name === day)
  if (state.days.length === 0 || found === undefined) {
    return []
  }
  return found.interviewers.map(id => state.interviewers[id])
}

  // const result = [];
  // for (const stateDay of state.days) {
  //   if (stateDay.name === day) {
  //     for (const appointment of stateDay.interviewers) {
  //       for (const appointmentDay in state.interviewers) {
  //         if (appointment == appointmentDay) {
  //           result.push(state.interviewers[appointmentDay])
  //         }
  //       }
  //     }
  //   }
  // }
  // return result