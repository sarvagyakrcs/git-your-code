'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Settings, User } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { Session } from "next-auth"
import { signOut } from 'next-auth/react'
import { Badge } from "@/components/ui/badge"

export default function UserButton({ session }: { session: Session }) {
    const [isHovered, setIsHovered] = useState(false)

    if (!session) {
        return null
    }

    const { user } = session

    const initials = user.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "U"

    if (!session) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.button
                    className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <motion.div
                        className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: isHovered ? 1.2 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal flex items-center justify-between space-x-2">
                    <div className="flex flex-col space-y-1 truncate w-full">
                        <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Badge
                        className={session.user.role === "ADMIN" ? "bg-blue-500 text-white" : "bg-green-500 text-white"}
                    >
                        {session.user.role === "ADMIN" ? "Admin" : "User"}
                    </Badge>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault()
                        signOut()
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

