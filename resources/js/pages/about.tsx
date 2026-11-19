import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { dashboard, login } from '@/routes';

export default function About() {
    const { auth } = usePage().props;

    return (
        <div className="template-page">
            <Head title="About" />

            <header className="site-header">
                <div className="container header-content">
                    <Link className="brand" href="/">
                        Clair
                    </Link>
                    <nav aria-label="Navigation principale">
                        <Link href="/">Tasks</Link>
                        <Link href="/a-propos">About</Link>
                        {auth.user ? (
                            <Link href={dashboard()}>
                                Dashboard
                            </Link>
                        ) : (
                            <Link href={login()}>Log in</Link>
                        )}
                    </nav>
                    <AppearanceToggleTab className="theme-toggle" />
                </div>
            </header>

            <main className="container">
                <p className="eyebrow">About Clair</p>
                <h1>A clear space for your priorities</h1>
                <p className="intro">
                    Clair brings your tasks together in a focused workspace so you
                    can concentrate on what matters.
                </p>
                <div className="note">
                    <strong>Manage tasks your way</strong>
                    <p>
                        Create, view, edit, and delete tasks without needing an account.
                        Use Waiting, In process, and Done to make progress visible at a
                        glance.
                    </p>
                </div>
                <div className="note">
                    <strong>Built for clarity</strong>
                    <p>
                        Search and filter your tasks, set due dates, and switch between
                        light mode with blue accents and dark mode with red accents.
                    </p>
                </div>
            </main>

            <footer className="site-footer">
                <div className="container">
                    © {new Date().getFullYear()} Clair — Your workspace
                </div>
            </footer>
        </div>
    );
}
