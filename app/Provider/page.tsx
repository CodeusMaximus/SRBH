"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
    ArrowRight,
    Award,
    BadgeCheck,
    Brain,
    BriefcaseMedical,
    Check,
    CheckCircle2,
    Clock3,
    GraduationCap,
    HeartHandshake,
    Languages,
    MapPin,
    Phone,
    ShieldCheck,
    Sparkles,
    Stethoscope,
    UserRound,
    UsersRound,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const insurancePlans = [
    "BlueShield of Northeastern New York",
    "Carelon Behavioral Health",
    "Cigna and Evernorth",
    "Empire Blue Cross Blue Shield",
    "Excellus BlueCross BlueShield",
    "Humana",
    "Optum",
    "Oscar Health",
    "Oxford",
    "Out of Network",
];

const expertise = [
    "Addiction",
    "ADHD",
    "Anger Management",
    "Antisocial Personality",
    "Anxiety",
    "Autism",
    "Behavioral Issues",
    "Bipolar Disorder",
    "Borderline Personality (BPD)",
    "Cancer",
    "Depression",
    "Dissociative Disorders (DID)",
    "Emotional Disturbance",
    "Family Conflict",
    "Impulse Control Disorders",
    "Medication Management",
    "Mood Disorders",
    "Obsessive-Compulsive (OCD)",
    "Oppositional Defiance (ODD)",
    "Psychosis",
    "Relationship Issues",
    "Self Esteem",
    "Teen Violence",
    "Veterans",
];

const treatmentApproaches = [
    {
        title: "Cognitive Behavioral Therapy",
        abbreviation: "CBT",
        description:
            "Explore how thoughts can influence emotions and experiences while developing healthier, more constructive patterns.",
        icon: Brain,
    },
    {
        title: "Family / Marital",
        abbreviation: "Family",
        description:
            "A collaborative approach that considers relationships, communication, and family dynamics as part of care.",
        icon: UsersRound,
    },
    {
        title: "Solution Focused Brief Therapy",
        abbreviation: "SFBT",
        description:
            "A goal-oriented approach focused on strengths, practical solutions, and meaningful progress.",
        icon: Sparkles,
    },
];

const clientGroups = [
    "Toddlers",
    "Children (6–10)",
    "Preteens",
    "Teens",
    "Adults",
    "Elders (65+)",
];

const participants = ["Individuals", "Couples", "Families"];

const languages = [
    "English",
    "Creole",
    "French",
    "Spanish — understands, not fluent",
];

const nearbyAreas = [
    "Brooklyn",
    "Jamaica",
    "Syosset",
    "Kings County",
    "Nassau County",
    "Queens",
];

/* =========================================================
   ANIMATIONS
========================================================= */

const easing = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: easing,
        },
    },
};

const fadeLeft = {
    hidden: {
        opacity: 0,
        x: -45,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: easing,
        },
    },
};

const fadeRight = {
    hidden: {
        opacity: 0,
        x: 45,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: easing,
        },
    },
};

const cardReveal = {
    hidden: {
        opacity: 0,
        y: 28,
        scale: 0.97,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.55,
            ease: easing,
        },
    },
};

const stagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

/* =========================================================
   PAGE
========================================================= */

export default function ProviderPage() {
    return (

        <main className="overflow-hidden bg-white">
            {/* =================================================
                HERO
            ================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-[#f4f1eb]
                "
            >
                {/* SOFT BACKGROUND ELEMENTS */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-[240px]
                        -top-[240px]
                        h-[600px]
                        w-[600px]
                        rounded-full
                        border
                        border-[#075187]/[0.06]
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-[130px]
                        -top-[130px]
                        h-[380px]
                        w-[380px]
                        rounded-full
                        border
                        border-[#d79a27]/10
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-[-220px]
                        right-[-180px]
                        h-[520px]
                        w-[520px]
                        rounded-full
                        bg-[#075187]/[0.05]
                        blur-[100px]
                    "
                />

                <HeroArtwork />

                <div
                    className="
        relative
        z-10
        mx-auto
        grid
        min-h-[760px]
        max-w-[1440px]
        items-center
        gap-14
        px-6
        pb-16
        pt-24

        sm:px-8
        sm:pb-20
        sm:pt-28

        lg:grid-cols-[1fr_0.88fr]
        lg:gap-16
        lg:px-12
        lg:pb-20
        lg:pt-28

        xl:px-16
        xl:pt-32
    "
                >
                    {/* HERO TEXT */}

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="relative max-w-[700px]"
                    >
                        <motion.div
                            variants={fadeUp}
                            className="
                                mb-6
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-[#d79a27]/30
                                bg-white/70
                                px-4
                                py-2
                                shadow-sm
                                backdrop-blur-sm
                            "
                        >
                            <BadgeCheck className="h-4 w-4 text-[#b67818]" />

                            <span
                                className="
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#9d6816]
                                "
                            >
                                Meet Your Provider
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="
                                font-serif
                                text-[45px]
                                font-semibold
                                leading-[0.98]
                                tracking-[-0.04em]
                                text-[#082957]

                                sm:text-[58px]
                                lg:text-[66px]
                                xl:text-[74px]
                            "
                        >
                            Jean Rigaud
                            <br />

                            <span className="relative inline-block text-[#075187]">
                                Cetoute

                                <svg
                                    viewBox="0 0 270 18"
                                    fill="none"
                                    aria-hidden="true"
                                    className="
                                        absolute
                                        -bottom-3
                                        left-0
                                        w-full
                                        overflow-visible
                                    "
                                >
                                    <motion.path
                                        d="M3 10C55 4 104 15 151 8C194 2 228 6 267 4"
                                        stroke="#D79A27"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        initial={{
                                            pathLength: 0,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            pathLength: 1,
                                            opacity: 1,
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            delay: 0.65,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </svg>
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="
                                mt-7
                                text-[17px]
                                font-semibold
                                leading-7
                                text-[#a46e1a]

                                sm:text-[19px]
                            "
                        >
                            Psychiatric Nurse Practitioner, PMHNP, BC
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            className="
                                mt-6
                                max-w-[650px]
                                text-[16px]
                                leading-[1.85]
                                text-[#536a82]

                                sm:text-[17px]
                            "
                        >
                            With more than 25 years of experience in healthcare,
                            Jean Rigaud Cetoute has dedicated his career to
                            helping individuals improve their mental and
                            emotional well-being. His approach combines
                            compassionate psychiatric care with evidence-based
                            treatment tailored to each person&apos;s needs.
                        </motion.p>

                        {/* CREDENTIALS */}

                        <motion.div
                            variants={fadeUp}
                            className="
                                mt-8
                                flex
                                flex-wrap
                                gap-3
                            "
                        >
                            <CredentialBadge>
                                Licensed in New York
                            </CredentialBadge>

                            <CredentialBadge>
                                25+ Years in Healthcare
                            </CredentialBadge>

                            <CredentialBadge>
                                MSN — Molloy University
                            </CredentialBadge>
                        </motion.div>

                        {/* BUTTONS */}

                        <motion.div
                            variants={fadeUp}
                            className="
                                mt-9
                                flex
                                flex-col
                                gap-3

                                sm:flex-row
                            "
                        >
                            <a
                                href="tel:+19294472430"
                                className="
                                    group
                                    inline-flex
                                    min-h-[56px]
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-full
                                    bg-[#075187]
                                    px-7
                                    text-[14px]
                                    font-bold
                                    text-white
                                    shadow-[0_14px_30px_rgba(7,81,135,0.22)]
                                    transition-all
                                    duration-300

                                    hover:-translate-y-1
                                    hover:bg-[#063f6b]
                                    hover:shadow-[0_18px_38px_rgba(7,81,135,0.28)]
                                "
                            >
                                <Phone className="h-4 w-4" />
                                (929) 447-2430
                            </a>

                            <Link
                                href="/contact"
                                className="
                                    group
                                    inline-flex
                                    min-h-[56px]
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-full
                                    border
                                    border-[#082957]/15
                                    bg-white/75
                                    px-7
                                    text-[14px]
                                    font-bold
                                    text-[#082957]
                                    transition-all
                                    duration-300

                                    hover:-translate-y-1
                                    hover:border-[#d79a27]/40
                                    hover:bg-white
                                "
                            >
                                Free 15-Minute Consultation

                                <ArrowRight
                                    className="
                                        h-4
                                        w-4
                                        transition-transform
                                        group-hover:translate-x-1
                                    "
                                />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* HERO IMAGE */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 55,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.95,
                            delay: 0.2,
                            ease: easing,
                        }}
                        className="
                            relative
                            mx-auto
                            w-full
                            max-w-[530px]

                            lg:ml-auto
                        "
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                rotate: 2,
                                x: 15,
                            }}
                            animate={{
                                opacity: 1,
                                rotate: 0,
                                x: 0,
                            }}
                            transition={{
                                duration: 1,
                                delay: 0.45,
                            }}
                            className="
                                absolute
                                -bottom-4
                                -right-4
                                h-full
                                w-full
                                rounded-[36px]
                                border
                                border-[#d79a27]/35
                            "
                        />

                        <div
                            className="
                                relative
                                aspect-[4/5]
                                overflow-hidden
                                rounded-[32px]
                                bg-[#dfe7eb]
                                shadow-[0_35px_80px_rgba(8,41,87,0.18)]
                            "
                        >
                            <motion.div
                                initial={{ scale: 1.08 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    duration: 1.4,
                                    ease: easing,
                                }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src="/images/provider-hero.jpg"
                                    alt="Jean Rigaud Cetoute"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 90vw, 520px"
                                    className="object-cover"
                                />
                            </motion.div>

                            <div
                                className="
                                    absolute
                                    inset-x-0
                                    bottom-0
                                    h-[48%]
                                    bg-gradient-to-t
                                    from-[#061f43]/85
                                    via-[#061f43]/25
                                    to-transparent
                                "
                            />

                            <div
                                className="
                                    absolute
                                    bottom-6
                                    left-6
                                    right-6
                                    text-white

                                    sm:bottom-8
                                    sm:left-8
                                "
                            >
                                <p
                                    className="
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-[#e5ba63]
                                    "
                                >
                                    Solid Rock Behavioral Health
                                </p>

                                <p
                                    className="
                                        mt-2
                                        font-serif
                                        text-[24px]
                                        font-semibold
                                    "
                                >
                                    Compassionate care.
                                    <br />
                                    Stronger foundations.
                                </p>
                            </div>
                        </div>

                        {/* FLOATING EXPERIENCE CARD */}

                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute
                                -bottom-7
                                -left-3
                                rounded-[20px]
                                border
                                border-white/70
                                bg-white/95
                                px-5
                                py-4
                                shadow-[0_15px_40px_rgba(8,41,87,0.15)]
                                backdrop-blur

                                sm:-left-8
                                sm:px-6
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[#082957]
                                        text-[#e2b45d]
                                    "
                                >
                                    <HeartHandshake className="h-5 w-5" />
                                </div>

                                <div>
                                    <p
                                        className="
                                            font-serif
                                            text-[22px]
                                            font-semibold
                                            text-[#082957]
                                        "
                                    >
                                        25+
                                    </p>

                                    <p className="text-[11px] text-[#65798c]">
                                        Years in healthcare
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* =================================================
                ABOUT / PHILOSOPHY
            ================================================= */}

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
                <SectionSideArtwork side="left" />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.25,
                    }}
                    variants={stagger}
                    className="
                        relative
                        z-10
                        mx-auto
                        grid
                        max-w-[1280px]
                        gap-12
                        px-6

                        sm:px-8

                        lg:grid-cols-[0.72fr_1.28fr]
                        lg:items-start
                        lg:gap-20
                        lg:px-12

                        xl:px-16
                    "
                >
                    <motion.div variants={fadeLeft}>
                        <SectionLabel eyebrow="About Jean">
                            A Life Dedicated to{" "}
                            <HighlightedWord>Healthcare.</HighlightedWord>
                        </SectionLabel>
                    </motion.div>

                    <motion.div variants={fadeRight}>
                        <QuoteMark />

                        <p
                            className="
                                mt-5
                                font-serif
                                text-[26px]
                                font-medium
                                leading-[1.55]
                                tracking-[-0.02em]
                                text-[#082957]

                                sm:text-[31px]
                                lg:text-[35px]
                            "
                        >
                            “I have over 25 years of experience in health care.
                            Mental health is my delight. I have dedicated my life
                            to mental health.”
                        </p>

                        <p
                            className="
                                mt-7
                                text-[16px]
                                leading-[1.85]
                                text-[#60758a]
                            "
                        >
                            Jean&apos;s approach centers on understanding why
                            each person is seeking care and working
                            collaboratively to identify an appropriate path
                            forward. His goal is to provide a supportive
                            environment where concerns can be explored openly
                            and treatment can be tailored to the individual.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* =================================================
                QUALIFICATIONS
            ================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-[#f6f8f9]
                    py-20

                    sm:py-24
                    lg:py-28
                "
            >
                <div
                    className="
                        pointer-events-none
                        absolute
                        right-[-160px]
                        top-[-160px]
                        h-[420px]
                        w-[420px]
                        rounded-full
                        border
                        border-[#d79a27]/10
                    "
                />

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1280px]
                        px-6

                        sm:px-8
                        lg:px-12
                        xl:px-16
                    "
                >
                    <div
                        className="
                            grid
                            gap-10

                            lg:grid-cols-[0.8fr_1.2fr]
                            lg:gap-16
                        "
                    >
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            variants={fadeLeft}
                        >
                            <SectionLabel eyebrow="Qualifications">
                                Experience You Can{" "}
                                <HighlightedWord>Trust.</HighlightedWord>
                            </SectionLabel>

                            <p
                                className="
                                    mt-6
                                    max-w-[430px]
                                    text-[15px]
                                    leading-7
                                    text-[#60758a]
                                "
                            >
                                Professional education, licensure, membership,
                                and decades of healthcare experience form the
                                foundation of Jean&apos;s approach to care.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.15,
                            }}
                            variants={stagger}
                            className="
                                grid
                                gap-4

                                sm:grid-cols-2
                            "
                        >
                            <QualificationCard
                                icon={BadgeCheck}
                                label="New York License"
                                value="License #405385"
                            />

                            <QualificationCard
                                icon={GraduationCap}
                                label="Education"
                                value="Molloy University"
                                detail="Master's in Nursing Science • 2023"
                            />

                            <QualificationCard
                                icon={Award}
                                label="Professional Membership"
                                value="American Nurses Association"
                                detail="Membership 06093800 • 2023"
                            />

                            <QualificationCard
                                icon={BriefcaseMedical}
                                label="Clinical Experience"
                                value="In Practice for 2 Years"
                                detail="25+ years of healthcare experience"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* =================================================
                SPECIALTIES
            ================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-[#082957]
                    py-20
                    text-white

                    sm:py-24
                    lg:py-28
                "
            >
                <SpecialtyBackground />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-[200px]
                        -top-[200px]
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-[#075187]/30
                        blur-[100px]
                    "
                />

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1280px]
                        px-6

                        sm:px-8
                        lg:px-12
                        xl:px-16
                    "
                >
                    <div
                        className="
                            grid
                            gap-12

                            lg:grid-cols-[0.75fr_1.25fr]
                            lg:gap-20
                        "
                    >
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.25,
                            }}
                            variants={fadeLeft}
                        >
                            <div className="flex items-center gap-3">
                                <span className="h-px w-10 bg-[#e2b45d]" />

                                <p
                                    className="
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-[0.25em]
                                        text-[#e2b45d]
                                    "
                                >
                                    Specialties & Expertise
                                </p>
                            </div>

                            <h2
                                className="
                                    mt-5
                                    font-serif
                                    text-[39px]
                                    font-semibold
                                    leading-[1.08]
                                    tracking-[-0.03em]

                                    sm:text-[50px]
                                "
                            >
                                Comprehensive Mental Health{" "}
                                <span className="relative inline-block text-[#e2b45d]">
                                    Care.

                                    <svg
                                        viewBox="0 0 150 12"
                                        className="
                                            absolute
                                            -bottom-2
                                            left-0
                                            w-full
                                        "
                                        fill="none"
                                    >
                                        <path
                                            d="M2 8C38 2 79 11 148 4"
                                            stroke="white"
                                            strokeOpacity=".35"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </h2>

                            <p
                                className="
                                    mt-6
                                    max-w-[480px]
                                    text-[15px]
                                    leading-7
                                    text-white/60
                                "
                            >
                                Jean works with individuals experiencing a
                                broad range of mental health, behavioral, and
                                emotional concerns.
                            </p>

                            <motion.div
                                whileHover={{
                                    y: -4,
                                }}
                                className="
                                    mt-8
                                    rounded-[22px]
                                    border
                                    border-[#e2b45d]/25
                                    bg-white/[0.07]
                                    p-5
                                    backdrop-blur-sm
                                "
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-[#e2b45d]
                                            text-[#082957]
                                        "
                                    >
                                        <Sparkles className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p
                                            className="
                                                text-[10px]
                                                font-bold
                                                uppercase
                                                tracking-[0.18em]
                                                text-[#e2b45d]
                                            "
                                        >
                                            Top Specialty
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                font-serif
                                                text-[23px]
                                                font-semibold
                                            "
                                        >
                                            Personality Disorders
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.08,
                            }}
                            variants={stagger}
                            className="
                                grid
                                gap-3

                                sm:grid-cols-2
                                xl:grid-cols-3
                            "
                        >
                            {expertise.map((item) => (
                                <motion.div
                                    key={item}
                                    variants={cardReveal}
                                    whileHover={{
                                        x: 5,
                                        scale: 1.015,
                                    }}
                                    className="
                                        flex
                                        min-h-[58px]
                                        items-center
                                        gap-3
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-white/[0.055]
                                        px-4
                                        py-3
                                        text-[13px]
                                        font-medium
                                        text-white/80
                                        backdrop-blur-sm
                                        transition-colors

                                        hover:border-[#e2b45d]/35
                                        hover:bg-white/[0.09]
                                        hover:text-white
                                    "
                                >
                                    <Check
                                        className="
                                            h-4
                                            w-4
                                            shrink-0
                                            text-[#e2b45d]
                                        "
                                    />

                                    {item}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* =================================================
                TREATMENT APPROACH
            ================================================= */}

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
                <SectionSideArtwork side="right" />

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1280px]
                        px-6

                        sm:px-8
                        lg:px-12
                        xl:px-16
                    "
                >
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                        variants={fadeUp}
                        className="
                            mx-auto
                            max-w-[760px]
                            text-center
                        "
                    >
                        <p
                            className="
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[0.25em]
                                text-[#a96f13]
                            "
                        >
                            Treatment Approach
                        </p>

                        <h2
                            className="
                                mt-4
                                font-serif
                                text-[40px]
                                font-semibold
                                leading-[1.05]
                                tracking-[-0.035em]
                                text-[#082957]

                                sm:text-[52px]
                            "
                        >
                            Thoughtful Care Built Around{" "}
                            <HighlightedWord>You.</HighlightedWord>
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-6
                                max-w-[650px]
                                text-[16px]
                                leading-7
                                text-[#60758a]
                            "
                        >
                            Treatment begins by understanding what brought you
                            to care and identifying approaches that fit your
                            needs and goals.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.18,
                        }}
                        variants={stagger}
                        className="
                            mt-12
                            grid
                            gap-5

                            md:grid-cols-3
                            lg:mt-16
                        "
                    >
                        {treatmentApproaches.map(
                            ({
                                title,
                                abbreviation,
                                description,
                                icon: Icon,
                            }) => (
                                <motion.div
                                    key={title}
                                    variants={cardReveal}
                                    whileHover={{
                                        y: -8,
                                    }}
                                    className="
                                        group
                                        relative
                                        min-h-[330px]
                                        overflow-hidden
                                        rounded-[28px]
                                        border
                                        border-[#082957]/[0.08]
                                        bg-[#f8fafb]
                                        p-7
                                        transition-shadow
                                        duration-300

                                        hover:border-[#d79a27]/30
                                        hover:shadow-[0_24px_55px_rgba(8,41,87,0.11)]

                                        lg:p-8
                                    "
                                >
                                    <DecorativeLines />

                                    <div
                                        className="
                                            relative
                                            z-10
                                            flex
                                            h-14
                                            w-14
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            bg-[#082957]
                                            text-[#e2b45d]
                                            shadow-[0_10px_25px_rgba(8,41,87,0.15)]
                                            transition-all
                                            duration-500

                                            group-hover:-rotate-3
                                            group-hover:scale-105
                                        "
                                    >
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <p
                                        className="
                                            relative
                                            z-10
                                            mt-7
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-[0.18em]
                                            text-[#b5791b]
                                        "
                                    >
                                        {abbreviation}
                                    </p>

                                    <h3
                                        className="
                                            relative
                                            z-10
                                            mt-2
                                            font-serif
                                            text-[25px]
                                            font-semibold
                                            leading-tight
                                            text-[#082957]
                                        "
                                    >
                                        {title}
                                    </h3>

                                    <p
                                        className="
                                            relative
                                            z-10
                                            mt-4
                                            text-[14px]
                                            leading-7
                                            text-[#60758a]
                                        "
                                    >
                                        {description}
                                    </p>
                                </motion.div>
                            )
                        )}
                    </motion.div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 35,
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
                            duration: 0.75,
                            ease: easing,
                        }}
                        className="
                            relative
                            mx-auto
                            mt-12
                            max-w-[940px]
                            overflow-hidden
                            rounded-[28px]
                            bg-[#f5f1e8]
                            px-7
                            py-8

                            sm:px-10

                            lg:mt-16
                            lg:px-12
                            lg:py-10
                        "
                    >
                        <QuoteBackground />

                        <div className="relative z-10">
                            <QuoteMark />

                            <blockquote
                                className="
                                    mt-4
                                    font-serif
                                    text-[22px]
                                    leading-[1.6]
                                    text-[#082957]

                                    sm:text-[26px]
                                "
                            >
                                “I often use Cognitive Behavioral Therapy in my
                                practice. In your first session, we&apos;ll
                                explore what brought you to therapy and then
                                decide the most appropriate ways to help you make
                                progress.”
                            </blockquote>

                            <p
                                className="
                                    mt-5
                                    text-[13px]
                                    font-bold
                                    text-[#a96f13]
                                "
                            >
                                — Jean Rigaud Cetoute
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* =================================================
                CLIENT FOCUS
            ================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-[#f5f8fa]
                    py-20

                    sm:py-24
                    lg:py-28
                "
            >
                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-[180px]
                        -left-[180px]
                        h-[460px]
                        w-[460px]
                        rounded-full
                        border
                        border-[#075187]/[0.06]
                    "
                />

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1280px]
                        px-6

                        sm:px-8
                        lg:px-12
                        xl:px-16
                    "
                >
                    <div
                        className="
                            grid
                            gap-10

                            lg:grid-cols-[0.7fr_1.3fr]
                            lg:gap-16
                        "
                    >
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            variants={fadeLeft}
                        >
                            <SectionLabel eyebrow="Client Focus">
                                Care Across Every{" "}
                                <HighlightedWord>
                                    Stage of Life.
                                </HighlightedWord>
                            </SectionLabel>

                            <p
                                className="
                                    mt-6
                                    max-w-[430px]
                                    text-[15px]
                                    leading-7
                                    text-[#60758a]
                                "
                            >
                                Jean works with clients across age groups and
                                with individuals, couples, and families.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.15,
                            }}
                            variants={stagger}
                            className="
                                grid
                                gap-5

                                sm:grid-cols-2
                            "
                        >
                            <FocusCard
                                icon={UserRound}
                                title="Ages"
                                items={clientGroups}
                            />

                            <FocusCard
                                icon={UsersRound}
                                title="Participants"
                                items={participants}
                            />

                            <FocusCard
                                icon={Languages}
                                title="Languages"
                                items={languages}
                                className="sm:col-span-2"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* =================================================
                INSURANCE
            ================================================= */}

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
                <InsuranceArtwork />

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1280px]
                        px-6

                        sm:px-8
                        lg:px-12
                        xl:px-16
                    "
                >
                    <div
                        className="
                            grid
                            gap-12

                            lg:grid-cols-[0.72fr_1.28fr]
                            lg:gap-20
                        "
                    >
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.25,
                            }}
                            variants={fadeLeft}
                        >
                            <SectionLabel eyebrow="Insurance & Payment">
                                Making Care More{" "}
                                <HighlightedWord>
                                    Accessible.
                                </HighlightedWord>
                            </SectionLabel>

                            <motion.div
                                whileHover={{
                                    y: -4,
                                }}
                                className="
                                    relative
                                    mt-8
                                    overflow-hidden
                                    rounded-[24px]
                                    border
                                    border-[#d79a27]/25
                                    bg-[#faf7f0]
                                    p-6
                                    shadow-[0_12px_30px_rgba(8,41,87,0.04)]
                                "
                            >
                                <MiniCardArtwork />

                                <div className="relative z-10 flex gap-4">
                                    <div
                                        className="
                                            flex
                                            h-11
                                            w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-[#082957]
                                            text-[#e2b45d]
                                        "
                                    >
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p
                                            className="
                                                font-serif
                                                text-[20px]
                                                font-semibold
                                                text-[#082957]
                                            "
                                        >
                                            In-Network & Out-of-Network Options
                                        </p>

                                        <p
                                            className="
                                                mt-2
                                                text-[13px]
                                                leading-6
                                                text-[#60758a]
                                            "
                                        >
                                            Jean is in-network for Blue Cross
                                            and Cigna. For out-of-network
                                            clients, a superbill can be provided
                                            to assist with reimbursement.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <div>
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 15,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{ once: true }}
                                className="
                                    mb-5
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#a96f13]
                                "
                            >
                                Insurance Plans
                            </motion.p>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: true,
                                    amount: 0.12,
                                }}
                                variants={stagger}
                                className="
                                    grid
                                    gap-3

                                    sm:grid-cols-2
                                "
                            >
                                {insurancePlans.map((plan) => (
                                    <motion.div
                                        key={plan}
                                        variants={cardReveal}
                                        whileHover={{
                                            x: 5,
                                            scale: 1.01,
                                        }}
                                        className="
                                            group
                                            relative
                                            flex
                                            min-h-[62px]
                                            items-center
                                            gap-3
                                            overflow-hidden
                                            rounded-2xl
                                            border
                                            border-[#082957]/[0.08]
                                            bg-[#f8fafb]
                                            px-4
                                            py-3
                                            transition-shadow

                                            hover:border-[#d79a27]/30
                                            hover:shadow-[0_10px_25px_rgba(8,41,87,0.07)]
                                        "
                                    >
                                        <span
                                            className="
                                                absolute
                                                bottom-0
                                                left-0
                                                h-[2px]
                                                w-0
                                                bg-[#d79a27]
                                                transition-all
                                                duration-500
                                                group-hover:w-full
                                            "
                                        />

                                        <CheckCircle2
                                            className="
                                                h-5
                                                w-5
                                                shrink-0
                                                text-[#075187]
                                            "
                                        />

                                        <span
                                            className="
                                                text-[13px]
                                                font-semibold
                                                leading-5
                                                text-[#294865]
                                            "
                                        >
                                            {plan}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.p
                                initial={{
                                    opacity: 0,
                                }}
                                whileInView={{
                                    opacity: 1,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.25,
                                }}
                                className="
                                    mt-5
                                    text-[11px]
                                    leading-5
                                    text-[#718497]
                                "
                            >
                                Insurance participation and benefits can vary
                                by plan. Contact Solid Rock Behavioral Health to
                                verify current coverage and benefits before your
                                appointment.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================================
                ENDORSEMENT
            ================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-[#f5f1e8]
                    py-20

                    sm:py-24
                    lg:py-28
                "
            >
                <EndorsementArtwork />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.25,
                    }}
                    variants={stagger}
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[980px]
                        px-6
                        text-center

                        sm:px-8
                        lg:px-12
                    "
                >
                    <motion.p
                        variants={fadeUp}
                        className="
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-[0.25em]
                            text-[#a96f13]
                        "
                    >
                        Professional Endorsement
                    </motion.p>

                    <motion.div
                        variants={cardReveal}
                        className="
                            mx-auto
                            mt-6
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            bg-[#082957]
                            font-serif
                            text-[34px]
                            text-[#e2b45d]
                            shadow-[0_12px_30px_rgba(8,41,87,0.16)]
                        "
                    >
                        “
                    </motion.div>

                    <motion.blockquote
                        variants={fadeUp}
                        className="
                            mx-auto
                            mt-7
                            max-w-[850px]
                            font-serif
                            text-[26px]
                            font-medium
                            leading-[1.5]
                            tracking-[-0.02em]
                            text-[#082957]

                            sm:text-[31px]
                            lg:text-[35px]
                        "
                    >
                        “Jean is a kind and caring provider who is always
                        advocating for his patients. He goes above and beyond to
                        exceed expectations in quality and professionalism. I
                        recommend him for your mental health needs.”
                    </motion.blockquote>

                    <motion.div
                        variants={fadeUp}
                        className="
                            mx-auto
                            mt-8
                            h-px
                            w-14
                            bg-[#d79a27]
                        "
                    />

                    <motion.p
                        variants={fadeUp}
                        className="
                            mt-5
                            text-[15px]
                            font-bold
                            text-[#082957]
                        "
                    >
                        Regine Blaise
                    </motion.p>

                    <motion.p
                        variants={fadeUp}
                        className="
                            mt-1
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-[#718497]
                        "
                    >
                        Psychiatric Nurse Practitioner, PMHNP, BC
                    </motion.p>
                </motion.div>
            </section>

            {/* =================================================
                LOCATION / TELEHEALTH
            ================================================= */}

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
                <div
                    className="
                        mx-auto
                        max-w-[1280px]
                        px-6

                        sm:px-8
                        lg:px-12
                        xl:px-16
                    "
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 45,
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
                            duration: 0.8,
                            ease: easing,
                        }}
                        className="
                            grid
                            overflow-hidden
                            rounded-[32px]
                            border
                            border-[#082957]/[0.08]
                            shadow-[0_25px_70px_rgba(8,41,87,0.10)]

                            lg:grid-cols-2
                        "
                    >
                        {/* LOCATION */}

                        <div
                            className="
                                group
                                relative
                                overflow-hidden
                                bg-[#f5f8fa]
                                p-8

                                sm:p-10
                                lg:p-12
                            "
                        >
                            <LocationArtwork />

                            <div className="relative z-10">
                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-[#082957]
                                        text-[#e2b45d]
                                        transition-transform
                                        duration-500

                                        group-hover:-rotate-3
                                        group-hover:scale-105
                                    "
                                >
                                    <MapPin className="h-5 w-5" />
                                </div>

                                <p
                                    className="
                                        mt-6
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-[#a96f13]
                                    "
                                >
                                    Primary Location
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        font-serif
                                        text-[31px]
                                        font-semibold
                                        text-[#082957]
                                    "
                                >
                                    Brooklyn, New York
                                </h2>

                                <p
                                    className="
                                        mt-2
                                        text-[15px]
                                        text-[#60758a]
                                    "
                                >
                                    Brooklyn, NY 11236
                                </p>

                                <div
                                    className="
                                        mt-7
                                        flex
                                        flex-wrap
                                        gap-2
                                    "
                                >
                                    {nearbyAreas.map((area) => (
                                        <span
                                            key={area}
                                            className="
                                                rounded-full
                                                border
                                                border-[#082957]/10
                                                bg-white/80
                                                px-4
                                                py-2
                                                text-[11px]
                                                font-semibold
                                                text-[#536a82]
                                                backdrop-blur-sm
                                            "
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* TELEHEALTH */}

                        <div
                            className="
                                group
                                relative
                                overflow-hidden
                                bg-[#082957]
                                p-8
                                text-white

                                sm:p-10
                                lg:p-12
                            "
                        >
                            <TelehealthArtwork />

                            <div className="relative z-10">
                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-[#e2b45d]
                                        text-[#082957]
                                        transition-transform
                                        duration-500

                                        group-hover:rotate-3
                                        group-hover:scale-105
                                    "
                                >
                                    <Stethoscope className="h-5 w-5" />
                                </div>

                                <p
                                    className="
                                        mt-6
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-[#e2b45d]
                                    "
                                >
                                    Telehealth Available
                                </p>

                                <h2
                                    className="
                                        mt-2
                                        font-serif
                                        text-[31px]
                                        font-semibold
                                    "
                                >
                                    Care From Wherever You Are.
                                </h2>

                                <p
                                    className="
                                        mt-4
                                        max-w-[480px]
                                        text-[14px]
                                        leading-7
                                        text-white/65
                                    "
                                >
                                    Jean offers online video sessions, providing
                                    a convenient option for accessing mental
                                    health care. Availability is offered seven
                                    days a week.
                                </p>

                                <div
                                    className="
                                        mt-6
                                        flex
                                        items-center
                                        gap-3
                                        text-[13px]
                                        text-white/75
                                    "
                                >
                                    <Clock3 className="h-4 w-4 text-[#e2b45d]" />

                                    Available seven days a week
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* =================================================
                FINAL CTA
            ================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-[#061f43]
                    py-20
                    text-white

                    sm:py-24
                "
            >
                <FinalCTAArtwork />

                <div
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        h-[500px]
                        w-[500px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#075187]/30
                        blur-[120px]
                    "
                />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    variants={stagger}
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[850px]
                        px-6
                        text-center

                        sm:px-8
                    "
                >
                    <motion.p
                        variants={fadeUp}
                        className="
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-[0.25em]
                            text-[#e2b45d]
                        "
                    >
                        Take the First Step
                    </motion.p>

                    <motion.h2
                        variants={fadeUp}
                        className="
                            mt-5
                            font-serif
                            text-[40px]
                            font-semibold
                            leading-[1.05]
                            tracking-[-0.035em]

                            sm:text-[53px]
                        "
                    >
                        Start With a Free
                        <br />
                        <span className="text-[#e2b45d]">
                            15-Minute Consultation.
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="
                            mx-auto
                            mt-6
                            max-w-[620px]
                            text-[15px]
                            leading-7
                            text-white/60
                        "
                    >
                        Have questions about treatment, insurance, or getting
                        started? Reach out to Solid Rock Behavioral Health and
                        speak with us about your needs.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        className="
                            mt-9
                            flex
                            flex-col
                            justify-center
                            gap-3

                            sm:flex-row
                        "
                    >
                        <a
                            href="tel:+19294472430"
                            className="
                                inline-flex
                                min-h-[56px]
                                items-center
                                justify-center
                                gap-3
                                rounded-full
                                bg-[#e2b45d]
                                px-7
                                text-[14px]
                                font-bold
                                text-[#061f43]
                                shadow-[0_15px_35px_rgba(0,0,0,0.16)]
                                transition-all
                                duration-300

                                hover:-translate-y-1
                                hover:bg-[#edc777]
                            "
                        >
                            <Phone className="h-4 w-4" />
                            Call (929) 447-2430
                        </a>

                        <Link
                            href="/contact"
                            className="
                                group
                                inline-flex
                                min-h-[56px]
                                items-center
                                justify-center
                                gap-3
                                rounded-full
                                border
                                border-white/15
                                bg-white/[0.06]
                                px-7
                                text-[14px]
                                font-bold
                                text-white
                                transition-all
                                duration-300

                                hover:-translate-y-1
                                hover:bg-white/10
                            "
                        >
                            Contact Us

                            <ArrowRight
                                className="
                                    h-4
                                    w-4
                                    transition-transform
                                    group-hover:translate-x-1
                                "
                            />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </main>
    );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function CredentialBadge({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#082957]/10
                bg-white/75
                px-4
                py-2.5
                text-[11px]
                font-semibold
                text-[#294865]
                shadow-sm
                backdrop-blur-sm
            "
        >
            <CheckCircle2 className="h-4 w-4 text-[#075187]" />
            {children}
        </div>
    );
}

function SectionLabel({
    eyebrow,
    children,
}: {
    eyebrow: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#d79a27]" />

                <p
                    className="
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-[#a96f13]
                    "
                >
                    {eyebrow}
                </p>
            </div>

            <h2
                className="
                    mt-5
                    max-w-[540px]
                    font-serif
                    text-[39px]
                    font-semibold
                    leading-[1.08]
                    tracking-[-0.03em]
                    text-[#082957]

                    sm:text-[48px]
                "
            >
                {children}
            </h2>
        </div>
    );
}

function HighlightedWord({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <span className="relative inline-block text-[#075187]">
            {children}

            <svg
                viewBox="0 0 180 12"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
                className="
                    absolute
                    -bottom-2
                    left-0
                    h-[8px]
                    w-full
                    overflow-visible
                "
            >
                <path
                    d="M2 7C45 2 95 11 178 4"
                    stroke="#D79A27"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
        </span>
    );
}

function QualificationCard({
    icon: Icon,
    label,
    value,
    detail,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    detail?: string;
}) {
    return (
        <motion.div
            variants={cardReveal}
            whileHover={{
                y: -6,
            }}
            className="
                group
                relative
                min-h-[220px]
                overflow-hidden
                rounded-[24px]
                border
                border-[#082957]/[0.08]
                bg-white
                p-6
                shadow-[0_10px_30px_rgba(8,41,87,0.04)]
                transition-shadow
                duration-500

                hover:border-[#d79a27]/30
                hover:shadow-[0_22px_50px_rgba(8,41,87,0.10)]
            "
        >
            <CardAccent />

            <div
                className="
                    relative
                    z-10
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#eef4f6]
                    text-[#075187]
                    transition-all
                    duration-500

                    group-hover:-rotate-3
                    group-hover:bg-[#082957]
                    group-hover:text-[#e2b45d]
                "
            >
                <Icon className="h-5 w-5" />
            </div>

            <p
                className="
                    relative
                    z-10
                    mt-5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[#a96f13]
                "
            >
                {label}
            </p>

            <p
                className="
                    relative
                    z-10
                    mt-2
                    font-serif
                    text-[20px]
                    font-semibold
                    leading-tight
                    text-[#082957]
                "
            >
                {value}
            </p>

            {detail && (
                <p
                    className="
                        relative
                        z-10
                        mt-2
                        text-[12px]
                        leading-5
                        text-[#718497]
                    "
                >
                    {detail}
                </p>
            )}
        </motion.div>
    );
}

function FocusCard({
    icon: Icon,
    title,
    items,
    className = "",
}: {
    icon: React.ElementType;
    title: string;
    items: string[];
    className?: string;
}) {
    return (
        <motion.div
            variants={cardReveal}
            whileHover={{
                y: -5,
            }}
            className={`
                group
                relative
                overflow-hidden
                rounded-[26px]
                border
                border-[#082957]/[0.08]
                bg-white
                p-6
                shadow-[0_10px_30px_rgba(8,41,87,0.035)]
                transition-shadow

                hover:border-[#d79a27]/25
                hover:shadow-[0_20px_45px_rgba(8,41,87,0.08)]

                sm:p-7

                ${className}
            `}
        >
            <CardAccent />

            <div className="relative z-10">
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#082957]
                            text-[#e2b45d]
                            transition-transform
                            duration-500

                            group-hover:-rotate-3
                            group-hover:scale-105
                        "
                    >
                        <Icon className="h-5 w-5" />
                    </div>

                    <h3
                        className="
                            font-serif
                            text-[21px]
                            font-semibold
                            text-[#082957]
                        "
                    >
                        {title}
                    </h3>
                </div>

                <div
                    className="
                        mt-5
                        flex
                        flex-wrap
                        gap-2
                    "
                >
                    {items.map((item) => (
                        <span
                            key={item}
                            className="
                                rounded-full
                                border
                                border-[#082957]/[0.04]
                                bg-[#f2f6f8]
                                px-4
                                py-2
                                text-[11px]
                                font-semibold
                                text-[#536a82]
                            "
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function QuoteMark() {
    return (
        <div
            className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-[#082957]
                font-serif
                text-[27px]
                text-[#e2b45d]
                shadow-[0_10px_25px_rgba(8,41,87,0.13)]
            "
        >
            “
        </div>
    );
}

/* =========================================================
   SVG ARTWORK
========================================================= */

function HeroArtwork() {
    return (
        <svg
            viewBox="0 0 900 700"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                right-[-220px]
                top-[-50px]
                h-[760px]
                w-[900px]
                opacity-[0.18]
            "
        >
            <motion.path
                d="M910 80C720 10 610 100 635 230C660 365 835 330 790 470C755 580 610 555 560 700"
                stroke="#075187"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                }}
            />

            <motion.path
                d="M930 130C760 60 665 135 690 245C715 350 855 350 820 465C790 565 665 565 625 700"
                stroke="#D79A27"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    duration: 2.3,
                    delay: 0.15,
                    ease: "easeInOut",
                }}
            />

            <motion.path
                d="M950 190C810 120 720 175 745 270C770 365 885 370 855 475C830 565 725 585 700 700"
                stroke="#075187"
                strokeWidth="1.25"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    duration: 2.5,
                    delay: 0.3,
                }}
            />

            <motion.circle
                cx="690"
                cy="245"
                r="7"
                fill="#D79A27"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    delay: 1.5,
                    type: "spring",
                }}
            />

            <circle
                cx="690"
                cy="245"
                r="18"
                stroke="#D79A27"
                strokeWidth="1"
            />
        </svg>
    );
}

function CardAccent() {
    return (
        <svg
            viewBox="0 0 300 220"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -bottom-10
                -right-12
                h-[180px]
                w-[240px]
                opacity-[0.11]
                transition-all
                duration-700

                group-hover:-translate-x-2
                group-hover:-translate-y-2
                group-hover:opacity-[0.20]
            "
        >
            <path
                d="M320 30C240 15 205 60 220 110C237 166 170 175 148 230"
                stroke="#075187"
                strokeWidth="2"
            />

            <path
                d="M330 65C265 48 238 80 248 122C260 168 210 185 195 230"
                stroke="#D79A27"
                strokeWidth="1.5"
            />

            <path
                d="M340 100C285 82 265 105 272 140C280 175 245 195 235 230"
                stroke="#075187"
                strokeWidth="1"
            />

            <circle
                cx="220"
                cy="110"
                r="5"
                fill="#D79A27"
            />

            <circle
                cx="220"
                cy="110"
                r="11"
                stroke="#D79A27"
                strokeWidth="1"
            />
        </svg>
    );
}

function DecorativeLines() {
    return (
        <svg
            viewBox="0 0 400 300"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -bottom-14
                -right-16
                h-[240px]
                w-[310px]
                opacity-[0.11]
                transition-all
                duration-700

                group-hover:-translate-x-3
                group-hover:-translate-y-2
                group-hover:opacity-[0.20]
            "
        >
            <path
                d="M430 65C355 25 304 39 270 82C234 127 259 171 217 205C173 241 111 208 66 245C37 270 28 302 30 330"
                stroke="#075187"
                strokeWidth="2"
            />

            <path
                d="M445 98C372 62 325 70 294 109C260 151 282 189 242 222C201 256 142 226 99 259"
                stroke="#D79A27"
                strokeWidth="1.5"
            />

            <path
                d="M454 130C388 97 345 103 316 138C286 175 303 210 267 240C230 270 178 245 140 273"
                stroke="#075187"
                strokeWidth="1"
            />

            <circle cx="318" cy="96" r="5" fill="#D79A27" />
            <circle
                cx="318"
                cy="96"
                r="12"
                stroke="#D79A27"
            />
        </svg>
    );
}

function SpecialtyBackground() {
    return (
        <svg
            viewBox="0 0 1440 800"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
            className="
                pointer-events-none
                absolute
                inset-0
                h-full
                w-full
                opacity-[0.10]
            "
        >
            <motion.path
                d="M-100 620C180 400 300 720 570 470C790 265 965 440 1180 220C1300 100 1400 105 1540 30"
                stroke="#E2B45D"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2 }}
            />

            <motion.path
                d="M-100 690C170 470 330 760 600 520C830 315 1010 490 1220 275C1350 140 1430 155 1540 90"
                stroke="white"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 2.5,
                    delay: 0.15,
                }}
            />

            <motion.path
                d="M-120 750C140 545 350 790 630 585C870 405 1050 545 1260 340C1380 225 1460 225 1560 160"
                stroke="#E2B45D"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 2.8,
                    delay: 0.25,
                }}
            />
        </svg>
    );
}

function SectionSideArtwork({
    side,
}: {
    side: "left" | "right";
}) {
    return (
        <svg
            viewBox="0 0 500 600"
            fill="none"
            aria-hidden="true"
            className={`
                pointer-events-none
                absolute
                top-1/2
                hidden
                h-[600px]
                w-[500px]
                -translate-y-1/2
                opacity-[0.055]

                lg:block

                ${side === "left"
                    ? "-left-[300px]"
                    : "-right-[300px]"
                }
            `}
        >
            <circle
                cx="250"
                cy="300"
                r="210"
                stroke="#075187"
                strokeWidth="2"
            />

            <circle
                cx="250"
                cy="300"
                r="165"
                stroke="#D79A27"
                strokeWidth="2"
            />

            <circle
                cx="250"
                cy="300"
                r="120"
                stroke="#075187"
            />
        </svg>
    );
}

function QuoteBackground() {
    return (
        <svg
            viewBox="0 0 500 250"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -right-16
                -top-16
                h-[280px]
                w-[520px]
                opacity-[0.10]
            "
        >
            <path
                d="M520 30C410 -10 330 40 350 105C370 170 275 155 235 250"
                stroke="#075187"
                strokeWidth="2"
            />

            <path
                d="M535 70C445 35 390 70 402 122C414 175 340 175 315 250"
                stroke="#D79A27"
                strokeWidth="2"
            />
        </svg>
    );
}

function MiniCardArtwork() {
    return (
        <svg
            viewBox="0 0 300 200"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -bottom-16
                -right-16
                h-[220px]
                w-[300px]
                opacity-[0.10]
            "
        >
            <circle
                cx="220"
                cy="120"
                r="100"
                stroke="#075187"
                strokeWidth="2"
            />

            <circle
                cx="220"
                cy="120"
                r="70"
                stroke="#D79A27"
            />
        </svg>
    );
}

function InsuranceArtwork() {
    return (
        <svg
            viewBox="0 0 500 500"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -bottom-[180px]
                -right-[160px]
                h-[500px]
                w-[500px]
                opacity-[0.055]
            "
        >
            <circle
                cx="250"
                cy="250"
                r="220"
                stroke="#075187"
                strokeWidth="2"
            />

            <circle
                cx="250"
                cy="250"
                r="175"
                stroke="#D79A27"
                strokeWidth="2"
            />

            <circle
                cx="250"
                cy="250"
                r="125"
                stroke="#075187"
            />
        </svg>
    );
}

function EndorsementArtwork() {
    return (
        <svg
            viewBox="0 0 1400 500"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
            className="
                pointer-events-none
                absolute
                inset-0
                h-full
                w-full
                opacity-[0.075]
            "
        >
            <motion.path
                d="M-100 390C180 220 340 480 570 300C790 130 930 330 1180 150C1280 80 1390 75 1510 30"
                stroke="#075187"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 2.2,
                }}
            />

            <motion.path
                d="M-100 440C170 280 360 520 610 350C850 190 1010 370 1230 210C1340 130 1430 130 1510 90"
                stroke="#D79A27"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 2.5,
                    delay: 0.15,
                }}
            />
        </svg>
    );
}

function LocationArtwork() {
    return (
        <svg
            viewBox="0 0 400 400"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -bottom-32
                -right-24
                h-[400px]
                w-[400px]
                opacity-[0.08]
                transition-transform
                duration-700

                group-hover:-translate-x-2
                group-hover:-translate-y-2
            "
        >
            <circle
                cx="210"
                cy="210"
                r="170"
                stroke="#075187"
                strokeWidth="2"
            />

            <circle
                cx="210"
                cy="210"
                r="125"
                stroke="#D79A27"
                strokeWidth="2"
            />

            <circle
                cx="210"
                cy="210"
                r="80"
                stroke="#075187"
            />
        </svg>
    );
}

function TelehealthArtwork() {
    return (
        <svg
            viewBox="0 0 500 400"
            fill="none"
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                -bottom-20
                -right-24
                h-[400px]
                w-[500px]
                opacity-[0.11]
                transition-transform
                duration-700

                group-hover:-translate-x-2
                group-hover:-translate-y-2
            "
        >
            <path
                d="M530 40C390 -5 320 70 350 150C380 230 265 235 220 420"
                stroke="#E2B45D"
                strokeWidth="2"
            />

            <path
                d="M550 90C430 45 380 100 400 165C420 230 335 260 305 420"
                stroke="white"
                strokeWidth="1.5"
            />

            <path
                d="M565 145C470 110 430 145 445 200C460 255 400 290 385 420"
                stroke="#E2B45D"
                strokeWidth="1"
            />
        </svg>
    );
}

function FinalCTAArtwork() {
    return (
        <svg
            viewBox="0 0 1440 500"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
            className="
                pointer-events-none
                absolute
                inset-0
                h-full
                w-full
                opacity-[0.10]
            "
        >
            <motion.path
                d="M-80 410C180 210 390 520 650 300C850 130 1050 330 1260 130C1350 45 1420 45 1510 10"
                stroke="#E2B45D"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 2.3,
                }}
            />

            <motion.path
                d="M-100 470C180 285 420 560 690 355C900 195 1080 380 1300 195C1380 125 1450 105 1530 80"
                stroke="white"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 2.7,
                    delay: 0.15,
                }}
            />
        </svg>
    );
}