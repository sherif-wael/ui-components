import { cva, type VariantProps } from "class-variance-authority";

const input = cva(
    "disabled:cursor-not-allowed transition-all duration-300 w-full inline-block text-gray-700 relative z-[1]",
    {
        variants: {
            variant: {
                unstyled: "outline-none focus:outline-none active:outline-none",
                outline:
                    "px-2 rounded border border-gray-200 hover:border-gray-300 outline-none outline-offset-1 focus:outline-blue-400",
            },
            size: {
                sm: "h-8 text-sm",
                md: "h-10 text-md",
                lg: "h-12 text-lg",
            },
            invalid: {
                true: "",
            },
            leftAddon: {
                true: "rounded-l-[0]",
            },
            rightAddon: {
                true: "rounded-r-[0]"
            },
        },
        compoundVariants: [
            {
                variant: "outline",
                invalid: true,
                className: "border-red-400 focus:outline-red-400",
            },
        ],
        defaultVariants: {
            size: "md",
            variant: "outline",
        },
    }
);

type InputProps = JSX.IntrinsicElements["input"] &
    Omit<VariantProps<typeof input>, "invalid" | "leftAddon" | "rightAddon"> & {
        leftAddon?: React.ReactNode;
        rightAddon?: React.ReactNode;
        invalid?: boolean;
    };

function Input(props: InputProps) {
    const {
        variant,
        size,
        className,
        leftAddon,
        rightAddon,
        invalid,
        ...rest
    } = props;

    return (
        <div className="flex text-gray-700">
            {
                leftAddon &&
                <div className="inline-flex items-center justify-center px-2 rounded-l bg-gray-200">
                    {leftAddon}
                </div>
            }

            <input
                className={input({
                    variant,
                    size,
                    invalid,
                    className,
                    leftAddon: !!leftAddon,
                    rightAddon: !!rightAddon,
                })}
                {...rest}
            />

            {
                rightAddon &&
                <div className="inline-flex items-center justify-center px-2 rounded-r bg-gray-200">
                    {rightAddon}
                </div>
            }
        </div>
    );
}

export default Input;
