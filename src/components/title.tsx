'use client';
import React, { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ["latin"] });

interface TitleProps {
    children: ReactNode;
    className?: string;
}

export function TitleXL({ children, className }: TitleProps) {
    return (
        <h1 className={`${montserrat.className} uppercase text-4xl md:text-6xl font-bold leading-tighter ${className}`}>{children}</h1>
    )
}

export function TitleLg({ children, className }: TitleProps) {
    return (
        <h2 className={`uppercase text-3xl mt-2 font-bold leading-tighter ${className}`}>{children}</h2>
    )
}

export function TitleMd({ children, className }: TitleProps) {
    return (
        <h3 className={`font-bold text-2xl ${className}`}>{children}</h3>
    )
}

export function TitleSm({ children, ...rest }: TitleProps) {
    return (
        <h4 className="text-xl"  {...rest}>{children}</h4>
    )
}