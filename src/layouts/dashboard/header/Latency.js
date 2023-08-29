import React, { useState, useEffect } from 'react';
import { Layout, Spin, Alert } from 'antd';
import axios from 'axios';
import useResponsive from "../../../hooks/useResponsive";
import {useTheme} from "../../../hooks/useTheme";

const { Header, Content } = Layout;

const API_URL = '/hello';

export default ()=> {

    const isDesktop = useResponsive('up', 'lg');
    const {theme, toggleTheme} = useTheme();

    const [loading, setLoading] = useState(true);
    const [latency, setLatency] = useState(null);
    const [jitter, setJitter] = useState(null);
    const [error, setError] = useState(null);

    const testLatencyAndJitter = async () => {
        setLoading(true);
        setError(null);

        // Number of requests for jitter calculation
        const numRequests = 10;
        let minLatency = Number.MAX_SAFE_INTEGER;
        let maxLatency = 0;
        let totalLatency = 0;

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < numRequests; i++) {
            const startTime = new Date().getTime();
            try {
                // eslint-disable-next-line no-await-in-loop
                await axios.get(API_URL, { params: { randomParam: Math.random() } });
                const endTime = new Date().getTime();
                const requestLatency = endTime - startTime;

                totalLatency += requestLatency;
                if (requestLatency < minLatency) {
                    minLatency = requestLatency;
                }
                if (requestLatency > maxLatency) {
                    maxLatency = requestLatency;
                }
            } catch (err) {
                setError('Error fetching data.');
                setLoading(false);
                return;
            }
        }

        const averageLatency = totalLatency / numRequests;
        const calculatedJitter = maxLatency - minLatency;

        setLatency(averageLatency);
        setJitter(calculatedJitter);
        setLoading(false);
    };

    useEffect(() => {
        testLatencyAndJitter(); // Initial test
        const intervalId = setInterval(testLatencyAndJitter, 5000); // Test every 5 seconds

        return () => {
            clearInterval(intervalId); // Cleanup the interval on unmount
        };
    }, []);

    return (
       <>
       {isDesktop && (<>
           {latency !== null && (
               <span style={{
                   color: theme === 'dark'?'white':'black'
               }}>Latency: {latency.toFixed(2)} ms</span>
           )}
           {jitter !== null && (
               <span style={{
                   color: theme === 'dark'?'white':'black'
               }}>Jitter: {jitter.toFixed(2)} ms</span>
           )}
       </>)}
           {!isDesktop && (<>
               {latency !== null && (
                   <span style={{
                       color: theme === 'dark'?'white':'black'
                   }}>{latency.toFixed(2)} ms</span>
               )}
           </>)
           }
       </>
    );
}
