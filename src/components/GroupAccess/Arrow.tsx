import { disconnect } from "process"

export const Arrow = () => {
    return (
        <div className="absolute inset-y-5 border-l-[2px] left-[35%] md:left-[85%] flex items-center pointer-events-none">
            <div className='pb-2 mr-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="30" viewBox="0 0 2 38" fill="currentColor" className="text-primary dark:text-secondary stroke-none">
                    <path d="M1 39V1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </div>
            <div className=''>
                <svg
                    className="w-5 h-5 text-primary dark:text-secondary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928933 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7L7 8L9 8L9 7L7 7Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>

    )
}