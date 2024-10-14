import React from 'react';
import StatisticsOne from './StatisticsOne';
import StatisticsTwo from './StatisticsTwo';
import StatisticsThree from './StatisticsThree';
import StatisticsFour from './StatisticsFour';
import StatisticsFive from './StatisticsFive';
import StatisticsSix from './StatisticsSix';
import Ai from '../Ai';

const Statistics = () => {
    return (
        <div className='main-dashboard'>
            <StatisticsOne/>
            <div className='d-flex align-items-center stat-center-part'>
                <StatisticsTwo />
                <StatisticsThree />
                <StatisticsFour/> 
                <StatisticsSix/>
            </div>
            <StatisticsFive />
            <p className='text-white'>.</p>
            {/* <Ai/> */}
        </div>
    );
};

export default Statistics;