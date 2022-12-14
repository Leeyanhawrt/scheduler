import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'

const Form = (props) => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")


  // If user decides they do not want to book an interview, 
  // removes the student field name and deselects an interview to prevent mistakes
  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  //Ensures user has entered a name in addition to choosing an interviewer

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer")
      return;
    }

    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
          <section className='appointment__validation'>{error}</section>
          <InterviewerList
            interviewers={props.interviewers}
            value={interviewer}
            onChange={(e) => setInterviewer(e)}
          />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form;