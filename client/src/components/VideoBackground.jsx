import React from 'react';

const VideoBackground = ({ 
    videoUrl, 
    overlay = 'bg-black/40', 
    children, 
    className = '' 
}) => {
    return (
        <div className={`relative ${className}`}>
            {/* Video Background */}
            <div className="fixed inset-0 w-full h-full -z-10">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
                {/* Overlay */}
                <div className={`absolute inset-0 ${overlay}`}></div>
            </div>
            {/* Content */}
            {children}
        </div>
    );
};

export default VideoBackground;
