import { useState, useEffect } from "react"
import axios from "axios"

const useApplicationData = () => {

  const setDay = day => setState({ ...state, day })

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const findDay = (day) => state.days.find(item => item.name === day)

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      return setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        const selectedDay = findDay(state.day)
        selectedDay.spots--
        setState({ ...state, appointments })
      })
  }

  const editInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        const selectedDay = findDay(state.day)
        setState({ ...state, appointments })
      })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const selectedDay = findDay(state.day)
        selectedDay.spots++
        setState({ ...state, appointments })
      })
  }



  return { state, setDay, bookInterview, cancelInterview, editInterview }
}

export default useApplicationData;