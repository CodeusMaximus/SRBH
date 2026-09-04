"use client";

import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from "react";

import BookAppointmentModal from "./BookAppointmentModal";

type BookingContextType = {
    openBooking: () => void;
    closeBooking: () => void;
};

const BookingContext =
    createContext<BookingContextType | null>(null);

export default function BookingProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [bookingOpen, setBookingOpen] =
        useState(false);

    const openBooking = useCallback(() => {
        setBookingOpen(true);
    }, []);

    const closeBooking = useCallback(() => {
        setBookingOpen(false);
    }, []);

    return (
        <BookingContext.Provider
            value={{
                openBooking,
                closeBooking,
            }}
        >
            {children}

            <BookAppointmentModal
                open={bookingOpen}
                onClose={closeBooking}
            />
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context =
        useContext(BookingContext);

    if (!context) {
        throw new Error(
            "useBooking must be used inside BookingProvider"
        );
    }

    return context;
}