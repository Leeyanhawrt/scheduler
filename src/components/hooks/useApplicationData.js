import { useState, useEffect } from "react"
import axios from "axios"

const useApplicationData = () => {


  // Changes the state of day after user clicks on one in the sidebar panel
  const setDay = day => setState({ ...state, day })

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })


  // Performs an axios request on 3 API endpoints and assigns the value to state after promise resolves
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      return setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])

  // Helper function to help determine which day has been selected 
  const findDay = (day) => state.days.find(item => item.name === day)

  // Function for booking an interview and reducing the number of spots by 1
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
  // Function for editting an interview and keeping spots thes same
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

  // Function for removing an interview and increasing the number of spots by 1
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