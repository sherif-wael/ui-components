import React from "react";
import clsx from "clsx";
import Portal from "../Portal";
import { getMenuStyles, scrollToOption } from "./Select.utils";
import { MultipleSizeElement } from "@lib/types";
import CaretIcon from "./CaretIcon";

interface Option {
    label: React.ReactNode;
    value: string;
}

interface SelectProps
    extends Omit<JSX.IntrinsicElements["input"], "size" | "onChange">,
        MultipleSizeElement {
    options?: Option[];
    onChange?: (value: JSX.IntrinsicElements["input"]["value"]) => void;
}

function BaseSelect(props: SelectProps) {
    const {
        "aria-invalid": ariaInvalid,
        "aria-describedby": ariaDescribedBy,
        value,
        defaultValue,
        onChange,
        options = [],
        size = "md",
        placeholder,
        required,
        disabled,
        name,
        className,
        id,
        ...rest
    } = props;

    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const optionsRef = React.useRef<HTMLElement[]>([]);

    const [isMenuOpened, setIsMenuOpened] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [uncontrolledValue, setUncontrolledValue] =
        React.useState(defaultValue);

    const isInvalid = ariaInvalid && ariaInvalid === "true";
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
            scrollToOption(
                menuRef.current,
                optionsRef.current[selectedOptionIndex],
                { margin: 50 }
            );
        }
    }, [isMenuOpened, currentValue]);

    const handleSelect = (option: Option) => {
        if (!isControlled) {
            setUncontrolledValue(option.value);
        }
        onChange?.(option.value);
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
            scrollToOption(menuRef.current, optionsRef.current[newActiveIndex]);
        }

        if (e.key === "Escape") {
            setIsMenuOpened(false);
        }
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const option = options.find(({ value }) => e.target.value === value);

        if (!option) return;

        if (!isControlled) {
            setUncontrolledValue(option.value);
        }

        onChange?.(option.value);
    };

    return (
        <div className="relative">
            <div
                tabIndex={0}
                role="button"
                aria-expanded={isMenuOpened ? "true" : "false"}
                aria-invalid={ariaInvalid}
                aria-describedby={ariaDescribedBy}
                aria-haspopup="listbox"
                id={id}
                ref={wrapperRef}
                onPointerDown={() => setIsMenuOpened(!isMenuOpened)}
                onKeyDown={handleKeyDown}
                className={clsx(
                    "inline-flex items-center cursor-pointer rounded-base border border-gray-300 outline-none focus:border-gray-700 transition-all relative z-[1]",
                    isInvalid && "border-red-600 focus:border-red-600",
                    {
                        "h-8 text-sm": size === "sm",
                        "h-10 text-md": size === "md",
                        "h-12 text-lg": size === "lg",
                    },
                    className
                )}
            >
                <div className="flex-grow px-3">
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

                <div
                    className="h-full px-3 flex items-center text-xl"
                >
                    <CaretIcon />
                </div>
            </div>

            <Portal>
                {isMenuOpened && wrapperRef.current && (
                    <div
                        style={getMenuStyles(wrapperRef.current)}
                        ref={menuRef}
                        role="menu"
                        className="fixed w-full bg-white shadow-base rounded max-h-[200px] overflow-y-auto rounded-base"
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
                                        "px-3 py-3 cursor-pointer aria-selected:bg-gray-100",
                                        {
                                            "text-sm": size === "sm",
                                            "text-md": size === "md",
                                            "text-lg": size === "lg",
                                        },
                                        activeIndex === index && "bg-gray-100"
                                    )}
                                    aria-selected={
                                        option.value === currentValue
                                    }
                                    role="menuitem"
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
                aria-hidden="true"
                value={currentValue || ""}
                onFocus={() => wrapperRef.current?.focus()}
                tabIndex={-1}
                disabled={disabled}
                className="absolute w-full opacity-0 overflow-hidden bottom-0 left-0"
                required={required}
                name={name}
                onChange={handleChange}
                {...rest}
            />
        </div>
    );
}

export default BaseSelect;
