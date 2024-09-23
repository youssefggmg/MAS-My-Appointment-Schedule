import React from 'react'

const searchBra = () => {
    return (
        <div>
            <form className="flex">
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className="px-5 w-1/4 py-2 border rounded-lg "
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
            </form>
        </div>
    )
}

export default searchBra
