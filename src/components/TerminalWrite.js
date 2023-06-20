import React from 'react'
import { useState, useEffect } from 'react'


const TerminalWrite = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [array, setArray] = useState([])
    useEffect(() => {
        //array.push(output)
        setArray(prev =>  [...prev, output] ) 
        setOutput("")
    }, [output])
    return (
        <div className='w-full h-full bg-stone-950 overflow-auto md:overflow-y-auto'>
            <div className='flex flex-col bg-stone-950'>
                {array?.map(item => {return (<span>{item} $ </span>)})}
                <input className='bg-stone-950 focus:outline-none' type='text'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            setOutput(e.target.value)
                            setInput("")



                        }
                    }}
                />
            </div>
        </div>
    )
}

export default TerminalWrite