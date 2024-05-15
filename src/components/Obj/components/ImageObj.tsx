import { archiveToSrc } from "@/functions";
import { Group, OtherUser, User } from "@/models"
import { SimpleGroup } from "@/models/user/group/SimpleGroup"
import Image from "next/image";
import { useEffect, useState } from "react";

export const ImageObj = ({obj}:{obj:Group | SimpleGroup |OtherUser | User}) => {
    const [src, setSrc] = useState<string>("/Assets/noImage.png");
    useEffect(() => {
            setSrc(archiveToSrc (obj.picture))
    }, [obj])
    return <Image alt={obj.name} fill src={src} />
}