import * as React from "react";
import { cva } from "class-variance-authority";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/style";

const containerVariants = cva(
    [
        "mx-auto w-full",
    ],
    {
        variants: {
            size: {
                sm: "max-w-md",
                md: "max-w-3xl",
                lg: "max-w-6xl",
                full: "max-w-full",
            },
            center: {
                true: "flex items-center justify-center min-h-screen",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);

export interface ContainerProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> { }

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, size, center, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(containerVariants({ size, center }), className)}
                {...props}
            />
        );
    }
);

Container.displayName = "Container";
