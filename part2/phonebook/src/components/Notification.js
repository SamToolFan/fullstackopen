const Notification = (props) => {
    //console.log(props.message)
    //console.log(props.format)
    if (props.message === null) {
        return null
    }

    return (
        <div className={props.format} >
            {props.message}
        </div>
    )
}

export default Notification