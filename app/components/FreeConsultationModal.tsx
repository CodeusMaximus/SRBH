"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    CalendarDays,
    Check,
    ChevronDown,
    Clock3,
    HeartHandshake,
    Phone,
    ShieldCheck,
    Sparkles,
    X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type FreeConsultationModalProps = {
    open: boolean;
    onClose: () => void;
};

const reasons = [
    "Psychiatric Evaluation",
    "Medication Management",
    "Anxiety or Depression",
    "ADHD",
    "Mood Concerns",
    "Sleep Concerns",
    "Trauma / PTSD",
    "Behavioral or Emotional Concerns",
    "Therapy / Treatment Options",
    "Insurance / Cost Questions",
    "Not Sure Yet",
    "Other",
];

const insuranceOptions = [
    "Blue Cross / Blue Shield",
    "Cigna / Evernorth",
    "Carelon Behavioral Health",
    "Excellus BlueCross BlueShield",
    "Humana",
    "Optum",
    "Oscar Health",
    "Oxford",
    "Other Insurance",
    "Out of Network / Self Pay",
    "I'm Not Sure",
];

const availabilityOptions = [
    "Morning",
    "Afternoon",
    "Evening",
    "Flexible",
];

export default function FreeConsultationModal({
    open,
    onClose,
}: FreeConsultationModalProps) {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setLoading(true);

        /*
         * CONNECT YOUR API HERE.
         *
         * Example:
         *
         * const formData = new FormData(event.currentTarget);
         *
         * await fetch("/api/free-consultation", {
         *     method: "POST",
         *     headers: {
         *         "Content-Type": "application/json",
         *     },
         *     body: JSON.stringify(
         *         Object.fromEntries(formData.entries())
         *     ),
         * });
         */

        await new Promise((resolve) =>
            setTimeout(resolve, 700)
        );

        setLoading(false);
        setSubmitted(true);
    };

    const closeModal = () => {
        setSubmitted(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* BACKDROP */}

                    <motion.button
                        type="button"
                        aria-label="Close consultation form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="
                            fixed
                            inset-0
                            z-[200]
                            cursor-default
                            bg-[#03162f]/70
                            backdrop-blur-[5px]
                        "
                    />

                    {/* MODAL */}

                    <div
                        className="
                            pointer-events-auto
                            fixed
                            inset-0
                            z-[210]
                            overflow-x-hidden
                            overflow-y-auto
                            overscroll-y-contain
                            touch-pan-y
                            p-3
                            sm:p-5
                        "
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
                        <div className="flex min-h-full w-full items-start justify-center sm:items-center">
                            <motion.div
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="consultation-title"
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
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="
                                pointer-events-auto
                                relative
                                w-full
                                max-w-[1000px]
                                overflow-hidden
                                rounded-[28px]
                                bg-white
                                shadow-[0_35px_100px_rgba(0,0,0,0.28)]
                            "
                            >
                                {/* CLOSE */}

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    aria-label="Close"
                                    className="
                                    absolute
                                    right-4
                                    top-4
                                    z-30
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#082957]/10
                                    bg-white/90
                                    text-[#082957]
                                    shadow-sm
                                    backdrop-blur
                                    transition

                                    hover:bg-[#082957]
                                    hover:text-white
                                "
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                {submitted ? (
                                    <SuccessState
                                        onClose={closeModal}
                                    />
                                ) : (
                                    <div
                                        className="
                                        grid

                                        lg:grid-cols-[0.72fr_1.28fr]
                                    "
                                    >
                                        {/* =========================
                                        LEFT PANEL
                                    ========================= */}

                                        <div
                                            className="
                                            relative
                                            overflow-hidden
                                            bg-[#082957]
                                            p-7
                                            text-white

                                            sm:p-9
                                            lg:p-10
                                        "
                                        >
                                            <ModalArtwork />

                                            <div className="relative z-10">
                                                <div
                                                    className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    rounded-full
                                                    border
                                                    border-white/10
                                                    bg-white/[0.07]
                                                    px-3
                                                    py-2
                                                "
                                                >
                                                    <Sparkles className="h-3.5 w-3.5 text-[#e2b45d]" />

                                                    <span
                                                        className="
                                                        text-[10px]
                                                        font-bold
                                                        uppercase
                                                        tracking-[0.18em]
                                                        text-[#e2b45d]
                                                    "
                                                    >
                                                        Get Started
                                                    </span>
                                                </div>

                                                <h2
                                                    id="consultation-title"
                                                    className="
                                                    mt-6
                                                    font-serif
                                                    text-[34px]
                                                    font-semibold
                                                    leading-[1.05]
                                                    tracking-[-0.03em]

                                                    sm:text-[40px]
                                                "
                                                >
                                                    Free 15-Minute
                                                    <span className="block text-[#e2b45d]">
                                                        Consultation
                                                    </span>
                                                </h2>

                                                <p
                                                    className="
                                                    mt-5
                                                    text-[14px]
                                                    leading-7
                                                    text-white/65
                                                "
                                                >
                                                    Tell us how we can
                                                    reach you and what
                                                    you&apos;re looking
                                                    for. We&apos;ll help
                                                    determine an
                                                    appropriate next
                                                    step.
                                                </p>

                                                {/* FEATURES */}

                                                <div className="mt-8 space-y-5">
                                                    <Feature
                                                        icon={
                                                            Clock3
                                                        }
                                                        title="15 Minutes"
                                                        text="A brief introductory consultation."
                                                    />

                                                    <Feature
                                                        icon={
                                                            HeartHandshake
                                                        }
                                                        title="No Obligation"
                                                        text="Ask questions before deciding on care."
                                                    />

                                                    <Feature
                                                        icon={
                                                            ShieldCheck
                                                        }
                                                        title="Private & Respectful"
                                                        text="Only provide basic information needed to contact you."
                                                    />
                                                </div>

                                                {/* DIRECT PHONE */}

                                                <div
                                                    className="
                                                    mt-9
                                                    border-t
                                                    border-white/10
                                                    pt-7
                                                "
                                                >
                                                    <p
                                                        className="
                                                        text-[10px]
                                                        font-bold
                                                        uppercase
                                                        tracking-[0.18em]
                                                        text-white/40
                                                    "
                                                    >
                                                        Prefer to call?
                                                    </p>

                                                    <a
                                                        href="tel:+19294472430"
                                                        className="
                                                        mt-3
                                                        flex
                                                        items-center
                                                        gap-3
                                                        font-serif
                                                        text-[21px]
                                                        font-semibold
                                                        text-white
                                                        transition

                                                        hover:text-[#e2b45d]
                                                    "
                                                    >
                                                        <span
                                                            className="
                                                            flex
                                                            h-10
                                                            w-10
                                                            items-center
                                                            justify-center
                                                            rounded-full
                                                            bg-[#e2b45d]
                                                            text-[#082957]
                                                        "
                                                        >
                                                            <Phone className="h-4 w-4" />
                                                        </span>

                                                        (929) 447-2430
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* =========================
                                        FORM
                                    ========================= */}

                                        <div
                                            className="
                                            p-6
                                            sm:p-8
                                            lg:max-h-[88vh]
                                            lg:overflow-y-auto
                                            lg:p-10
                                        "
                                        >
                                            <div className="pr-12">
                                                <p
                                                    className="
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.2em]
                                                    text-[#a96f13]
                                                "
                                                >
                                                    Consultation Request
                                                </p>

                                                <h3
                                                    className="
                                                    mt-2
                                                    font-serif
                                                    text-[28px]
                                                    font-semibold
                                                    text-[#082957]
                                                "
                                                >
                                                    How can we help?
                                                </h3>

                                                <p
                                                    className="
                                                    mt-2
                                                    text-[12px]
                                                    leading-5
                                                    text-[#718497]
                                                "
                                                >
                                                    Please do not include
                                                    sensitive medical or
                                                    psychiatric information
                                                    in this form.
                                                </p>
                                            </div>

                                            <form
                                                onSubmit={handleSubmit}
                                                className="mt-7"
                                            >
                                                {/* NAME */}

                                                <div
                                                    className="
                                                    grid
                                                    gap-4

                                                    sm:grid-cols-2
                                                "
                                                >
                                                    <Field
                                                        label="First Name"
                                                        required
                                                    >
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            autoComplete="given-name"
                                                            required
                                                            className={inputClass}
                                                            placeholder="First name"
                                                        />
                                                    </Field>

                                                    <Field
                                                        label="Last Name"
                                                        required
                                                    >
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            autoComplete="family-name"
                                                            required
                                                            className={inputClass}
                                                            placeholder="Last name"
                                                        />
                                                    </Field>
                                                </div>

                                                {/* EMAIL PHONE */}

                                                <div
                                                    className="
                                                    mt-4
                                                    grid
                                                    gap-4

                                                    sm:grid-cols-2
                                                "
                                                >
                                                    <Field
                                                        label="Email"
                                                        required
                                                    >
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            autoComplete="email"
                                                            required
                                                            className={inputClass}
                                                            placeholder="you@example.com"
                                                        />
                                                    </Field>

                                                    <Field
                                                        label="Phone"
                                                        required
                                                    >
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            autoComplete="tel"
                                                            required
                                                            className={inputClass}
                                                            placeholder="(555) 555-5555"
                                                        />
                                                    </Field>
                                                </div>

                                                {/* CONTACT METHOD */}

                                                <Field
                                                    label="Preferred Contact Method"
                                                    required
                                                    className="mt-4"
                                                >
                                                    <div
                                                        className="
                                                        grid
                                                        grid-cols-2
                                                        gap-3
                                                    "
                                                    >
                                                        <RadioCard
                                                            name="contactMethod"
                                                            value="phone"
                                                            label="Phone"
                                                            defaultChecked
                                                        />

                                                        <RadioCard
                                                            name="contactMethod"
                                                            value="email"
                                                            label="Email"
                                                        />
                                                    </div>
                                                </Field>

                                                {/* REASON */}

                                                <Field
                                                    label="What would you like to discuss?"
                                                    required
                                                    className="mt-4"
                                                >
                                                    <Select
                                                        name="reason"
                                                        required
                                                        defaultValue=""
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Select a reason
                                                        </option>

                                                        {reasons.map(
                                                            (
                                                                reason
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        reason
                                                                    }
                                                                    value={
                                                                        reason
                                                                    }
                                                                >
                                                                    {
                                                                        reason
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </Select>
                                                </Field>

                                                {/* INSURANCE */}

                                                <Field
                                                    label="Insurance"
                                                    className="mt-4"
                                                >
                                                    <Select
                                                        name="insurance"
                                                        defaultValue=""
                                                    >
                                                        <option value="">
                                                            Select insurance
                                                            (optional)
                                                        </option>

                                                        {insuranceOptions.map(
                                                            (
                                                                insurance
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        insurance
                                                                    }
                                                                    value={
                                                                        insurance
                                                                    }
                                                                >
                                                                    {
                                                                        insurance
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </Select>
                                                </Field>

                                                {/* AVAILABILITY */}

                                                <Field
                                                    label="Best Time to Reach You"
                                                    className="mt-4"
                                                >
                                                    <div
                                                        className="
                                                        grid
                                                        grid-cols-2
                                                        gap-2

                                                        sm:grid-cols-4
                                                    "
                                                    >
                                                        {availabilityOptions.map(
                                                            (
                                                                availability
                                                            ) => (
                                                                <RadioCard
                                                                    key={
                                                                        availability
                                                                    }
                                                                    name="availability"
                                                                    value={availability.toLowerCase()}
                                                                    label={
                                                                        availability
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </Field>

                                                {/* CONSENT */}

                                                <label
                                                    className="
                                                    mt-6
                                                    flex
                                                    cursor-pointer
                                                    items-start
                                                    gap-3
                                                    rounded-2xl
                                                    bg-[#f6f8fa]
                                                    p-4
                                                "
                                                >
                                                    <input
                                                        type="checkbox"
                                                        name="contactConsent"
                                                        required
                                                        className="
                                                        mt-1
                                                        h-4
                                                        w-4
                                                        accent-[#075187]
                                                    "
                                                    />

                                                    <span
                                                        className="
                                                        text-[11px]
                                                        leading-5
                                                        text-[#60758a]
                                                    "
                                                    >
                                                        I consent to being
                                                        contacted by Solid
                                                        Rock Behavioral
                                                        Health regarding
                                                        this consultation
                                                        request. I
                                                        understand that
                                                        submitting this
                                                        form does not
                                                        establish a
                                                        provider-patient
                                                        relationship.
                                                    </span>
                                                </label>

                                                {/* EMERGENCY */}

                                                <div
                                                    className="
                                                    mt-4
                                                    rounded-2xl
                                                    border
                                                    border-[#d79a27]/20
                                                    bg-[#fffaf0]
                                                    px-4
                                                    py-3
                                                "
                                                >
                                                    <p
                                                        className="
                                                        text-[10px]
                                                        leading-5
                                                        text-[#6c604d]
                                                    "
                                                    >
                                                        <strong className="text-[#082957]">
                                                            This form is not
                                                            for emergencies.
                                                        </strong>{" "}
                                                        If you are
                                                        experiencing an
                                                        immediate emergency,
                                                        call 911 or go to
                                                        the nearest emergency
                                                        department. In the
                                                        U.S., you can also
                                                        call or text 988 for
                                                        crisis support.
                                                    </p>
                                                </div>

                                                {/* SUBMIT */}

                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="
                                                    group
                                                    mt-6
                                                    flex
                                                    min-h-[56px]
                                                    w-full
                                                    items-center
                                                    justify-center
                                                    gap-3
                                                    rounded-full
                                                    bg-[#075187]
                                                    px-6
                                                    text-[14px]
                                                    font-bold
                                                    text-white
                                                    shadow-[0_12px_28px_rgba(7,81,135,0.22)]
                                                    transition-all
                                                    duration-300

                                                    hover:-translate-y-0.5
                                                    hover:bg-[#063f6b]

                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-60
                                                "
                                                >
                                                    {loading
                                                        ? "Sending Request..."
                                                        : "Request Free Consultation"}

                                                    {!loading && (
                                                        <ArrowRight
                                                            className="
                                                            h-4
                                                            w-4
                                                            transition-transform
                                                            group-hover:translate-x-1
                                                        "
                                                        />
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

/* =========================================================
   SUCCESS
========================================================= */

function SuccessState({
    onClose,
}: {
    onClose: () => void;
}) {
    return (
        <div
            className="
                relative
                overflow-hidden
                px-6
                py-16
                text-center

                sm:px-10
                sm:py-20
            "
        >
            <div
                className="
                    absolute
                    left-1/2
                    top-0
                    h-[300px]
                    w-[300px]
                    -translate-x-1/2
                    rounded-full
                    bg-[#075187]/[0.06]
                    blur-[80px]
                "
            />

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.7,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 15,
                }}
                className="
                    relative
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

            <h2
                className="
                    relative
                    mt-7
                    font-serif
                    text-[35px]
                    font-semibold
                    text-[#082957]

                    sm:text-[42px]
                "
            >
                Request Received.
            </h2>

            <p
                className="
                    relative
                    mx-auto
                    mt-4
                    max-w-[520px]
                    text-[14px]
                    leading-7
                    text-[#60758a]
                "
            >
                Thank you for reaching out to Solid Rock
                Behavioral Health. Your consultation request has
                been received.
            </p>

            <div
                className="
                    relative
                    mx-auto
                    mt-7
                    max-w-[450px]
                    rounded-[20px]
                    bg-[#f5f8fa]
                    p-5
                "
            >
                <p
                    className="
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-[#a96f13]
                    "
                >
                    Prefer to speak with us?
                </p>

                <a
                    href="tel:+19294472430"
                    className="
                        mt-2
                        inline-flex
                        items-center
                        gap-2
                        font-serif
                        text-[21px]
                        font-semibold
                        text-[#075187]
                    "
                >
                    <Phone className="h-4 w-4" />
                    (929) 447-2430
                </a>
            </div>

            <button
                type="button"
                onClick={onClose}
                className="
                    relative
                    mt-8
                    rounded-full
                    bg-[#082957]
                    px-7
                    py-3.5
                    text-[13px]
                    font-bold
                    text-white
                    transition

                    hover:bg-[#075187]
                "
            >
                Close
            </button>
        </div>
    );
}

/* =========================================================
   FORM COMPONENTS
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

function Field({
    label,
    required,
    children,
    className = "",
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={className}>
            <label
                className="
                    mb-2
                    block
                    text-[11px]
                    font-bold
                    text-[#294865]
                "
            >
                {label}

                {required && (
                    <span className="ml-1 text-[#b5791b]">*</span>
                )}
            </label>

            {children}
        </div>
    );
}

function Select({
    children,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <div className="relative">
            <select
                {...props}
                className={`
                    ${inputClass}
                    appearance-none
                    pr-11
                `}
            >
                {children}
            </select>

            <ChevronDown
                className="
                    pointer-events-none
                    absolute
                    right-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-[#718497]
                "
            />
        </div>
    );
}

function RadioCard({
    name,
    value,
    label,
    defaultChecked = false,
}: {
    name: string;
    value: string;
    label: string;
    defaultChecked?: boolean;
}) {
    return (
        <label className="relative cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                defaultChecked={defaultChecked}
                className="peer sr-only"
            />

            <span
                className="
                    flex
                    min-h-[46px]
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#082957]/10
                    bg-[#f8fafb]
                    px-3
                    text-center
                    text-[11px]
                    font-semibold
                    text-[#60758a]
                    transition

                    peer-checked:border-[#075187]
                    peer-checked:bg-[#edf5f9]
                    peer-checked:text-[#075187]
                "
            >
                {label}
            </span>
        </label>
    );
}

/* =========================================================
   LEFT FEATURES
========================================================= */

function Feature({
    icon: Icon,
    title,
    text,
}: {
    icon: React.ElementType;
    title: string;
    text: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <div
                className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/[0.07]
                    text-[#e2b45d]
                "
            >
                <Icon className="h-4 w-4" />
            </div>

            <div>
                <p className="text-[13px] font-semibold text-white">
                    {title}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-white/45">
                    {text}
                </p>
            </div>
        </div>
    );
}

/* =========================================================
   SVG
========================================================= */

function ModalArtwork() {
    return (
        <svg
            viewBox="0 0 500 700"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -bottom-[100px]
                -right-[160px]
                h-[620px]
                w-[500px]
                opacity-[0.10]
            "
        >
            <motion.path
                d="M510 40C330 -20 250 90 290 200C330 315 190 340 145 720"
                stroke="#E2B45D"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    duration: 1.8,
                    delay: 0.2,
                }}
            />

            <motion.path
                d="M540 100C390 50 325 130 355 225C385 320 275 375 245 720"
                stroke="white"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    duration: 2.1,
                    delay: 0.35,
                }}
            />

            <circle
                cx="290"
                cy="200"
                r="7"
                fill="#E2B45D"
            />

            <circle
                cx="290"
                cy="200"
                r="18"
                stroke="#E2B45D"
            />
        </svg>
    );
}