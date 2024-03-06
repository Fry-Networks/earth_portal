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

export function LinkButton({ href, label, children, key, ...rest }: ButtonProps) {
    return (
        <Link href={href} aria-label={label} className="btn block md:inline-block " {...rest}>
            {children}
        </Link>
    )
}

export function LinkButtonPrimary({ href, label, children, key, ...rest }: ButtonProps) {
    return (
        <Link href={href} aria-label={label} className="btn btn-primary block md:inline-block"  {...rest}>
            {children}
        </Link>
    )
}

export function Button({label, children, key, ...rest}: ButtonProps) {
    return (
        <button className="btn" {...rest}>
            {children}
        </button>
    )
}