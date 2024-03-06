"use client";
import React, { ReactNode, HTMLAttributes } from 'react';
import { TitleXL } from './title';

interface HeroProps {
    title: string;
    children: ReactNode;
    // Include any other props you expect
    [key: string]: any; // This line is for any additional props
}

export default function Hero({ title, children, className, ...rest }: HeroProps) {
    return (
        <section id="hero" className={`relative ${className || ''}`}>
            <div id="hero-bg" className="absolute left-1/2 transform -translate-x-1/2 bottom-0 top-0 right-0 left-1\/2 pointer-events-none -z-1" aria-hidden="true">
            </div>
            <div id="hero-text" className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-6 md:pt-40 md:pb-20">
                    <div className="pb-6 md:pb-16">
                        <div className="mb-4">
                            <TitleXL>{title}</TitleXL>
                        </div>
                        <div className="mx-auto sm:max-w-none text-left" data-aos="zoom-y-out" data-aos-delay="300">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}