"use client";

import {
    ArrowRight,
    CalendarDays,
} from "lucide-react";

import { useBooking } from "./BookingProvider";

type BookAppointmentButtonProps = {
    className?: string;
    label?: string;
    showIcon?: boolean;
};

export default function BookAppointmentButton({
    className = "",
    label = "Book an Appointment",
    showIcon = true,
}: BookAppointmentButtonProps) {
    const { openBooking } = useBooking();

    return (
        <button
            type="button"
            onClick={openBooking}
            className={`
                group
                inline-flex
                min-h-[56px]
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#075187]
                px-7
                py-4
                text-[15px]
                font-semibold
                text-white
                shadow-[0_12px_30px_rgba(7,81,135,0.25)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-[#063f6b]
                hover:shadow-[0_16px_35px_rgba(7,81,135,0.30)]

                ${className}
            `}
        >
            {showIcon && (
                <CalendarDays className="h-[18px] w-[18px]" />
            )}

            <span>{label}</span>

            <ArrowRight
                className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                "
            />
        </button>
    );
}