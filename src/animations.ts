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
            const break1 = i <12.5;
            const break2 = i < 25;
            const break3 = i < 37.5;
            const break4 = i < 50;

            const break9 = i < 62.5;
            const break6 = i < 75;
            const break7 = i < 87.5;
            const break8 = i < 100;




            const equal0 = i == 1;
            const equal99 = i == 100;
    
            // Função de easing personalizada
            const customEase = CustomEase.create("custom", "M0,0 C0.1,0.2,0.3,1,1,1");
    
            tlRegister.to(animationWrapperRegister, {
                delay: equal0 ? 0.5 : 0,
                yPercent: i < 50 ? i : 100 -i,
                x: x / 100 * (break1 ? i/4 : break2 ? i/3 : break3 ? i/2 : break4 ? i : break9 ? 50 + i : break6 ? 50 + i/2 : break7 ? 50 + i/3: 50 + i/4),
                duration: 0.01,
                ease: equal0 ? "power1.in" : equal99 ? "power2.out" : customEase,
                onComplete: () => {
                    if (i == 99) {
                        router.push(href);
                    }
                }
            });
        }
    }

    function calcularConstante() {
        let somaTotal = 0;

        // Calcula a soma total de 1/i para i de 1 a 50
        for (let i = 1; i <= 50; i++) {
            somaTotal += 1 / i;
        }

        // Calcula a constante necessária para garantir que a soma seja 50
        const constante = 50 / somaTotal;

        return constante;
    }

    // Função para calcular a angulação com a constante
    function calcularAngulacao(constante: number, i: number) {
        return constante * (1 / i);
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
