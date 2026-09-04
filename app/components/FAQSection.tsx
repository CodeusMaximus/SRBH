"use client";

import { useState } from "react";
import {
    AnimatePresence,
    motion,
} from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqs = [
    {
        question:
            "What can I expect during my first appointment?",
        answer:
            "Your first appointment focuses on getting a clear understanding of your concerns, symptoms, medical and psychiatric history, current medications, previous treatment experiences, and treatment goals. This information helps guide an individualized plan of care and allows you to ask questions about recommended next steps.",
    },
    {
        question:
            "How long is my first psychiatric appointment?",
        answer:
            "Initial psychiatric evaluations generally require more time than follow-up visits because your provider needs to learn about your history, current concerns, medications, and treatment goals. The length of your specific appointment will be provided when your visit is scheduled.",
    },
    {
        question:
            "Do you offer telehealth appointments?",
        answer:
            "Yes. Telehealth provides a convenient way to receive psychiatric care remotely when clinically appropriate and available in your location. You can ask about telehealth availability when scheduling your appointment.",
    },
    {
        question:
            "Do you offer in-person appointments?",
        answer:
            "Availability for in-person care can be discussed when you request an appointment. Solid Rock Behavioral Health serves patients from Brooklyn, New York, with telehealth also available when appropriate.",
    },
    {
        question:
            "Do you provide medication management?",
        answer:
            "Yes. Medication management may include reviewing your current medications, discussing treatment options, monitoring effectiveness and possible side effects, and making adjustments when clinically appropriate. Medication decisions are made individually based on your evaluation and ongoing response to treatment.",
    },
    {
        question:
            "What is a psychiatric evaluation?",
        answer:
            "A psychiatric evaluation is a comprehensive assessment designed to better understand your emotional, behavioral, and mental health concerns. Your provider may discuss your symptoms, history, current medications, previous treatment, daily functioning, and treatment goals before recommending appropriate next steps.",
    },
    {
        question:
            "What is psychopharmacology?",
        answer:
            "Psychopharmacology focuses on the use of medications in the treatment of mental health conditions. When medication is appropriate, your provider considers your symptoms, health history, previous medication experiences, potential benefits, possible side effects, and other relevant factors when discussing treatment options.",
    },
    {
        question:
            "What conditions do you treat?",
        answer:
            "Solid Rock Behavioral Health works with individuals experiencing a variety of mental and behavioral health concerns, including anxiety, depression, ADHD, bipolar disorder, PTSD, OCD, insomnia, psychosis, anger-related concerns, mood difficulties, and other psychiatric symptoms. Treatment recommendations depend on an individualized psychiatric assessment.",
    },
    {
        question:
            "How do I know if psychiatric care is right for me?",
        answer:
            "People seek psychiatric care for many reasons, including persistent changes in mood, anxiety, concentration, sleep, behavior, emotional well-being, or difficulty functioning in everyday life. An initial consultation or evaluation can help determine whether the services offered by the practice are appropriate for your needs.",
    },
    {
        question:
            "How do I schedule an appointment?",
        answer:
            "You can use the Book an Appointment option on this website to begin the scheduling process. Select the type of appointment you are interested in and provide the requested contact information. The practice can then coordinate the appropriate next steps with you.",
    },
    {
        question:
            "Do you offer a free consultation?",
        answer:
            "Yes. Solid Rock Behavioral Health offers a free 15-minute consultation. This gives you an opportunity to ask initial questions and determine whether scheduling a full appointment may be appropriate for you.",
    },
    {
        question:
            "What should I have available for my appointment?",
        answer:
            "It may be helpful to have a list of your current medications, relevant medical information, previous mental health treatment information, and any questions you would like to discuss. If the practice needs specific documents before your visit, you will be given instructions.",
    },
    {
        question:
            "Will I automatically be prescribed medication?",
        answer:
            "No. Scheduling a psychiatric appointment does not mean medication will automatically be prescribed. Treatment recommendations are based on your individual evaluation, clinical needs, history, and discussion with your provider. When appropriate, options may include medication, therapy recommendations, lifestyle considerations, additional evaluation, or a combination of approaches.",
    },
    {
        question:
            "Can my medication be changed during treatment?",
        answer:
            "Medication treatment may be adjusted when clinically appropriate. Your provider may consider how well a medication is working, possible side effects, changes in symptoms, and other health factors. Do not stop or change a prescribed medication without discussing it with the appropriate healthcare professional.",
    },
    {
        question:
            "How often will I need follow-up appointments?",
        answer:
            "The frequency of follow-up visits varies from person to person. It can depend on your treatment plan, symptoms, medications, response to treatment, and clinical needs. Your provider will discuss an appropriate follow-up schedule with you.",
    },
    {
        question:
            "Do you accept insurance?",
        answer:
            "The practice works with a number of insurance plans. Coverage and benefits can vary significantly between plans, even within the same insurance company. Contact the practice and your insurance carrier to verify participation, eligibility, benefits, deductibles, copayments, and other potential out-of-pocket costs before receiving services.",
    },
    {
        question:
            "What if my insurance is out of network?",
        answer:
            "Depending on your plan and circumstances, out-of-network options may be available. The practice can discuss available payment options and whether documentation such as a superbill may be available for you to submit to your insurance company for possible reimbursement. Reimbursement is determined by your insurance plan and is not guaranteed.",
    },
    {
        question:
            "Is my information kept private?",
        answer:
            "Solid Rock Behavioral Health takes patient privacy seriously. Health information is handled according to applicable privacy requirements and practice policies. The general contact and appointment forms on this website should not be used to send highly sensitive medical, psychiatric, or emergency information.",
    },
    {
        question:
            "What if I need to cancel or reschedule?",
        answer:
            "If you need to change an appointment, contact the practice as soon as possible. Cancellation and rescheduling requirements, including any applicable policies or fees, should be confirmed with the practice when your appointment is scheduled.",
    },
    {
        question:
            "What should I do if I am experiencing a mental health emergency?",
        answer:
            "Solid Rock Behavioral Health's website and appointment request forms are not emergency services and should not be used for urgent or life-threatening situations. If you are in immediate danger or experiencing a medical or psychiatric emergency, call 911 or go to the nearest emergency department. In the United States, you can also call or text 988 to reach the Suicide & Crisis Lifeline.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] =
        useState<number | null>(0);

    return (
        <section
            id="faq"
            className="
                scroll-mt-28
                bg-[#f8fafb]
                py-20
                sm:py-24
                lg:py-32
            "
        >
            <div
                className="
                    mx-auto
                    grid
                    max-w-[1280px]
                    gap-12
                    px-6
                    sm:px-8
                    lg:grid-cols-[0.7fr_1.3fr]
                    lg:gap-20
                    lg:px-12
                "
            >
                {/* LEFT */}
                <div>
                    <p
                        className="
                            text-[12px]
                            font-bold
                            uppercase
                            tracking-[0.32em]
                            text-[#b77b18]
                        "
                    >
                        FAQs
                    </p>

                    <h2
                        className="
                            mt-5
                            font-serif
                            text-[42px]
                            font-semibold
                            leading-[1.03]
                            tracking-[-0.035em]
                            text-[#082957]
                            sm:text-[52px]
                        "
                    >
                        Questions?
                        <br />
                        We&apos;re here to help.
                    </h2>

                    <p
                        className="
                            mt-6
                            max-w-[390px]
                            text-[16px]
                            leading-7
                            text-[#587086]
                        "
                    >
                        Find answers to common
                        questions about psychiatric
                        care, appointments, telehealth,
                        medications, insurance, and
                        getting started with Solid Rock
                        Behavioral Health.
                    </p>

                    <div
                        className="
                            mt-8
                            hidden
                            max-w-[390px]
                            rounded-[22px]
                            border
                            border-[#082957]/10
                            bg-white
                            p-6
                            lg:block
                        "
                    >
                        <p
                            className="
                                text-[11px]
                                font-bold
                                uppercase
                                tracking-[0.16em]
                                text-[#b77b18]
                            "
                        >
                            Still have questions?
                        </p>

                        <p
                            className="
                                mt-3
                                text-[14px]
                                leading-6
                                text-[#587086]
                            "
                        >
                            Speak with Solid Rock
                            Behavioral Health about
                            scheduling, services, or
                            getting started.
                        </p>

                        <a
                            href="tel:+19294472430"
                            className="
                                mt-5
                                inline-flex
                                items-center
                                justify-center
                                rounded-full
                                bg-[#082957]
                                px-6
                                py-3
                                text-[13px]
                                font-bold
                                text-white
                                transition
                                hover:bg-[#075187]
                            "
                        >
                            (929) 447-2430
                        </a>
                    </div>
                </div>

                {/* FAQ ACCORDION */}
                <div className="border-t border-[#082957]/10">
                    {faqs.map((faq, index) => {
                        const open =
                            openIndex === index;

                        return (
                            <div
                                key={faq.question}
                                className="
                                    border-b
                                    border-[#082957]/10
                                "
                            >
                                <button
                                    type="button"
                                    aria-expanded={open}
                                    onClick={() =>
                                        setOpenIndex(
                                            open
                                                ? null
                                                : index
                                        )
                                    }
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-between
                                        gap-6
                                        py-6
                                        text-left
                                        sm:py-7
                                    "
                                >
                                    <span
                                        className="
                                            font-serif
                                            text-[20px]
                                            font-semibold
                                            leading-7
                                            text-[#082957]
                                            sm:text-[23px]
                                        "
                                    >
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
                                            transition-all
                                            duration-300
                                            ${open
                                                ? "rotate-0 bg-[#075187] text-white"
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

                                <AnimatePresence
                                    initial={false}
                                >
                                    {open && (
                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                height:
                                                    "auto",
                                                opacity: 1,
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration:
                                                    0.25,
                                                ease: [
                                                    0.22,
                                                    1,
                                                    0.36,
                                                    1,
                                                ],
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <p
                                                className="
                                                    max-w-[760px]
                                                    pb-7
                                                    pr-8
                                                    text-[15px]
                                                    leading-7
                                                    text-[#587086]
                                                    sm:text-[16px]
                                                "
                                            >
                                                {
                                                    faq.answer
                                                }
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