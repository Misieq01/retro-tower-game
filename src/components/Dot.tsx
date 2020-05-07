import React from 'react'

interface Dot {
    size: number,
    spacing: number,
    className: string
}

const Dot = ({size,spacing,className} : Dot) =>{
    return <div className={className} style={{height: size,width: size,margin: spacing,borderRadius: size / 2}}></div>
}
export default Dot