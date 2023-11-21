"use client";

import { useEffect, useState } from "react";

export const NotificationsConfig = () => {
    useEffect(() => {
        verificarToggle()
    })


    const verificarToggle = () => {
        const a = document.querySelector("#mostrarNotificacoes")
        let toggles = document.querySelectorAll("#toggle")
        let togglesSpan = document.querySelectorAll("#toggleSpan")
        if (a.classList.toggle("toggle-slider-active") === false) {
            toggles.forEach(element => {
                element.setAttribute("disabled", "enabled")
                console.log(element)
            });
            togglesSpan.forEach(element => {
                element.classList.remove("toggle-slider")
            });
        } else {
            toggles.forEach(element => {
                element.removeAttribute("disabled", "enabled")
            });
            togglesSpan.forEach(element => {
                element.classList.add("toggle-slider")
            });
        }
    }
    return (
        <>
            <div className="w-full">
                <div className="w-full flex justify-center h-full items-center">

                    <div className="w-[80%] grid grid-cols-2 grid-rows-4 gap-10">

                        <div className="flex justify-between col-span-2 row-start-1">
                            <h2 className="h2 text-secondary">Mostrar notificações</h2>
                            <div className="flex items-center py-4 font-bold ">
                                <label className="relative w-16 h-8 ml-4 mr-4">
                                    <input onClick={() => verificarToggle()} id="mostrarNotificacoes" type="checkbox" className="opacity-0 w-0 h-0 toggle-input" />
                                    <span className=" absolute top-0 right-0 bottom-0 left-0  cursor-pointer rounded-2xl bg-[#E0E0E0] transition-all  duration-300 before:content-[' '] before:absolute before:w-6 before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider "></span>
                                </label>
                            </div>
                        </div>
                        <div className="row-start-2 col-start-1">
                            <div className="w-full flex items-center justify-between row-start-3 ">
                                <h4 className="h4 text-[#333333]">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input id="toggle" type="checkbox" className="opacity-0 w-0 h-0 toggle-input" />
                                        <span id="toggleSpan" className=" absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-[#E0E0E0] transition-all  duration-300 before:content-[' '] before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider "></span>
                                    </label>
                                </div>

                            </div>
                            <div>
                                <p className="p">Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                        </div>
                        <div className="row-start-2 col-start-2">
                            <div className="w-full flex items-center justify-between row-start-3 ">
                                <h4 className="h4 text-[#333333]">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input id="toggle" type="checkbox" className="opacity-0 w-0 h-0 toggle-input" />
                                        <span id="toggleSpan" className=" absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-[#E0E0E0] transition-all  duration-300 before:content-[' '] before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider "></span>
                                    </label>
                                </div>

                            </div>
                            <div>
                                <p className="p">Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                        </div>
                        <div className="row-start-3 col-start-1">
                            <div className="w-full flex items-center justify-between row-start-3 ">
                                <h4 className="h4 text-[#333333]">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input id="toggle" type="checkbox" className="opacity-0 w-0 h-0 toggle-input" />
                                        <span id="toggleSpan" className=" absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-[#E0E0E0] transition-all  duration-300 before:content-[' '] before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider "></span>
                                    </label>
                                </div>

                            </div>
                            <div>
                                <p className="p">Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                        </div>
                        <div className="row-start-3 col-start-2">
                            <div className="w-full flex items-center justify-between row-start-2 ">
                                <h4 className="h4 text-[#333333]">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input id="toggle" type="checkbox" className="opacity-0 w-0 h-0 toggle-input" />
                                        <span id="toggleSpan" className=" absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-[#E0E0E0] transition-all  duration-300 before:content-[' '] before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider "></span>
                                    </label>
                                </div>

                            </div>
                            <div>
                                <p className="p">Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                        </div>
                        <div className="row-start-4 col-start-1">
                            <div className="w-full flex items-center justify-between row-start-2 ">
                                <h4 className="h4 text-[#333333]">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input id="toggle" type="checkbox" className="opacity-0 w-0 h-0 toggle-input" />
                                        <span id="toggleSpan" className=" absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-[#E0E0E0] transition-all  duration-300 before:content-[' '] before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider "></span>
                                    </label>
                                </div>

                            </div>
                            <div>
                                <p className="p">Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                        </div>
                        <div className="row-start-4 col-start-2">
                            <div className="w-full flex items-center justify-between row-start-2 ">
                                <h4 className="h4 text-[#333333]">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input id="toggle" type="checkbox" className="opacity-0 w-0 h-0 toggle-input" />
                                        <span id="toggleSpan" className=" absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-[#E0E0E0] transition-all  duration-300 before:content-[' '] before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider "></span>
                                    </label>
                                </div>

                            </div>
                            <div>
                                <p className="p">Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}  