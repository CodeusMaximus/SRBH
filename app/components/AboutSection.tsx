"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const points = [
    "Individualized treatment plans",
    "Compassionate, judgment-free care",
    "Evidence-based psychiatric treatment",
    "Convenient telehealth options",
];

export default function AboutSection() {
    return (
        <section className="overflow-hidden bg-[#edf3f5] py-20 sm:py-24 lg:py-32">
            <div className="mx-auto grid max-w-[1440px] gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-12 xl:px-16">

                {/* =========================================
                    VIDEO
                ========================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: -30,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="relative"
                >
                    <div
                        className="
                            relative
                            aspect-[4/5]
                            overflow-hidden
                            rounded-[32px]
                            bg-[#dbe5ea]
                            shadow-[0_25px_60px_rgba(8,41,87,0.12)]
                            lg:aspect-[5/6]
                        "
                    >
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="
                                absolute
                                inset-0
                                h-full
                                w-full
                                object-cover
                            "
                        >
                            <source
                                src="/videos/about-provider.mp4"
                                type="video/mp4"
                            />

                            Your browser does not support video playback.
                        </video>

                        {/* SUBTLE VIDEO OVERLAY */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-[#082957]/20
                                via-transparent
                                to-transparent
                            "
                        />
                    </div>

                    {/* FLOATING CARD */}

                    <div
                        className="
                            absolute
                            -bottom-5
                            right-4
                            max-w-[240px]
                            rounded-[22px]
                            border
                            border-white/10
                            bg-[#082957]
                            p-5
                            text-white
                            shadow-[0_20px_45px_rgba(8,41,87,0.25)]
                            sm:right-[-20px]
                            sm:p-6
                        "
                    >
                        <p className="font-serif text-[23px] leading-tight">
                            Care with compassion.
                        </p>

                        <p className="mt-2 text-[13px] leading-5 text-white/70">
                            A supportive environment where your concerns are
                            heard.
                        </p>
                    </div>
                </motion.div>

                {/* =========================================
                    ABOUT CONTENT
                ========================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.1,
                    }}
                >
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-10 bg-[#d79a27]" />

                        <p
                            className="
                                text-[12px]
                                font-bold
                                uppercase
                                tracking-[0.32em]
                                text-[#b77b18]
                            "
                        >
                            About Solid Rock
                        </p>
                    </div>

                    <h2
                        className="
                            font-serif
                            text-[42px]
                            font-semibold
                            leading-[1.03]
                            tracking-[-0.035em]
                            text-[#082957]
                            sm:text-[54px]
                            lg:text-[62px]
                        "
                    >
                        Providing Wellness Through{" "}
                        <span className="text-[#075187]">
                            Compassionate Care.
                        </span>
                    </h2>

                    <p
                        className="
                            mt-7
                            text-[16px]
                            leading-8
                            text-[#49627d]
                            sm:text-[17px]
                        "
                    >
                        We&apos;re dedicated to fostering mental wellness
                        through personalized, compassionate care. With a focus
                        on empathy and understanding, we&apos;re here to
                        support you every step of the way on your journey to a
                        happier, healthier life.
                    </p>

                    <p
                        className="
                            mt-5
                            text-[16px]
                            leading-8
                            text-[#49627d]
                            sm:text-[17px]
                        "
                    >
                        With a commitment to evidence-based practices and
                        ongoing education, we strive to provide high-quality
                        care tailored to each individual&apos;s unique needs.
                        Your well-being is our priority, and we&apos;re honored
                        to be part of your healing journey.
                    </p>

                    {/* CHECK POINTS */}

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {points.map((point) => (
                            <div
                                key={point}
                                className="flex items-start gap-3"
                            >
                                <span
                                    className="
                                        mt-0.5
                                        flex
                                        h-6
                                        w-6
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#d79a27]/15
                                        text-[#a86f13]
                                    "
                                >
                                    <Check className="h-3.5 w-3.5" />
                                </span>

                                <span
                                    className="
                                        text-[14px]
                                        font-semibold
                                        leading-6
                                        text-[#173b66]
                                    "
                                >
                                    {point}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}

                    <Link
                        href="/Provider"
                        className="
                            group
                            mt-9
                            inline-flex
                            items-center
                            gap-3
                            rounded-full
                            bg-[#075187]
                            px-7
                            py-4
                            text-[15px]
                            font-semibold
                            text-white
                            shadow-[0_12px_30px_rgba(7,81,135,0.20)]
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:bg-[#063f6b]
                            hover:shadow-[0_16px_35px_rgba(7,81,135,0.28)]
                        "
                    >
                        Meet Your Provider

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
            </div>
        </section>
    );
}