'use client';
import React, { ReactNode, HTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps {

    label: string;
    children: ReactNode;
    // Include any other props you expect
    [key: string]: any; // This line is for any additional props
}

export function LinkButton({ label, children, key, ...rest }: ButtonProps) {
    return (
        <Link aria-label={label} className="btn block md:inline-block " {...rest}>
            {children}
        </Link>
    )
}

export function LinkButtonPrimary({ label, children, key, ...rest }: ButtonProps) {
    return (
        <Link aria-label={label} className="btn btn-primary block md:inline-block"  {...rest}>
            {children}
        </Link>
    )
}

export function Button({label, children, key, ...rest}: ButtonProps) {
    return (
        <button className="btn" aria-label={label} {...rest}>
            {children}
        </button>
    )
}