"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Brain,
    ChevronRight,
    CloudRain,
    Flame,
    Focus,
    Moon,
    Phone,
    RefreshCcw,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import FreeConsultationModal from "./FreeConsultationModal";

const services = [
    {
        number: "01",
        title: "ADHD",
        description:
            "Personalized strategies for focus and productivity.",
        href: "/services/adhd",
        icon: Focus,
    },
    {
        number: "02",
        title: "Anxiety & Depression",
        description:
            "Relief from the weight of anxiety and depression.",
        href: "/services/anxiety-depression",
        icon: CloudRain,
    },
    {
        number: "03",
        title: "Bipolar Disorder",
        description:
            "A comprehensive approach to navigating bipolar disorder.",
        href: "/services/bipolar-disorder",
        icon: RefreshCcw,
    },
    {
        number: "04",
        title: "Anger Management",
        description:
            "Techniques for managing and channeling anger effectively.",
        href: "/services/anger-management",
        icon: Flame,
    },
    {
        number: "05",
        title: "PTSD",
        description:
            "Support and healing for past traumas.",
        href: "/services/ptsd",
        icon: ShieldCheck,
    },
    {
        number: "06",
        title: "Insomnia",
        description:
            "Restorative solutions for sleep disturbances.",
        href: "/services/insomnia",
        icon: Moon,
    },
    {
        number: "07",
        title: "Psychosis",
        description:
            "Compassionate care for managing psychosis symptoms.",
        href: "/services/psychosis",
        icon: Sparkles,
    },
    {
        number: "08",
        title: "OCD",
        description:
            "Coping strategies for obsessive-compulsive disorder.",
        href: "/services/ocd",
        icon: Brain,
    },
];

export default function ServicesSection() {
    const [consultationOpen, setConsultationOpen] =
        useState(false);

    return (
        <>
            <section
                className="
                    relative
                    overflow-hidden
                    bg-[#f8fafb]
                    py-20
                    sm:py-24
                    lg:py-32
                "
            >
                {/* DECORATIVE BACKGROUND */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-[180px]
                        -top-[180px]
                        h-[520px]
                        w-[520px]
                        rounded-full
                        border
                        border-[#075187]/5
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-[80px]
                        -top-[80px]
                        h-[320px]
                        w-[320px]
                        rounded-full
                        border
                        border-[#d79a27]/10
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-[-250px]
                        left-[-250px]
                        h-[600px]
                        w-[600px]
                        rounded-full
                        bg-[#075187]/[0.025]
                        blur-3xl
                    "
                />

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1440px]
                        px-5
                        sm:px-8
                        lg:px-12
                        xl:px-16
                    "
                >
                    {/* =========================================
                        SECTION INTRO
                    ========================================= */}

                    <div
                        className="
                            grid
                            gap-8
                            lg:grid-cols-[1fr_0.8fr]
                            lg:items-end
                            lg:gap-16
                        "
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                        >
                            {/* EYEBROW */}
                            <div className="mb-5 flex items-center gap-3">
                                <span
                                    className="
                                        h-px
                                        w-10
                                        bg-[#d79a27]
                                    "
                                />

                                <p
                                    className="
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-[0.28em]
                                        text-[#a96f13]
                                        sm:text-[12px]
                                    "
                                >
                                    Our Expertise
                                </p>
                            </div>

                            <h2
                                className="
                                    max-w-[720px]
                                    font-serif
                                    text-[42px]
                                    font-semibold
                                    leading-[1.02]
                                    tracking-[-0.035em]
                                    text-[#082957]
                                    sm:text-[52px]
                                    lg:text-[64px]
                                "
                            >
                                What We{" "}
                                <span className="text-[#075187]">
                                    Offer.
                                </span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.1,
                            }}
                            className="
                                lg:justify-self-end
                            "
                        >
                            <p
                                className="
                                    max-w-[560px]
                                    text-[16px]
                                    leading-[1.8]
                                    text-[#536a82]
                                    sm:text-[17px]
                                "
                            >
                                Compassionate, individualized
                                psychiatric care designed to
                                support a variety of mental
                                health needs and help you move
                                toward greater stability and
                                well-being.
                            </p>
                        </motion.div>
                    </div>

                    {/* =========================================
                        SERVICE CARDS
                    ========================================= */}

                    <div
                        className="
                            mt-12
                            grid
                            gap-4
                            sm:mt-16
                            sm:grid-cols-2
                            lg:mt-20
                            lg:grid-cols-4
                            lg:gap-5
                        "
                    >
                        {services.map(
                            (service, index) => {
                                const Icon =
                                    service.icon;

                                return (
                                    <motion.div
                                        key={
                                            service.title
                                        }
                                        initial={{
                                            opacity: 0,
                                            y: 30,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.15,
                                        }}
                                        transition={{
                                            duration: 0.55,
                                            delay:
                                                index *
                                                0.055,
                                        }}
                                        className="h-full"
                                    >
                                        <Link
                                            href={
                                                service.href
                                            }
                                            className="
                                                group
                                                relative
                                                flex
                                                h-full
                                                min-h-[290px]
                                                flex-col
                                                overflow-hidden
                                                rounded-[28px]
                                                border
                                                border-[#082957]/[0.08]
                                                bg-white
                                                p-6
                                                shadow-[0_10px_35px_rgba(8,41,87,0.055)]
                                                transition-all
                                                duration-500

                                                hover:-translate-y-2
                                                hover:border-[#d79a27]/40
                                                hover:shadow-[0_25px_60px_rgba(8,41,87,0.13)]

                                                sm:min-h-[310px]
                                                sm:p-7
                                                lg:p-8
                                            "
                                        >
                                            <CardLines
                                                variant={
                                                    index
                                                }
                                            />

                                            {/* GOLD TOP ACCENT */}
                                            <div
                                                className="
                                                    absolute
                                                    left-0
                                                    top-0
                                                    h-[3px]
                                                    w-0
                                                    bg-[#d79a27]
                                                    transition-all
                                                    duration-500
                                                    group-hover:w-full
                                                "
                                            />

                                            {/* SUBTLE CARD GLOW */}
                                            <div
                                                className="
                                                    pointer-events-none
                                                    absolute
                                                    -right-24
                                                    -top-24
                                                    h-[220px]
                                                    w-[220px]
                                                    rounded-full
                                                    bg-[#075187]/0
                                                    blur-3xl
                                                    transition-all
                                                    duration-500
                                                    group-hover:bg-[#075187]/[0.06]
                                                "
                                            />

                                            {/* LARGE BACKGROUND NUMBER */}
                                            <span
                                                className="
                                                    pointer-events-none
                                                    absolute
                                                    right-5
                                                    top-2
                                                    font-serif
                                                    text-[72px]
                                                    font-semibold
                                                    leading-none
                                                    text-[#082957]/[0.035]
                                                    transition-all
                                                    duration-500
                                                    group-hover:text-[#d79a27]/[0.08]
                                                    sm:text-[82px]
                                                "
                                            >
                                                {
                                                    service.number
                                                }
                                            </span>

                                            {/* TOP */}
                                            <div
                                                className="
                                                    relative
                                                    z-10
                                                    flex
                                                    items-start
                                                    justify-between
                                                "
                                            >
                                                <div
                                                    className="
                                                        flex
                                                        h-[58px]
                                                        w-[58px]
                                                        items-center
                                                        justify-center
                                                        rounded-[18px]
                                                        border
                                                        border-[#075187]/10
                                                        bg-gradient-to-br
                                                        from-[#eef5f8]
                                                        to-[#e4eef3]
                                                        text-[#075187]
                                                        shadow-[0_8px_20px_rgba(7,81,135,0.08)]
                                                        transition-all
                                                        duration-500

                                                        group-hover:-rotate-3
                                                        group-hover:scale-105
                                                        group-hover:border-[#d79a27]/25
                                                        group-hover:bg-[#075187]
                                                        group-hover:text-white
                                                    "
                                                >
                                                    <Icon
                                                        className="
                                                            h-7
                                                            w-7
                                                        "
                                                        strokeWidth={
                                                            1.7
                                                        }
                                                    />
                                                </div>

                                                <span
                                                    className="
                                                        relative
                                                        z-10
                                                        mt-1
                                                        text-[11px]
                                                        font-bold
                                                        tracking-[0.18em]
                                                        text-[#c28a27]
                                                    "
                                                >
                                                    {
                                                        service.number
                                                    }
                                                </span>
                                            </div>

                                            {/* CONTENT */}
                                            <div
                                                className="
                                                    relative
                                                    z-10
                                                    mt-8
                                                "
                                            >
                                                <h3
                                                    className="
                                                        font-serif
                                                        text-[25px]
                                                        font-semibold
                                                        leading-[1.08]
                                                        tracking-[-0.02em]
                                                        text-[#082957]
                                                        sm:text-[27px]
                                                    "
                                                >
                                                    {
                                                        service.title
                                                    }
                                                </h3>

                                                <p
                                                    className="
                                                        mt-4
                                                        text-[14px]
                                                        leading-[1.75]
                                                        text-[#60758a]
                                                        sm:text-[15px]
                                                    "
                                                >
                                                    {
                                                        service.description
                                                    }
                                                </p>
                                            </div>

                                            {/* BOTTOM LINK */}
                                            <div
                                                className="
                                                    relative
                                                    z-10
                                                    mt-auto
                                                    flex
                                                    items-end
                                                    justify-between
                                                    pt-8
                                                "
                                            >
                                                <span
                                                    className="
                                                        text-[13px]
                                                        font-bold
                                                        text-[#075187]
                                                        transition-colors
                                                        group-hover:text-[#082957]
                                                    "
                                                >
                                                    Learn
                                                    More
                                                </span>

                                                <span
                                                    className="
                                                        flex
                                                        h-10
                                                        w-10
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        border
                                                        border-[#082957]/10
                                                        bg-[#f4f7f9]
                                                        text-[#075187]
                                                        transition-all
                                                        duration-300

                                                        group-hover:border-[#075187]
                                                        group-hover:bg-[#075187]
                                                        group-hover:text-white
                                                    "
                                                >
                                                    <ArrowRight
                                                        className="
                                                            h-4
                                                            w-4
                                                            transition-transform
                                                            duration-300
                                                            group-hover:translate-x-0.5
                                                        "
                                                    />
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            }
                        )}
                    </div>

                    {/* =========================================
                        BOTTOM CTA
                    ========================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.15,
                        }}
                        className="
                            mt-12
                            flex
                            flex-col
                            items-start
                            justify-between
                            gap-6
                            rounded-[26px]
                            border
                            border-[#082957]/10
                            bg-[#eef4f6]
                            px-6
                            py-6

                            sm:flex-row
                            sm:items-center
                            sm:px-8

                            lg:mt-16
                            lg:px-10
                            lg:py-8
                        "
                    >
                        <div>
                            <p
                                className="
                                    font-serif
                                    text-[22px]
                                    font-semibold
                                    text-[#082957]
                                    sm:text-[25px]
                                "
                            >
                                Not sure where to
                                begin?
                            </p>

                            <p
                                className="
                                    mt-1
                                    max-w-[650px]
                                    text-[14px]
                                    leading-6
                                    text-[#60758a]
                                    sm:text-[15px]
                                "
                            >
                                Start with a
                                consultation and take
                                the first step toward
                                finding the care that
                                fits your needs.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setConsultationOpen(
                                    true
                                )
                            }
                            className="
                                group
                                inline-flex
                                min-h-[54px]
                                w-full
                                shrink-0
                                items-center
                                justify-center
                                gap-3
                                rounded-full
                                bg-[#075187]
                                px-6
                                py-4
                                text-[15px]
                                font-semibold
                                text-white
                                shadow-[0_12px_30px_rgba(7,81,135,0.28)]
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-[#063f6b]
                                active:scale-[0.98]

                                sm:w-auto
                            "
                        >
                            <Phone className="h-[18px] w-[18px]" />

                            <span>
                                Free Consultation
                            </span>

                            <ChevronRight
                                className="
                                    h-4
                                    w-4
                                    transition-transform
                                    group-hover:translate-x-1
                                "
                            />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* =========================================
                FREE CONSULTATION MODAL
            ========================================= */}

            <FreeConsultationModal
                open={consultationOpen}
                onClose={() =>
                    setConsultationOpen(false)
                }
            />
        </>
    );
}

function CardLines({
    variant,
}: {
    variant: number;
}) {
    const isGold = variant % 2 === 1;

    const stroke = isGold
        ? "#D79A27"
        : "#075187";

    return (
        <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -bottom-10
                -right-12
                h-[210px]
                w-[280px]
                opacity-[0.12]
                transition-all
                duration-700

                group-hover:-translate-x-2
                group-hover:-translate-y-2
                group-hover:opacity-[0.22]

                sm:h-[230px]
                sm:w-[310px]
            "
        >
            <path
                d="M435 63C356 26 306 38 272 81C235 128 261 170 218 205C174 241 111 207 66 245C37 270 28 302 30 330"
                stroke={stroke}
                strokeWidth="2"
            />

            <path
                d="M443 91C368 56 322 66 291 105C258 147 280 186 240 220C199 254 140 224 98 257C70 279 59 307 61 337"
                stroke={stroke}
                strokeWidth="1.5"
                opacity="0.75"
            />

            <path
                d="M450 120C382 89 340 96 312 131C282 168 300 205 264 235C228 265 174 239 137 268C112 287 101 312 103 341"
                stroke={stroke}
                strokeWidth="1.25"
                opacity="0.55"
            />

            <path
                d="M458 151C396 123 358 128 333 159C306 192 322 224 290 251C258 278 210 255 176 281C154 298 144 319 146 345"
                stroke={stroke}
                strokeWidth="1"
                opacity="0.4"
            />

            <circle
                cx="318"
                cy="94"
                r="5"
                fill={stroke}
                opacity="0.75"
            />

            <circle
                cx="318"
                cy="94"
                r="12"
                stroke={stroke}
                strokeWidth="1"
                opacity="0.3"
            />
        </svg>
    );
}