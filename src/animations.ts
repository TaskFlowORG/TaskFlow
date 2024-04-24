import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ModalRegisterProperty } from "./components/ModalRegisterProperty";

export const animatePageOut = (href: string, router: AppRouterInstance) => {
    const transitionElementModal = document.getElementById("modalRegisterLogin");

    if (transitionElementModal) {
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
        tlModal.to(transitionElementModal, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut"
        });

        // Animations for the register
        const animationWrapperRegister = document.getElementById("register");
        if (animationWrapperRegister) {
            const tlRegister = gsap.timeline();
            tlRegister.to(animationWrapperRegister, {
                delay: 0.5,
                yPercent: 40,
                xPercent: 25,
                duration: 2.5,
                ease: "power2.in"
            }).to(animationWrapperRegister, {
                yPercent: 50,
                xPercent: 50,
                duration: 1,
                ease: "none"
            }).to(animationWrapperRegister, {
                yPercent: 50,
                xPercent: 62,
                duration: 0.75,
                ease: "none"
            }).to(animationWrapperRegister, {
                yPercent: 40,
                xPercent: 75,
                duration: 1,
                ease: "none"
            }).to(animationWrapperRegister, {
                yPercent: 0,
                xPercent: 100,
                duration: 2.5,
                ease: "power2.out",
                onComplete: () => {
                    router.push(href);
                }
            });
        }

        // Animations for the login
        const animationWrapperLogin = document.getElementById("login");
        if (animationWrapperLogin) {
            const tlLogin = gsap.timeline();
            tlLogin.to(animationWrapperLogin, {
                delay: 0.5,
                yPercent: 40,
                xPercent: -25,
                duration: 2.5,
                ease: "power2.in"
            }).to(animationWrapperLogin, {
                yPercent: 50,
                xPercent:- 50,
                duration: 1,
                ease: "none"
            }).to(animationWrapperLogin, {
                yPercent: 50,
                xPercent: -62,
                duration: 0.75,
                ease: "none"
            }).to(animationWrapperLogin, {
                yPercent: 40,
                xPercent: -75,
                duration: 1,
                ease: "none"
            }).to(animationWrapperLogin, {
                yPercent: 0,
                xPercent: -100,
                duration: 2.5,
                ease: "power2.out",
                onComplete: () => {
                    router.push(href);
                }
            });

            // Add animations for the login here, if necessary
        }
    }
};

export const animatePageIn = () => {

    const transitionElementModal = document.getElementById("modalRegisterLogin");

   if(transitionElementModal){
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
        tlModal.from(transitionElementModal, {
            opacity: 1,
            delay:1,
            duration: 0.5,
            ease: "power1.inOut"
        });
   }

}
