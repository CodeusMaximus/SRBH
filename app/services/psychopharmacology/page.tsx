import { Network } from "lucide-react";

import ServicePageLayout, {
    type ServicePageData,
} from "../../components/ServicePageLayout";

const service: ServicePageData = {
    eyebrow: "Psychopharmacology",

    title: "Medication Decisions.",
    accentTitle: "Guided By Evidence.",

    intro:
        "Psychopharmacology focuses on the thoughtful use of psychiatric medication as part of an individualized approach to mental health treatment.",

    icon: "psychopharmacology",

    heroHighlights: [
        "Evidence-based approach",
        "Individualized decisions",
        "Ongoing monitoring",
    ],

    overviewEyebrow: "Understanding Treatment",

    overviewTitle:
        "A personalized approach to psychiatric medication.",

    overviewParagraphs: [
        "Psychopharmacology involves the clinical use of medication in the treatment of psychiatric and mental health conditions.",

        "Because individuals can respond differently to the same medication, treatment decisions require careful assessment of symptoms, history, previous treatment experiences, response, and other clinically relevant factors.",

        "When medication is appropriate, your provider works with you to discuss treatment options, expected goals, monitoring, and ongoing follow-up.",
    ],

    includesTitle:
        "A thoughtful approach to medication treatment.",

    includes: [
        {
            title: "Clinical Assessment",
            description:
                "Medication decisions begin with an assessment of your symptoms, history, current needs, and treatment goals.",
        },
        {
            title: "Treatment Options",
            description:
                "Appropriate medication options can be discussed based on the provider's clinical assessment.",
        },
        {
            title: "Benefits & Considerations",
            description:
                "Your provider can discuss important considerations related to a proposed medication treatment plan.",
        },
        {
            title: "Individual Response",
            description:
                "Treatment is monitored because medication response can vary considerably between individuals.",
        },
        {
            title: "Ongoing Monitoring",
            description:
                "Follow-up allows treatment response and relevant concerns to be reassessed over time.",
        },
        {
            title: "Collaborative Care",
            description:
                "Your questions, concerns, experiences, and treatment goals are an important part of decision-making.",
        },
    ],

    goodForTitle:
        "When may psychopharmacology be considered?",

    goodForDescription:
        "Psychiatric medication may be considered as part of treatment for a range of mental health concerns following an appropriate clinical evaluation.",

    goodFor: [
        "Anxiety-related conditions",
        "Depressive disorders",
        "Bipolar disorder",
        "ADHD",
        "Mood-related concerns",
        "OCD",
        "Trauma-related conditions",
        "Psychosis-related conditions",
        "Sleep-related psychiatric concerns",
        "Other clinically appropriate psychiatric conditions",
    ],

    process: [
        {
            number: "01",
            title: "Assessment",
            description:
                "Your provider evaluates your symptoms, history, previous treatment, and individual goals.",
        },
        {
            number: "02",
            title: "Treatment Discussion",
            description:
                "When medication is appropriate, available options and treatment considerations are discussed.",
        },
        {
            number: "03",
            title: "Monitoring",
            description:
                "Follow-up appointments help evaluate response and determine whether treatment adjustments are appropriate.",
        },
    ],

    faq: [
        {
            question:
                "What is psychopharmacology?",
            answer:
                "Psychopharmacology is the clinical study and use of medications that affect mood, thinking, behavior, and other aspects of mental health.",
        },
        {
            question:
                "Is psychopharmacology the same as medication management?",
            answer:
                "They are closely related. Psychopharmacology focuses on psychiatric medications and their clinical use, while medication management includes the ongoing monitoring and management of an individual's medication treatment plan.",
        },
        {
            question:
                "Does everyone receiving psychiatric care need medication?",
            answer:
                "No. Treatment recommendations depend on the individual. Medication is one potential component of psychiatric treatment and is considered based on clinical assessment.",
        },
        {
            question:
                "How will I know whether medication is helping?",
            answer:
                "Your provider can monitor symptoms, functioning, treatment goals, and your experience over time to help evaluate your response.",
        },
    ],

    closingTitle:
        "Make informed treatment decisions.",

    closingText:
        "Meet with your provider to discuss your concerns, explore appropriate treatment options, and develop an individualized approach to care.",
};

export default function PsychopharmacologyPage() {
    return (
        <ServicePageLayout
            service={service}
        />
    );
}