import React from 'react';

const SearchBar = () => {
    return (
        <div className="ml-14">
            <form className="flex">
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className="px-5 w-1/4 py-2 border rounded-lg"
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0 1 14 0z"
                        />
                    </svg>
                </button>

                {/* Small Additional Buttons */}
                <button
                    type="button"
                    className="ml-2 px-2 py-1 text-xs bg-gray-200 text-black rounded-lg hover:bg-gray-300"
                >
                    provider Name
                </button>
                <button
                    type="button"
                    className="ml-2 px-2 py-1 text-xs bg-gray-200 text-black rounded-lg hover:bg-gray-300"
                >
                    service Name
                </button>
                <button
                    type="button"
                    className="ml-2 px-2 py-1 text-xs bg-gray-200 text-black rounded-lg hover:bg-gray-300"
                >
                    availability
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
