import React, { useState, useRef } from 'react';
import "./countdown.css"

const CountdownTimer = () => {
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const handleChange = (e, setter, maxValue) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) {
            setter(null); // Default to 0 if NaN
        } else {
            if (value < 0) value = 0;
            if (value > maxValue) value = maxValue;
            console.log('====================================');
            console.log(value);
            console.log('====================================');
            setter(value);
        }
    };

    const formatNumber = (num) => {
        return num < 10 ? `0${num}` : `${num}`;
    };

    const setTimer = () => {
        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        setTimeLeft(totalSeconds);
    };

    const startTimer = () => {
        if (intervalRef.current !== null) return;

        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setIsRunning(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const stopTimer = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
    };

    const displayTime = () => {
        const hrs = Math.floor(timeLeft / 3600);
        const mins = Math.floor((timeLeft % 3600) / 60);
        const secs = timeLeft % 60;
        return `${formatNumber(hrs)}h ${formatNumber(mins)}m ${formatNumber(secs)}s`;
    };

    const handleReset = () => {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setIsRunning(false);
        setTimeLeft(0);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+' || e.key === '.') {
            e.preventDefault();
        }
        const arrowKeys = ["ArrowUp", "ArrowDown"];
        if (arrowKeys.includes(e.key)) {
            e.preventDefault();
        }
    };
    const handleClick = (e) => {
        e.target.addEventListener("mousewheel", (ev) => {
            e.target.blur();
        });
    };
    

    return (
        <div className="bg-white p-8 rounded-lg w-2/4 items-center shadow-md w-96 mx-auto font-sans">
            <div>
                <h1 className="text-center text-xl font-bold mb-4">Countdown Timer</h1>

                <div className='flex gap-5'>
                    <div>
                        <input
                            type="number"
                            value={hours}
                            onChange={e => handleChange(e, setHours, 99)} // Allow up to 99 hours
                            placeholder="Hours"
                            className="w-20 py-2 px-3 border border-gray-300 rounded text-sm"
                            onKeyDown={handleKeyDown}
                            onClick={handleClick}
                        />
                        <label>Hours</label>
                    </div>
                    <div>
                        <input
                            type="number"
                            value={minutes}
                            onChange={e => handleChange(e, setMinutes, 59)} // Minutes should be in range 0-59
                            placeholder="Minutes"
                            min="0"
                            max="59"
                            className="w-20 py-2 px-3 border border-gray-300 rounded text-sm"
                            onKeyDown={handleKeyDown}
                            onClick={handleClick}
                        />
                        <label>Minutes</label>
                    </div>
                    <div>
                        <input
                            type="number"
                            value={seconds}
                            onChange={e => handleChange(e, setSeconds, 59)} // Seconds should be in range 0-59
                            placeholder="Seconds"
                            min="0"
                            max="59"
                            className="w-20 py-2 px-3 border border-gray-300 rounded text-sm"
                            onKeyDown={handleKeyDown}
                            onClick={handleClick}
                        />
                        <label>Seconds</label>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button
                        onClick={setTimer}
                        className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center font-bold py-2 px-4 rounded mt-4"
                    >
                        Set Timer
                    </button>
                </div>

                <div id="countdown" className="text-2xl flex justify-center  font-bold mt-6">{displayTime()}</div>
                <div className='flex  justify-center gap-5'>
                    <button
                        onClick={startTimer}
                        disabled={isRunning}
                        className={`bg-green-500 ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'} text-white font-bold py-3 px-4 rounded mt-4`}
                    >
                        Start
                    </button>
                    <button
                        onClick={stopTimer}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded mt-4"
                    >
                        Stop
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded mt-4"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
