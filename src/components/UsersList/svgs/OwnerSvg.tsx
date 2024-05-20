import { useTheme } from "next-themes";

export const OwnerSvg = () => {
    const { theme } = useTheme();

    return (
        <div >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 18 18" fill="currentColor" className="text-[#333] dark:text-white stroke-none">
                <path d="M2.35592 13.3507L0.523193 1.83408L5.56319 7.06892L8.77047 0.787109L11.9777 7.06892L17.0177 1.83408L15.185 13.3507H2.35592ZM15.185 16.4916C15.185 17.1198 14.8185 17.5386 14.2687 17.5386H3.27228C2.72247 17.5386 2.35592 17.1198 2.35592 16.4916V15.4447H15.185V16.4916Z" />
            </svg>
        </div>

    )

}