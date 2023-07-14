import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { callFunction } from '../utils/parse_call_func';

const TerminalWrite = () => {
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [array, setArray] = useState([]);
    
    const dispatch = useDispatch();
    const reduxUser = useSelector(state => state.user)
    
    let prefix = `C:/Users/${reduxUser.userDisplayName}/Person>`

    useEffect(() => {
        //array.push(output)
        if (output) {
            setArray(prev => [...prev, prefix + output])
            dispatch({ type: 'ADD_OUTPUT', payload: output });
            setOutput("")

            callFunction(output, dispatch);
        }
    }, [output, dispatch])

    return (
        <div className='w-full h-full bg-black overflow-auto md:overflow-y-auto'>
            <div className='flex flex-col bg-black pl-2'>
                <p className='pt-2'>Codify version 1.0</p>
                {array?.map(item => {
                    return (
                        <div className='flex flex-col pb-2'>
                            <span>{item}</span>
                        </div>
                    )
                })}

                <div className="input-prefix">
                    <span className="prefix">{prefix}</span>
                    <input className='input-cursor bg-black focus:outline-none font-sans w-full'
                        type='text'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                setOutput(e.target.value)
                                setInput("")
                            }
                        }} />
                </div>

            </div>
        </div>
    )
}

export default TerminalWrite
