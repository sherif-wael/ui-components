import { cva, VariantProps } from "class-variance-authority";

export const fontStyles = cva("", {
    variants: {
        size: {
            sm: "text-md",
            md: "text-md",
            lg: "text-lg",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export const sizeStyles = cva("", {
    variants: {
        size: {
            sm: "h-8",
            md: "h-10",
            lg: "h-12",
        },
    },
    defaultVariants: {
        size: "md",
    }
});

export const fieldStyles = cva(
    "rounded-base border border-gray-200 focus:border-gray-700",
    {
        variants: {
            invalid: {
                true: "border-red-600",
            },
        },
    }
);

export type MultipleSizeElement = VariantProps<typeof sizeStyles>;
