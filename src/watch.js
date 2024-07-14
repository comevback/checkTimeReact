import React, { useState, useEffect } from 'react';

const WatchPage = (props) => {
    const [coorTime, setCoorTime] = useState({ x1: 150, y1: 150, x2: 150, y2: 150 }); // 初始化线段终点的状态
    const [coorStartTime, setCoorStartTime] = useState({ x2: 150, y2: 150 }); // 初始化线段终点的状态
    const [coorEndTime, setCoorEndTime] = useState({ x2: 150, y2: 150 }); // 初始化线段终点的状态

    // calculate the coordinates of the line end based on the time
    const calculateCoordinates = (time) => {
        const cx = 150;
        const cy = 150;
        const r = 140;

        const angle = (time / 24) * 360;
        const radians = (angle - 90) * Math.PI / 180;

        const x2 = cx + r * Math.cos(radians);
        const y2 = cy + r * Math.sin(radians);

        return { x2, y2 };
    };

    const calculateCoordinates1 = (time) => {
        const cx = 150;
        const cy = 150;
        const r1 = 150;
        const r2 = 130;

        const angle = (time / 24) * 360;
        const radians = (angle - 90) * Math.PI / 180;

        const x1 = cx + r1 * Math.cos(radians);
        const y1 = cy + r1 * Math.sin(radians);
        const x2 = cx + r2 * Math.cos(radians);
        const y2 = cy + r2 * Math.sin(radians);

        return { x1, y1, x2, y2 };
    };

    const parseTime = (timeString) => {
        if (timeString.includes(":")) {
            const [hours, minutes] = timeString.split(":").map(Number);
            return hours + minutes / 60;
        } else {
            return Number(timeString);
        }
    };

    // detect changes in time and update the coordinates
    useEffect(() => {
        if (props.time) {
            if (props.time < 0 || props.time > 23) {
                return;
            }
            setCoorTime(calculateCoordinates1(parseTime(props.time)));
        }

        if (props.startTime) {
            if (props.startTime < 0 || props.startTime > 23) {
                return;
            }
            setCoorStartTime(calculateCoordinates(parseTime(props.startTime)));
        }

        if (props.endTime) {
            if (props.endTime < 0 || props.endTime > 23) {
                return;
            }
            setCoorEndTime(calculateCoordinates(parseTime(props.endTime)));
        }
    }, [props.time, props.startTime, props.endTime]);

    return (
        <svg width={300} height={300}>
            <circle cx="150" cy="150" r="140" stroke="gray" strokeWidth="5" fill='none' />
            <line x1={coorTime.x1} y1={coorTime.y1} x2={coorTime.x2} y2={coorTime.y2} stroke="red" strokeWidth="12" />
            <line x1="150" y1="150" x2={coorStartTime.x2} y2={coorStartTime.y2} stroke="blue" strokeWidth="3" />
            <line x1="150" y1="150" x2={coorEndTime.x2} y2={coorEndTime.y2} stroke="green" strokeWidth="3" />
        </svg>
    );
};

export default WatchPage;
