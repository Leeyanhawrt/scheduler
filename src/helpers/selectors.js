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