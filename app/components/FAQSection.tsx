"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqs = [
    {
        question: "What can I expect during my first appointment?",
        answer:
            "Your first appointment focuses on understanding your concerns, symptoms, medical and psychiatric history, current medications, and treatment goals. This information helps guide an individualized treatment plan.",
    },
    {
        question: "Do you offer telehealth appointments?",
        answer:
            "Yes. Telehealth provides a convenient way to receive psychiatric care remotely when clinically appropriate and available in your location.",
    },
    {
        question: "Do you provide medication management?",
        answer:
            "Yes. Medication management may include reviewing current medications, discussing treatment options, monitoring response and side effects, and making adjustments when clinically appropriate.",
    },
    {
        question: "How do I schedule an appointment?",
        answer:
            "You can begin by using the appointment or consultation options on the website. Once your request is received, the next steps for scheduling can be coordinated with you.",
    },
    {
        question: "What conditions do you treat?",
        answer:
            "Treatment is based on an individualized psychiatric assessment. The practice can discuss your specific symptoms and concerns with you to determine whether its services are appropriate for your needs.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-[#f8fafb] py-20 sm:py-24 lg:py-32">
            <div className="mx-auto grid max-w-[1280px] gap-12 px-6 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-12">
                <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.32em] text-[#b77b18]">
                        FAQs
                    </p>

                    <h2 className="mt-5 font-serif text-[42px] font-semibold leading-[1.03] tracking-[-0.035em] text-[#082957] sm:text-[52px]">
                        Questions?
                        <br />
                        We’re here to help.
                    </h2>

                    <p className="mt-6 max-w-[390px] text-[16px] leading-7 text-[#587086]">
                        Find answers to some common questions about getting
                        started with Solid Rock Behavioral Health.
                    </p>
                </div>

                <div className="border-t border-[#082957]/10">
                    {faqs.map((faq, index) => {
                        const open = openIndex === index;

                        return (
                            <div
                                key={faq.question}
                                className="border-b border-[#082957]/10"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenIndex(open ? null : index)
                                    }
                                    className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                                >
                                    <span className="font-serif text-[20px] font-semibold leading-7 text-[#082957] sm:text-[23px]">
                                        {faq.question}
                                    </span>

                                    <span
                                        className={`
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            transition-colors
                                            ${open
                                                ? "bg-[#075187] text-white"
                                                : "bg-[#e9eff2] text-[#082957]"
                                            }
                                        `}
                                    >
                                        {open ? (
                                            <Minus className="h-4 w-4" />
                                        ) : (
                                            <Plus className="h-4 w-4" />
                                        )}
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {open && (
                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: 0.25,
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <p className="max-w-[760px] pb-7 pr-8 text-[15px] leading-7 text-[#587086] sm:text-[16px]">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}