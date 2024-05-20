import { ComponentProps } from "react"

interface Props extends ComponentProps<'svg'> {

}

export const ConfigBlock = ({...props}:Props) => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path opacity="0.6" d="M12 6.00022C11.9998 6.17572 11.992 6.35113 11.9768 6.52597C11.9288 7.08322 11.5163 7.49272 11.0325 7.62022L10.2023 7.83622C10.1527 7.84972 10.0838 7.89547 10.0343 7.99522C9.94875 8.16847 9.852 8.33572 9.74475 8.49622C9.68325 8.58847 9.67725 8.67097 9.6915 8.72047L9.91875 9.54772C10.0507 10.0307 9.903 10.5917 9.44625 10.9127C9.1575 11.1152 8.85225 11.2922 8.53275 11.4407C8.0265 11.677 7.46625 11.524 7.1145 11.1677L6.51 10.5572C6.474 10.5205 6.39975 10.4837 6.2895 10.4912C6.09675 10.5032 5.90325 10.5032 5.7105 10.4912C5.60025 10.4837 5.526 10.5197 5.49 10.5572L4.8855 11.1677C4.53375 11.524 3.9735 11.677 3.46725 11.4407C3.14805 11.2919 2.84262 11.1152 2.5545 10.9127C2.097 10.5917 1.94925 10.0307 2.082 9.54772L2.3085 8.72122C2.32275 8.67097 2.31675 8.58847 2.25525 8.49622C2.14794 8.3357 2.05123 8.16835 1.96575 7.99522C1.91625 7.89547 1.84725 7.84972 1.79775 7.83697L0.96825 7.61947C0.48375 7.49347 0.07125 7.08322 0.0232506 6.52597C-0.00749874 6.17614 -0.00749874 5.8243 0.0232506 5.47447C0.07125 4.91722 0.48375 4.50772 0.96825 4.38097L1.79775 4.16422C1.84725 4.15072 1.91625 4.10497 1.96575 4.00522C2.0509 3.83191 2.14762 3.66454 2.25525 3.50422C2.31675 3.41197 2.32275 3.32947 2.3085 3.27997L2.08125 2.45272C1.94925 1.96972 2.097 1.40872 2.55375 1.08772C2.8424 0.885624 3.14805 0.708961 3.46725 0.55972C3.9735 0.32347 4.53375 0.47647 4.8855 0.83197L5.49 1.44322C5.526 1.48072 5.60025 1.51672 5.7105 1.50922C5.90331 1.49722 6.09669 1.49722 6.2895 1.50922C6.39975 1.51672 6.474 1.48072 6.51 1.44322L7.1145 0.83197C7.46625 0.47647 8.0265 0.32347 8.53275 0.55972C8.85205 0.708314 9.1575 0.88501 9.4455 1.08772C9.903 1.40872 10.0508 1.96972 9.918 2.45272L9.6915 3.27922C9.67725 3.32947 9.68325 3.41197 9.74475 3.50422C9.852 3.66472 9.94875 3.83197 10.0343 4.00522C10.0838 4.10497 10.1527 4.15072 10.2023 4.16347L11.0317 4.38097C11.5163 4.50697 11.9288 4.91722 11.9775 5.47447C11.9925 5.64772 12 5.82322 12 6.00022ZM10.8563 5.57197C10.854 5.54497 10.8292 5.49097 10.7467 5.46922L9.918 5.25247C9.49725 5.14222 9.19275 4.84072 9.02625 4.50397C8.96175 4.37422 8.889 4.24897 8.80875 4.12897C8.60025 3.81622 8.4915 3.40147 8.60625 2.98222L8.8335 2.15497C8.856 2.07322 8.8215 2.02372 8.79975 2.00872C8.56575 1.84372 8.31675 1.69972 8.05725 1.57897C8.034 1.56847 7.97475 1.56322 7.91475 1.62322L7.31025 2.23447C7.00575 2.54272 6.5925 2.65597 6.21825 2.63197C6.07289 2.62297 5.92711 2.62297 5.78175 2.63197C5.4075 2.65597 4.99425 2.54272 4.68975 2.23447L4.08525 1.62322C4.02525 1.56247 3.966 1.56847 3.94275 1.57897C3.68325 1.70047 3.435 1.84372 3.201 2.00872C3.1785 2.02372 3.144 2.07247 3.1665 2.15497L3.39375 2.98147C3.5085 3.40147 3.39975 3.81622 3.19125 4.12897C3.111 4.24972 3.03825 4.37497 2.97375 4.50472C2.80725 4.83997 2.502 5.14222 2.082 5.25247L1.25325 5.46922C1.1715 5.49097 1.146 5.54497 1.14375 5.57197C1.119 5.85693 1.119 6.14351 1.14375 6.42847C1.146 6.45547 1.17075 6.50947 1.25325 6.53122L2.082 6.74797C2.50275 6.85822 2.80725 7.15972 2.97375 7.49647C3.03825 7.62622 3.111 7.75147 3.19125 7.87147C3.39975 8.18422 3.5085 8.59897 3.39375 9.01822L3.1665 9.84547C3.14475 9.92722 3.1785 9.97672 3.20025 9.99172C3.435 10.1567 3.68325 10.3 3.94275 10.4215C3.966 10.432 4.02525 10.4372 4.08525 10.3772L4.68975 9.76597C4.99425 9.45772 5.4075 9.34447 5.78175 9.36847C5.92711 9.37747 6.07289 9.37747 6.21825 9.36847C6.5925 9.34447 7.00575 9.45772 7.31025 9.76597L7.91475 10.3772C7.97475 10.438 8.034 10.432 8.05725 10.4215C8.3167 10.3004 8.56492 10.1566 8.799 9.99172C8.8215 9.97672 8.856 9.92797 8.8335 9.84547L8.60625 9.01897C8.4915 8.59897 8.60025 8.18422 8.80875 7.87147C8.88935 7.75108 8.962 7.62557 9.02625 7.49572C9.19275 7.16047 9.498 6.85822 9.918 6.74797L10.7467 6.53122C10.8292 6.50947 10.854 6.45547 10.8563 6.42847C10.881 6.14351 10.881 5.85693 10.8563 5.57197ZM6 8.25022C5.40326 8.25022 4.83097 8.01317 4.40901 7.59121C3.98705 7.16925 3.75 6.59696 3.75 6.00022C3.75 5.40348 3.98705 4.83119 4.40901 4.40923C4.83097 3.98727 5.40326 3.75022 6 3.75022C6.59674 3.75022 7.16903 3.98727 7.59099 4.40923C8.01295 4.83119 8.25 5.40348 8.25 6.00022C8.25 6.59696 8.01295 7.16925 7.59099 7.59121C7.16903 8.01317 6.59674 8.25022 6 8.25022ZM6 7.12522C6.29847 7.12512 6.58467 7.00646 6.79565 6.79534C7.00663 6.58422 7.1251 6.29794 7.125 5.99947C7.1249 5.701 7.00624 5.4148 6.79512 5.20382C6.584 4.99284 6.29772 4.87437 5.99925 4.87447C5.70078 4.87457 5.41458 4.99323 5.2036 5.20435C5.09913 5.30889 5.01628 5.43297 4.95977 5.56953C4.90326 5.70608 4.8742 5.85243 4.87425 6.00022C4.8743 6.14801 4.90346 6.29434 4.96006 6.43085C5.01666 6.56737 5.09959 6.6914 5.20413 6.79587C5.30867 6.90034 5.43275 6.98319 5.56931 7.0397C5.70586 7.09621 5.85221 7.12527 6 7.12522Z" fill="#333333"/>
    </svg>
  )

}