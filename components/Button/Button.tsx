import { cva, type VariantProps } from "class-variance-authority";
import ButtonSpinner from "./ButtonSpinner";

const button = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded transition-all duration-300 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                ghost: "bg-[transparent] text-gray-700 hover:bg-blue-50 focus:bg-blue-100 font-medium",
                solid: "text-white bg-blue-500 hover:bg-blue-400 focus:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-500",
            },
            size: {
                sm: "text-sm h-8 min-w-[144px]",
                md: "text-sm h-10 min-w-[144px]",
                lg: "text-sm h-12 min-w-[144px]",
            },
            icon: {
                true: ""
            }
        },
        compoundVariants: [
            { size: "sm", icon: true, className: "text-sm h-8 w-8 min-w-[auto]" },
            { size: "md", icon: true, className: "text-sm h-10 w-10 min-w-[auto]" },
            { size: "lg", icon: true, className: "text-sm h-12 w-12 min-w-[auto]" },
        ],
        defaultVariants: {
            size: "md",
            variant: "solid"
        }
    }
);


type ButtonProps = Omit<VariantProps<typeof button>, "icon"> &
    JSX.IntrinsicElements["button"] & { loading?: boolean, icon?: React.ReactNode };

function Button(props: ButtonProps) {
    const { size, variant, loading, disabled, className, icon, children, ...rest } =
        props;

    return (
        <button
            disabled={disabled || loading}
            className={button({ size, variant, className, icon: !!icon })}
            {...rest}
        >
            {loading ? <ButtonSpinner /> : !!icon ? icon : children}
        </button>
    );
}

export default Button;
