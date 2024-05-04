import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { archiveToSrc } from "@/functions";
import { groupService } from "@/services";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { useTranslation } from "react-i18next";

interface Props {
    user: string;
    group: SimpleGroup;
}

const useWindowSize = () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null);
    const [showIcon, setShowIcon] = useState(false);
    
    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth < 640) {
                setSize('sm');
            } else if (window.innerWidth < 768) {
                setSize('md');
            } else {
                setSize('lg');
            }
        };
        
        window.addEventListener('resize', updateSize);
        updateSize();
        
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    
    return size;
};

export const GroupComponent = ({ user, group }: Props) => {
    const [showIcon, setShowIcon] = useState(false);
    const router = useRouter();
    const screenSize = useWindowSize();
    const { t } = useTranslation();
    
    const getDescription = () => {
        const len = screenSize === 'sm' ? 10 : (screenSize === 'md' ? 13 : 15);
        return group?.description && group.description.length > len ? `${group.description.substring(0, len)}...` : group?.description;
    };

    const getName = () => {
        const len = screenSize === 'sm' ? 8 : (screenSize === 'md' ? 8 : 20);
        return group?.name && group.name.length > len ? `${group.name.substring(0, len)}...` : group?.name;
        
    };

    const deleteGroup = async () => {
        try {
            await groupService.delete(group.id);
            router.push("/" + user);
        } catch (error) {
            console.error("Erro ao excluir o grupo:", error);
            alert("Erro ao excluir o grupo!");
        }
    };

    return (
        <div className="flex flex-row w-full gap-2 justify-between"
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
        >
            <div className="flex flex-row items-center flex-grow">
                <div className="relative rounded-full w-14 h-14 bg-zinc-300">
                    <Image src={archiveToSrc(group?.picture)} alt="Group Picture" layout="fill" objectFit="cover" className="rounded-full" />
                </div>
                <div className="flex flex-col ml-2">
                    <div className="text-start p rounded-md">{getName() || t("withoutname")}</div>
                    <div className="text-start rounded-md">{getDescription() || t("withoutdescription")}</div>
                </div>
            </div>
            <div className="flex items-center pr-2">
                {showIcon && (
                    <div onClick={() => deleteGroup()}>
                        <span className="h-8 w-8 rounded-lg bg-white dark:bg-modal-grey hover:brightness-95 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 47 54" fill="none" className="text-primary dark:text-secondary stroke-current">
                                <path d="M42.6111 19.5L37.8453 47.865C37.6508 49.0234 37.0724 50.073 36.2117 50.8293C35.351 51.5856 34.263 52.0001 33.1392 52H13.8608C12.737 52.0001 11.649 51.5856 10.7883 50.8293C9.92758 50.073 9.34915 49.0234 9.15472 47.865L4.38889 19.5M45 12H31.5625M31.5625 12V7C31.5625 5.67392 31.0591 4.40215 30.1631 3.46447C29.2671 2.52678 28.0519 2 26.7847 2H20.2153C18.9481 2 17.7329 2.52678 16.8369 3.46447C15.9409 4.40215 15.4375 5.67392 15.4375 7V12M31.5625 12H15.4375M2 12H15.4375" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
