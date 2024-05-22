import { useTheme } from "next-themes"

export const SVGGroupMobile = () => {
    const { theme, setTheme } = useTheme()
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="538" height="719" viewBox="0 0 538 719" fill="none">
            <path d="M-565.516 289.603C-528.427 103.301 -352.713 -21.9286 -164.506 3.80639L-34.9115 21.527C23.4073 29.5014 76.3539 59.8011 112.774 106.043V106.043C133.019 131.748 158.578 152.776 187.703 167.688L250.926 200.06C330.02 240.559 381.92 319.74 387.5 408.424V408.424V408.424C387.5 457.846 414.587 503.292 458.058 526.804L589.539 597.917C621.449 615.177 630.674 656.698 609.074 685.846V685.846C599.736 698.446 585.809 706.859 570.311 709.262L521.247 716.869C512.096 718.287 502.849 719 493.589 719H-213.177C-439.753 719 -609.754 511.818 -565.516 289.603V289.603Z" fill="url(#paint0_linear_141_956)" />
            <defs>
                <linearGradient id="paint0_linear_141_956" x1="554.689" y1="-18.2188" x2="-143.876" y2="1381.43" gradientUnits="userSpaceOnUse">
                <stop style={{ stopColor: theme == "dark" ? "var(--secondary-color)" : "var(--primary-color)" }} />
                    <stop offset="0.800000" style={{ stopColor: theme == "dark" ? "var(--primary-color)" : "var(--secondary-color)" }} />
                </linearGradient>
            </defs>
        </svg>
    )
}