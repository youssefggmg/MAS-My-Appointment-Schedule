import React from 'react';

const statisticsData = [
    { value: '250K', label: 'User' },
    { value: '25K', label: 'service available' },
    { value: '1.8K', label: 'service provider' },
];

const Statistics = () => {
    return (
        <div>
            <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 md:px-24 md:py-16 lg:px-8 lg:py-20 ">
                <div className="row-gap-8 grid grid-cols-2 md:grid-cols-3">
                    {statisticsData.map((stat, index) => (
                        <div
                            key={index}
                            className={`mb-12 text-center md:mb-0 ${index < statisticsData.length - 1 ? 'md:border-r-2 dark:md:border-slate-500' : ''
                                }`}
                        >
                            <div className="font-heading text-[2.6rem] font-bold lg:text-5xl xl:text-6xl">
                                {stat.value}
                            </div>
                            <p className="text-sm font-medium uppercase tracking-widest text-gray-800 dark:text-slate-400 lg:text-base">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Statistics;
