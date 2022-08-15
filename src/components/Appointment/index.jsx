import React from 'react'
import "components/Appointment/styles.scss"
import Form from './Form'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Status from './Status'
import { useVisualMode } from 'components/hooks/useVisualMode'

const Appointment = (props) => {

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    return props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} />)}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message="Saving..." />}
    </article>
  )
}

export default Appointment;