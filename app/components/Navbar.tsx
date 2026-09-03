"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
    CalendarDays,
    ChevronDown,
    ChevronRight,
    Mail,
    Menu,
    Phone,
    X,
} from "lucide-react";
import ServicesDropdown from "./ServicesDropdown";

const mobileServices = [
    {
        name: "Psychiatric Evaluation",
        href: "/services/psychiatric-evaluation",
    },
    {
        name: "Medication Management",
        href: "/services/medication-management",
    },
    {
        name: "Psychopharmacology",
        href: "/services/psychopharmacology",
    },
    {
        name: "Telehealth",
        href: "/services/telehealth",
    },
];

export default function Navbar() {
    const [servicesOpen, setServicesOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] =
        useState(false);

    return (
        <>
            <header
                className="
                    absolute
                    left-0
                    top-0
                    z-50
                    w-full
                    px-4
                    pt-7
                    sm:px-6
                    lg:px-8
                    lg:pt-7
                "
            >
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65 }}
                    className="
    mx-auto
    flex
    h-[104px]
    max-w-[1500px]
    items-center
    justify-between
    gap-4
    rounded-[24px]
    border
    border-white/40
    bg-white/80
    px-6
    shadow-[0_15px_50px_rgba(8,41,87,0.10)]
    backdrop-blur-xl
    lg:px-8
    xl:px-10
"
                >
                    {/* LOGO */}
                    <Link
                        href="/"
                        className="relative z-10 flex shrink-0 items-center"
                    >
                        <Image
                            src="/images/solid-rock-logo.png"
                            alt="Solid Rock Behavioral Health"
                            width={265}
                            height={105}
                            priority
                            className="
        h-auto
        w-[185px]
        object-contain
        lg:w-[205px]
        xl:w-[220px]
    "
                        />

                    </Link>

                    {/* DESKTOP NAV */}
                    <div
                        className="
                            hidden
                            items-center
                            gap-9
                            xl:flex
                        "
                    >
                        <NavLink href="/">Home</NavLink>

                        <NavLink href="/about-us">
                            About Us
                        </NavLink>

                        <div
                            className="relative"
                            onMouseEnter={() =>
                                setServicesOpen(true)
                            }
                            onMouseLeave={() =>
                                setServicesOpen(false)
                            }
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setServicesOpen(
                                        (previous) => !previous
                                    )
                                }
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-2
                                    py-9
                                    text-[16px]
                                    font-medium
                                    text-[#082957]
                                "
                            >
                                <span className="relative">
                                    Services

                                    <span
                                        className={`
                                            absolute
                                            -bottom-3
                                            left-0
                                            h-[2px]
                                            bg-[#d79a27]
                                            transition-all
                                            duration-300
                                            ${servicesOpen
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                            }
                                        `}
                                    />
                                </span>

                                <ChevronDown
                                    className={`
                                        h-4
                                        w-4
                                        transition-transform
                                        duration-200
                                        ${servicesOpen
                                            ? "rotate-180"
                                            : ""
                                        }
                                    `}
                                />
                            </button>

                            <AnimatePresence>
                                {servicesOpen && (
                                    <ServicesDropdown />
                                )}
                            </AnimatePresence>
                        </div>

                        <NavLink href="/blog">
                            Blog
                        </NavLink>

                        <NavLink href="/contact">
                            Contact Us
                        </NavLink>
                    </div>
                    {/* CONTACT ICONS */}
                    <div
                        className="
        hidden
        items-center
        gap-2
        xl:flex
    "
                    >
                        <a
                            href="tel:+10000000000"
                            aria-label="Call Solid Rock Behavioral Health"
                            title="Call us"
                            className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#082957]/10
            bg-[#eef4f7]/90
            text-[#075187]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[#075187]
            hover:bg-[#075187]
            hover:text-white
        "
                        >
                            <Phone className="h-[18px] w-[18px]" />
                        </a>

                        <a
                            href="mailto:contact@solidrockbehavioralhealth.com"
                            aria-label="Email Solid Rock Behavioral Health"
                            title="Email us"
                            className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#082957]/10
            bg-[#eef4f7]/90
            text-[#075187]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[#075187]
            hover:bg-[#075187]
            hover:text-white
        "
                        >
                            <Mail className="h-[18px] w-[18px]" />
                        </a>
                    </div>

                    {/* APPOINTMENT */}

                    {/* APPOINTMENT */}
                    {/* FREE CONSULTATION */}
                    <Link
                        href="/contact"
                        className="
        group
        hidden
        items-center
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
        hover:shadow-[0_16px_35px_rgba(7,81,135,0.35)]
        xl:flex
    "
                    >
                        <Phone className="h-[18px] w-[18px]" />

                        <span>Free Consultation</span>

                        <ChevronRight
                            className="
            h-4
            w-4
            transition-transform
            group-hover:translate-x-1
        "
                        />
                    </Link>

                    {/* MOBILE BUTTON */}
                    <button
                        type="button"
                        aria-label="Open navigation menu"
                        onClick={() =>
                            setMobileOpen(true)
                        }
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-[#082957]
                            text-white
                            xl:hidden
                        "
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </motion.nav>
            </header>

            {/* MOBILE NAVIGATION */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() =>
                                setMobileOpen(false)
                            }
                            className="
                                fixed
                                inset-0
                                z-[80]
                                bg-[#041a38]/55
                                backdrop-blur-sm
                            "
                        />

                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                damping: 28,
                                stiffness: 260,
                            }}
                            className="
                                fixed
                                right-0
                                top-0
                                z-[90]
                                h-full
                                w-[90%]
                                max-w-[420px]
                                overflow-y-auto
                                bg-white
                                p-7
                                shadow-2xl
                            "
                        >
                            <div
                                className="
                                    mb-10
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <Image
                                    src="/images/solid-rock-logo.png"
                                    alt="Solid Rock Behavioral Health"
                                    width={210}
                                    height={90}
                                    className="h-auto w-[190px]"
                                />

                                <button
                                    type="button"
                                    aria-label="Close navigation menu"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#eef3f7]
                                        text-[#082957]
                                    "
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-1">
                                <MobileLink
                                    href="/"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                >
                                    Home
                                </MobileLink>

                                <MobileLink
                                    href="/about-us"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                >
                                    About Us
                                </MobileLink>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setMobileServicesOpen(
                                            (previous) => !previous
                                        )
                                    }
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-between
                                        border-b
                                        border-slate-100
                                        py-4
                                        text-left
                                        text-[17px]
                                        font-semibold
                                        text-[#082957]
                                    "
                                >
                                    Services

                                    <ChevronDown
                                        className={`
                                            h-5
                                            w-5
                                            transition-transform
                                            ${mobileServicesOpen
                                                ? "rotate-180"
                                                : ""
                                            }
                                        `}
                                    />
                                </button>

                                <AnimatePresence>
                                    {mobileServicesOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                height: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{
                                                opacity: 0,
                                                height: 0,
                                            }}
                                            className="
                                                overflow-hidden
                                                rounded-xl
                                                bg-[#f5f8fb]
                                            "
                                        >
                                            {mobileServices.map(
                                                (service) => (
                                                    <Link
                                                        key={
                                                            service.name
                                                        }
                                                        href={
                                                            service.href
                                                        }
                                                        onClick={() =>
                                                            setMobileOpen(
                                                                false
                                                            )
                                                        }
                                                        className="
                                                            flex
                                                            items-center
                                                            justify-between
                                                            px-4
                                                            py-3
                                                            text-sm
                                                            font-medium
                                                            text-[#082957]
                                                        "
                                                    >
                                                        {service.name}

                                                        <ChevronRight className="h-4 w-4" />
                                                    </Link>
                                                )
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <MobileLink
                                    href="/blog"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                >
                                    Blog
                                </MobileLink>

                                <MobileLink
                                    href="/contact"
                                    onClick={() =>
                                        setMobileOpen(false)
                                    }
                                >
                                    Contact Us
                                </MobileLink>
                            </div>

                            {/* FREE CONSULTATION */}
                            <Link
                                href="/contact"
                                className="
        group
        hidden
        items-center
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
        hover:shadow-[0_16px_35px_rgba(7,81,135,0.35)]
        xl:flex
    "
                            >
                                <Phone className="h-[18px] w-[18px]" />

                                <span>Free Consultation</span>

                                <ChevronRight
                                    className="
            h-4
            w-4
            transition-transform
            group-hover:translate-x-1
        "
                                />
                            </Link>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

function NavLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="
                group
                relative
                py-9
                text-[16px]
                font-medium
                text-[#082957]
            "
        >
            {children}

            <span
                className="
                    absolute
                    bottom-6
                    left-0
                    h-[2px]
                    w-0
                    bg-[#d79a27]
                    transition-all
                    duration-300
                    group-hover:w-full
                "
            />
        </Link>
    );
}

function MobileLink({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="
                flex
                border-b
                border-slate-100
                py-4
                text-[17px]
                font-semibold
                text-[#082957]
            "
        >
            {children}
        </Link>
    );
}