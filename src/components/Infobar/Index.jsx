import React from 'react'
import './index.css'

const Index = ({room}) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/">
                    <h4>Back</h4>
                </a>
            </div>   
        </div>
    )
}

export default Index
