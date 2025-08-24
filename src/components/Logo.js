import React from 'react'

function Logo() {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
            <img src="/Logo_of_MTU.png" alt="logo" style={{ width: "100px", height: "100px" }} />
            <h1 className="demo-title"
            >Demo For Test Case Lesson</h1>
            <img src="/CEIT.jpg" alt="logo" style={{ width: "100px", height: "100px" }} />
        </div>

    )
}

export default Logo