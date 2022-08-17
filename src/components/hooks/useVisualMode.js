import { useState } from "react";

// Sets an initial mode and empty history for appointment viewer

export const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  // Transition hook to change the state of current view and skips views that are just loading views

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode)
      setHistory(prev => [...prev, newMode])
    } else if (replace) {
      setMode(newMode)
    }
  }

  //Back hook that allows for transition to previous state ignoring those that are just loading views

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2])
      setHistory(prev => [...prev.slice(0, -1)])
    }
  }

  return { mode, transition, back };
}

