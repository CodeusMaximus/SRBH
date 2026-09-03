"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    BadgeCheck,
    Building2,
    Calculator,
    CheckCircle2,
    ChevronRight,
    CreditCard,
    HeartPulse,
    Info,
    LockKeyhole,
    ShieldCheck,
    Sparkles,
    UserRound,
} from "lucide-react";

type Step = 1 | 2 | 3;

type EstimateResult = {
    active: boolean;
    insurer: string;
    service: string;
    copay: string;
    deductible: string;
    deductibleRemaining: string;
    coinsurance: string;
    estimate: string;
};

const services = [
    "Initial Psychiatric Evaluation",
    "Medication Management",
    "Psychopharmacology",
    "Telehealth Appointment",
];

const insurers = [
    "Aetna",
    "Cigna",
    "UnitedHealthcare",
    "Blue Cross Blue Shield",
    "Oxford",
    "EmblemHealth",
    "Healthfirst",
    "Medicare",
    "Medicaid",
    "Other",
];

export default function CostEstimatorSection() {
    const [step, setStep] = useState<Step>(1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] =
        useState<EstimateResult | null>(null);

    const [form, setForm] = useState({
        insurer: "",
        memberId: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        service: "",
    });

    const updateField = (
        field: keyof typeof form,
        value: string
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const canContinueStepOne =
        form.insurer && form.service;

    const canCheckBenefits =
        form.memberId &&
        form.firstName &&
        form.lastName &&
        form.dateOfBirth;

    /*
     * TEMPORARY DEMO FUNCTION
     *
     * This DOES NOT represent actual insurance benefits.
     *
     * Later we'll replace this with:
     *
     * POST /api/insurance/eligibility
     *
     * which will securely communicate with the
     * eligibility provider from the SERVER.
     */
    const checkBenefits = async () => {
        if (!canCheckBenefits) {
            return;
        }

        setLoading(true);

        await new Promise((resolve) =>
            setTimeout(resolve, 1600)
        );

        setResult({
            active: true,
            insurer: form.insurer,
            service: form.service,

            // DEMO VALUES ONLY
            copay: "$30",
            deductible: "$1,500",
            deductibleRemaining: "$620",
            coinsurance: "20%",
            estimate: "$30–$75",
        });

        setLoading(false);
        setStep(3);
    };

    const resetEstimator = () => {
        setForm({
            insurer: "",
            memberId: "",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            service: "",
        });

        setResult(null);
        setStep(1);
    };

    return (
        <section
            className="
                relative
                overflow-hidden
                bg-[#f7f4ee]
                py-20

                sm:py-24

                lg:py-28
            "
        >
            {/* BACKGROUND DECORATION */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-[180px]
                    -top-[180px]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#d7b269]/10
                    blur-[100px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-[200px]
                    -left-[150px]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#075187]/10
                    blur-[110px]
                "
            />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-[1380px]
                    px-5

                    sm:px-8

                    lg:px-12
                "
            >
                {/* =========================================
                    SECTION HEADING
                ========================================= */}

                <div
                    className="
                        mx-auto
                        mb-12
                        max-w-[760px]
                        text-center

                        lg:mb-16
                    "
                >
                    <div
                        className="
                            mb-5
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-[#d7b269]/40
                            bg-white/70
                            px-4
                            py-2
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-[#94671d]
                            shadow-sm
                        "
                    >
                        <ShieldCheck className="h-4 w-4" />

                        Insurance & Cost Estimator
                    </div>

                    <h2
                        className="
                            font-serif
                            text-[38px]
                            font-semibold
                            leading-[1.05]
                            tracking-[-0.035em]
                            text-[#082957]

                            sm:text-[50px]

                            lg:text-[60px]
                        "
                    >
                        Understand Your Coverage
                        <span className="text-[#b57b1e]">
                            {" "}
                            Before Your Visit.
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-6
                            max-w-[650px]
                            text-[16px]
                            leading-7
                            text-[#536a82]

                            sm:text-[18px]
                        "
                    >
                        Check your insurance benefits and
                        receive an estimate of what you may
                        be responsible for before scheduling
                        your appointment.
                    </p>
                </div>

                {/* =========================================
                    MAIN ESTIMATOR
                ========================================= */}

                <div
                    className="
                        mx-auto
                        grid
                        max-w-[1180px]
                        overflow-hidden
                        rounded-[32px]
                        border
                        border-[#082957]/10
                        bg-white
                        shadow-[0_30px_80px_rgba(8,41,87,0.12)]

                        lg:grid-cols-[0.72fr_1.28fr]
                    "
                >
                    {/* =====================================
                        LEFT PANEL
                    ===================================== */}

                    <div
                        className="
                            relative
                            overflow-hidden
                            bg-[#082957]
                            p-7
                            text-white

                            sm:p-9

                            lg:p-10

                            xl:p-12
                        "
                    >
                        <div
                            className="
                                absolute
                                -right-24
                                -top-24
                                h-64
                                w-64
                                rounded-full
                                bg-[#d7b269]/15
                                blur-3xl
                            "
                        />

                        <div
                            className="
                                relative
                                z-10
                                flex
                                h-full
                                flex-col
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-[#d7b269]
                                    text-[#082957]
                                    shadow-lg
                                "
                            >
                                <Calculator className="h-7 w-7" />
                            </div>

                            <h3
                                className="
                                    mt-7
                                    font-serif
                                    text-[31px]
                                    font-semibold
                                    leading-tight

                                    lg:text-[36px]
                                "
                            >
                                Know What to Expect
                            </h3>

                            <p
                                className="
                                    mt-4
                                    text-[15px]
                                    leading-7
                                    text-white/70
                                "
                            >
                                We believe understanding your
                                benefits should be simple.
                                Check your coverage before
                                your appointment and avoid
                                unnecessary surprises.
                            </p>

                            {/* BENEFITS */}

                            <div
                                className="
                                    mt-9
                                    space-y-5
                                "
                            >
                                <Feature
                                    icon={BadgeCheck}
                                    title="Coverage Status"
                                    text="See whether your coverage appears active."
                                />

                                <Feature
                                    icon={CreditCard}
                                    title="Benefit Details"
                                    text="Review available copay, deductible and coinsurance information."
                                />

                                <Feature
                                    icon={HeartPulse}
                                    title="Cost Guidance"
                                    text="Understand your potential financial responsibility."
                                />
                            </div>

                            {/* PRIVACY */}

                            <div
                                className="
                                    mt-10
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-white/[0.06]
                                    p-4

                                    lg:mt-auto
                                "
                            >
                                <div className="flex gap-3">
                                    <LockKeyhole
                                        className="
                                            mt-0.5
                                            h-5
                                            w-5
                                            shrink-0
                                            text-[#e2bb68]
                                        "
                                    />

                                    <div>
                                        <p
                                            className="
                                                text-[13px]
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            Your privacy
                                            matters.
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-[11px]
                                                leading-5
                                                text-white/60
                                            "
                                        >
                                            Insurance
                                            information should
                                            only be transmitted
                                            through the secure
                                            eligibility system
                                            when the live
                                            integration is
                                            enabled.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =====================================
                        RIGHT PANEL
                    ===================================== */}

                    <div
                        className="
                            p-6

                            sm:p-9

                            lg:p-10

                            xl:p-12
                        "
                    >
                        {/* STEP INDICATOR */}

                        <div
                            className="
                                mb-10
                                flex
                                items-center
                            "
                        >
                            <StepIndicator
                                number={1}
                                label="Coverage"
                                active={step >= 1}
                                complete={step > 1}
                            />

                            <StepLine
                                active={step >= 2}
                            />

                            <StepIndicator
                                number={2}
                                label="Your Details"
                                active={step >= 2}
                                complete={step > 2}
                            />

                            <StepLine
                                active={step >= 3}
                            />

                            <StepIndicator
                                number={3}
                                label="Estimate"
                                active={step >= 3}
                                complete={false}
                            />
                        </div>

                        {/* =================================
                            STEP 1
                        ================================= */}

                        {step === 1 && (
                            <div>
                                <div className="mb-8">
                                    <p
                                        className="
                                            text-[12px]
                                            font-bold
                                            uppercase
                                            tracking-[0.18em]
                                            text-[#b17a21]
                                        "
                                    >
                                        Step 1 of 3
                                    </p>

                                    <h3
                                        className="
                                            mt-2
                                            font-serif
                                            text-[30px]
                                            font-semibold
                                            text-[#082957]

                                            sm:text-[35px]
                                        "
                                    >
                                        Tell us about your
                                        coverage.
                                    </h3>

                                    <p
                                        className="
                                            mt-2
                                            text-[14px]
                                            leading-6
                                            text-[#687c91]
                                        "
                                    >
                                        Start by selecting your
                                        insurance provider and
                                        the service you&apos;re
                                        interested in.
                                    </p>
                                </div>

                                <div
                                    className="
                                        grid
                                        gap-6
                                    "
                                >
                                    <FieldWrapper
                                        label="Insurance Provider"
                                        icon={Building2}
                                    >
                                        <select
                                            value={
                                                form.insurer
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "insurer",
                                                    event.target
                                                        .value
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option value="">
                                                Select your
                                                insurance
                                            </option>

                                            {insurers.map(
                                                (insurer) => (
                                                    <option
                                                        key={
                                                            insurer
                                                        }
                                                        value={
                                                            insurer
                                                        }
                                                    >
                                                        {
                                                            insurer
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </FieldWrapper>

                                    <FieldWrapper
                                        label="Service"
                                        icon={HeartPulse}
                                    >
                                        <select
                                            value={
                                                form.service
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "service",
                                                    event.target
                                                        .value
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option value="">
                                                Select a service
                                            </option>

                                            {services.map(
                                                (service) => (
                                                    <option
                                                        key={
                                                            service
                                                        }
                                                        value={
                                                            service
                                                        }
                                                    >
                                                        {
                                                            service
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </FieldWrapper>
                                </div>

                                <button
                                    type="button"
                                    disabled={
                                        !canContinueStepOne
                                    }
                                    onClick={() =>
                                        setStep(2)
                                    }
                                    className="
                                        group
                                        mt-8
                                        flex
                                        min-h-[56px]
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-full
                                        bg-[#075187]
                                        px-6
                                        text-[15px]
                                        font-semibold
                                        text-white
                                        shadow-[0_12px_28px_rgba(7,81,135,0.22)]
                                        transition-all

                                        hover:bg-[#063f6b]

                                        disabled:cursor-not-allowed
                                        disabled:opacity-40
                                    "
                                >
                                    Continue

                                    <ChevronRight
                                        className="
                                            h-5
                                            w-5
                                            transition-transform
                                            group-hover:translate-x-1
                                        "
                                    />
                                </button>
                            </div>
                        )}

                        {/* =================================
                            STEP 2
                        ================================= */}

                        {step === 2 && (
                            <div>
                                <div className="mb-8">
                                    <p
                                        className="
                                            text-[12px]
                                            font-bold
                                            uppercase
                                            tracking-[0.18em]
                                            text-[#b17a21]
                                        "
                                    >
                                        Step 2 of 3
                                    </p>

                                    <h3
                                        className="
                                            mt-2
                                            font-serif
                                            text-[30px]
                                            font-semibold
                                            text-[#082957]

                                            sm:text-[35px]
                                        "
                                    >
                                        Insurance Details
                                    </h3>

                                    <p
                                        className="
                                            mt-2
                                            text-[14px]
                                            leading-6
                                            text-[#687c91]
                                        "
                                    >
                                        Enter the information
                                        exactly as it appears
                                        on your insurance card.
                                    </p>
                                </div>

                                <div
                                    className="
                                        grid
                                        gap-5

                                        sm:grid-cols-2
                                    "
                                >
                                    <FieldWrapper
                                        label="First Name"
                                        icon={UserRound}
                                    >
                                        <input
                                            type="text"
                                            value={
                                                form.firstName
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "firstName",
                                                    event.target
                                                        .value
                                                )
                                            }
                                            placeholder="First name"
                                            autoComplete="given-name"
                                            className={inputClass}
                                        />
                                    </FieldWrapper>

                                    <FieldWrapper
                                        label="Last Name"
                                        icon={UserRound}
                                    >
                                        <input
                                            type="text"
                                            value={
                                                form.lastName
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "lastName",
                                                    event.target
                                                        .value
                                                )
                                            }
                                            placeholder="Last name"
                                            autoComplete="family-name"
                                            className={inputClass}
                                        />
                                    </FieldWrapper>

                                    <FieldWrapper
                                        label="Date of Birth"
                                        icon={UserRound}
                                    >
                                        <input
                                            type="date"
                                            value={
                                                form.dateOfBirth
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "dateOfBirth",
                                                    event.target
                                                        .value
                                                )
                                            }
                                            className={inputClass}
                                        />
                                    </FieldWrapper>

                                    <FieldWrapper
                                        label="Member ID"
                                        icon={CreditCard}
                                    >
                                        <input
                                            type="text"
                                            value={
                                                form.memberId
                                            }
                                            onChange={(event) =>
                                                updateField(
                                                    "memberId",
                                                    event.target
                                                        .value
                                                )
                                            }
                                            placeholder="Member ID"
                                            autoComplete="off"
                                            className={inputClass}
                                        />
                                    </FieldWrapper>
                                </div>

                                <div
                                    className="
                                        mt-6
                                        flex
                                        gap-3
                                        rounded-2xl
                                        bg-[#f5f8fa]
                                        p-4
                                    "
                                >
                                    <Info
                                        className="
                                            mt-0.5
                                            h-5
                                            w-5
                                            shrink-0
                                            text-[#075187]
                                        "
                                    />

                                    <p
                                        className="
                                            text-[12px]
                                            leading-5
                                            text-[#60758b]
                                        "
                                    >
                                        Enter your name exactly
                                        as shown on your
                                        insurance card. Benefit
                                        information and cost
                                        estimates are not a
                                        guarantee of coverage
                                        or payment.
                                    </p>
                                </div>

                                <div
                                    className="
                                        mt-8
                                        flex
                                        flex-col-reverse
                                        gap-3

                                        sm:flex-row
                                    "
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setStep(1)
                                        }
                                        className="
                                            min-h-[54px]
                                            rounded-full
                                            border
                                            border-[#082957]/15
                                            px-7
                                            text-[14px]
                                            font-semibold
                                            text-[#082957]
                                            transition

                                            hover:bg-[#f5f7f8]
                                        "
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="button"
                                        disabled={
                                            !canCheckBenefits ||
                                            loading
                                        }
                                        onClick={
                                            checkBenefits
                                        }
                                        className="
                                            group
                                            flex
                                            min-h-[54px]
                                            flex-1
                                            items-center
                                            justify-center
                                            gap-3
                                            rounded-full
                                            bg-[#075187]
                                            px-7
                                            text-[14px]
                                            font-semibold
                                            text-white
                                            shadow-[0_12px_28px_rgba(7,81,135,0.22)]
                                            transition

                                            hover:bg-[#063f6b]

                                            disabled:cursor-not-allowed
                                            disabled:opacity-40
                                        "
                                    >
                                        {loading ? (
                                            <>
                                                <span
                                                    className="
                                                        h-5
                                                        w-5
                                                        animate-spin
                                                        rounded-full
                                                        border-2
                                                        border-white/30
                                                        border-t-white
                                                    "
                                                />

                                                Checking
                                                Benefits...
                                            </>
                                        ) : (
                                            <>
                                                <ShieldCheck className="h-5 w-5" />

                                                Check My
                                                Benefits
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* =================================
                            STEP 3
                        ================================= */}

                        {step === 3 && result && (
                            <div>
                                <div
                                    className="
                                        mb-7
                                        flex
                                        items-start
                                        gap-4
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-emerald-50
                                            text-emerald-600
                                        "
                                    >
                                        <CheckCircle2 className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <p
                                            className="
                                                text-[11px]
                                                font-bold
                                                uppercase
                                                tracking-[0.18em]
                                                text-emerald-600
                                            "
                                        >
                                            Coverage Found
                                        </p>

                                        <h3
                                            className="
                                                mt-1
                                                font-serif
                                                text-[29px]
                                                font-semibold
                                                text-[#082957]

                                                sm:text-[34px]
                                            "
                                        >
                                            Your Benefits
                                            Estimate
                                        </h3>

                                        <p
                                            className="
                                                mt-1
                                                text-[13px]
                                                text-[#687c91]
                                            "
                                        >
                                            {result.insurer} •{" "}
                                            {result.service}
                                        </p>
                                    </div>
                                </div>

                                {/* BENEFIT CARDS */}

                                <div
                                    className="
                                        grid
                                        gap-3

                                        sm:grid-cols-3
                                    "
                                >
                                    <ResultCard
                                        label="Copay"
                                        value={result.copay}
                                        detail="Per visit"
                                    />

                                    <ResultCard
                                        label="Deductible"
                                        value={
                                            result.deductible
                                        }
                                        detail={`${result.deductibleRemaining} remaining`}
                                    />

                                    <ResultCard
                                        label="Coinsurance"
                                        value={
                                            result.coinsurance
                                        }
                                        detail="After deductible"
                                    />
                                </div>

                                {/* BIG ESTIMATE */}

                                <div
                                    className="
                                        relative
                                        mt-6
                                        overflow-hidden
                                        rounded-[26px]
                                        bg-[#082957]
                                        p-6
                                        text-white

                                        sm:p-8
                                    "
                                >
                                    <div
                                        className="
                                            absolute
                                            -right-14
                                            -top-14
                                            h-40
                                            w-40
                                            rounded-full
                                            bg-[#d7b269]/20
                                            blur-3xl
                                        "
                                    />

                                    <div className="relative z-10">
                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                                text-[#e2bb68]
                                            "
                                        >
                                            <Sparkles className="h-4 w-4" />

                                            <p
                                                className="
                                                    text-[11px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.18em]
                                                "
                                            >
                                                Estimated
                                                Patient
                                                Responsibility
                                            </p>
                                        </div>

                                        <p
                                            className="
                                                mt-3
                                                font-serif
                                                text-[45px]
                                                font-semibold
                                                tracking-[-0.03em]

                                                sm:text-[56px]
                                            "
                                        >
                                            {
                                                result.estimate
                                            }
                                            <span
                                                className="
                                                    ml-2
                                                    align-top
                                                    text-[18px]
                                                    text-[#e2bb68]
                                                "
                                            >
                                                *
                                            </span>
                                        </p>

                                        <p
                                            className="
                                                mt-2
                                                max-w-[500px]
                                                text-[11px]
                                                leading-5
                                                text-white/60
                                            "
                                        >
                                            This is an estimate
                                            only. Actual patient
                                            responsibility may
                                            differ after claim
                                            processing,
                                            deductible
                                            application,
                                            network
                                            determination, and
                                            insurer review.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="
                                        mt-6
                                        flex
                                        flex-col
                                        gap-3

                                        sm:flex-row
                                    "
                                >
                                    <Link
                                        href="/contact"
                                        className="
                                            group
                                            flex
                                            min-h-[54px]
                                            flex-1
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-full
                                            bg-[#075187]
                                            px-6
                                            text-[14px]
                                            font-semibold
                                            text-white
                                            transition

                                            hover:bg-[#063f6b]
                                        "
                                    >
                                        Book an Appointment

                                        <ArrowRight
                                            className="
                                                h-4
                                                w-4
                                                transition-transform
                                                group-hover:translate-x-1
                                            "
                                        />
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={
                                            resetEstimator
                                        }
                                        className="
                                            min-h-[54px]
                                            rounded-full
                                            border
                                            border-[#082957]/15
                                            px-6
                                            text-[14px]
                                            font-semibold
                                            text-[#082957]
                                            transition

                                            hover:bg-[#f5f7f8]
                                        "
                                    >
                                        Start Over
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* =========================================
                    DISCLAIMER
                ========================================= */}

                <div
                    className="
                        mx-auto
                        mt-7
                        max-w-[900px]
                        text-center
                    "
                >
                    <p
                        className="
                            text-[11px]
                            leading-5
                            text-[#75879a]
                        "
                    >
                        Insurance eligibility and benefit
                        information is provided for
                        informational purposes and does not
                        guarantee coverage or payment.
                        Benefits are subject to the terms of
                        your individual health plan and final
                        determination by your insurance
                        carrier.
                    </p>
                </div>
            </div>
        </section>
    );
}

/* =========================================================
   FIELD
========================================================= */

const inputClass = `
    h-[56px]
    w-full
    rounded-2xl
    border
    border-[#082957]/10
    bg-[#f8fafb]
    px-4
    text-[14px]
    text-[#082957]
    outline-none
    transition-all

    placeholder:text-[#8da0b1]

    focus:border-[#075187]/50
    focus:bg-white
    focus:ring-4
    focus:ring-[#075187]/5
`;

function FieldWrapper({
    label,
    icon: Icon,
    children,
}: {
    label: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span
                className="
                    mb-2
                    flex
                    items-center
                    gap-2
                    text-[12px]
                    font-semibold
                    text-[#294865]
                "
            >
                <Icon className="h-4 w-4 text-[#b17a21]" />

                {label}
            </span>

            {children}
        </label>
    );
}

/* =========================================================
   LEFT FEATURE
========================================================= */

function Feature({
    icon: Icon,
    title,
    text,
}: {
    icon: React.ElementType;
    title: string;
    text: string;
}) {
    return (
        <div className="flex gap-4">
            <div
                className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    text-[#e2bb68]
                "
            >
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <p
                    className="
                        text-[14px]
                        font-semibold
                        text-white
                    "
                >
                    {title}
                </p>

                <p
                    className="
                        mt-1
                        text-[12px]
                        leading-5
                        text-white/55
                    "
                >
                    {text}
                </p>
            </div>
        </div>
    );
}

/* =========================================================
   STEP INDICATOR
========================================================= */

function StepIndicator({
    number,
    label,
    active,
    complete,
}: {
    number: number;
    label: string;
    active: boolean;
    complete: boolean;
}) {
    return (
        <div
            className="
                flex
                shrink-0
                flex-col
                items-center
            "
        >
            <div
                className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    text-[12px]
                    font-bold
                    transition-all

                    ${active
                        ? "bg-[#075187] text-white shadow-[0_6px_16px_rgba(7,81,135,0.20)]"
                        : "bg-[#eef2f5] text-[#8a9aaa]"
                    }
                `}
            >
                {complete ? (
                    <CheckCircle2 className="h-4 w-4" />
                ) : (
                    number
                )}
            </div>

            <span
                className={`
                    mt-2
                    hidden
                    text-[10px]
                    font-semibold

                    sm:block

                    ${active
                        ? "text-[#082957]"
                        : "text-[#9aa8b5]"
                    }
                `}
            >
                {label}
            </span>
        </div>
    );
}

function StepLine({
    active,
}: {
    active: boolean;
}) {
    return (
        <div
            className="
                mx-2
                mb-5
                h-px
                flex-1

                sm:mx-4
            "
        >
            <div
                className={`
                    h-full
                    w-full
                    transition-all
                    duration-500

                    ${active
                        ? "bg-[#d7b269]"
                        : "bg-[#dfe5e9]"
                    }
                `}
            />
        </div>
    );
}

/* =========================================================
   RESULT CARD
========================================================= */

function ResultCard({
    label,
    value,
    detail,
}: {
    label: string;
    value: string;
    detail: string;
}) {
    return (
        <div
            className="
                rounded-[20px]
                border
                border-[#082957]/8
                bg-[#f8fafb]
                p-5
            "
        >
            <p
                className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-[#718497]
                "
            >
                {label}
            </p>

            <p
                className="
                    mt-2
                    font-serif
                    text-[28px]
                    font-semibold
                    text-[#082957]
                "
            >
                {value}
            </p>

            <p
                className="
                    mt-1
                    text-[11px]
                    text-[#718497]
                "
            >
                {detail}
            </p>
        </div>
    );
}