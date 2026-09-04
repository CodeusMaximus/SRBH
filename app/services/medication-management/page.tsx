import { Pill } from "lucide-react";

import ServicePageLayout, {
    type ServicePageData,
} from "../../components/ServicePageLayout";

const service: ServicePageData = {
    eyebrow: "Medication Management",

    title: "Thoughtful Medication.",
    accentTitle: "Ongoing Support.",

    intro:
        "Medication management provides ongoing psychiatric follow-up focused on how your treatment is working, how you are feeling, and whether adjustments may be appropriate.",

    icon: "medication-management",

    heroHighlights: [
        "Individualized treatment",
        "Ongoing follow-up",
        "Medication monitoring",
    ],

    overviewEyebrow: "Ongoing Care",

    overviewTitle:
        "Medication care is more than a prescription.",

    overviewParagraphs: [
        "Psychiatric medication management is an ongoing process. When medication is part of your treatment plan, follow-up appointments provide an opportunity to evaluate your response and discuss any concerns.",

        "Your provider may review changes in symptoms, medication response, tolerability, adherence, and other factors relevant to your treatment.",

        "When appropriate, treatment may be continued or adjusted based on clinical assessment and shared discussion between you and your provider.",
    ],

    includesTitle:
        "What medication management may include.",

    includes: [
        {
            title: "Medication Review",
            description:
                "Review of current psychiatric medications and how they fit within your overall treatment plan.",
        },
        {
            title: "Response Monitoring",
            description:
                "Discussion of changes in symptoms, functioning, or overall well-being since treatment began.",
        },
        {
            title: "Side Effect Discussion",
            description:
                "Opportunity to discuss possible medication-related concerns or experiences with your provider.",
        },
        {
            title: "Treatment Adjustments",
            description:
                "Medication changes may be considered when clinically appropriate based on your response and needs.",
        },
        {
            title: "Follow-Up Visits",
            description:
                "Ongoing appointments allow your provider to monitor progress and reassess your treatment plan.",
        },
        {
            title: "Collaborative Decisions",
            description:
                "Questions and preferences can be discussed as part of shared treatment decision-making.",
        },
    ],

    goodForTitle:
        "Who may benefit from medication management?",

    goodForDescription:
        "Medication management may be appropriate for individuals whose psychiatric treatment plan includes medication and requires ongoing professional monitoring.",

    goodFor: [
        "Patients beginning psychiatric medication",
        "Individuals currently taking psychiatric medication",
        "Medication response monitoring",
        "Questions about current treatment",
        "Follow-up after psychiatric evaluation",
        "Changes in symptoms",
        "Medication tolerability concerns",
        "Long-term psychiatric medication follow-up",
    ],

    process: [
        {
            number: "01",
            title: "Review",
            description:
                "Meet with your provider to discuss your current medications, symptoms, concerns, and progress.",
        },
        {
            number: "02",
            title: "Evaluate",
            description:
                "Your provider evaluates your response to treatment and any relevant concerns.",
        },
        {
            number: "03",
            title: "Continue & Monitor",
            description:
                "When appropriate, your treatment plan is continued or adjusted with ongoing follow-up.",
        },
    ],

    faq: [
        {
            question:
                "What happens during a medication management visit?",
            answer:
                "Your provider may discuss how you are doing, your response to treatment, medication use, possible side effects, and whether changes should be considered.",
        },
        {
            question:
                "Will my medication be changed at every appointment?",
            answer:
                "No. Changes depend on your individual clinical needs. Medication may be continued when the current treatment remains appropriate.",
        },
        {
            question:
                "Can I stop psychiatric medication on my own?",
            answer:
                "Medication changes should be discussed with the prescribing clinician. Some psychiatric medications require careful adjustment rather than abrupt discontinuation.",
        },
        {
            question:
                "Is medication management available by telehealth?",
            answer:
                "Solid Rock Behavioral Health offers telehealth. Availability and appropriateness can depend on the individual treatment situation.",
        },
    ],

    closingTitle:
        "Stay connected to your care.",

    closingText:
        "Ongoing follow-up gives you and your provider an opportunity to evaluate treatment together and make informed decisions about your next steps.",
};

export default function MedicationManagementPage() {
    return (
        <ServicePageLayout
            service={service}
        />
    );
}