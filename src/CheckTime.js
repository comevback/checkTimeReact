import React, { useState, useEffect } from "react";

const CheckTimePage = () => {
    const [valid, setValid] = useState(false);
    const [result, setResult] = useState(null);
    const [time, setTime] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [timeInput, setTimeInput] = useState(true);

    useEffect(() => {
        // if the input type is time, check if the input contains a colon, if so, split the input and convert to number
        // もし入力タイプが時間なら、入力にコロンが含まれているかどうかをチェックし、含まれている場合は入力を分割して数値に変換する
        if (timeInput && time.includes(":") && startTime.includes(":") && endTime.includes(":")) {
            const [hours, minutes] = time.split(":").map(Number);
            const parsedTime = hours + minutes / 60;
            const [startHours, startMinutes] = startTime.split(":").map(Number);
            const parsedStartTime = startHours + startMinutes / 60;
            const [endHours, endMinutes] = endTime.split(":").map(Number);
            const parsedEndTime = endHours + endMinutes / 60;
            // console.log(parsedTime, parsedStartTime, parsedEndTime);
            const isInRange = checkTime(parsedTime, parsedStartTime, parsedEndTime);
            setResult(isInRange);
        } else if (!timeInput && time !== "" && startTime !== "" && endTime !== "") {
            // if the input type is number, convert the input to number and check if the time is in range
            // もし入力タイプが数値なら、入力を数値に変換して時間が範囲内にあるかどうかをチェックする
            const isInRange = checkTime(parseInt(time, 10), parseInt(startTime, 10), parseInt(endTime, 10));
            setResult(isInRange);
        }
    }, [time, startTime, endTime, timeInput]);

    // check if the time is in range
    // 時間が範囲内にあるかどうかをチェックする
    const checkTime = (time, startTime, endTime) => {
        if (time < 0 || time > 23 || startTime < 0 || startTime > 23 || endTime < 0 || endTime > 23) {
            setValid(false); // if the input is not valid, set valid to false, もし入力が無効なら、validをfalseに設定する
            return false;
        } else {
            setValid(true);
        }

        // console.log(time, startTime, endTime);
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
                    <h1 className="text-6xl"> {time} {result ? "is in" : "is not in"} [{startTime} - {endTime})</h1>
                    <h1 className="text-6xl">{result ? "✅" : "❌"}</h1>
                </>
            ) : (
                <>
                    <h1 className="text-6xl">Please enter a valid time between 0 and 23.</h1>
                    <h1 className="text-6xl">🫡</h1>
                </>
            )}
            <div className="flex flex-col gap-2 justify-around sm:justify-start md:justify-start sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <label htmlFor="time" className="text-2xl text-start">Time</label>
                {timeInput ?
                    (
                        <input className="p-2 h-12 text-3xl hover:shadow-xl rounded-lg border border-gray-700" type="time" onChange={e => setTime(e.target.value)} />
                    ) : (
                        <input className="p-2 h-12 text-3xl hover:shadow-xl rounded-lg border border-gray-700" type="number" placeholder="input number between 0 and 23" min={0} max={23} onChange={e => setTime(e.target.value)} />
                    )
                }
                <label htmlFor="range1" className="text-2xl text-start">Time Range</label>
                <div className="flex gap-2 w-full items-center">
                    {timeInput ?
                        (
                            <input className="p-2 w-full h-12 text-3xl hover:shadow-xl rounded-lg border border-gray-700" type="time" onChange={e => setStartTime(e.target.value)} />
                        ) : (
                            <input className="p-2 w-full h-12 text-3xl hover:shadow-xl rounded-lg border border-gray-700" type="number" placeholder="0 ~ 23" min={0} max={23} onChange={e => setStartTime(e.target.value)} />
                        )
                    }
                    <span>-</span>
                    {timeInput ?
                        (
                            <input className="p-2 w-full h-12 text-3xl hover:shadow-xl rounded-lg border border-gray-700" type="time" onChange={e => setEndTime(e.target.value)} />
                        ) : (
                            <input className="p-2 w-full h-12 text-3xl hover:shadow-xl rounded-lg border border-gray-700" type="number" placeholder="0 ~ 23" min={0} max={23} onChange={e => setEndTime(e.target.value)} />
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
