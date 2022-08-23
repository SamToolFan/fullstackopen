import React from 'react'

const Showperson = (props) =>
    <>
        <p key={props.id}>{props.name} {props.number} <button onClick={props.deleteAperson}>delete</button></p>
    </>


export default Showperson