"use client";

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
    Check,
    X
} from "lucide-react";

import FreeConsultationModal from "./FreeConsultationModal";
import BookAppointmentButton from "./BookAppointmentButton";

const services = [
    {
        number: "01",
        title: "ADHD",
        description:
            "Personalized strategies for focus and productivity.",
        href: "/services/adhd",
        overview: "ADHD is a neurodevelopmental condition that can affect attention, organization, impulse control, working memory, and the ability to regulate activity level. Symptoms can look different from person to person and may affect school, work, relationships, and everyday routines.",
        treatment: "Care begins with a thoughtful psychiatric evaluation that considers symptoms, history, daily functioning, and other factors that may contribute to attention difficulties. When appropriate, treatment may include education, practical behavioral strategies, coordination with therapy, and medication management.",
        supports: [
            "Attention and concentration difficulties",
            "Organization and time-management challenges",
            "Impulsivity or restlessness",
            "Medication evaluation and ongoing monitoring",
        ],
        icon: Focus,
    },
    {
        number: "02",
        title: "Anxiety & Depression",
        description:
            "Relief from the weight of anxiety and depression.",
        href: "/services/anxiety-depression",
        overview: "Anxiety and depression can affect mood, energy, sleep, concentration, motivation, relationships, and a person’s ability to manage everyday responsibilities. These conditions may occur separately or together, and the experience can vary greatly from one person to another.",
        treatment: "Treatment is individualized after an evaluation of symptoms, history, stressors, functioning, and personal goals. Depending on clinical needs, care may include supportive education, coping strategies, coordination with psychotherapy, and medication management when appropriate.",
        supports: [
            "Persistent worry, fear, or tension",
            "Low mood or loss of interest",
            "Sleep, energy, or concentration changes",
            "Medication evaluation and follow-up care",
        ],
        icon: CloudRain,
    },
    {
        number: "03",
        title: "Bipolar Disorder",
        description:
            "A comprehensive approach to navigating bipolar disorder.",
        href: "/services/bipolar-disorder",
        overview: "Bipolar disorder is a mood disorder associated with significant shifts in mood, energy, activity, sleep, and functioning. Episodes may include periods of depression as well as periods of unusually elevated, energized, or irritable mood.",
        treatment: "Care focuses on careful assessment, mood stability, symptom monitoring, and an individualized treatment plan. Depending on the person’s needs, treatment may include education, medication management, coordination with psychotherapy, and ongoing monitoring for changes in mood, sleep, and functioning.",
        supports: [
            "Changes in mood and energy",
            "Sleep and activity changes",
            "Depressive or elevated mood episodes",
            "Ongoing medication and symptom monitoring",
        ],
        icon: RefreshCcw,
    },
    {
        number: "04",
        title: "Anger Management",
        description:
            "Techniques for managing and channeling anger effectively.",
        href: "/services/anger-management",
        overview: "Frequent or intense anger can affect relationships, work, family life, and overall well-being. Anger may be connected with stress, mood symptoms, trauma, impulsivity, communication patterns, or other underlying concerns.",
        treatment: "We look beyond the anger itself to understand possible triggers and contributing mental-health factors. Care may include identifying patterns, strengthening emotional-regulation and coping skills, coordinating with therapy, and addressing related psychiatric symptoms when clinically appropriate.",
        supports: [
            "Identifying triggers and patterns",
            "Emotional regulation strategies",
            "Stress and impulse-management support",
            "Evaluation of related mood or psychiatric concerns",
        ],
        icon: Flame,
    },
    {
        number: "05",
        title: "PTSD",
        description:
            "Support and healing for past traumas.",
        href: "/services/ptsd",
        overview: "Post-traumatic stress disorder can develop after experiencing or witnessing a traumatic event. Symptoms may include intrusive memories, nightmares, avoidance, heightened alertness, changes in mood, sleep difficulties, or feeling disconnected from others.",
        treatment: "Treatment begins with a trauma-informed evaluation in a respectful, supportive setting. Depending on individual needs, care may include education about trauma responses, coordination with evidence-based psychotherapy, symptom-focused strategies, and medication management when appropriate.",
        supports: [
            "Trauma-related anxiety and distress",
            "Nightmares or sleep disruption",
            "Hypervigilance and avoidance",
            "Medication evaluation and coordinated care",
        ],
        icon: ShieldCheck,
    },
    {
        number: "06",
        title: "Insomnia",
        description:
            "Restorative solutions for sleep disturbances.",
        href: "/services/insomnia",
        overview: "Insomnia involves ongoing difficulty falling asleep, staying asleep, or obtaining restorative sleep. Poor sleep can affect concentration, mood, energy, physical well-being, and daily functioning, and it may occur alongside other mental-health concerns.",
        treatment: "We assess sleep patterns as well as medical, behavioral, medication-related, and psychiatric factors that may be contributing. Treatment may include sleep education, behavioral recommendations, coordination with other providers, and medication management when clinically appropriate.",
        supports: [
            "Difficulty falling or staying asleep",
            "Non-restorative sleep",
            "Sleep-related mood or concentration problems",
            "Review of contributing medications and psychiatric symptoms",
        ],
        icon: Moon,
    },
    {
        number: "07",
        title: "Psychosis",
        description:
            "Compassionate care for managing psychosis symptoms.",
        href: "/services/psychosis",
        overview: "Psychosis can involve changes in how a person perceives, interprets, or experiences reality. Symptoms may include hallucinations, unusual or fixed beliefs, disorganized thinking, or significant changes in behavior and functioning.",
        treatment: "Care requires careful psychiatric assessment and close follow-up. Treatment is individualized and may include medication management, education and support for the patient and family, coordination with therapists or other clinicians, and monitoring of symptoms and functioning.",
        supports: [
            "Changes in perception or thinking",
            "Hallucinations or unusual beliefs",
            "Changes in behavior or functioning",
            "Medication management and ongoing monitoring",
        ],
        icon: Sparkles,
    },
    {
        number: "08",
        title: "OCD",
        description:
            "Coping strategies for obsessive-compulsive disorder.",
        href: "/services/ocd",
        overview: "Obsessive-compulsive disorder involves recurring unwanted thoughts, urges, or images and repetitive behaviors or mental rituals that a person feels driven to perform. Symptoms can be time-consuming and interfere with work, relationships, routines, and quality of life.",
        treatment: "Treatment starts with an assessment of obsessive thoughts, compulsive behaviors, related anxiety, and daily functioning. Depending on clinical needs, care may include education, medication management, and coordination with evidence-based psychotherapy such as exposure and response prevention.",
        supports: [
            "Intrusive or unwanted thoughts",
            "Repetitive behaviors or mental rituals",
            "Anxiety related to obsessions and compulsions",
            "Medication management and therapy coordination",
        ],
        icon: Brain,
    },
];

export default function ServicesSection() {
    const [consultationOpen, setConsultationOpen] =
        useState(false);
    const [selectedService, setSelectedService] = useState<
        (typeof services)[number] | null
    >(null);

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
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedService(service)
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
                                                text-left
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
                                        </button>
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

            <ServiceDetailModal
                service={selectedService}
                onClose={() => setSelectedService(null)}
            />

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


type ServiceDetailModalProps = {
    service: (typeof services)[number] | null;
    onClose: () => void;
};

function ServiceDetailModal({
    service,
    onClose,
}: ServiceDetailModalProps) {
    if (!service) return null;

    const Icon = service.icon;

    return (
        <div
            className="fixed inset-0 z-[260] overflow-y-auto overscroll-y-contain bg-[#061f43]/70 px-3 py-4 backdrop-blur-sm sm:px-5 sm:py-7"
            style={{ WebkitOverflowScrolling: "touch" }}
            onClick={onClose}
            role="presentation"
        >
            <div className="flex min-h-full items-start justify-center sm:items-center">
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    onClick={(event) => event.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="service-modal-title"
                    className="relative w-full max-w-[940px] overflow-hidden rounded-[30px] border border-white/60 bg-[#fffdf9] shadow-[0_35px_100px_rgba(6,31,67,0.30)]"
                >
                    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                        <div className="absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full border-[2px] border-[#E9A6B2]/35 bg-[#E9A6B2]/[0.07]" />
                        <div className="absolute -right-4 -top-4 h-[170px] w-[170px] rounded-full border-[2px] border-[#E7BC61]/45 bg-[#E7BC61]/[0.06]" />
                        <div className="absolute -bottom-28 -left-24 h-[300px] w-[300px] rounded-full bg-[#075187]/[0.05] blur-3xl" />
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close service details"
                        className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#082957]/10 bg-white/90 text-[#082957] shadow-sm transition hover:bg-[#082957] hover:text-white sm:right-6 sm:top-6"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="relative z-10 grid lg:grid-cols-[0.78fr_1.22fr]">
                        <div className="bg-gradient-to-br from-[#082957] via-[#075187] to-[#0a638e] p-7 text-white sm:p-9 lg:p-10">
                            <div className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-white/15 bg-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                                <Icon className="h-8 w-8 text-[#f2c66d]" strokeWidth={1.7} />
                            </div>

                            <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.26em] text-[#f2c66d]">
                                Treatment Focus
                            </p>

                            <h3
                                id="service-modal-title"
                                className="mt-3 font-serif text-[34px] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-[42px]"
                            >
                                {service.title}
                            </h3>

                            <p className="mt-5 text-[15px] leading-7 text-white/75">
                                Personalized psychiatric care centered on understanding your symptoms, needs, and treatment goals.
                            </p>

                            <div className="mt-8 h-px w-full bg-white/15" />

                            <p className="mt-7 text-[12px] font-bold uppercase tracking-[0.2em] text-white/55">
                                Areas we can address
                            </p>

                            <div className="mt-4 space-y-3">
                                {service.supports.map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f2c66d]/15 text-[#f2c66d]">
                                            <Check className="h-3 w-3" strokeWidth={2.5} />
                                        </span>
                                        <span className="text-[14px] leading-6 text-white/80">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative p-7 sm:p-9 lg:p-11">
                            <div className="max-w-[610px]">
                                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#b67a1b]">
                                    Understanding {service.title}
                                </p>

                                <h4 className="mt-3 font-serif text-[28px] font-semibold tracking-[-0.025em] text-[#082957] sm:text-[32px]">
                                    What is it?
                                </h4>

                                <p className="mt-4 text-[15px] leading-[1.85] text-[#536a82]">
                                    {service.overview}
                                </p>

                                <div className="my-7 h-px bg-gradient-to-r from-[#E9A6B2]/60 via-[#E7BC61]/55 to-transparent" />

                                <h4 className="font-serif text-[28px] font-semibold tracking-[-0.025em] text-[#082957] sm:text-[32px]">
                                    How we approach treatment
                                </h4>

                                <p className="mt-4 text-[15px] leading-[1.85] text-[#536a82]">
                                    {service.treatment}
                                </p>

                                <div className="mt-8 rounded-[22px] border border-[#082957]/10 bg-gradient-to-br from-[#f4f8fa] via-white to-[#fff7e7] p-5 sm:p-6">
                                    <p className="font-serif text-[20px] font-semibold text-[#082957]">
                                        Ready to talk with a provider?
                                    </p>
                                    <p className="mt-2 text-[13px] leading-6 text-[#60758a]">
                                        Schedule an appointment to discuss your concerns and determine an appropriate next step based on your individual needs.
                                    </p>

                                    <div
                                        className="mt-5"
                                        onClick={onClose}
                                    >
                                        <BookAppointmentButton
                                            label="Book an Appointment"
                                            className="w-full sm:w-auto"
                                        />
                                    </div>
                                </div>

                                <p className="mt-5 text-[11px] leading-5 text-[#7b8d9e]">
                                    Information on this page is educational and is not a diagnosis or a substitute for an individualized clinical evaluation. If you are experiencing an emergency or are in immediate danger, call 911 or go to the nearest emergency department.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
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