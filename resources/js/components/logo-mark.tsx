import { cn } from '@/lib/utils';

/**
 * The CaptionGen logo rendered as a solid mark tinted with the primary
 * (green) theme color via a CSS mask, so it follows light/dark and any
 * future theme change. Pass a size via `className` (e.g. `size-8`).
 */
export default function LogoMark({ className }: { className?: string }) {
    return (
        <div
            aria-hidden
            className={cn('shrink-0 bg-primary', className)}
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
    );
}
