import { useState, useEffect } from 'react';
import TopLoadingBar from 'react-top-loading-bar';
import { useLocation } from 'react-router';

function LoadingBar() {
    const location = useLocation(); // panggil langsung, tanpa try/catch
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



