import React, { useState, useEffect } from "react";

const CheckTimePage = () => {
    const [valid, setValid] = useState(false);
    const [result, setResult] = useState(null);
    const [time, setTime] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [timeInput, setTimeInput] = useState(true);

    useEffect(() => {
        if (timeInput && time.includes(":") && startTime.includes(":") && endTime.includes(":")) {
            const [hours, minutes] = time.split(":").map(Number);
            const parsedTime = hours + minutes / 60;
            const [startHours, startMinutes] = startTime.split(":").map(Number);
            const parsedStartTime = startHours + startMinutes / 60;
            const [endHours, endMinutes] = endTime.split(":").map(Number);
            const parsedEndTime = endHours + endMinutes / 60;
            console.log(parsedTime, parsedStartTime, parsedEndTime);
            const isInRange = checkTime(parsedTime, parsedStartTime, parsedEndTime);
            setResult(isInRange);
        } else if (!timeInput && time !== "" && startTime !== "" && endTime !== "") {
            const isInRange = checkTime(parseInt(time, 10), parseInt(startTime, 10), parseInt(endTime, 10));
            setResult(isInRange);
        }
    }, [time, startTime, endTime, timeInput]);

    const checkTime = (time, startTime, endTime) => {
        if (time < 0 || time > 23 || startTime < 0 || startTime > 23 || endTime < 0 || endTime > 23) {
            setValid(false);
            return false;
        } else {
            setValid(true);
        }

        console.log(time, startTime, endTime);
        if (startTime < endTime) {
            return time >= startTime && time < endTime;
        } else if (startTime > endTime) {
            return (time >= startTime && time < 24) || (time >= 0 && time < endTime);
        } else {
            if (time === 0) return true;
            return time === startTime;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            {valid ? (
                <>
                    <h1 className="text-6xl"> {time} {result ? "is in" : "is not in"} [{startTime}:{endTime})</h1>
                    <h1 className="text-6xl">{result ? "✅" : "❌"}</h1>
                </>
            ) : (
                <>
                    <h1 className="text-6xl">Please enter a valid time between 0 and 23.</h1>
                    <h1 className="text-6xl">🫡</h1>
                </>
            )}
            <div className="flex flex-col gap-2 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <label htmlFor="time" className="text-2xl text-start">Time</label>
                {timeInput ?
                    (
                        <input className="p-2 h-12 hover:shadow-xl rounded-lg border border-gray-700" type="time" onChange={e => setTime(e.target.value)} />
                    ) : (
                        <input className="p-2 h-12 hover:shadow-xl rounded-lg border border-gray-700" type="number" placeholder="input time between 0 and 23" min={0} max={23} onChange={e => setTime(e.target.value)} />
                    )
                }
                <label htmlFor="range1" className="text-2xl text-start">Time Range</label>
                <div className="flex gap-2 w-full justify-around items-center">
                    {timeInput ?
                        (
                            <input className="p-2 w-full h-12 hover:shadow-xl rounded-lg border border-gray-700" type="time" onChange={e => setStartTime(e.target.value)} />
                        ) : (
                            <input className="p-2 w-full h-12 hover:shadow-xl rounded-lg border border-gray-700" type="number" placeholder="between 0 and 23" min={0} max={23} onChange={e => setStartTime(e.target.value)} />
                        )
                    }
                    <span className=" ">-</span>
                    {timeInput ?
                        (
                            <input className="p-2 w-full h-12 hover:shadow-xl rounded-lg border border-gray-700" type="time" onChange={e => setEndTime(e.target.value)} />
                        ) : (
                            <input className="p-2 w-full h-12 hover:shadow-xl rounded-lg border border-gray-700" type="number" placeholder="between 0 and 23" min={0} max={23} onChange={e => setEndTime(e.target.value)} />
                        )
                    }
                </div>
                <button className={`p-2 mt-5 ${timeInput ? 'bg-blue-400' : 'bg-green-500'} text-white rounded-lg hover:shadow-xl`} onClick={() => setTimeInput(!timeInput)}>
                    {timeInput ? "🔢 Switch to Number Input" : "🕑 Switch to Time Input"}
                </button>
            </div>
        </div>
    );
};

export default CheckTimePage;
