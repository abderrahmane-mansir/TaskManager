import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import AppearanceToggleTab from '@/components/appearance-tabs';
import { dashboard, login } from '@/routes';

type TaskStatus = 'waiting' | 'in_process' | 'done';

interface Task {
    id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    due_date: string | null;
}

export default function Welcome({ tasks }: { tasks: Task[] }) {
    const { auth } = usePage<{ auth: { user: object | null } }>().props;
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | TaskStatus>('all');

    const visibleTasks = useMemo(() => {
        const query = search.trim().toLocaleLowerCase('en');

        return tasks.filter(
            (task) =>
                task.title.toLocaleLowerCase('en').includes(query) &&
                (activeFilter === 'all' ||
                    (activeFilter === 'waiting' && task.status === 'waiting') ||
                    (activeFilter === 'in_process' && task.status === 'in_process') ||
                    (activeFilter === 'done' && task.status === 'done')),
        );
    }, [activeFilter, search]);

    return (
        <div className="template-page">
            <Head title="My tasks" />

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
                <p className="eyebrow">My workspace</p>
                <h1>My tasks</h1>
                <p className="intro">
                    Keep your priorities organized, track progress, and maintain a
                    clear view of your day.
                </p>

                <section className="toolbar" aria-label="Task filters">
                    <label htmlFor="search">Search tasks</label>
                    <input
                        id="search"
                        type="search"
                        placeholder="Search by title"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <div className="filters" aria-label="Task status">
                        {[
                            ['all', 'Toutes'],
                            ['waiting', 'Waiting'],
                            ['in_process', 'In process'],
                            ['done', 'Done'],
                        ].map(([value, label]) => (
                            <button
                                key={value}
                                type="button"
                                aria-pressed={activeFilter === value}
                                onClick={() =>
                                    setActiveFilter(
                                        value as 'all' | TaskStatus,
                                    )
                                }
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </section>

                <p role="status" aria-live="polite">
                    {visibleTasks.length} {visibleTasks.length === 1 ? 'task' : 'tasks'} displayed
                </p>

                <Link className="button" href="/tasks/create">
                    Create a task
                </Link>

                <div id="task-list">
                    {visibleTasks.map((task) => (
                        <article className="task" key={task.id}>
                            <div>
                                <h2>
                                    <Link href={`/tasks/${task.id}`}>{task.title}</Link>
                                </h2>
                                {task.description && <p>{task.description}</p>}
                                {task.due_date && <small>Due: {task.due_date}</small>}
                            </div>
                            <span
                                className={
                                    `badge status-${task.status}`
                                }
                            >
                                {task.status === 'done'
                                    ? 'Done'
                                    : task.status === 'in_process'
                                      ? 'In process'
                                      : 'Waiting'}
                            </span>
                        </article>
                    ))}
                </div>

                {visibleTasks.length === 0 && (
                    <p className="empty-message">
                        No tasks match your search.
                    </p>
                )}
            </main>

            <footer className="site-footer">
                <div className="container">
                    © {new Date().getFullYear()} Clair — Your workspace
                </div>
            </footer>
        </div>
    );
}
