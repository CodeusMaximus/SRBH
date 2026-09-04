import { Laptop } from "lucide-react";

import ServicePageLayout, {
    type ServicePageData,
} from "../../components/ServicePageLayout";

const service: ServicePageData = {
    eyebrow: "Telehealth",

    title: "Psychiatric Care.",
    accentTitle: "Where You Are.",

    intro:
        "Telehealth provides a convenient way to connect with your psychiatric provider remotely while receiving personalized mental health care.",

    icon: "telehealth",

    heroHighlights: [
        "Virtual appointments",
        "Convenient access",
        "Personalized psychiatric care",
    ],

    overviewEyebrow: "Care From A Distance",

    overviewTitle:
        "Making mental health care more accessible.",

    overviewParagraphs: [
        "Telehealth allows eligible patients to meet with their psychiatric provider through a virtual appointment rather than traveling to an office for every visit.",

        "Depending on your clinical needs, telehealth may be used for psychiatric assessment, treatment discussions, medication follow-up, and other appropriate services.",

        "Your provider will determine whether telehealth is appropriate for your particular care needs and can discuss when an in-person evaluation or other service may be necessary.",
    ],

    includesTitle:
        "What telehealth care may offer.",

    includes: [
        {
            title: "Virtual Visits",
            description:
                "Connect with your psychiatric provider remotely for appropriate scheduled appointments.",
        },
        {
            title: "Convenient Access",
            description:
                "Reduce travel and make attending appropriate follow-up appointments more convenient.",
        },
        {
            title: "Psychiatric Evaluation",
            description:
                "Certain psychiatric assessments may be appropriate for telehealth based on clinical circumstances.",
        },
        {
            title: "Medication Follow-Up",
            description:
                "Appropriate medication management follow-up may be conducted virtually when clinically suitable.",
        },
        {
            title: "Continuity of Care",
            description:
                "Virtual visits can make it easier to maintain ongoing contact with your provider.",
        },
        {
            title: "Personalized Treatment",
            description:
                "Telehealth changes how you meet with your provider, not the importance of individualized care.",
        },
    ],

    goodForTitle:
        "Could telehealth work for you?",

    goodForDescription:
        "Telehealth can provide greater flexibility for appropriate psychiatric services while allowing you to connect with your provider remotely.",

    goodFor: [
        "Individuals who prefer virtual appointments",
        "Patients with transportation challenges",
        "Busy work or family schedules",
        "Appropriate psychiatric follow-up",
        "Medication management visits",
        "Patients seeking convenient access to care",
        "Individuals who live farther from the practice",
        "Continuity of psychiatric care",
    ],

    process: [
        {
            number: "01",
            title: "Schedule",
            description:
                "Choose an available telehealth appointment and provide the requested scheduling information.",
        },
        {
            number: "02",
            title: "Connect",
            description:
                "Use the instructions provided by the practice to join your scheduled virtual appointment.",
        },
        {
            number: "03",
            title: "Meet With Your Provider",
            description:
                "Discuss your mental health concerns and treatment needs with your provider remotely.",
        },
    ],

    faq: [
        {
            question:
                "What is a telehealth psychiatric appointment?",
            answer:
                "Telehealth allows you to meet remotely with your psychiatric provider for services that are clinically appropriate for a virtual visit.",
        },
        {
            question:
                "Can every psychiatric appointment be virtual?",
            answer:
                "Not necessarily. Whether telehealth is appropriate depends on the service, clinical situation, applicable requirements, and your individual treatment needs.",
        },
        {
            question:
                "Can medication management be done through telehealth?",
            answer:
                "Medication follow-up may be available through telehealth when clinically appropriate. Your provider can determine the appropriate format for your care.",
        },
        {
            question:
                "What do I need for a telehealth appointment?",
            answer:
                "Generally, you will need a compatible device, internet connection, and an appropriate private location. The practice can provide specific instructions for its telehealth system.",
        },
    ],

    closingTitle:
        "Care can meet you where you are.",

    closingText:
        "Ask Solid Rock Behavioral Health whether telehealth is an appropriate option for your psychiatric care.",
};

export default function TelehealthPage() {
    return (
        <ServicePageLayout
            service={service}
        />
    );
}