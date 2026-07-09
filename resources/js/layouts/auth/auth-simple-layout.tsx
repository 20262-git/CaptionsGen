import { Link } from '@inertiajs/react';
import LogoMark from '@/components/logo-mark';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Link
                        href={home()}
                        className="flex flex-col items-center gap-2 font-medium"
                    >
                        <LogoMark className="size-11" />
                        <span className="text-lg font-semibold">CaptionGen</span>
                        <span className="sr-only">{title}</span>
                    </Link>

                    <div className="rounded-2xl border border-sidebar-border/70 bg-card p-6 shadow-sm dark:border-sidebar-border">
                        <div className="mb-6 space-y-1.5 text-center">
                            <h1 className="text-xl font-semibold">{title}</h1>
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
