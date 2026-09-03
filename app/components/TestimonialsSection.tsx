"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    Quote,
    ShieldCheck,
    Sparkles,
    Star,
} from "lucide-react";

/* =========================================================
   TESTIMONIAL DATA

   IMPORTANT:
   These are DEVELOPMENT PLACEHOLDERS ONLY.
   Replace with approved, authentic testimonials before launch.
========================================================= */

const testimonials = [
    {
        quote:
            "Sample testimonial — replace this text with an approved patient testimonial before publishing the website.",
        name: "Patient Testimonial",
        detail: "Verified feedback",
    },
    {
        quote:
            "Sample testimonial — this space can highlight a patient's experience with compassionate, attentive, and personalized care.",
        name: "Patient Testimonial",
        detail: "Verified feedback",
    },
    {
        quote:
            "Sample testimonial — approved feedback can be added here once testimonials are available for publication.",
        name: "Patient Testimonial",
        detail: "Verified feedback",
    },
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [direction, setDirection] =
        useState(1);

    const current =
        testimonials[currentIndex];

    /* =====================================================
       NEXT
    ===================================================== */

    const nextTestimonial = () => {
        setDirection(1);

        setCurrentIndex((previous) =>
            previous === testimonials.length - 1
                ? 0
                : previous + 1
        );
    };

    /* =====================================================
       PREVIOUS
    ===================================================== */

    const previousTestimonial = () => {
        setDirection(-1);

        setCurrentIndex((previous) =>
            previous === 0
                ? testimonials.length - 1
                : previous - 1
        );
    };

    /* =====================================================
       GO TO TESTIMONIAL
    ===================================================== */

    const goToTestimonial = (
        index: number
    ) => {
        if (index === currentIndex) {
            return;
        }

        setDirection(
            index > currentIndex ? 1 : -1
        );

        setCurrentIndex(index);
    };

    /* =====================================================
       AUTO ROTATION
    ===================================================== */

    useEffect(() => {
        const timer = window.setInterval(
            () => {
                setDirection(1);

                setCurrentIndex(
                    (previous) =>
                        previous ===
                            testimonials.length - 1
                            ? 0
                            : previous + 1
                );
            },
            7000
        );

        return () => {
            window.clearInterval(timer);
        };
    }, []);

    return (
        <section
            className="
                relative
                overflow-hidden
                bg-white
                py-20

                sm:py-24

                lg:py-28
            "
        >
            {/* =============================================
                BACKGROUND DECORATION
            ============================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-[200px]
                    top-[10%]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#075187]/[0.05]
                    blur-[100px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-[180px]
                    bottom-[-100px]
                    h-[450px]
                    w-[450px]
                    rounded-full
                    bg-[#d7a447]/[0.08]
                    blur-[100px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-[1380px]
                    px-5

                    sm:px-8

                    lg:px-12
                "
            >
                {/* =========================================
                    SECTION HEADER
                ========================================= */}

                <div
                    className="
                        mx-auto
                        max-w-[760px]
                        text-center
                    "
                >
                    <div
                        className="
                            mb-5
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-[#d7a447]/30
                            bg-[#fbf8f2]
                            px-4
                            py-2
                        "
                    >
                        <Heart
                            className="
                                h-4
                                w-4
                                text-[#b67a1b]
                            "
                        />

                        <span
                            className="
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[0.22em]
                                text-[#9a681c]
                            "
                        >
                            Patient Experiences
                        </span>
                    </div>

                    <h2
                        className="
                            font-serif
                            text-[39px]
                            font-semibold
                            leading-[1.05]
                            tracking-[-0.035em]
                            text-[#082957]

                            sm:text-[50px]

                            lg:text-[60px]
                        "
                    >
                        Care That Makes a{" "}
                        <span className="text-[#b67a1b]">
                            Difference.
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-[650px]
                            text-[16px]
                            leading-7
                            text-[#64788c]

                            sm:text-[18px]
                        "
                    >
                        Every journey is different.
                        Our goal is to provide thoughtful,
                        compassionate care that helps every
                        individual feel heard and supported.
                    </p>
                </div>

                {/* =========================================
                    TESTIMONIAL EXPERIENCE
                ========================================= */}

                <div
                    className="
                        relative
                        mx-auto
                        mt-12
                        max-w-[1080px]

                        sm:mt-14

                        lg:mt-16
                    "
                >
                    {/* GOLD ACCENT */}

                    <div
                        className="
                            absolute
                            left-1/2
                            top-0
                            z-20
                            h-[4px]
                            w-[90px]
                            -translate-x-1/2
                            rounded-full
                            bg-[#d7a447]
                        "
                    />

                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-[30px]
                            border
                            border-[#082957]/[0.08]
                            bg-[#f8fafb]
                            shadow-[0_30px_80px_rgba(8,41,87,0.10)]

                            sm:rounded-[36px]
                        "
                    >
                        {/* DECORATIVE QUOTE */}

                        <Quote
                            strokeWidth={1}
                            className="
                                pointer-events-none
                                absolute
                                -right-4
                                -top-7
                                h-[150px]
                                w-[150px]
                                rotate-180
                                text-[#d7a447]/10

                                sm:h-[210px]
                                sm:w-[210px]

                                lg:right-8
                            "
                        />

                        <div
                            className="
                                relative
                                min-h-[460px]
                                px-6
                                py-12

                                sm:min-h-[430px]
                                sm:px-12
                                sm:py-14

                                lg:flex
                                lg:min-h-[440px]
                                lg:items-center
                                lg:px-20
                            "
                        >
                            <AnimatePresence
                                mode="wait"
                                custom={direction}
                            >
                                <motion.div
                                    key={
                                        currentIndex
                                    }
                                    custom={
                                        direction
                                    }
                                    initial={{
                                        opacity: 0,
                                        x:
                                            direction >
                                                0
                                                ? 35
                                                : -35,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x:
                                            direction >
                                                0
                                                ? -35
                                                : 35,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                    }}
                                    className="
                                        mx-auto
                                        w-full
                                        max-w-[800px]
                                        text-center
                                    "
                                >
                                    {/* SMALL QUOTE ICON */}

                                    <div
                                        className="
                                            mx-auto
                                            flex
                                            h-14
                                            w-14
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#082957]
                                            text-[#e1b75f]
                                            shadow-[0_12px_28px_rgba(8,41,87,0.18)]
                                        "
                                    >
                                        <Quote
                                            className="
                                                h-6
                                                w-6
                                            "
                                            fill="currentColor"
                                        />
                                    </div>

                                    {/* STARS */}

                                    <div
                                        className="
                                            mt-6
                                            flex
                                            justify-center
                                            gap-1
                                        "
                                        aria-label="5 star testimonial"
                                    >
                                        {Array.from({
                                            length: 5,
                                        }).map(
                                            (
                                                _,
                                                index
                                            ) => (
                                                <Star
                                                    key={
                                                        index
                                                    }
                                                    className="
                                                        h-4
                                                        w-4
                                                        text-[#d7a447]
                                                    "
                                                    fill="currentColor"
                                                />
                                            )
                                        )}
                                    </div>

                                    {/* QUOTE */}

                                    <blockquote
                                        className="
                                            mx-auto
                                            mt-6
                                            max-w-[760px]
                                            font-serif
                                            text-[24px]
                                            font-medium
                                            leading-[1.45]
                                            tracking-[-0.02em]
                                            text-[#082957]

                                            sm:text-[29px]

                                            lg:text-[32px]
                                            lg:leading-[1.4]
                                        "
                                    >
                                        “
                                        {
                                            current.quote
                                        }
                                        ”
                                    </blockquote>

                                    {/* DIVIDER */}

                                    <div
                                        className="
                                            mx-auto
                                            mt-7
                                            h-px
                                            w-12
                                            bg-[#d7a447]
                                        "
                                    />

                                    {/* NAME */}

                                    <div className="mt-5">
                                        <p
                                            className="
                                                text-[15px]
                                                font-bold
                                                text-[#082957]
                                            "
                                        >
                                            {
                                                current.name
                                            }
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-[12px]
                                                font-medium
                                                uppercase
                                                tracking-[0.12em]
                                                text-[#7a8c9e]
                                            "
                                        >
                                            {
                                                current.detail
                                            }
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* =====================================
                        DESKTOP ARROWS
                    ===================================== */}

                    <button
                        type="button"
                        onClick={
                            previousTestimonial
                        }
                        aria-label="Previous testimonial"
                        className="
                            absolute
                            left-[-22px]
                            top-1/2
                            z-30
                            hidden
                            h-12
                            w-12
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#082957]/10
                            bg-white
                            text-[#082957]
                            shadow-[0_10px_30px_rgba(8,41,87,0.12)]
                            transition-all

                            hover:-translate-x-1
                            hover:bg-[#082957]
                            hover:text-white

                            lg:flex
                        "
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                        type="button"
                        onClick={
                            nextTestimonial
                        }
                        aria-label="Next testimonial"
                        className="
                            absolute
                            right-[-22px]
                            top-1/2
                            z-30
                            hidden
                            h-12
                            w-12
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#082957]/10
                            bg-white
                            text-[#082957]
                            shadow-[0_10px_30px_rgba(8,41,87,0.12)]
                            transition-all

                            hover:translate-x-1
                            hover:bg-[#082957]
                            hover:text-white

                            lg:flex
                        "
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* =====================================
                        DOTS
                    ===================================== */}

                    <div
                        className="
                            mt-7
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                    >
                        {testimonials.map(
                            (_, index) => (
                                <button
                                    key={
                                        index
                                    }
                                    type="button"
                                    onClick={() =>
                                        goToTestimonial(
                                            index
                                        )
                                    }
                                    aria-label={`View testimonial ${index +
                                        1
                                        }`}
                                    className={`
                                        h-2.5
                                        rounded-full
                                        transition-all
                                        duration-300

                                        ${currentIndex ===
                                            index
                                            ? "w-8 bg-[#075187]"
                                            : "w-2.5 bg-[#082957]/20 hover:bg-[#082957]/40"
                                        }
                                    `}
                                />
                            )
                        )}
                    </div>
                </div>

                {/* =========================================
                    TRUST MESSAGE
                ========================================= */}

                <div
                    className="
                        mx-auto
                        mt-12
                        flex
                        max-w-[820px]
                        flex-col
                        items-center
                        justify-center
                        gap-5
                        rounded-[24px]
                        border
                        border-[#082957]/[0.07]
                        bg-[#fbfaf7]
                        px-6
                        py-6
                        text-center

                        sm:flex-row
                        sm:text-left
                    "
                >
                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-[#082957]
                            text-[#e1b75f]
                        "
                    >
                        <ShieldCheck className="h-6 w-6" />
                    </div>

                    <div className="flex-1">
                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2

                                sm:justify-start
                            "
                        >
                            <Sparkles
                                className="
                                    h-4
                                    w-4
                                    text-[#b67a1b]
                                "
                            />

                            <p
                                className="
                                    text-[14px]
                                    font-bold
                                    text-[#082957]
                                "
                            >
                                Your experience matters.
                            </p>
                        </div>

                        <p
                            className="
                                mt-1
                                text-[12px]
                                leading-5
                                text-[#6d8092]
                            "
                        >
                            We are committed to
                            compassionate, respectful care
                            and protecting the privacy of
                            every individual we serve.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}