import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageOut = (href: string, router: AppRouterInstance) => {
    const x = (window.innerWidth + 300);

    // Animations for the register
    const animationWrapperRegister = document.getElementById("register")
    if (animationWrapperRegister) {
        const tlRegister = gsap.timeline();
        for (let i = 1; i <= 100; i++) {
            const equal0 = i == 1;
            const equal99 = i == 100;
            // Função de easing personalizada
    
            tlRegister.to(animationWrapperRegister, {
                delay: equal0 ? 0.5 : 0,
                yPercent:50 -((50 - (i)) * ((50 - (i))/50)),
                x: x / 100 * ( i <= 50 ? ( i * (i/50)) : 100 - ( (50 - (i - 50)) * ((50 - (i - 50))/50))),
                duration: 0.02,
                ease: equal0 ? "power1.in" : equal99 ? "power1.out" : "none",
                onComplete: () => {
                    if (i == 100) {
                        router.push(href);
                    }
                }
            });
        }
    }

    // Animations for the login
    const animationWrapperLogin = document.getElementById("login");
    if (animationWrapperLogin) {
        const tlLogin = gsap.timeline();
        for (let i = 1; i <= 100; i++) {
            const equal0 = i == 1;
            const equal99 = i == 100;
            // Função de easing personalizada
            tlLogin.to(animationWrapperLogin, {
                delay: equal0 ? 0.6 : 0,
                yPercent:50 -((50 - (i)) * ((50 - (i))/50)),
                x: -(x / 100 * ( i <= 50 ? ( i * (i/50)) : 100 - ( (50 - (i - 50)) * ((50 - (i - 50))/50)))),
                duration: 0.02,
                ease: equal0 ? "power1.in" : equal99 ? "power2.out" : "none",
                onComplete: () => {
                    if (i == 99) {
                        router.push(href);
                    }
                }
            });
        }
    }
}

