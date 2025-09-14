import { useState, useEffect } from 'react';
import TopLoadingBar from 'react-top-loading-bar';
import { useLocation } from 'react-router-dom';

function LoadingBar() {
    let location;
    try {
        location = useLocation();
    } catch {
        // Router context not available, don't render LoadingBar
        return null;
    }

    const [progress, setProgress] = useState(0);

    const startLoading = () => setProgress(10);
    const finishLoading = () => {
        setProgress(100);
        setTimeout(() => setProgress(0), 10);
    };

    useEffect(() => {
        startLoading();
        setTimeout(() => finishLoading(), 2000);
    }, [location]);

    return (
        <TopLoadingBar
            color="#5D87FF"
            height={3}
            progress={progress}
        />
    );
}

export default LoadingBar;



