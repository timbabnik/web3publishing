
import {useState, useEffect} from 'react';
import {getRemainingTimeUntilMsTimestamp} from "./CountdownTimerUtils";

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

const CountdownTimer = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return(
        <div className="mt-12">
            <span className="text-4xl mr-3 font-light">{remainingTime.days}</span>
            <span className="text-4xl">:</span>
            <span className="text-4xl mx-3 font-light">{remainingTime.hours}</span>
            <span className="text-4xl">:</span>
            <span className="text-4xl mx-3 font-light">{remainingTime.minutes}</span>
            <span className="text-4xl">:</span>
            <span className="text-4xl mx-3 font-light">{remainingTime.seconds}</span>
            <span></span>
        </div>
    );
}

export default CountdownTimer;