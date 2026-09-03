"use client";

import { motion } from "framer-motion";
import {
    HeartHandshake,
    ShieldCheck,
    Sparkles,
    Video,
} from "lucide-react";

const reasons = [
    {
        icon: HeartHandshake,
        title: "Personalized",
        text: "Your care plan is built around your individual needs, goals, concerns, and experiences.",
    },
    {
        icon: ShieldCheck,
        title: "Evidence-Based",
        text: "Treatment decisions are guided by established clinical practices and thoughtful assessment.",
    },
    {
        icon: Sparkles,
        title: "Compassionate",
        text: "Care should feel supportive and respectful. Your voice remains an important part of treatment.",
    },
    {
        icon: Video,
        title: "Accessible",
        text: "Flexible care options, including telehealth, help make receiving psychiatric care more convenient.",
    },
];

export default function WhyChooseUsSection() {
    return (
        <section className="relative overflow-hidden bg-[#082957] py-20 text-white sm:py-24 lg:py-32">
            <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/5" />
            <div className="absolute -right-20 -top-20 h-[320px] w-[320px] rounded-full border border-[#d79a27]/15" />

            <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
                <div className="max-w-[760px]">
                    <p className="text-[12px] font-bold uppercase tracking-[0.32em] text-[#e2b45d]">
                        Why Solid Rock
                    </p>

                    <h2 className="mt-5 font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[54px] lg:text-[64px]">
                        Care you can feel
                        <br />
                        confident in.
                    </h2>

                    <p className="mt-6 max-w-[620px] text-[16px] leading-8 text-white/65 sm:text-[18px]">
                        A thoughtful approach to psychiatric care centered on
                        trust, collaboration, and your long-term wellness.
                    </p>
                </div>

                <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-white/10 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;

                        return (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="bg-[#082957] p-7 sm:p-9"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#e2b45d]">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3 className="mt-7 font-serif text-[25px]">
                                    {reason.title}
                                </h3>

                                <p className="mt-4 text-[14px] leading-7 text-white/60">
                                    {reason.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}