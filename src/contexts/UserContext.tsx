"use client"
import { User} from "@/models";
import { createContext, useCallback, useContext, useState } from "react";

type UserContext = {
    user?: User;
    setUser?: (Users: User) => void;
}
// eslint-disable-next-line react-hooks/rules-of-hooks
export const UserContext = createContext<UserContext>({});

