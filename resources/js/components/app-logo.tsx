export default function AppLogo() {
    return (
        <>
            <div
                aria-label="CaptionGen"
                className="size-8 shrink-0 bg-primary"
                style={{
                    maskImage: 'url(/images/logo.svg)',
                    WebkitMaskImage: 'url(/images/logo.svg)',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                }}
            />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    CaptionGen
                </span>
            </div>
        </>
    );
}
