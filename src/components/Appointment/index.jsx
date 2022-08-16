import React from 'react'

import Error from './Error'
import Form from './Form'
import Header from './Header'
import Confirm from './Confirm'
import Show from './Show'
import Empty from './Empty'
import Status from './Status'

import { useVisualMode } from 'components/hooks/useVisualMode'
import "components/Appointment/styles.scss"


const Appointment = (props) => {

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING, true)
    return props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  const edit = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING, true)
    return props.editInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  const remove = () => {
    transition(REMOVE, true)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const REMOVE = "REMOVE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"


  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  return (
    <article className="appointment" data-testid="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY &&
        <Empty
          onAdd={() => transition(CREATE)} />}

      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)} />}

      {mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onCancel={back}
          onSave={edit} />}

      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save} />}

      {mode === SAVING &&
        <Status
          message="Saving..." />}

      {mode === REMOVE &&
        <Status
          message="Removing..." />}

      {mode === CONFIRM &&
        <Confirm
          message="Delete this appointment?"
          onCancel={back}
          onConfirm={remove} />}

      {mode === ERROR_DELETE &&
        <Error message="Error could not delete your appointment" onClose={back} />}

      {mode === ERROR_SAVE &&
        <Error message="Error could not save your appointment" onClose={back} />}
    </article>
  )
}

export default Appointment;