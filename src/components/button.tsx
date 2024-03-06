'use client';
import React, { ReactNode, HTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps {
    href: string;
    label: string;
    children: ReactNode;
    // Include any other props you expect
    [key: string]: any; // This line is for any additional props
}

export function Button({ href, label, children, key, ...rest }: ButtonProps) {
    return (
        <Link href={href} aria-label={label} className="btn block md:inline-block ">
            {children}
        </Link>
    )
}

export function ButtonPrimary({ href, label, children, key, ...rest }: ButtonProps) {
    return (
        <Link href={href} aria-label={label} className="btn btn-primary block md:inline-block" >
            {children}
        </Link>
    )
}