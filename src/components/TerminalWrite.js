import React from 'react'
import { useState, useEffect } from 'react'
import PrefixedInput from './InputPrefix';
import { useDispatch } from 'react-redux';


const TerminalWrite = () => {
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [array, setArray] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        //array.push(output)
        if(output) {
            setArray(prev =>  [...prev, output] ) 
            dispatch({ type: 'ADD_OUTPUT', payload: output });
            setOutput("")
        }
    }, [output])

    let prefix="C:/Users/You/Person>"
    return (
        <div className='w-full h-full bg-black overflow-auto md:overflow-y-auto'>
            <div className='flex flex-col bg-black pl-2'>
                <p className='pt-2'>Codify version 1.0</p>
                {array?.map(item => {
                    return (
                    <div className='flex flex-col pb-2'>
                        <span>{prefix}{item}</span>
                    </div>
                    )
                })}
                
                <PrefixedInput prefix={prefix} className='input-cursor bg-black focus:outline-none font-sans w-full' type='text'
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
