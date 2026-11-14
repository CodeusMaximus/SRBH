
const boroughLinks = [
    {
        label: "Staten Island Web Design",
        href: "https://www.mediadari.net/staten-island/web-design",
    },
    {
        label: "Brooklyn Web Design",
        href: "https://www.mediadari.net/brooklyn/web-design",
    },
    {
        label: "Queens Web Design",
        href: "https://www.mediadari.net/queens/web-design",
    },
    {
        label: "Manhattan Web Design",
        href: "https://www.mediadari.net/manhattan/web-design",
    },
    {
        label: "Bronx Web Design",
        href: "https://www.mediadari.net/bronx/web-design",
    },
];

export default function MediaDariFooterLinks() {
    return (
        <div className="mt-10 border-t border-gray-200/20 pt-6 text-center">
            <p className="mb-3 text-xs text-gray-500">
                Website Design & Development by{" "}
                <a
                    href="https://www.mediadari.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-600 hover:underline"
                >
                    MediaDari
                </a>
            </p>

            <nav aria-label="Website developer service areas">
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                    {boroughLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 transition-colors hover:text-blue-600 hover:underline"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </nav>
        </div>
    );
}
