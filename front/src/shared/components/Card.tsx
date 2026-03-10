import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/utils/style";

const cardVariants = cva(
    [
        "rounded-lg border bg-white text-gray-900 shadow-sm",
    ],
    {
        variants: {
            variant: {
                default: "border-gray-200",
                outline: "border-gray-300 shadow-none",
                elevated: "border-gray-200 shadow-lg",
            },
            size: {
                sm: "p-4",
                md: "p-6",
                lg: "p-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(cardVariants({ variant, size }), className)}
                {...props}
            />
        );
    }
);

Card.displayName = "Card";
