"use client";

import { motion } from "framer-motion";

import type {
    ElementType,
    ReactNode,
} from "react";

import {
    Brain,
    Check,
    HeartHandshake,
    Laptop,
    Network,
    Phone,
    Pill,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import BookAppointmentButton from "./BookAppointmentButton";

export type ServicePageData = {
    eyebrow: string;
    title: string;
    accentTitle: string;
    intro: string;

    icon:
    | "psychiatric-evaluation"
    | "medication-management"
    | "psychopharmacology"
    | "telehealth";

    heroHighlights: string[];

    overviewEyebrow: string;
    overviewTitle: string;
    overviewParagraphs: string[];

    includesTitle: string;
    includes: {
        title: string;
        description: string;
    }[];

    goodForTitle: string;
    goodForDescription: string;
    goodFor: string[];

    process: {
        number: string;
        title: string;
        description: string;
    }[];

    faq: {
        question: string;
        answer: string;
    }[];

    closingTitle: string;
    closingText: string;
};

const serviceIcons: Record<
    ServicePageData["icon"],
    ElementType
> = {
    "psychiatric-evaluation": Brain,
    "medication-management": Pill,
    psychopharmacology: Network,
    telehealth: Laptop,
};

export default function ServicePageLayout({
    service,
}: {
    service: ServicePageData;
}) {
    const HeroIcon =
        serviceIcons[service.icon];

    return (
        <main className="overflow-hidden bg-white text-[#082957]">

            {/* =====================================================
                HERO
            ====================================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-[#f3f6f7]
                    px-6
                    pb-20
                    pt-[190px]
                    sm:px-8
                    lg:px-12
                    lg:pb-28
                    lg:pt-[220px]
                    xl:px-16
                "
            >
                <HeroArtwork />

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        grid
                        max-w-[1400px]
                        items-center
                        gap-14
                        lg:grid-cols-[1.05fr_.8fr]
                        lg:gap-20
                    "
                >
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="flex items-center gap-4">
                            <span className="h-px w-12 bg-[#d79a27]" />

                            <p
                                className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[0.22em]
                                    text-[#a36b15]
                                "
                            >
                                {service.eyebrow}
                            </p>
                        </div>

                        <h1
                            className="
                                mt-7
                                max-w-[850px]
                                font-serif
                                text-[48px]
                                font-semibold
                                leading-[0.98]
                                tracking-[-0.045em]
                                text-[#061f43]

                                sm:text-[64px]
                                lg:text-[76px]
                                xl:text-[84px]
                            "
                        >
                            {service.title}

                            <span
                                className="
                                    mt-1
                                    block
                                    text-[#075187]
                                "
                            >
                                {service.accentTitle}
                            </span>
                        </h1>

                        <p
                            className="
                                mt-7
                                max-w-[720px]
                                text-[16px]
                                leading-8
                                text-[#526b82]

                                sm:text-[18px]
                            "
                        >
                            {service.intro}
                        </p>

                        <div
                            className="
                                mt-8
                                flex
                                flex-wrap
                                gap-x-6
                                gap-y-3
                            "
                        >
                            {service.heroHighlights.map(
                                (item) => (
                                    <div
                                        key={item}
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            text-[13px]
                                            font-semibold
                                            text-[#294865]
                                        "
                                    >
                                        <span
                                            className="
                                                flex
                                                h-6
                                                w-6
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-[#e8f1f5]
                                                text-[#075187]
                                            "
                                        >
                                            <Check className="h-3.5 w-3.5" />
                                        </span>

                                        {item}
                                    </div>
                                )
                            )}
                        </div>

                        <div
                            className="
                                mt-10
                                flex
                                flex-col
                                gap-3
                                sm:flex-row
                            "
                        >
                            <BookAppointmentButton />

                            <a
                                href="tel:+19294472430"
                                className="
                                    inline-flex
                                    min-h-[56px]
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-full
                                    border
                                    border-[#082957]/15
                                    bg-white
                                    px-7
                                    text-[14px]
                                    font-bold
                                    text-[#082957]
                                    transition
                                    hover:border-[#075187]
                                "
                            >
                                <Phone className="h-[17px] w-[17px]" />

                                (929) 447-2430
                            </a>
                        </div>
                    </motion.div>

                    {/* HERO CARD */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 30,
                            scale: 0.97,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.15,
                        }}
                        className="
                            relative
                            mx-auto
                            w-full
                            max-w-[470px]
                        "
                    >
                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[36px]
                                bg-[#082957]
                                p-8
                                text-white
                                shadow-[0_35px_80px_rgba(8,41,87,.22)]

                                sm:p-10
                            "
                        >
                            <CardArtwork />

                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-[20px]
                                    bg-[#e2b45d]
                                    text-[#061f43]
                                "
                            >
                                <HeroIcon className="h-8 w-8" />
                            </div>

                            <p
                                className="
                                    relative
                                    z-10
                                    mt-12
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#e2b45d]
                                "
                            >
                                Compassionate Psychiatric Care
                            </p>

                            <h2
                                className="
                                    relative
                                    z-10
                                    mt-3
                                    font-serif
                                    text-[33px]
                                    font-semibold
                                    leading-tight
                                "
                            >
                                Care designed around the individual.
                            </h2>

                            <p
                                className="
                                    relative
                                    z-10
                                    mt-4
                                    text-[13px]
                                    leading-6
                                    text-white/65
                                "
                            >
                                Solid Rock Behavioral Health
                                provides personalized psychiatric
                                care with an emphasis on
                                collaboration, respect and
                                evidence-based treatment.
                            </p>

                            <div
                                className="
                                    relative
                                    z-10
                                    mt-8
                                    grid
                                    grid-cols-2
                                    gap-3
                                "
                            >
                                <MiniFeature
                                    icon={HeartHandshake}
                                    label="Personalized"
                                />

                                <MiniFeature
                                    icon={ShieldCheck}
                                    label="Evidence-Based"
                                />

                                <MiniFeature
                                    icon={Laptop}
                                    label="Telehealth"
                                />

                                <MiniFeature
                                    icon={Sparkles}
                                    label="Compassionate"
                                />
                            </div>
                        </div>

                        <div
                            className="
                                absolute
                                -bottom-5
                                -left-5
                                hidden
                                rounded-[20px]
                                border
                                border-[#082957]/10
                                bg-white
                                px-5
                                py-4
                                shadow-xl
                                sm:block
                            "
                        >
                            <p
                                className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[.15em]
                                    text-[#9b6a1c]
                                "
                            >
                                Free Consultation
                            </p>

                            <p className="mt-1 text-[13px] font-bold">
                                15 Minutes
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* =====================================================
                OVERVIEW
            ====================================================== */}

            <section
                className="
                    px-6
                    py-20
                    sm:px-8
                    lg:px-12
                    lg:py-28
                    xl:px-16
                "
            >
                <div
                    className="
                        mx-auto
                        grid
                        max-w-[1320px]
                        gap-12
                        lg:grid-cols-[.75fr_1.25fr]
                        lg:gap-20
                    "
                >
                    <div>
                        <SectionEyebrow>
                            {service.overviewEyebrow}
                        </SectionEyebrow>

                        <h2
                            className="
                                mt-5
                                font-serif
                                text-[38px]
                                font-semibold
                                leading-[1.05]
                                tracking-[-.035em]
                                sm:text-[48px]
                            "
                        >
                            {service.overviewTitle}
                        </h2>
                    </div>

                    <div className="space-y-5">
                        {service.overviewParagraphs.map(
                            (paragraph) => (
                                <p
                                    key={paragraph}
                                    className="
                                        text-[15px]
                                        leading-8
                                        text-[#60758a]
                                        sm:text-[16px]
                                    "
                                >
                                    {paragraph}
                                </p>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                WHAT IT INCLUDES
            ====================================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-[#f5f7f7]
                    px-6
                    py-20
                    sm:px-8
                    lg:px-12
                    lg:py-28
                    xl:px-16
                "
            >
                <div className="mx-auto max-w-[1320px]">
                    <div className="max-w-[720px]">
                        <SectionEyebrow>
                            Your Care
                        </SectionEyebrow>

                        <h2
                            className="
                                mt-5
                                font-serif
                                text-[38px]
                                font-semibold
                                tracking-[-.035em]
                                sm:text-[48px]
                            "
                        >
                            {service.includesTitle}
                        </h2>
                    </div>

                    <div
                        className="
                            mt-12
                            grid
                            gap-5
                            md:grid-cols-2
                            lg:grid-cols-3
                        "
                    >
                        {service.includes.map(
                            (item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{
                                        opacity: 0,
                                        y: 25,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.2,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.06,
                                    }}
                                    className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-[26px]
                                        border
                                        border-[#082957]/[.07]
                                        bg-white
                                        p-7
                                        shadow-[0_14px_45px_rgba(8,41,87,.05)]
                                        transition
                                        hover:-translate-y-1
                                        hover:shadow-[0_20px_55px_rgba(8,41,87,.09)]
                                    "
                                >
                                    <span
                                        className="
                                            absolute
                                            right-5
                                            top-3
                                            font-serif
                                            text-[60px]
                                            text-[#075187]/[.045]
                                        "
                                    >
                                        {String(
                                            index + 1
                                        ).padStart(2, "0")}
                                    </span>

                                    <span
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#fff6e5]
                                            text-[#a86f16]
                                        "
                                    >
                                        <Check className="h-4 w-4" />
                                    </span>

                                    <h3
                                        className="
                                            mt-6
                                            font-serif
                                            text-[22px]
                                            font-semibold
                                        "
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        className="
                                            mt-3
                                            text-[13px]
                                            leading-6
                                            text-[#718497]
                                        "
                                    >
                                        {item.description}
                                    </p>
                                </motion.div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                WHO IT MAY HELP
            ====================================================== */}

            <section
                className="
                    px-6
                    py-20
                    sm:px-8
                    lg:px-12
                    lg:py-28
                    xl:px-16
                "
            >
                <div
                    className="
                        mx-auto
                        grid
                        max-w-[1320px]
                        overflow-hidden
                        rounded-[36px]
                        bg-[#082957]
                        lg:grid-cols-[.9fr_1.1fr]
                    "
                >
                    <div
                        className="
                            relative
                            overflow-hidden
                            p-8
                            text-white
                            sm:p-10
                            lg:p-14
                        "
                    >
                        <CardArtwork />

                        <div className="relative z-10">
                            <SectionEyebrow light>
                                Who We Support
                            </SectionEyebrow>

                            <h2
                                className="
                                    mt-5
                                    font-serif
                                    text-[36px]
                                    font-semibold
                                    leading-tight
                                    sm:text-[44px]
                                "
                            >
                                {service.goodForTitle}
                            </h2>

                            <p
                                className="
                                    mt-5
                                    max-w-[520px]
                                    text-[14px]
                                    leading-7
                                    text-white/65
                                "
                            >
                                {service.goodForDescription}
                            </p>
                        </div>
                    </div>

                    <div
                        className="
                            grid
                            gap-px
                            bg-[#dce4e8]
                            sm:grid-cols-2
                        "
                    >
                        {service.goodFor.map(
                            (item) => (
                                <div
                                    key={item}
                                    className="
                                        flex
                                        min-h-[100px]
                                        items-center
                                        gap-3
                                        bg-white
                                        px-6
                                        py-5
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            h-8
                                            w-8
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#edf5f8]
                                            text-[#075187]
                                        "
                                    >
                                        <Check className="h-4 w-4" />
                                    </span>

                                    <span
                                        className="
                                            text-[13px]
                                            font-semibold
                                            leading-5
                                            text-[#294865]
                                        "
                                    >
                                        {item}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                PROCESS
            ====================================================== */}

            <section
                className="
                    bg-[#f8f6f1]
                    px-6
                    py-20
                    sm:px-8
                    lg:px-12
                    lg:py-28
                    xl:px-16
                "
            >
                <div className="mx-auto max-w-[1320px]">
                    <div className="text-center">
                        <SectionEyebrow>
                            What To Expect
                        </SectionEyebrow>

                        <h2
                            className="
                                mx-auto
                                mt-5
                                max-w-[700px]
                                font-serif
                                text-[38px]
                                font-semibold
                                tracking-[-.035em]
                                sm:text-[48px]
                            "
                        >
                            Your care, step by step.
                        </h2>
                    </div>

                    <div
                        className="
                            mt-14
                            grid
                            gap-6
                            md:grid-cols-3
                        "
                    >
                        {service.process.map(
                            (item, index) => (
                                <div
                                    key={item.number}
                                    className="relative"
                                >
                                    {index < 2 && (
                                        <div
                                            className="
                                                absolute
                                                left-[60%]
                                                top-7
                                                hidden
                                                h-px
                                                w-[80%]
                                                border-t
                                                border-dashed
                                                border-[#d79a27]/50
                                                md:block
                                            "
                                        />
                                    )}

                                    <div className="relative z-10">
                                        <span
                                            className="
                                                flex
                                                h-14
                                                w-14
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-[#082957]
                                                font-serif
                                                text-[18px]
                                                font-semibold
                                                text-[#e2b45d]
                                            "
                                        >
                                            {item.number}
                                        </span>

                                        <h3
                                            className="
                                                mt-6
                                                font-serif
                                                text-[23px]
                                                font-semibold
                                            "
                                        >
                                            {item.title}
                                        </h3>

                                        <p
                                            className="
                                                mt-3
                                                max-w-[350px]
                                                text-[13px]
                                                leading-6
                                                text-[#718497]
                                            "
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                FAQ
            ====================================================== */}

            <section
                className="
                    px-6
                    py-20
                    sm:px-8
                    lg:px-12
                    lg:py-28
                    xl:px-16
                "
            >
                <div
                    className="
                        mx-auto
                        grid
                        max-w-[1200px]
                        gap-12
                        lg:grid-cols-[.65fr_1.35fr]
                    "
                >
                    <div>
                        <SectionEyebrow>
                            Questions
                        </SectionEyebrow>

                        <h2
                            className="
                                mt-5
                                font-serif
                                text-[38px]
                                font-semibold
                                leading-tight
                            "
                        >
                            Frequently asked questions.
                        </h2>

                        <p
                            className="
                                mt-4
                                text-[13px]
                                leading-6
                                text-[#718497]
                            "
                        >
                            Have another question?
                            Contact Solid Rock Behavioral
                            Health directly.
                        </p>

                        <a
                            href="tel:+19294472430"
                            className="
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                text-[13px]
                                font-bold
                                text-[#075187]
                            "
                        >
                            <Phone className="h-4 w-4" />
                            (929) 447-2430
                        </a>
                    </div>

                    <div>
                        {service.faq.map(
                            (item, index) => (
                                <div
                                    key={item.question}
                                    className="
                                        border-b
                                        border-[#082957]/10
                                        py-6
                                    "
                                >
                                    <div className="flex gap-4">
                                        <span
                                            className="
                                                mt-0.5
                                                text-[10px]
                                                font-bold
                                                text-[#b67a1b]
                                            "
                                        >
                                            0{index + 1}
                                        </span>

                                        <div>
                                            <h3
                                                className="
                                                    font-serif
                                                    text-[20px]
                                                    font-semibold
                                                "
                                            >
                                                {item.question}
                                            </h3>

                                            <p
                                                className="
                                                    mt-3
                                                    text-[13px]
                                                    leading-6
                                                    text-[#718497]
                                                "
                                            >
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                CTA
            ====================================================== */}

            <section
                className="
                    px-5
                    pb-8
                    sm:px-7
                    lg:px-10
                "
            >
                <div
                    className="
                        relative
                        mx-auto
                        max-w-[1400px]
                        overflow-hidden
                        rounded-[34px]
                        bg-[#075187]
                        px-7
                        py-16
                        text-center
                        text-white
                        sm:px-10
                        lg:py-20
                    "
                >
                    <ClosingArtwork />

                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            max-w-[760px]
                        "
                    >
                        <p
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[.22em]
                                text-[#f0ca7d]
                            "
                        >
                            Take The Next Step
                        </p>

                        <h2
                            className="
                                mt-4
                                font-serif
                                text-[38px]
                                font-semibold
                                leading-tight
                                sm:text-[50px]
                            "
                        >
                            {service.closingTitle}
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-5
                                max-w-[620px]
                                text-[14px]
                                leading-7
                                text-white/70
                            "
                        >
                            {service.closingText}
                        </p>

                        <div
                            className="
                                mt-8
                                flex
                                flex-col
                                justify-center
                                gap-3
                                sm:flex-row
                            "
                        >
                            <BookAppointmentButton />

                            <a
                                href="tel:+19294472430"
                                className="
                                    inline-flex
                                    min-h-[54px]
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/25
                                    px-7
                                    text-[13px]
                                    font-bold
                                    text-white
                                    transition
                                    hover:bg-white/10
                                "
                            >
                                <Phone className="h-4 w-4" />
                                Free 15-Minute Consultation
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* =========================================================
   HELPERS
========================================================= */

function SectionEyebrow({
    children,
    light = false,
}: {
    children: ReactNode;
    light?: boolean;
}) {
    return (
        <div className="flex items-center gap-3">
            <span
                className={`
                    h-px
                    w-9
                    ${light
                        ? "bg-[#e2b45d]"
                        : "bg-[#d79a27]"
                    }
                `}
            />

            <p
                className={`
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[.2em]
                    ${light
                        ? "text-[#e2b45d]"
                        : "text-[#a36b15]"
                    }
                `}
            >
                {children}
            </p>
        </div>
    );
}

function MiniFeature({
    icon: Icon,
    label,
}: {
    icon: ElementType;
    label: string;
}) {
    return (
        <div
            className="
                rounded-[16px]
                border
                border-white/10
                bg-white/[.055]
                p-3
            "
        >
            <Icon className="h-4 w-4 text-[#e2b45d]" />

            <p className="mt-2 text-[10px] font-semibold text-white/75">
                {label}
            </p>
        </div>
    );
}

function HeroArtwork() {
    return (
        <svg
            viewBox="0 0 900 600"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -right-32
                top-16
                w-[750px]
                opacity-[.13]
            "
        >
            <path
                d="M40 510C210 320 290 360 390 230C490 100 650 90 850 150"
                stroke="#075187"
                strokeWidth="2"
            />

            <path
                d="M80 550C230 390 330 410 430 280C540 140 700 150 880 210"
                stroke="#D79A27"
                strokeWidth="2"
            />

            <circle
                cx="390"
                cy="230"
                r="7"
                fill="#D79A27"
            />

            <circle
                cx="390"
                cy="230"
                r="20"
                stroke="#D79A27"
            />
        </svg>
    );
}

function CardArtwork() {
    return (
        <svg
            viewBox="0 0 500 500"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -bottom-24
                -right-24
                h-[430px]
                w-[430px]
                opacity-[.12]
            "
        >
            <circle
                cx="250"
                cy="250"
                r="180"
                stroke="#E2B45D"
            />

            <circle
                cx="250"
                cy="250"
                r="130"
                stroke="white"
            />

            <circle
                cx="250"
                cy="250"
                r="80"
                stroke="#E2B45D"
            />
        </svg>
    );
}

function ClosingArtwork() {
    return (
        <svg
            viewBox="0 0 1200 400"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                inset-0
                h-full
                w-full
                opacity-[.10]
            "
            preserveAspectRatio="none"
        >
            <path
                d="M-50 350C220 100 350 400 600 160C830 -50 1020 260 1280 30"
                stroke="white"
                strokeWidth="2"
            />

            <path
                d="M-20 410C230 180 430 430 680 210C910 20 1080 320 1300 100"
                stroke="#E2B45D"
                strokeWidth="2"
            />
        </svg>
    );
}