import {
    Brain,
} from "lucide-react";

import ServicePageLayout, {
    type ServicePageData,
} from "../../components/ServicePageLayout";

const service: ServicePageData = {
    eyebrow: "Psychiatric Evaluation",

    title: "Understanding You Is",
    accentTitle: "Where Care Begins.",

    intro:
        "A psychiatric evaluation provides an opportunity to discuss your concerns, experiences, and goals so your provider can better understand your needs and develop an individualized plan for care.",

    icon: "psychopharmacology",

    heroHighlights: [
        "Comprehensive assessment",
        "Individualized recommendations",
        "Collaborative care planning",
    ],

    overviewEyebrow: "A Thoughtful First Step",

    overviewTitle:
        "A clearer picture of your mental health.",

    overviewParagraphs: [
        "A psychiatric evaluation is a comprehensive assessment designed to help your provider understand what you are experiencing and how those concerns may be affecting your everyday life.",

        "During the evaluation, your provider may discuss your current concerns, relevant history, emotional and behavioral experiences, previous treatment, and other factors that may contribute to your overall mental wellness.",

        "The goal is not simply to identify symptoms. It is to develop a fuller understanding of your needs so you and your provider can discuss appropriate treatment options together.",
    ],

    includesTitle:
        "What may be discussed during your evaluation.",

    includes: [
        {
            title: "Current Concerns",
            description:
                "A conversation about what brought you to care and the concerns you would like help addressing.",
        },
        {
            title: "Relevant History",
            description:
                "Review of relevant psychiatric, medical, family, social, and treatment history when appropriate.",
        },
        {
            title: "Symptoms & Experiences",
            description:
                "Discussion of emotional, behavioral, cognitive, or sleep-related experiences affecting your well-being.",
        },
        {
            title: "Previous Treatment",
            description:
                "Review of previous psychiatric treatment, therapy, or medications when relevant to your care.",
        },
        {
            title: "Treatment Goals",
            description:
                "An opportunity to identify the changes and outcomes that are most important to you.",
        },
        {
            title: "Recommendations",
            description:
                "Collaborative discussion of potential next steps and an individualized treatment approach.",
        },
    ],

    goodForTitle:
        "When might an evaluation be helpful?",

    goodForDescription:
        "An evaluation may be an appropriate starting point when symptoms, emotions, behaviors, or life experiences are interfering with everyday well-being.",

    goodFor: [
        "Anxiety or persistent worry",
        "Depressive symptoms",
        "Attention or concentration concerns",
        "Mood changes",
        "Trauma-related concerns",
        "Sleep difficulties",
        "Behavioral or emotional concerns",
        "Obsessive thoughts or compulsive behaviors",
        "Psychosis-related symptoms",
        "Questions about psychiatric medication",
    ],

    process: [
        {
            number: "01",
            title: "Schedule Your Visit",
            description:
                "Choose an available appointment time that works for you.",
        },
        {
            number: "02",
            title: "Meet With Your Provider",
            description:
                "Discuss your concerns, history, experiences, and goals in a supportive environment.",
        },
        {
            number: "03",
            title: "Discuss Next Steps",
            description:
                "Review the provider's recommendations and collaborate on an appropriate treatment plan.",
        },
    ],

    faq: [
        {
            question:
                "What is a psychiatric evaluation?",
            answer:
                "It is a comprehensive assessment that helps a psychiatric provider better understand your concerns, relevant history, symptoms, and treatment goals.",
        },
        {
            question:
                "Does an evaluation automatically mean I need medication?",
            answer:
                "No. An evaluation helps determine appropriate next steps. Recommendations depend on your individual needs and may involve different treatment options.",
        },
        {
            question:
                "What should I bring to my appointment?",
            answer:
                "The practice can tell you what information is needed when your appointment is scheduled. Relevant medication or treatment information may be useful when requested.",
        },
        {
            question:
                "Can psychiatric evaluations be provided through telehealth?",
            answer:
                "Telehealth is available through Solid Rock Behavioral Health. Whether a particular evaluation is appropriate for telehealth can be discussed when scheduling.",
        },
    ],

    closingTitle:
        "Start with understanding.",

    closingText:
        "Schedule a psychiatric evaluation and take the first step toward a treatment plan designed around your individual needs.",
};

export default function PsychiatricEvaluationPage() {
    return (
        <ServicePageLayout
            service={service}
        />
    );
}