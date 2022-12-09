import React from 'react'

function Card({ value, suit, className }) {
    console.log(suit === 'BACK')
    return (
        <>
            {suit!=='BACK'&&<img className={className} alt={suit+"-"+value} src={`/cards/${suit.toUpperCase()}/${suit.toUpperCase()}_${value}.png`}/>}
            {suit==='BACK'&&<img className={className} alt={suit} src={'/cards/BACK.png'}/>}
        </>
    )
}

export default Card