"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";
import Link from "next/link";
import {
    AnimatePresence,
    motion,
} from "framer-motion";
import {
    ArrowRight,
    Brain,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    HeartHandshake,
    Laptop,
    Play,
    ShieldCheck,
} from "lucide-react";
import BookAppointmentButton from "./BookAppointmentButton";
/* =========================================================
   HERO SLIDES
========================================================= */

const slides = [
    {
        type: "image" as const,
        src: "/images/hero-rocks.png",
        position: "center",
    },
    {
        type: "image" as const,
        src: "/images/hero-rocks2.png",
        position: "62% center",
    },
    {
        type: "video" as const,
        src: "/videos/hero-video.mp4",
        position: "76% center",
    },
    {
        type: "provider" as const,
        src: "/images/provider-hero.jpg",
        position: "center",
    },
];

/* =========================================================
   HERO FEATURES
========================================================= */

const features = [
    {
        label: "Personalized\nCare",
        icon: HeartHandshake,
    },
    {
        label: "Evidence-Based\nTreatment",
        icon: ShieldCheck,
    },
    {
        label: "In-Person &\nTelehealth",
        icon: Laptop,
    },
    {
        label: "Medication\nManagement",
        icon: Brain,
    },
];

export default function HeroSection() {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [currentSlide, setCurrentSlide] =
        useState(0);

    const [direction, setDirection] =
        useState(1);

    const current = slides[currentSlide];

    const isProviderSlide =
        current.type === "provider";

    /* =====================================================
       NEXT
    ===================================================== */

    const nextSlide = useCallback(() => {
        setDirection(1);

        setCurrentSlide((previous) =>
            previous === slides.length - 1
                ? 0
                : previous + 1
        );
    }, []);

    /* =====================================================
       PREVIOUS
    ===================================================== */

    const previousSlide = useCallback(() => {
        setDirection(-1);

        setCurrentSlide((previous) =>
            previous === 0
                ? slides.length - 1
                : previous - 1
        );
    }, []);

    /* =====================================================
       GO TO SLIDE
    ===================================================== */

    const goToSlide = (index: number) => {
        if (index === currentSlide) {
            return;
        }

        setDirection(
            index > currentSlide ? 1 : -1
        );

        setCurrentSlide(index);
    };

    /* =====================================================
       AUTO ADVANCE

       Images:   7 seconds
       Provider: 11 seconds
       Video:    advances when video ends
    ===================================================== */

    useEffect(() => {
        if (current.type === "video") {
            return;
        }

        const delay =
            current.type === "provider"
                ? 11000
                : 7000;

        const timer = window.setTimeout(() => {
            nextSlide();
        }, delay);

        return () => {
            window.clearTimeout(timer);
        };
    }, [
        currentSlide,
        current.type,
        nextSlide,
    ]);

    /* =====================================================
       MOBILE TAP TO ADVANCE

       Buttons and links still work normally.
    ===================================================== */

    const handleHeroClick = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        if (window.innerWidth >= 1024) {
            return;
        }

        const target =
            event.target as HTMLElement;

        if (target.closest("a, button")) {
            return;
        }

        nextSlide();
    };

    return (
        <section
            onClick={handleHeroClick}
            className="
                relative
                flex
                min-h-[860px]
                overflow-hidden
                bg-[#e8eef2]
                pt-[150px]

                sm:min-h-[900px]

                lg:min-h-screen
                lg:pt-[170px]
            "
        >
            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div className="absolute inset-0">
                <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="sync"
                >
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        initial={{
                            opacity: 0,
                            scale: 1.025,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.01,
                        }}
                        transition={{
                            opacity: {
                                duration: 1,
                                ease: "easeInOut",
                            },
                            scale: {
                                duration:
                                    current.type ===
                                        "image"
                                        ? 7
                                        : 1,
                                ease: "linear",
                            },
                        }}
                        className="
                            absolute
                            inset-0
                            overflow-hidden
                        "
                    >
                        {current.type ===
                            "video" ? (
                            <video
                                key={current.src}
                                autoPlay
                                muted
                                playsInline
                                preload="auto"
                                onEnded={nextSlide}
                                className="
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    object-cover
                                "
                                style={{
                                    objectPosition:
                                        current.position,
                                }}
                            >
                                <source
                                    src={current.src}
                                    type="video/mp4"
                                />

                                Your browser does not
                                support video playback.
                            </video>
                        ) : isProviderSlide ? (
                            /*
                             * PROVIDER BACKGROUND
                             *
                             * We intentionally use contain on
                             * desktop instead of cover so Jean
                             * doesn't become enormous.
                             */
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-[#f3f0eb]
                                "
                            >
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-no-repeat

                                        bg-[length:auto_58%]
                                        bg-[position:72%_20%]

                                        sm:bg-[length:auto_68%]
                                        sm:bg-[position:78%_22%]

                                        lg:bg-contain
                                        lg:bg-right
                                    "
                                    style={{
                                        backgroundImage: `url("${current.src}")`,
                                    }}
                                />
                            </div>
                        ) : (
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-cover
                                    bg-no-repeat
                                "
                                style={{
                                    backgroundImage: `url("${current.src}")`,
                                    backgroundPosition:
                                        current.position,
                                }}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* =================================================
                NORMAL SLIDE GRADIENTS
                Slides 1–3
            ================================================= */}

            {!isProviderSlide && (
                <>
                    {/* MOBILE */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-[1]
                            lg:hidden
                        "
                        style={{
                            background: `
                                linear-gradient(
                                    180deg,
                                    rgba(237,242,244,0.98) 0%,
                                    rgba(237,242,244,0.94) 30%,
                                    rgba(237,242,244,0.80) 58%,
                                    rgba(237,242,244,0.35) 82%,
                                    rgba(237,242,244,0.10) 100%
                                )
                            `,
                        }}
                    />

                    {/* DESKTOP */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-[1]
                            hidden
                            lg:block
                        "
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(237,242,244,1) 0%, rgba(237,242,244,0.95) 42%, rgba(237,242,244,0) 72%)",
                        }}
                    />
                </>
            )}

            {/* =================================================
                PROVIDER GRADIENT
            ================================================= */}

            {isProviderSlide && (
                <>
                    {/* MOBILE */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-[1]
                            lg:hidden
                        "
                        style={{
                            background: `
                                linear-gradient(
                                    180deg,
                                    rgba(243,240,235,0.02) 0%,
                                    rgba(243,240,235,0.05) 35%,
                                    rgba(243,240,235,0.82) 55%,
                                    rgba(243,240,235,0.98) 68%,
                                    rgba(243,240,235,1) 100%
                                )
                            `,
                        }}
                    />

                    {/* DESKTOP */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-[1]
                            hidden
                            lg:block
                        "
                        style={{
                            background: `
                                linear-gradient(
                                    90deg,
                                    rgba(243,240,235,1) 0%,
                                    rgba(243,240,235,0.99) 31%,
                                    rgba(243,240,235,0.94) 40%,
                                    rgba(243,240,235,0.58) 50%,
                                    rgba(243,240,235,0.08) 62%,
                                    rgba(243,240,235,0) 72%
                                )
                            `,
                        }}
                    />
                </>
            )}

            {/* =================================================
                STANDARD HERO CONTENT
                SLIDES 1–3 ONLY
            ================================================= */}

            {!isProviderSlide && (
                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        flex
                        w-full
                        max-w-[1440px]
                        items-center
                        px-6
                        pb-24

                        sm:px-8

                        lg:px-12

                        xl:px-16
                    "
                >
                    <AnimatePresence
                        mode="wait"
                        initial={false}
                    >
                        <motion.div
                            key={`standard-${currentSlide}`}
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                            }}
                            transition={{
                                duration: 0.55,
                            }}
                            className="
                                w-full
                                max-w-[780px]
                            "
                        >
                            {/* EYEBROW */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 15,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.1,
                                }}
                                className="
                                    mb-7
                                    flex
                                    items-center
                                    gap-5
                                "
                            >
                                <span
                                    className="
                                        hidden
                                        h-px
                                        w-20
                                        bg-[#d79a27]
                                        sm:block
                                    "
                                />

                                <p
                                    className="
                                        text-[13px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.35em]
                                        text-[#082957]

                                        sm:text-[15px]
                                    "
                                >
                                    Heal

                                    <span className="mx-3">
                                        •
                                    </span>

                                    Grow

                                    <span className="mx-3">
                                        •
                                    </span>

                                    Thrive
                                </p>

                                <span
                                    className="
                                        hidden
                                        h-px
                                        w-20
                                        bg-[#d79a27]
                                        sm:block
                                    "
                                />
                            </motion.div>

                            {/* HEADLINE */}

                            <motion.h1
                                initial={{
                                    opacity: 0,
                                    y: 25,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.75,
                                    delay: 0.18,
                                }}
                                className="
                                    max-w-[780px]
                                    font-serif
                                    text-[50px]
                                    font-semibold
                                    leading-[0.96]
                                    tracking-[-0.045em]
                                    text-[#062653]

                                    sm:text-[70px]

                                    lg:text-[82px]

                                    xl:text-[92px]
                                "
                            >
                                Strong Minds.
                                <br />
                                Better Tomorrows.
                            </motion.h1>

                            {/* DESCRIPTION */}

                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.65,
                                    delay: 0.3,
                                }}
                                className="
                                    mt-7
                                    max-w-[620px]
                                    text-[17px]
                                    font-normal
                                    leading-[1.55]
                                    text-[#173b66]

                                    sm:text-[21px]

                                    lg:text-[23px]
                                "
                            >
                                Compassionate,
                                evidence-based psychiatric
                                care for your mental wellness
                                journey.
                            </motion.p>

                            {/* BUTTONS */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.65,
                                    delay: 0.4,
                                }}
                                className="
                                    mt-9
                                    flex
                                    flex-col
                                    gap-3

                                    sm:flex-row
                                    sm:gap-4
                                "
                            >
                                <BookAppointmentButton />

                                <Link
                                    href="/about-us"
                                    className="
                                        group
                                        flex
                                        min-h-[56px]
                                        items-center
                                        justify-center
                                        gap-3
                                        rounded-full
                                        border-[1.5px]
                                        border-[#082957]
                                        bg-white/40
                                        px-7
                                        py-4
                                        text-[15px]
                                        font-semibold
                                        text-[#082957]
                                        backdrop-blur-md
                                        transition-all
                                        duration-300

                                        hover:bg-white/70

                                        sm:px-8
                                        sm:text-[16px]
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            h-7
                                            w-7
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#082957]
                                            text-white
                                        "
                                    >
                                        <Play
                                            className="
                                                ml-0.5
                                                h-3
                                                w-3
                                            "
                                            fill="currentColor"
                                        />
                                    </span>

                                    Our Approach
                                </Link>
                            </motion.div>

                            {/* FEATURES */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.52,
                                }}
                                className="
                                    mt-10
                                    grid
                                    max-w-[650px]
                                    grid-cols-2
                                    gap-x-5
                                    gap-y-6

                                    sm:mt-12
                                    sm:grid-cols-4
                                    sm:gap-0
                                "
                            >
                                {features.map(
                                    (
                                        feature,
                                        index
                                    ) => {
                                        const Icon =
                                            feature.icon;

                                        return (
                                            <div
                                                key={
                                                    feature.label
                                                }
                                                className={`
                                                    flex
                                                    flex-col
                                                    items-center
                                                    text-center

                                                    ${index >
                                                        0
                                                        ? "sm:border-l sm:border-[#d4a044]/55"
                                                        : ""
                                                    }
                                                `}
                                            >
                                                <Icon
                                                    strokeWidth={
                                                        1.8
                                                    }
                                                    className="
                                                        mb-2
                                                        h-8
                                                        w-8
                                                        text-[#082957]

                                                        sm:mb-3
                                                        sm:h-9
                                                        sm:w-9
                                                    "
                                                />

                                                <p
                                                    className="
                                                        whitespace-pre-line
                                                        text-[13px]
                                                        font-medium
                                                        leading-[1.3]
                                                        text-[#173b66]

                                                        sm:text-[14px]
                                                    "
                                                >
                                                    {
                                                        feature.label
                                                    }
                                                </p>
                                            </div>
                                        );
                                    }
                                )}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            {/* =================================================
                JEAN CETOUTE PROVIDER SLIDE
            ================================================= */}

            {isProviderSlide && (
                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        flex
                        w-full
                        max-w-[1440px]

                        items-end
                        px-6
                        pb-[130px]
                        pt-[330px]

                        sm:px-8
                        sm:pt-[390px]

                        lg:items-center
                        lg:px-12
                        lg:pb-24
                        lg:pt-0

                        xl:px-16
                    "
                >
                    <AnimatePresence
                        mode="wait"
                    >
                        <motion.div
                            key="provider-content"
                            initial={{
                                opacity: 0,
                                x: -35,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: -20,
                            }}
                            transition={{
                                duration: 0.75,
                                ease: "easeOut",
                            }}
                            className="
                                w-full
                                max-w-[650px]

                                lg:max-w-[620px]

                                xl:max-w-[660px]
                            "
                        >
                            {/* PROVIDER EYEBROW */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 12,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.12,
                                }}
                                className="
                                    mb-4
                                    flex
                                    items-center
                                    gap-3

                                    sm:mb-5
                                    sm:gap-4
                                "
                            >
                                <motion.span
                                    initial={{
                                        width: 0,
                                    }}
                                    animate={{
                                        width: 48,
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.2,
                                    }}
                                    className="
                                        h-px
                                        bg-[#d79a27]
                                    "
                                />

                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.24em]
                                        text-[#9d6816]

                                        sm:text-[11px]
                                        sm:tracking-[0.28em]

                                        lg:text-[12px]
                                    "
                                >
                                    A Message From Your
                                    Provider
                                </p>
                            </motion.div>

                            {/* QUOTE */}

                            <motion.blockquote
                                initial={{
                                    opacity: 0,
                                    y: 18,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.7,
                                    delay: 0.22,
                                }}
                                className="
                                    relative
                                    font-serif
                                    text-[21px]
                                    font-medium
                                    leading-[1.3]
                                    tracking-[-0.02em]
                                    text-[#082957]

                                    sm:text-[25px]

                                    lg:text-[28px]
                                    lg:leading-[1.32]

                                    xl:text-[30px]
                                "
                            >
                                <span
                                    aria-hidden="true"
                                    className="
                                        absolute
                                        -left-1
                                        -top-7
                                        font-serif
                                        text-[64px]
                                        leading-none
                                        text-[#d79a27]/20

                                        sm:-left-3
                                        sm:-top-9
                                        sm:text-[80px]

                                        lg:-left-5
                                        lg:text-[92px]
                                    "
                                >
                                    “
                                </span>

                                As a dedicated psychiatric
                                provider, I am committed to
                                creating a supportive,
                                compassionate, and
                                judgment-free space where you
                                can feel heard, understood,
                                and empowered. I believe that
                                every individual&apos;s story
                                is unique, and I work
                                collaboratively with you to
                                develop a treatment plan
                                tailored to your personal
                                needs, goals, and lived
                                experiences.
                            </motion.blockquote>

                            {/* PROVIDER DETAILS */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 14,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.4,
                                }}
                                className="
                                    mt-5
                                    border-l-2
                                    border-[#d79a27]
                                    pl-4

                                    sm:mt-6
                                    sm:pl-5
                                "
                            >
                                <p
                                    className="
                                        font-serif
                                        text-[22px]
                                        font-semibold
                                        leading-tight
                                        text-[#082957]

                                        sm:text-[25px]

                                        lg:text-[27px]
                                    "
                                >
                                    Jean Cetoute
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-[13px]
                                        font-semibold
                                        leading-5
                                        text-[#075187]

                                        sm:text-[14px]
                                    "
                                >
                                    Psychiatric Mental Health
                                    Nurse Practitioner
                                </p>

                                <div
                                    className="
                                        mt-2
                                        flex
                                        flex-col
                                        gap-0.5
                                        text-[11px]
                                        leading-5
                                        text-[#536a82]

                                        sm:text-[12px]

                                        lg:text-[13px]
                                    "
                                >
                                    <span>
                                        MSN — Molloy
                                        University
                                    </span>

                                    <span>
                                        BA in Nursing —
                                        Felician University
                                    </span>
                                </div>
                            </motion.div>

                            {/* CTA */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 12,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.52,
                                }}
                                className="
                                    mt-5

                                    sm:mt-6
                                "
                            >
                                <Link
                                    href="/Provider"
                                    className="
                                        group
                                        inline-flex
                                        min-h-[50px]
                                        items-center
                                        justify-center
                                        gap-3
                                        rounded-full
                                        bg-[#075187]
                                        px-6
                                        py-3.5
                                        text-[14px]
                                        font-semibold
                                        text-white
                                        shadow-[0_12px_30px_rgba(7,81,135,0.22)]
                                        transition-all
                                        duration-300

                                        hover:-translate-y-0.5
                                        hover:bg-[#063f6b]
                                        hover:shadow-[0_16px_35px_rgba(7,81,135,0.30)]

                                        sm:px-7
                                        sm:text-[15px]
                                    "
                                >
                                    Meet Your Provider

                                    <ArrowRight
                                        className="
                                            h-4
                                            w-4
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        "
                                    />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            {/* =================================================
                DESKTOP PREVIOUS
            ================================================= */}

            <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous hero slide"
                className={`
                    absolute
                    z-30
                    hidden
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#073b70]
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-[#052d56]
                    lg:flex

                    ${isProviderSlide
                        ? "bottom-[115px] left-8 top-auto"
                        : "left-4 top-1/2 -translate-y-1/2"
                    }
                `}
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            {/* =================================================
                DESKTOP NEXT
            ================================================= */}

            <button
                type="button"
                onClick={nextSlide}
                aria-label="Next hero slide"
                className={`
                    absolute
                    z-30
                    hidden
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#073b70]
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-[#052d56]
                    lg:flex

                    ${isProviderSlide
                        ? "bottom-[115px] right-8 top-auto"
                        : "right-5 top-1/2 -translate-y-1/2"
                    }
                `}
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* =================================================
                DESKTOP DOTS
            ================================================= */}

            <div
                className="
                    absolute
                    bottom-[90px]
                    left-1/2
                    z-30
                    hidden
                    -translate-x-1/2
                    items-center
                    gap-3
                    lg:flex
                "
            >
                {slides.map((slide, index) => (
                    <button
                        key={slide.src}
                        type="button"
                        onClick={() =>
                            goToSlide(index)
                        }
                        aria-label={`Go to slide ${index + 1
                            }`}
                        className={`
                            rounded-full
                            transition-all
                            duration-300

                            ${currentSlide ===
                                index
                                ? "h-3 w-8 bg-[#075187]"
                                : isProviderSlide
                                    ? "h-3 w-3 bg-[#082957]/25 hover:bg-[#082957]/50"
                                    : "h-3 w-3 bg-white/80 hover:bg-white"
                            }
                        `}
                    />
                ))}
            </div>

            {/* =================================================
                MOBILE DOTS
            ================================================= */}

            <div
                className="
                    absolute
                    bottom-[72px]
                    left-1/2
                    z-30
                    flex
                    -translate-x-1/2
                    items-center
                    gap-2
                    lg:hidden
                "
            >
                {slides.map((slide, index) => (
                    <button
                        key={`mobile-${slide.src}`}
                        type="button"
                        onClick={() =>
                            goToSlide(index)
                        }
                        aria-label={`Go to slide ${index + 1
                            }`}
                        className={`
                            rounded-full
                            transition-all
                            duration-300

                            ${currentSlide ===
                                index
                                ? "h-2.5 w-7 bg-[#075187]"
                                : isProviderSlide
                                    ? "h-2.5 w-2.5 bg-[#082957]/25"
                                    : "h-2.5 w-2.5 bg-white/80"
                            }
                        `}
                    />
                ))}
            </div>

            {/* =================================================
                BOTTOM WAVES
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-[-80px]
                    left-[-5%]
                    z-20
                    h-[145px]
                    w-[110%]
                    rotate-[2deg]
                    rounded-[50%_50%_0_0]
                    bg-[#0b4c7a]/70
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-[-105px]
                    left-[-5%]
                    z-20
                    h-[145px]
                    w-[110%]
                    -rotate-[2deg]
                    rounded-[50%_50%_0_0]
                    bg-[#286a98]/45
                "
            />

            {/* BOOK APPOINTMENT MODAL */}

        </section>
    );
}