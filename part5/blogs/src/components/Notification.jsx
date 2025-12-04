const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const errorStyle = {
    backgroundColor: "red",
  }
  const successStyle = { backgroundColor: "green" }

  return (
    <div
      className="error"
      style={notification.type === "error" ? errorStyle : successStyle}
    >
      {notification.message}
    </div>
  )
}

export default Notification
