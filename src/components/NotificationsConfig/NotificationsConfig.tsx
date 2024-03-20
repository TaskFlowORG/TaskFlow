"use client";

import { useState } from "react";

export const NotificationsConfig = () => {

    const [toggle, setToggle] = useState(false);

    const mudarToggle = () => {
        setToggle(!toggle);
    }

    return (
        <>
        
            <div className="w-full h-full">

                <div className="flex justify-center h-full">

                    <div className="w-[80%] md:grid grid-cols-2 grid-rows-4 gap-10 sm:">

                        <div className="flex justify-between items-center col-span-2 row-start-1">
                            <h2 className="h2 text-secondary">Mostrar notificações</h2>
                            <div className="flex items-center py-4 font-bold ">
                                <label className="relative w-16 h-8 ml-4 mr-4">
                                    <input onClick={mudarToggle} id="mostrarNotificacoes" type="checkbox" className="opacity-0 w-0 h-0 toggle-input" />
                                    <span className=" absolute top-0 right-0 bottom-0 left-0  cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] before:absolute before:w-6 before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider "></span>
                                </label>
                            </div>
                        </div>
                        <div className={`row-start-2 col-start-1 ${toggle ? "opacity-100" : "opacity-50"
                            }`}>
                            <div className="w-full flex items-center justify-between row-start-3 ">
                                <h4 className="h4 text-modal-grey">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input type="checkbox" className="opacity-0 w-0 h-0 toggle-input" disabled={!toggle} />
                                        <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                                        before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p className="p">Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                        </div>
                        <div className={`row-start-2 col-start-2 ${toggle ? "opacity-100" : "opacity-50"
                            }`}>
                            <div className="w-full flex items-center justify-between row-start-3 ">
                                <h4 className="h4 text-modal-grey">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input type="checkbox" className="opacity-0 w-0 h-0 toggle-input"
                                            disabled={!toggle} />
                                        <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                                        before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p className="p">Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                        </div>
                        <div className={`row-start-3 col-start-1 ${toggle ? "opacity-100" : "opacity-50"
                            }`}>
                            <div className="w-full flex items-center justify-between row-start-3 ">
                                <h4 className="h4 text-modal-grey">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input type="checkbox" className="opacity-0 w-0 h-0 toggle-input"
                                            disabled={!toggle} />
                                        <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                                        before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p className="p">Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                        </div>
                        <div className={`row-start-3 col-start-2 ${toggle ? "opacity-100" : "opacity-50"
                            }`}>
                            <div className="w-full flex items-center justify-between row-start-3 ">
                                <h4 className="h4 text-modal-grey">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input type="checkbox" className="opacity-0 w-0 h-0 toggle-input"
                                            disabled={!toggle} />
                                        <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                                        before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p className="p">Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                        </div>
                        <div className={`row-start-4 col-start-1 ${toggle ? "opacity-100" : "opacity-50"
                            }`}>
                            <div className="w-full flex items-center justify-between row-start-3 ">
                                <h4 className="h4 text-modal-grey">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input type="checkbox" className="opacity-0 w-0 h-0 toggle-input"
                                            disabled={!toggle} />
                                        <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                                        before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p className="p">Lorem ipsum dolor sit amet consectetur. Ut varius purus proin a. Euismod placerat tortor ultrices at odio dolor turpis vitae.</p>
                            </div>
                        </div>
                        <div className={`row-start-4 col-start-2 ${toggle ? "opacity-100" : "opacity-50"
                            }`}>
                            <div className="w-full flex items-center justify-between row-start-3 ">
                                <h4 className="h4 text-modal-grey">Cada alteração</h4>
                                <div className="flex items-center py-4 font-bold ">
                                    <label className="relative w-16 h-8 ml-4 mr-4">
                                        <input type="checkbox" className="opacity-0 w-0 h-0 toggle-input"
                                            disabled={!toggle} />
                                        <span className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-2xl bg-input-toggle-grey transition-all  duration-300 before:content-[' '] 
                                        before:absolute before:w-6  before:left-1 before:h-6  before:bottom-1 before:rounded-full before:bg-white toggle-slider"></span>
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