import React, { useState, useEffect } from 'react';
import { getListData } from '@/services/http/api';

export const GroupAccess = ({ name, description}) => {
    return (
        <div className="flex lg:gap-4 gap-8 items-start">
            <img className="py-4" src="/img/EllipseTest.svg" />
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <h3 className="pAlata text-[#333] dark:text-[#FCFCFC]">{name}</h3>
                    <p className="mn whitespace-pre-wrap w-[403px] text-[#333] dark:invert">{description}</p>
                </div>
                </div>
        </div> 
    )
}