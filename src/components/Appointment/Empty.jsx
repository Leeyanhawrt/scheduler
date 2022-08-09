import React from 'react'

const Empty = (props) => {
  return (
    <main className="appointment__add">
      <img
        src="images/add.png"
        alt="Add"
        className="appointment__add-button"
        onClick={props.onAdd}
      />
    </main>
  )
}

export default Empty;