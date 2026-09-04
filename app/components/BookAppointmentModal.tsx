"use client";

import {
    AnimatePresence,
    motion,
} from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Laptop,
    MapPin,
    Phone,
    ShieldCheck,
    Stethoscope,
    X,
} from "lucide-react";
import {
    FormEvent,
    useEffect,
    useMemo,
    useState,
} from "react";

type BookAppointmentModalProps = {
    open: boolean;
    onClose: () => void;
};

type AppointmentType = {
    id: string;
    name: string;
    description: string;
    duration: string;
    icon: React.ElementType;
};

const appointmentTypes: AppointmentType[] = [
    {
        id: "psychiatric-evaluation",
        name: "Psychiatric Evaluation",
        description:
            "A comprehensive initial psychiatric assessment.",
        duration: "60 min",
        icon: Stethoscope,
    },
    {
        id: "medication-management",
        name: "Medication Management",
        description:
            "Follow-up medication review and treatment management.",
        duration: "30 min",
        icon: ShieldCheck,
    },
    {
        id: "telehealth",
        name: "Telehealth Appointment",
        description:
            "Meet with your provider through a secure virtual visit.",
        duration: "30 min",
        icon: Laptop,
    },
];

/*
 * DEMO AVAILABILITY ONLY
 *
 * We will replace this with:
 * GET /api/appointments/availability?date=YYYY-MM-DD
 */
const demoTimes = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:30 PM",
    "3:00 PM",
    "4:30 PM",
    "5:00 PM",
    "6:00 PM",
];

export default function BookAppointmentModal({
    open,
    onClose,
}: BookAppointmentModalProps) {
    const [step, setStep] = useState(1);

    const [appointmentType, setAppointmentType] =
        useState("");

    const [selectedDate, setSelectedDate] =
        useState<Date | null>(null);

    const [selectedTime, setSelectedTime] =
        useState("");

    const [currentMonth, setCurrentMonth] =
        useState(() => startOfMonth(new Date()));

    const [loading, setLoading] =
        useState(false);

    const [submitted, setSubmitted] =
        useState(false);

    useEffect(() => {
        if (!open) return;

        const previous =
            document.body.style.overflow;

        document.body.style.overflow =
            "hidden";

        const handleEscape = (
            event: KeyboardEvent
        ) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.body.style.overflow =
                previous;

            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [open, onClose]);

    const days = useMemo(
        () => getCalendarDays(currentMonth),
        [currentMonth]
    );

    const resetAndClose = () => {
        setStep(1);
        setAppointmentType("");
        setSelectedDate(null);
        setSelectedTime("");
        setSubmitted(false);
        onClose();
    };

    const nextStep = () => {
        if (step === 1 && !appointmentType)
            return;

        if (
            step === 2 &&
            (!selectedDate || !selectedTime)
        )
            return;

        setStep((previous) =>
            Math.min(previous + 1, 3)
        );
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setLoading(true);

        /*
         * REAL API WILL GO HERE:
         *
         * await fetch("/api/appointments/book", {
         *     method: "POST",
         *     headers: {
         *         "Content-Type": "application/json",
         *     },
         *     body: JSON.stringify({
         *         appointmentType,
         *         date: formatDateKey(selectedDate!),
         *         time: selectedTime,
         *         ...contactInformation
         *     })
         * });
         */

        await new Promise((resolve) =>
            setTimeout(resolve, 700)
        );

        setLoading(false);
        setSubmitted(true);
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* BACKDROP */}

                    <motion.button
                        type="button"
                        aria-label="Close appointment booking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={resetAndClose}
                        className="
                            fixed
                            inset-0
                            z-[300]
                            cursor-default
                            bg-[#03162f]/75
                            backdrop-blur-[6px]
                        "
                    />

                    {/* MODAL WRAPPER */}

                    <div
                        className="
                            pointer-events-none
                            fixed
                            inset-0
                            z-[310]
                            flex
                            items-center
                            justify-center
                            overflow-y-auto
                            p-3
                            sm:p-5
                        "
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="booking-title"
                            initial={{
                                opacity: 0,
                                y: 30,
                                scale: 0.97,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: 20,
                                scale: 0.98,
                            }}
                            transition={{
                                duration: 0.35,
                                ease: [
                                    0.22,
                                    1,
                                    0.36,
                                    1,
                                ],
                            }}
                            className="
                                pointer-events-auto
                                relative
                                my-auto
                                w-full
                                max-w-[1080px]
                                overflow-hidden
                                rounded-[30px]
                                bg-white
                                shadow-[0_35px_100px_rgba(0,0,0,0.30)]
                            "
                        >
                            {/* CLOSE */}

                            <button
                                type="button"
                                onClick={
                                    resetAndClose
                                }
                                aria-label="Close"
                                className="
                                    absolute
                                    right-4
                                    top-4
                                    z-40
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#082957]/10
                                    bg-white/95
                                    text-[#082957]
                                    shadow-sm
                                    transition
                                    hover:bg-[#082957]
                                    hover:text-white
                                "
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {submitted ? (
                                <BookingSuccess
                                    appointmentType={
                                        appointmentType
                                    }
                                    date={
                                        selectedDate
                                    }
                                    time={
                                        selectedTime
                                    }
                                    onClose={
                                        resetAndClose
                                    }
                                />
                            ) : (
                                <div
                                    className="
                                        grid
                                        lg:grid-cols-[310px_1fr]
                                    "
                                >
                                    {/* =====================
                                        LEFT SIDE
                                    ====================== */}

                                    <aside
                                        className="
                                            relative
                                            overflow-hidden
                                            bg-[#082957]
                                            p-7
                                            text-white
                                            sm:p-8
                                            lg:min-h-[690px]
                                            lg:p-9
                                        "
                                    >
                                        <BookingArtwork />

                                        <div className="relative z-10">
                                            <span
                                                className="
                                                    inline-flex
                                                    rounded-full
                                                    border
                                                    border-white/10
                                                    bg-white/[0.06]
                                                    px-3
                                                    py-2
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.18em]
                                                    text-[#e2b45d]
                                                "
                                            >
                                                Solid Rock
                                                Behavioral
                                                Health
                                            </span>

                                            <h2
                                                id="booking-title"
                                                className="
                                                    mt-6
                                                    font-serif
                                                    text-[34px]
                                                    font-semibold
                                                    leading-[1.05]
                                                    tracking-[-0.03em]
                                                "
                                            >
                                                Book an
                                                <span className="block text-[#e2b45d]">
                                                    Appointment
                                                </span>
                                            </h2>

                                            <p
                                                className="
                                                    mt-4
                                                    text-[13px]
                                                    leading-6
                                                    text-white/60
                                                "
                                            >
                                                Choose your
                                                appointment
                                                type, date,
                                                and an
                                                available
                                                appointment
                                                time.
                                            </p>

                                            {/* STEPS */}

                                            <div className="mt-9 space-y-6">
                                                <StepIndicator
                                                    number={1}
                                                    title="Visit Type"
                                                    active={
                                                        step ===
                                                        1
                                                    }
                                                    complete={
                                                        step >
                                                        1
                                                    }
                                                />

                                                <StepIndicator
                                                    number={2}
                                                    title="Date & Time"
                                                    active={
                                                        step ===
                                                        2
                                                    }
                                                    complete={
                                                        step >
                                                        2
                                                    }
                                                />

                                                <StepIndicator
                                                    number={3}
                                                    title="Your Information"
                                                    active={
                                                        step ===
                                                        3
                                                    }
                                                    complete={
                                                        false
                                                    }
                                                />
                                            </div>

                                            <div
                                                className="
                                                    mt-10
                                                    border-t
                                                    border-white/10
                                                    pt-6
                                                "
                                            >
                                                <p
                                                    className="
                                                        text-[10px]
                                                        uppercase
                                                        tracking-[0.15em]
                                                        text-white/35
                                                    "
                                                >
                                                    Need help?
                                                </p>

                                                <a
                                                    href="tel:+19294472430"
                                                    className="
                                                        mt-3
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-[15px]
                                                        font-semibold
                                                        text-white
                                                        transition
                                                        hover:text-[#e2b45d]
                                                    "
                                                >
                                                    <Phone className="h-4 w-4 text-[#e2b45d]" />

                                                    (929)
                                                    447-2430
                                                </a>
                                            </div>
                                        </div>
                                    </aside>

                                    {/* =====================
                                        RIGHT CONTENT
                                    ====================== */}

                                    <div
                                        className="
                                            max-h-[88vh]
                                            overflow-y-auto
                                            p-6
                                            sm:p-8
                                            lg:p-10
                                        "
                                    >
                                        {/* STEP 1 */}

                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{
                                                    opacity: 0,
                                                    x: 20,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                            >
                                                <SectionHeading
                                                    eyebrow="Step 1 of 3"
                                                    title="What type of appointment do you need?"
                                                    description="Select the option that best matches the care you're looking for."
                                                />

                                                <div className="mt-7 space-y-3">
                                                    {appointmentTypes.map(
                                                        (
                                                            item
                                                        ) => {
                                                            const Icon =
                                                                item.icon;

                                                            const selected =
                                                                appointmentType ===
                                                                item.id;

                                                            return (
                                                                <button
                                                                    type="button"
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    onClick={() =>
                                                                        setAppointmentType(
                                                                            item.id
                                                                        )
                                                                    }
                                                                    className={`
                                                                        group
                                                                        flex
                                                                        w-full
                                                                        items-center
                                                                        gap-4
                                                                        rounded-[20px]
                                                                        border
                                                                        p-4
                                                                        text-left
                                                                        transition-all
                                                                        duration-300
                                                                        ${selected
                                                                            ? "border-[#075187] bg-[#f0f7fb] shadow-[0_8px_25px_rgba(7,81,135,0.08)]"
                                                                            : "border-[#082957]/10 bg-white hover:border-[#075187]/30 hover:bg-[#f8fafb]"
                                                                        }
                                                                    `}
                                                                >
                                                                    <span
                                                                        className={`
                                                                            flex
                                                                            h-12
                                                                            w-12
                                                                            shrink-0
                                                                            items-center
                                                                            justify-center
                                                                            rounded-2xl
                                                                            ${selected
                                                                                ? "bg-[#075187] text-white"
                                                                                : "bg-[#f1f5f7] text-[#075187]"
                                                                            }
                                                                        `}
                                                                    >
                                                                        <Icon className="h-5 w-5" />
                                                                    </span>

                                                                    <span className="min-w-0 flex-1">
                                                                        <span className="block text-[14px] font-bold text-[#082957]">
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </span>

                                                                        <span className="mt-1 block text-[11px] leading-5 text-[#718497]">
                                                                            {
                                                                                item.description
                                                                            }
                                                                        </span>
                                                                    </span>

                                                                    <span
                                                                        className="
                                                                            hidden
                                                                            rounded-full
                                                                            bg-[#f5f7f8]
                                                                            px-3
                                                                            py-1.5
                                                                            text-[10px]
                                                                            font-bold
                                                                            text-[#60758a]
                                                                            sm:block
                                                                        "
                                                                    >
                                                                        {
                                                                            item.duration
                                                                        }
                                                                    </span>

                                                                    {selected && (
                                                                        <span
                                                                            className="
                                                                                flex
                                                                                h-7
                                                                                w-7
                                                                                items-center
                                                                                justify-center
                                                                                rounded-full
                                                                                bg-[#e2b45d]
                                                                                text-[#082957]
                                                                            "
                                                                        >
                                                                            <Check className="h-4 w-4" />
                                                                        </span>
                                                                    )}
                                                                </button>
                                                            );
                                                        }
                                                    )}
                                                </div>

                                                <NextButton
                                                    disabled={
                                                        !appointmentType
                                                    }
                                                    onClick={
                                                        nextStep
                                                    }
                                                >
                                                    Choose Date
                                                </NextButton>
                                            </motion.div>
                                        )}

                                        {/* STEP 2 */}

                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{
                                                    opacity: 0,
                                                    x: 20,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                            >
                                                <SectionHeading
                                                    eyebrow="Step 2 of 3"
                                                    title="Choose a date & time"
                                                    description="Select an available appointment time."
                                                />

                                                <div
                                                    className="
                                                        mt-7
                                                        grid
                                                        gap-6
                                                        xl:grid-cols-[1fr_0.82fr]
                                                    "
                                                >
                                                    {/* CALENDAR */}

                                                    <div
                                                        className="
                                                            rounded-[22px]
                                                            border
                                                            border-[#082957]/10
                                                            p-4
                                                            sm:p-5
                                                        "
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setCurrentMonth(
                                                                        addMonths(
                                                                            currentMonth,
                                                                            -1
                                                                        )
                                                                    )
                                                                }
                                                                className="
                                                                    flex
                                                                    h-9
                                                                    w-9
                                                                    items-center
                                                                    justify-center
                                                                    rounded-full
                                                                    bg-[#f4f7f9]
                                                                    text-[#082957]
                                                                "
                                                            >
                                                                <ChevronLeft className="h-4 w-4" />
                                                            </button>

                                                            <p
                                                                className="
                                                                    font-serif
                                                                    text-[18px]
                                                                    font-semibold
                                                                    text-[#082957]
                                                                "
                                                            >
                                                                {currentMonth.toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    }
                                                                )}
                                                            </p>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setCurrentMonth(
                                                                        addMonths(
                                                                            currentMonth,
                                                                            1
                                                                        )
                                                                    )
                                                                }
                                                                className="
                                                                    flex
                                                                    h-9
                                                                    w-9
                                                                    items-center
                                                                    justify-center
                                                                    rounded-full
                                                                    bg-[#f4f7f9]
                                                                    text-[#082957]
                                                                "
                                                            >
                                                                <ChevronRight className="h-4 w-4" />
                                                            </button>
                                                        </div>

                                                        <div
                                                            className="
                                                                mt-5
                                                                grid
                                                                grid-cols-7
                                                                text-center
                                                            "
                                                        >
                                                            {[
                                                                "S",
                                                                "M",
                                                                "T",
                                                                "W",
                                                                "T",
                                                                "F",
                                                                "S",
                                                            ].map(
                                                                (
                                                                    day,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="
                                                                            py-2
                                                                            text-[9px]
                                                                            font-bold
                                                                            uppercase
                                                                            text-[#9aa8b5]
                                                                        "
                                                                    >
                                                                        {
                                                                            day
                                                                        }
                                                                    </span>
                                                                )
                                                            )}

                                                            {days.map(
                                                                (
                                                                    date,
                                                                    index
                                                                ) => {
                                                                    if (
                                                                        !date
                                                                    ) {
                                                                        return (
                                                                            <span
                                                                                key={`blank-${index}`}
                                                                            />
                                                                        );
                                                                    }

                                                                    const past =
                                                                        isPastDate(
                                                                            date
                                                                        );

                                                                    const selected =
                                                                        selectedDate &&
                                                                        sameDay(
                                                                            date,
                                                                            selectedDate
                                                                        );

                                                                    return (
                                                                        <button
                                                                            type="button"
                                                                            key={formatDateKey(
                                                                                date
                                                                            )}
                                                                            disabled={
                                                                                past
                                                                            }
                                                                            onClick={() => {
                                                                                setSelectedDate(
                                                                                    date
                                                                                );
                                                                                setSelectedTime(
                                                                                    ""
                                                                                );
                                                                            }}
                                                                            className={`
                                                                                mx-auto
                                                                                my-1
                                                                                flex
                                                                                h-9
                                                                                w-9
                                                                                items-center
                                                                                justify-center
                                                                                rounded-full
                                                                                text-[11px]
                                                                                font-semibold
                                                                                transition
                                                                                ${selected
                                                                                    ? "bg-[#075187] text-white shadow-md"
                                                                                    : past
                                                                                        ? "cursor-not-allowed text-slate-300"
                                                                                        : "text-[#294865] hover:bg-[#edf5f9] hover:text-[#075187]"
                                                                                }
                                                                            `}
                                                                        >
                                                                            {date.getDate()}
                                                                        </button>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* TIMES */}

                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock3 className="h-4 w-4 text-[#d79a27]" />

                                                            <p className="text-[12px] font-bold text-[#082957]">
                                                                Available
                                                                Times
                                                            </p>
                                                        </div>

                                                        {!selectedDate ? (
                                                            <div
                                                                className="
                                                                    mt-4
                                                                    flex
                                                                    min-h-[250px]
                                                                    items-center
                                                                    justify-center
                                                                    rounded-[22px]
                                                                    border
                                                                    border-dashed
                                                                    border-[#082957]/15
                                                                    bg-[#fafbfc]
                                                                    p-6
                                                                    text-center
                                                                "
                                                            >
                                                                <div>
                                                                    <CalendarDays className="mx-auto h-7 w-7 text-[#9aabba]" />

                                                                    <p className="mt-3 text-[11px] leading-5 text-[#718497]">
                                                                        Select
                                                                        a date
                                                                        to see
                                                                        available
                                                                        times.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <p className="mt-2 text-[11px] text-[#718497]">
                                                                    {selectedDate.toLocaleDateString(
                                                                        "en-US",
                                                                        {
                                                                            weekday:
                                                                                "long",
                                                                            month: "long",
                                                                            day: "numeric",
                                                                        }
                                                                    )}
                                                                </p>

                                                                <div
                                                                    className="
                                                                        mt-4
                                                                        grid
                                                                        grid-cols-2
                                                                        gap-2
                                                                    "
                                                                >
                                                                    {demoTimes.map(
                                                                        (
                                                                            time
                                                                        ) => (
                                                                            <button
                                                                                type="button"
                                                                                key={
                                                                                    time
                                                                                }
                                                                                onClick={() =>
                                                                                    setSelectedTime(
                                                                                        time
                                                                                    )
                                                                                }
                                                                                className={`
                                                                                    min-h-[44px]
                                                                                    rounded-xl
                                                                                    border
                                                                                    px-3
                                                                                    text-[11px]
                                                                                    font-bold
                                                                                    transition
                                                                                    ${selectedTime ===
                                                                                        time
                                                                                        ? "border-[#075187] bg-[#075187] text-white"
                                                                                        : "border-[#082957]/10 bg-white text-[#294865] hover:border-[#075187]/30 hover:bg-[#f0f7fb]"
                                                                                    }
                                                                                `}
                                                                            >
                                                                                {
                                                                                    time
                                                                                }
                                                                            </button>
                                                                        )
                                                                    )}
                                                                </div>

                                                                <p
                                                                    className="
                                                                        mt-4
                                                                        rounded-xl
                                                                        bg-[#fff8e9]
                                                                        px-3
                                                                        py-2
                                                                        text-[9px]
                                                                        leading-4
                                                                        text-[#80683f]
                                                                    "
                                                                >
                                                                    Demo
                                                                    availability.
                                                                    Connect
                                                                    this
                                                                    calendar
                                                                    to the
                                                                    practice
                                                                    schedule
                                                                    before
                                                                    launch.
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <NavigationButtons
                                                    back={() =>
                                                        setStep(
                                                            1
                                                        )
                                                    }
                                                    next={
                                                        nextStep
                                                    }
                                                    disabled={
                                                        !selectedDate ||
                                                        !selectedTime
                                                    }
                                                />
                                            </motion.div>
                                        )}

                                        {/* STEP 3 */}

                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{
                                                    opacity: 0,
                                                    x: 20,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                            >
                                                <SectionHeading
                                                    eyebrow="Step 3 of 3"
                                                    title="Almost there."
                                                    description="Enter your contact information to complete your appointment request."
                                                />

                                                {/* APPOINTMENT SUMMARY */}

                                                <div
                                                    className="
                                                        mt-6
                                                        grid
                                                        gap-3
                                                        rounded-[20px]
                                                        bg-[#f3f7f9]
                                                        p-4
                                                        sm:grid-cols-3
                                                    "
                                                >
                                                    <SummaryItem
                                                        icon={
                                                            Stethoscope
                                                        }
                                                        label="Appointment"
                                                        value={
                                                            appointmentTypes.find(
                                                                (
                                                                    item
                                                                ) =>
                                                                    item.id ===
                                                                    appointmentType
                                                            )
                                                                ?.name ||
                                                            ""
                                                        }
                                                    />

                                                    <SummaryItem
                                                        icon={
                                                            CalendarDays
                                                        }
                                                        label="Date"
                                                        value={
                                                            selectedDate?.toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                }
                                                            ) ||
                                                            ""
                                                        }
                                                    />

                                                    <SummaryItem
                                                        icon={
                                                            Clock3
                                                        }
                                                        label="Time"
                                                        value={
                                                            selectedTime
                                                        }
                                                    />
                                                </div>

                                                <form
                                                    onSubmit={
                                                        handleSubmit
                                                    }
                                                    className="mt-6"
                                                >
                                                    <div
                                                        className="
                                                            grid
                                                            gap-4
                                                            sm:grid-cols-2
                                                        "
                                                    >
                                                        <BookingField label="First Name">
                                                            <input
                                                                required
                                                                name="firstName"
                                                                autoComplete="given-name"
                                                                className={
                                                                    inputClass
                                                                }
                                                                placeholder="First name"
                                                            />
                                                        </BookingField>

                                                        <BookingField label="Last Name">
                                                            <input
                                                                required
                                                                name="lastName"
                                                                autoComplete="family-name"
                                                                className={
                                                                    inputClass
                                                                }
                                                                placeholder="Last name"
                                                            />
                                                        </BookingField>

                                                        <BookingField label="Email">
                                                            <input
                                                                required
                                                                type="email"
                                                                name="email"
                                                                autoComplete="email"
                                                                className={
                                                                    inputClass
                                                                }
                                                                placeholder="you@example.com"
                                                            />
                                                        </BookingField>

                                                        <BookingField label="Phone">
                                                            <input
                                                                required
                                                                type="tel"
                                                                name="phone"
                                                                autoComplete="tel"
                                                                className={
                                                                    inputClass
                                                                }
                                                                placeholder="(555) 555-5555"
                                                            />
                                                        </BookingField>
                                                    </div>

                                                    <label
                                                        className="
                                                            mt-5
                                                            flex
                                                            cursor-pointer
                                                            items-start
                                                            gap-3
                                                            rounded-2xl
                                                            bg-[#f7f9fa]
                                                            p-4
                                                        "
                                                    >
                                                        <input
                                                            required
                                                            type="checkbox"
                                                            className="
                                                                mt-1
                                                                h-4
                                                                w-4
                                                                accent-[#075187]
                                                            "
                                                        />

                                                        <span
                                                            className="
                                                                text-[10px]
                                                                leading-5
                                                                text-[#60758a]
                                                            "
                                                        >
                                                            I
                                                            consent
                                                            to being
                                                            contacted
                                                            by Solid
                                                            Rock
                                                            Behavioral
                                                            Health
                                                            regarding
                                                            this
                                                            appointment.
                                                            I
                                                            understand
                                                            that
                                                            submitting
                                                            this form
                                                            does not
                                                            establish
                                                            a
                                                            provider-patient
                                                            relationship.
                                                        </span>
                                                    </label>

                                                    <div
                                                        className="
                                                            mt-4
                                                            rounded-xl
                                                            border
                                                            border-[#d79a27]/20
                                                            bg-[#fffaf0]
                                                            p-3
                                                            text-[9px]
                                                            leading-4
                                                            text-[#71634d]
                                                        "
                                                    >
                                                        Please
                                                        don&apos;t
                                                        include
                                                        sensitive
                                                        medical or
                                                        psychiatric
                                                        information
                                                        in this
                                                        booking
                                                        form. This
                                                        form is not
                                                        for
                                                        emergencies.
                                                    </div>

                                                    <div
                                                        className="
                                                            mt-6
                                                            flex
                                                            flex-col-reverse
                                                            gap-3
                                                            sm:flex-row
                                                            sm:justify-between
                                                        "
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setStep(
                                                                    2
                                                                )
                                                            }
                                                            className="
                                                                inline-flex
                                                                min-h-[50px]
                                                                items-center
                                                                justify-center
                                                                gap-2
                                                                rounded-full
                                                                px-5
                                                                text-[12px]
                                                                font-bold
                                                                text-[#60758a]
                                                                transition
                                                                hover:bg-[#f5f7f8]
                                                            "
                                                        >
                                                            <ArrowLeft className="h-4 w-4" />
                                                            Back
                                                        </button>

                                                        <button
                                                            type="submit"
                                                            disabled={
                                                                loading
                                                            }
                                                            className="
                                                                group
                                                                inline-flex
                                                                min-h-[52px]
                                                                items-center
                                                                justify-center
                                                                gap-2
                                                                rounded-full
                                                                bg-[#075187]
                                                                px-7
                                                                text-[13px]
                                                                font-bold
                                                                text-white
                                                                shadow-[0_12px_28px_rgba(7,81,135,0.20)]
                                                                transition
                                                                hover:bg-[#063f6b]
                                                                disabled:opacity-60
                                                            "
                                                        >
                                                            {loading
                                                                ? "Booking..."
                                                                : "Book Appointment"}

                                                            {!loading && (
                                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div className="pr-12">
            <p
                className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#a96f13]
                "
            >
                {eyebrow}
            </p>

            <h3
                className="
                    mt-2
                    font-serif
                    text-[27px]
                    font-semibold
                    leading-tight
                    text-[#082957]
                    sm:text-[32px]
                "
            >
                {title}
            </h3>

            <p className="mt-2 max-w-[570px] text-[12px] leading-6 text-[#718497]">
                {description}
            </p>
        </div>
    );
}

function StepIndicator({
    number,
    title,
    active,
    complete,
}: {
    number: number;
    title: string;
    active: boolean;
    complete: boolean;
}) {
    return (
        <div className="flex items-center gap-3">
            <span
                className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    text-[11px]
                    font-bold
                    ${complete
                        ? "border-[#e2b45d] bg-[#e2b45d] text-[#082957]"
                        : active
                            ? "border-white bg-white text-[#082957]"
                            : "border-white/15 bg-white/[0.04] text-white/40"
                    }
                `}
            >
                {complete ? (
                    <Check className="h-4 w-4" />
                ) : (
                    number
                )}
            </span>

            <span
                className={`
                    text-[12px]
                    font-semibold
                    ${active || complete
                        ? "text-white"
                        : "text-white/35"
                    }
                `}
            >
                {title}
            </span>
        </div>
    );
}

function NextButton({
    disabled,
    onClick,
    children,
}: {
    disabled: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="mt-7 flex justify-end">
            <button
                type="button"
                disabled={disabled}
                onClick={onClick}
                className="
                    group
                    inline-flex
                    min-h-[52px]
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#075187]
                    px-7
                    text-[13px]
                    font-bold
                    text-white
                    transition
                    hover:bg-[#063f6b]
                    disabled:cursor-not-allowed
                    disabled:opacity-35
                "
            >
                {children}

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
        </div>
    );
}

function NavigationButtons({
    back,
    next,
    disabled,
}: {
    back: () => void;
    next: () => void;
    disabled: boolean;
}) {
    return (
        <div
            className="
                mt-7
                flex
                items-center
                justify-between
                gap-3
            "
        >
            <button
                type="button"
                onClick={back}
                className="
                    inline-flex
                    min-h-[50px]
                    items-center
                    gap-2
                    rounded-full
                    px-4
                    text-[12px]
                    font-bold
                    text-[#60758a]
                "
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={next}
                className="
                    group
                    inline-flex
                    min-h-[50px]
                    items-center
                    gap-2
                    rounded-full
                    bg-[#075187]
                    px-6
                    text-[12px]
                    font-bold
                    text-white
                    disabled:opacity-35
                "
            >
                Continue

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
        </div>
    );
}

function BookingField({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <label>
            <span className="mb-2 block text-[10px] font-bold text-[#294865]">
                {label}
                <span className="ml-1 text-[#b5791b]">
                    *
                </span>
            </span>

            {children}
        </label>
    );
}

function SummaryItem({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-2">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#d79a27]" />

            <div className="min-w-0">
                <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#9aa8b5]">
                    {label}
                </p>

                <p className="mt-1 text-[10px] font-semibold leading-4 text-[#294865]">
                    {value}
                </p>
            </div>
        </div>
    );
}

function RadioIcon() {
    return null;
}

/* =========================================================
   SUCCESS
========================================================= */

function BookingSuccess({
    appointmentType,
    date,
    time,
    onClose,
}: {
    appointmentType: string;
    date: Date | null;
    time: string;
    onClose: () => void;
}) {
    const appointment =
        appointmentTypes.find(
            (item) =>
                item.id === appointmentType
        );

    return (
        <div className="px-6 py-16 text-center sm:px-10 sm:py-20">
            <motion.div
                initial={{
                    scale: 0.7,
                    opacity: 0,
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-[#082957]
                    text-[#e2b45d]
                "
            >
                <Check className="h-7 w-7" />
            </motion.div>

            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a96f13]">
                Solid Rock Behavioral Health
            </p>

            <h2 className="mt-2 font-serif text-[36px] font-semibold text-[#082957]">
                Appointment Requested
            </h2>

            <p className="mx-auto mt-4 max-w-[500px] text-[13px] leading-6 text-[#60758a]">
                We received your appointment
                request. The practice will confirm
                the appointment details with you.
            </p>

            <div
                className="
                    mx-auto
                    mt-7
                    grid
                    max-w-[600px]
                    gap-3
                    rounded-[22px]
                    bg-[#f4f7f9]
                    p-5
                    sm:grid-cols-3
                "
            >
                <SummaryItem
                    icon={Stethoscope}
                    label="Appointment"
                    value={
                        appointment?.name || ""
                    }
                />

                <SummaryItem
                    icon={CalendarDays}
                    label="Date"
                    value={
                        date?.toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }
                        ) || ""
                    }
                />

                <SummaryItem
                    icon={Clock3}
                    label="Time"
                    value={time}
                />
            </div>

            <button
                type="button"
                onClick={onClose}
                className="
                    mt-8
                    rounded-full
                    bg-[#082957]
                    px-8
                    py-3.5
                    text-[13px]
                    font-bold
                    text-white
                    transition
                    hover:bg-[#075187]
                "
            >
                Done
            </button>
        </div>
    );
}

/* =========================================================
   CALENDAR HELPERS
========================================================= */

function startOfMonth(date: Date) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    );
}

function addMonths(
    date: Date,
    amount: number
) {
    return new Date(
        date.getFullYear(),
        date.getMonth() + amount,
        1
    );
}

function getCalendarDays(
    month: Date
): (Date | null)[] {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const firstDay = new Date(
        year,
        monthIndex,
        1
    );

    const lastDay = new Date(
        year,
        monthIndex + 1,
        0
    );

    const result: (Date | null)[] = [];

    for (
        let i = 0;
        i < firstDay.getDay();
        i++
    ) {
        result.push(null);
    }

    for (
        let day = 1;
        day <= lastDay.getDate();
        day++
    ) {
        result.push(
            new Date(
                year,
                monthIndex,
                day
            )
        );
    }

    return result;
}

function sameDay(
    first: Date,
    second: Date
) {
    return (
        first.getFullYear() ===
        second.getFullYear() &&
        first.getMonth() ===
        second.getMonth() &&
        first.getDate() ===
        second.getDate()
    );
}

function isPastDate(date: Date) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const comparison = new Date(date);

    comparison.setHours(0, 0, 0, 0);

    return comparison < today;
}

function formatDateKey(date: Date) {
    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

/* =========================================================
   INPUT
========================================================= */

const inputClass = `
    h-[52px]
    w-full
    rounded-xl
    border
    border-[#082957]/10
    bg-[#f8fafb]
    px-4
    text-[14px]
    text-[#082957]
    outline-none
    transition
    placeholder:text-[#9aa8b5]
    focus:border-[#075187]/40
    focus:bg-white
    focus:ring-4
    focus:ring-[#075187]/[0.06]
`;

/* =========================================================
   ARTWORK
========================================================= */

function BookingArtwork() {
    return (
        <svg
            viewBox="0 0 400 700"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -bottom-20
                -right-32
                h-[580px]
                w-[430px]
                opacity-[0.10]
            "
        >
            <motion.path
                d="M410 30C270 50 220 130 250 220C285 325 160 360 120 700"
                stroke="#E2B45D"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    duration: 1.8,
                }}
            />

            <motion.path
                d="M440 80C330 100 290 160 310 245C330 330 235 400 210 700"
                stroke="white"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    duration: 2.2,
                }}
            />

            <circle
                cx="250"
                cy="220"
                r="7"
                fill="#E2B45D"
            />

            <circle
                cx="250"
                cy="220"
                r="18"
                stroke="#E2B45D"
            />
        </svg>
    );
}