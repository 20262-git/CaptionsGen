import LogoMark from '@/components/logo-mark';

export default function AppLogo() {
    return (
        <>
            <LogoMark className="size-8" />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    CaptionGen
                </span>
            </div>
        </>
    );
}
