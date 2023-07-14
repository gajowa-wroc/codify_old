import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { callFunction } from '../utils/callFunction';

const TerminalWrite = () => {
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [array, setArray] = useState([]);
    const [commands, setCommands] = useState([]);
    const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);

    const dispatch = useDispatch();
    const reduxUser = useSelector(state => state.user)
    const reduxOutput = useSelector(state => state.output)

    let prefix = `C:/Users/${reduxUser.userDisplayName}/Person>`

    useEffect(() => {
        if (output) {
            callFunction(output, dispatch)

            setArray(prev => [...prev, prefix + output])
            /* setArray(prev => [...prev, prefix + output, `>>> ${"name: " + reduxUser.userDisplayName +
                "\nemail: " + reduxUser.userEmail
                }`]) */
            //dispatch(addOutput(prefix + output))
            setOutput("")
        }
    }, [output, prefix, dispatch])

    useEffect(() => {
        setArray(prev => [...prev, `>>> ${reduxOutput?.output}`])
    }, [reduxOutput?.output])

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setOutput(e.target.value)
            setCommands(prevCommands => [...prevCommands, e.target.value]);
            setCurrentCommandIndex(commands.length + 1); // Reset the command index
            setInput("")
        } else if (e.key === 'ArrowUp') {
            if (currentCommandIndex === -1 && commands.length > 0) {
                setCurrentCommandIndex(commands.length - 1);
                setInput(commands[commands.length - 1]);
            } else if (currentCommandIndex >= 0) {
                const newIndex = currentCommandIndex - 1;
                if (newIndex >= 0) {
                    setInput(commands[newIndex]);
                    setCurrentCommandIndex(newIndex);
                }
            }
        } else if (e.key === 'ArrowDown') {
            if (currentCommandIndex >= 0 && currentCommandIndex < commands.length - 1) {
                const newIndex = currentCommandIndex + 1;
                setInput(commands[newIndex]);
                setCurrentCommandIndex(newIndex);
            } else if (currentCommandIndex === commands.length - 1) {
                setInput('');
                setCurrentCommandIndex(-1);
            }
        }
    }

    return (
        <div className='w-full h-full bg-black overflow-auto md:overflow-y-auto'>
            <div className='flex flex-col bg-black pl-2'>
                <p className='pt-2'>Codify version 1.0</p>
                {reduxOutput?.loading && array.map(item => {
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
                        onKeyDown={handleKeyDown}
                    />
                </div>

            </div>
        </div>
    )
}

export default TerminalWrite
