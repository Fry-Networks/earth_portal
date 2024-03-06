'use client';
import React, { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ["latin"] });

interface TitleProps {
    children: ReactNode;
}

export function TitleXL({ children }: TitleProps) {
    return (
        <h1 className={`${montserrat.className} uppercase text-4xl md:text-6xl font-bold leading-tighter`}>{children}</h1>
    )
}

export function TitleLg({ children }: TitleProps) {
    return (
        <h2 className={`uppercase text-3xl mt-2 font-bold leading-tighter`}>{children}</h2>
    )
}

export function TitleMd({ children }: TitleProps) {
    return (
        <h3 className="font-bold text-2xl">{children}</h3>
    )
}

export function TitleSm({ children }: TitleProps) {
    return (
        <h4 className="text-xl">{children}</h4>
    )
}