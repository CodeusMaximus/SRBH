import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa6";

/* =========================================================
   SERVICES
========================================================= */

const services = [
    [
        "Psychiatric Evaluation",
        "/services/psychiatric-evaluation",
    ],
    [
        "Medication Management",
        "/services/medication-management",
    ],
    [
        "Psychopharmacology",
        "/services/psychopharmacology",
    ],
    [
        "Telehealth",
        "/services/telehealth",
    ],
];

/* =========================================================
   NAVIGATION
========================================================= */

const navigation = [
    ["Home", "/"],
    ["About Us", "/about-us"],
    ["Blog", "/blog"],
    ["Contact Us", "/contact"],
];

/* =========================================================
   SOCIAL MEDIA

   Replace "#" with Jean's real social URLs.
========================================================= */

const socials = [
    {
        name: "Facebook",
        href: "#",
        icon: FaFacebookF,
    },
    {
        name: "Instagram",
        href: "#",
        icon: FaInstagram,
    },
    {
        name: "LinkedIn",
        href: "#",
        icon: FaLinkedinIn,
    },
    {
        name: "YouTube",
        href: "#",
        icon: FaYoutube,
    },
];

export default function Footer() {
    return (
        <footer
            className="
                relative
                overflow-hidden
                bg-[#061f43]
                text-white
            "
        >
            {/* =============================================
                SUBTLE BACKGROUND GLOW
            ============================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-[180px]
                    -top-[200px]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#0b5d91]/20
                    blur-[120px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-[220px]
                    -left-[180px]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#d7a447]/10
                    blur-[120px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-[1440px]
                    px-6
                    pb-10
                    pt-16

                    sm:px-8
                    sm:pt-20

                    lg:px-12

                    xl:px-16
                "
            >
                {/* =========================================
                    MAIN FOOTER GRID
                ========================================= */}

                <div
                    className="
                        grid
                        gap-12
                        border-b
                        border-white/10
                        pb-14

                        md:grid-cols-2

                        lg:grid-cols-[1.4fr_0.7fr_0.9fr_1fr]
                    "
                >
                    {/* =====================================
                        BRAND
                    ===================================== */}

                    <div>
                        <Link
                            href="/"
                            aria-label="Solid Rock Behavioral Health home"
                            className="inline-block"
                        >
                            <Image
                                src="/images/solid-rock-logo.png"
                                alt="Solid Rock Behavioral Health"
                                width={250}
                                height={100}
                                className="
                                    h-auto
                                    w-[210px]
                                    rounded-xl
                                    bg-white
                                    px-3
                                    py-2
                                "
                            />
                        </Link>

                        <p
                            className="
                                mt-6
                                max-w-[370px]
                                text-[14px]
                                leading-7
                                text-white/60
                            "
                        >
                            Compassionate,
                            evidence-based psychiatric care
                            focused on helping you build a
                            stronger foundation for mental
                            wellness.
                        </p>

                        {/* =============================
                            SOCIAL MEDIA
                        ============================= */}

                        <div className="mt-7">
                            <p
                                className="
                                    mb-4
                                    text-[11px]
                                    font-bold
                                    uppercase
                                    tracking-[0.18em]
                                    text-[#e2b45d]
                                "
                            >
                                Connect With Us
                            </p>

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    gap-3
                                "
                            >
                                {socials.map(
                                    (social) => {
                                        const Icon =
                                            social.icon;

                                        return (
                                            <a
                                                key={
                                                    social.name
                                                }
                                                href={
                                                    social.href
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={
                                                    social.name
                                                }
                                                className="
                                                    group
                                                    flex
                                                    h-11
                                                    w-11
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border
                                                    border-white/15
                                                    bg-white/[0.06]
                                                    text-white/70
                                                    transition-all
                                                    duration-300

                                                    hover:-translate-y-1
                                                    hover:border-[#e2b45d]
                                                    hover:bg-[#e2b45d]
                                                    hover:text-[#061f43]
                                                    hover:shadow-[0_10px_25px_rgba(226,180,93,0.18)]
                                                "
                                            >
                                                <Icon className="h-[17px] w-[17px]" />
                                            </a>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    {/* =====================================
                        EXPLORE
                    ===================================== */}

                    <div>
                        <h3
                            className="
                                text-[12px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[#e2b45d]
                            "
                        >
                            Explore
                        </h3>

                        <div
                            className="
                                mt-6
                                flex
                                flex-col
                                gap-4
                            "
                        >
                            {navigation.map(
                                ([label, href]) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className="
                                            group
                                            inline-flex
                                            w-fit
                                            items-center
                                            gap-1
                                            text-[14px]
                                            text-white/65
                                            transition
                                            hover:text-white
                                        "
                                    >
                                        {label}

                                        <ArrowUpRight
                                            className="
                                                h-3
                                                w-3
                                                opacity-0
                                                transition-all
                                                duration-200

                                                group-hover:translate-x-0.5
                                                group-hover:opacity-100
                                            "
                                        />
                                    </Link>
                                )
                            )}
                        </div>
                    </div>

                    {/* =====================================
                        SERVICES
                    ===================================== */}

                    <div>
                        <h3
                            className="
                                text-[12px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[#e2b45d]
                            "
                        >
                            Services
                        </h3>

                        <div
                            className="
                                mt-6
                                flex
                                flex-col
                                gap-4
                            "
                        >
                            {services.map(
                                ([label, href]) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className="
                                            text-[14px]
                                            leading-6
                                            text-white/65
                                            transition
                                            hover:text-white
                                        "
                                    >
                                        {label}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>

                    {/* =====================================
                        CONTACT
                    ===================================== */}

                    <div>
                        <h3
                            className="
                                text-[12px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[#e2b45d]
                            "
                        >
                            Contact
                        </h3>

                        <p
                            className="
                                mt-5
                                text-[13px]
                                leading-6
                                text-white/55
                            "
                        >
                            Have questions or ready to begin
                            your journey? We&apos;re here to
                            help.
                        </p>

                        <div className="mt-6 space-y-5">
                            {/* PHONE */}

                            <a
                                href="tel:+10000000000"
                                className="
                                    group
                                    flex
                                    items-start
                                    gap-3
                                    text-[14px]
                                    text-white/65
                                    transition
                                    hover:text-white
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-white/[0.06]
                                        transition
                                        group-hover:bg-[#e2b45d]/15
                                    "
                                >
                                    <Phone
                                        className="
                                            h-4
                                            w-4
                                            text-[#e2b45d]
                                        "
                                    />
                                </span>

                                <span className="pt-1">
                                    Phone Number
                                </span>
                            </a>

                            {/* EMAIL */}

                            <a
                                href="mailto:contact@solidrockbehavioralhealth.com"
                                className="
                                    group
                                    flex
                                    items-start
                                    gap-3
                                    text-[14px]
                                    text-white/65
                                    transition
                                    hover:text-white
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-white/[0.06]
                                        transition
                                        group-hover:bg-[#e2b45d]/15
                                    "
                                >
                                    <Mail
                                        className="
                                            h-4
                                            w-4
                                            text-[#e2b45d]
                                        "
                                    />
                                </span>

                                <span
                                    className="
                                        break-all
                                        pt-1
                                    "
                                >
                                    contact@
                                    solidrockbehavioralhealth.com
                                </span>
                            </a>

                            {/* LOCATION */}

                            <div
                                className="
                                    flex
                                    items-start
                                    gap-3
                                    text-[14px]
                                    leading-6
                                    text-white/65
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-white/[0.06]
                                    "
                                >
                                    <MapPin
                                        className="
                                            h-4
                                            w-4
                                            text-[#e2b45d]
                                        "
                                    />
                                </span>

                                <span className="pt-1">
                                    Practice Location
                                </span>
                            </div>
                        </div>

                        {/* =============================
                            CONTACT PAGE BUTTON
                        ============================= */}

                        <Link
                            href="/contact"
                            className="
                                group
                                mt-7
                                inline-flex
                                min-h-[48px]
                                items-center
                                justify-center
                                gap-2
                                rounded-full
                                bg-[#e2b45d]
                                px-6
                                py-3
                                text-[13px]
                                font-bold
                                text-[#061f43]
                                shadow-[0_10px_25px_rgba(226,180,93,0.15)]
                                transition-all
                                duration-300

                                hover:-translate-y-0.5
                                hover:bg-[#edc673]
                                hover:shadow-[0_14px_30px_rgba(226,180,93,0.22)]
                            "
                        >
                            Contact Us

                            <ArrowRight
                                className="
                                    h-4
                                    w-4
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </Link>

                        {/* CONSULTATION LINK */}

                        <Link
                            href="/contact"
                            className="
                                mt-4
                                flex
                                w-fit
                                items-center
                                gap-2
                                text-[13px]
                                font-semibold
                                text-white/60
                                transition
                                hover:text-[#e2b45d]
                            "
                        >
                            Free Consultation

                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* =========================================
                    LOWER FOOTER
                ========================================= */}

                <div
                    className="
                        flex
                        flex-col
                        gap-5
                        pt-8
                        text-[12px]
                        text-white/45

                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >
                    <p>
                        © {new Date().getFullYear()} Solid
                        Rock Behavioral Health. All rights
                        reserved.
                    </p>

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-x-6
                            gap-y-2
                        "
                    >
                        <Link
                            href="/privacy"
                            className="transition hover:text-white"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-white"
                        >
                            Terms of Use
                        </Link>

                        <Link
                            href="/notice-of-privacy-practices"
                            className="transition hover:text-white"
                        >
                            Privacy Practices
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}