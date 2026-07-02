import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <h1 className="text-9xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md px-4">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="flex gap-4">
                <Link
                    href="/"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                    Go to Homepage
                </Link>
                <Link
                    href="/dashboard"
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>

    )
}