import React from 'react'

const Notification = ({message}) =>{
    const baseStyle = {
    
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  const typeStyles ={
    added:{color:"green"},
    deleted:{color:"red"},
    error:{color:"red",background:"rgba(238, 213, 143, 1)"}
  }

  const style = {
    ...baseStyle,
    ...(typeStyles[message?.type]||{}),
  }

  if (!message) return null;
  return <div style={style}>
    {message.content}
    </div>;
    
}

export default Notification