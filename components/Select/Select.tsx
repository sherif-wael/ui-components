import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { keepVisible } from "../../lib/keep-visible";
import clsx from "clsx";
import Portal from "../Portal";
import { FaCaretDown as CaretIcon } from "react-icons/fa";

const select = cva(
    "inline-flex items-center cursor-pointer disabled:cursor-not-allowed transition-all duration-300 w-full text-gray-700 relative z-[1]",
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

type Option = {
    label: React.ReactNode;
    value: string;
};

type SelectProps = Omit<JSX.IntrinsicElements["input"], "size"> &
    VariantProps<typeof select> & {
        options: Option[];
        onChange?: (value: JSX.IntrinsicElements["input"]["value"]) => void;
    };

function getMenuStyles(wrapper: HTMLElement) {
    const { top, left, width, height } = wrapper.getBoundingClientRect();
    const margin = 10;

    const styles: React.CSSProperties = {
        width: `${width}px`,
        left: `${left}px`,
    };

    if (top + height / 2 > window.innerHeight / 2) {
        styles.bottom = `${window.innerHeight - (top - margin)}px`;
    } else {
        styles.top = `${top + height + margin}px`;
    }

    return styles;
}

function Select(props: SelectProps) {
    const {
        defaultValue,
        value,
        onChange,
        multiple,
        className,
        variant,
        size,
        invalid,
        placeholder,
        options = [],
        ...rest
    } = props;

    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const optionsRef = React.useRef<HTMLElement[]>([]);

    const [isMenuOpened, setIsMenuOpened] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [uncontrolledValue, setUncontrolledValue] =
        React.useState(defaultValue);

    const isControlled = !!value;
    const currentValue = isControlled ? value : uncontrolledValue;
    const selectedOption = options.find(
        (option) => option.value === currentValue
    );

    React.useEffect(() => {
        const handler = (e: PointerEvent) => {
            if (
                !wrapperRef.current ||
                wrapperRef.current.contains(e.target as Node) || 
                !menuRef.current || 
                menuRef.current.contains(e.target as Node)
            )
                return;
            setIsMenuOpened(false);
        };

        window.addEventListener("pointerdown", handler);

        return () => {
            window.removeEventListener("pointerdown", handler);
        };
    }, []);

    React.useEffect(() => {
        const handler = () => {
            if (
                !wrapperRef.current?.contains(document.activeElement) &&
                !menuRef.current?.contains(document.activeElement)
            ) {
                setIsMenuOpened(false);
            }
        };

        document.addEventListener("focusin", handler);

        return () => {
            document.removeEventListener("focusin", handler);
        };
    }, []);

    React.useLayoutEffect(() => {
        const selectedOptionIndex = options.findIndex(
            (option) => option.value === currentValue
        );

        if (!isMenuOpened) {
            setActiveIndex(
                selectedOptionIndex === -1 ? 0 : selectedOptionIndex
            );
        }

        if (selectedOptionIndex !== -1 && menuRef.current) {
            keepVisible(
                menuRef.current,
                optionsRef.current[selectedOptionIndex],
                { margin: 50 }
            );
        }
    }, [isMenuOpened, currentValue]);

    const handleSelect = (option: Option) => {
        if (isControlled) {
            onChange?.(option.value);
        } else {
            setUncontrolledValue(option.value);
        }

        setIsMenuOpened(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (typeof window === "undefined" || !wrapperRef.current) return;

        if (e.key === "Tab") return;

        e.preventDefault();

        if (e.key === "Enter") {
            if (!isMenuOpened) {
                setIsMenuOpened(true);
            } else {
                handleSelect(options[activeIndex]);
            }
        }

        if (e.key === "ArrowDown" && !isMenuOpened) {
            setIsMenuOpened(true);
        }

        if (
            (e.key === "ArrowDown" || e.key === "ArrowUp") &&
            isMenuOpened &&
            menuRef.current
        ) {
            const newActiveIndex =
                e.key === "ArrowDown"
                    ? Math.min(activeIndex + 1, options.length - 1)
                    : Math.max(0, activeIndex - 1);
            setActiveIndex(newActiveIndex);
            keepVisible(menuRef.current, optionsRef.current[newActiveIndex]);
        }

        if (e.key === "Escape") {
            setIsMenuOpened(false);
        }
    };

    return (
        <div className="relative">
            <div
                className={select({ className, variant, size, invalid })}
                tabIndex={0}
                ref={wrapperRef}
                onPointerDown={() => setIsMenuOpened(!isMenuOpened)}
                onKeyDown={handleKeyDown}
            >
                <div>
                    {selectedOption ? (
                        <div className="text-gray-700 select-none">
                            {selectedOption.label}
                        </div>
                    ) : (
                        <div className="text-gray-300 select-none">
                            {placeholder}
                        </div>
                    )}
                </div>

                <div className="ml-auto">
                    <CaretIcon />
                </div>
            </div>

            <Portal>
                {isMenuOpened && wrapperRef.current && (
                    <div
                        style={getMenuStyles(wrapperRef.current)}
                        ref={menuRef}
                        className="fixed w-full border border-gray-200 bg-white shadow rounded max-h-[200px] overflow-y-auto"
                    >
                        {options.map((option, index) => {
                            return (
                                <div
                                    ref={(el) =>
                                        (optionsRef.current[index] =
                                            el as HTMLElement)
                                    }
                                    key={option.value}
                                    className={clsx(
                                        "px-2 py-1 cursor-pointer aria-selected:bg-blue-100 text-sm",
                                        activeIndex === index && "bg-gray-100"
                                    )}
                                    aria-selected={
                                        option.value === currentValue
                                    }
                                    onClick={() => handleSelect(option)}
                                    onMouseMove={() => setActiveIndex(index)}
                                >
                                    {option.label}
                                </div>
                            );
                        })}
                    </div>
                )}
            </Portal>

            <input
                defaultValue={currentValue}
                onFocus={() => wrapperRef.current?.focus()}
                tabIndex={-1}
                className="absolute w-1 h-1 opacity-0 inset-2/4 overflow-hidden"
                {...rest}
            />
        </div>
    );
}

export default Select;
