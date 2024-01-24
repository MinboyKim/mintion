"use client";

import { useConvexAuth } from "convex/react";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();

    return (
        <div
            className={cn(
                "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1f1f1f]",
                scrolled && "border-b shadow-sm"
            )}
        >
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && <Spinner />}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">Get Mintion free</Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/documents">Enter Mintion</Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
};
