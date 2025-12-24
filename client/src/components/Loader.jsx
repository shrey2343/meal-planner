import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative">
                {/* Outer spinning ring */}
                <div className="animate-spin rounded-full h-24 w-24 border-4 border-green-200"></div>
                {/* Inner spinning ring */}
                <div className="absolute top-0 left-0 animate-spin rounded-full h-24 w-24 border-t-4 border-green-500" style={{ animationDuration: '1s' }}></div>
                {/* Center icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-3xl animate-pulse">🍽️</span>
                </div>
            </div>
        </div>
    );
};

export { Loader };
