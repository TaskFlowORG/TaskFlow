import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ModalRegisterProperty } from "./components/ModalRegisterProperty";
import { CustomEase } from "gsap/CustomEase";

export const animatePageOut = (href: string, router: AppRouterInstance) => {
    const transitionElementModalRegister = document.getElementById("modalRegister");
    const transitionElementModalLogin = document.getElementById("modalLogin");

    if (transitionElementModalRegister) {
        const tlModal = gsap.timeline({
            stagger: {
                _amount: 0, // No pause between animations within the timeline
                get amount() {
                    return this._amount;
                },
                set amount(value) {
                    this._amount = value;
                },
            }
        });

        // Animation for the modal
        tlModal.to(transitionElementModalRegister, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut"
        });
    } else if (transitionElementModalLogin) {
        const tlModal = gsap.timeline({
            stagger: {
                _amount: 0, // No pause between animations within the timeline
                get amount() {
                    return this._amount;
                },
                set amount(value) {
                    this._amount = value;
                },
            }
        });

        // Animation for the modal
        tlModal.to(transitionElementModalLogin, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut"
        });
    }
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
                yPercent: i < 40 ? i : i < 60 ? 40 : 100 - i,
                x: x / 100 * ( i <= 50 ? ( i * (i/50)) : 100 - ( (50 - (i - 50)) * ((50 - (i - 50))/50))),
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






    // Animations for the login
    const animationWrapperLogin = document.getElementById("login");
    if (animationWrapperLogin) {
        const tlLogin = gsap.timeline();
        tlLogin.to(animationWrapperLogin, {
            delay: 0.5,
            yPercent: 17,
            x: -(x * 0.5),
            duration: 1,
            ease: "power1.in"
        })
            .to(animationWrapperLogin, {
                yPercent: 34,
                x: -(x * 1.25),
                duration: 0.5,
                ease: "none"
            }).to(animationWrapperLogin, {
                yPercent: 50,
                x: -(x * 2),
                duration: 0.5,
                ease: "none"
            }).to(animationWrapperLogin, {
                yPercent: 52,
                x: -(x * 2.5),
                duration: 0.3,
                ease: "none"
            }).to(animationWrapperLogin, {
                yPercent: 50,
                x: -(x * 3),
                duration: 0.3,
                ease: "none"
            }).to(animationWrapperLogin, {
                yPercent: 34,
                x: -(x * 3.75),
                duration: 0.5,
                ease: "none"
            }).to(animationWrapperLogin, {
                yPercent: 17,
                x: -(x * 4.5),
                duration: 0.5,
                ease: "none"
            })
            .to(animationWrapperLogin, {
                yPercent: 0,
                x: -(x * 5),
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                    router.push(href);
                }
            });


        // Add animations for the login here, if necessary
    }
}

export const animatePageIn = () => {

    const transitionElementModalRegister = document.getElementById("modalRegister");
    const transitionElementModalLogin = document.getElementById("modalLogin");

    if (transitionElementModalRegister) {
        const tlModal = gsap.timeline({
            stagger: {
                _amount: 0, // No pause between animations within the timeline
                get amount() {
                    return this._amount;
                },
                set amount(value) {
                    this._amount = value;
                },
            }
        });

        // Animation for the modal
        tlModal.from(transitionElementModalRegister, {
            opacity: 1,
            delay: 1,
            duration: 0.5,
            ease: "power1.inOut"
        });
    } else if (transitionElementModalLogin) {
        const tlModal = gsap.timeline({
            stagger: {
                _amount: 0, // No pause between animations within the timeline
                get amount() {
                    return this._amount;
                },
                set amount(value) {
                    this._amount = value;
                },
            }
        });

        // Animation for the modal
        tlModal.from(transitionElementModalLogin, {
            opacity: 1,
            delay: 1,
            duration: 0.5,
            ease: "power1.inOut"
        });

    }

}
