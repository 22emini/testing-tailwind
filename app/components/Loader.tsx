import { useEffect, useState } from 'react';

export default function Loader() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 3000); // 5 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="flex flex-col items-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">Loading...</p>
            </div>
        </div>
    );
} 