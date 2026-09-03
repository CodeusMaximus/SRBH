"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Brain,
    Pill,
    Network,
    Monitor,
    ChevronRight,
} from "lucide-react";

const services = [
    {
        name: "Psychiatric Evaluation",
        href: "/services/psychiatric-evaluation",
        icon: Brain,
    },
    {
        name: "Medication Management",
        href: "/services/medication-management",
        icon: Pill,
    },
    {
        name: "Psychopharmacology",
        href: "/services/psychopharmacology",
        icon: Network,
    },
    {
        name: "Telehealth",
        href: "/services/telehealth",
        icon: Monitor,
    },
];

export default function ServicesDropdown() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="
                absolute
                left-1/2
                top-[calc(100%+14px)]
                w-[330px]
                -translate-x-1/2
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                p-2
                shadow-[0_20px_60px_rgba(15,23,42,0.18)]
            "
        >
            {services.map((service) => {
                const Icon = service.icon;

                return (
                    <Link
                        key={service.name}
                        href={service.href}
                        className="
                            group
                            flex
                            items-center
                            gap-4
                            rounded-xl
                            px-4
                            py-4
                            transition
                            hover:bg-[#f5f8fb]
                        "
                    >
                        <Icon
                            strokeWidth={1.9}
                            className="
                                h-7
                                w-7
                                shrink-0
                                text-[#082957]
                            "
                        />

                        <span
                            className="
                                flex-1
                                whitespace-nowrap
                                text-[15px]
                                font-medium
                                text-[#082957]
                            "
                        >
                            {service.name}
                        </span>

                        <ChevronRight
                            className="
                                h-4
                                w-4
                                text-[#082957]
                                transition-transform
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                );
            })}
        </motion.div>
    );
}