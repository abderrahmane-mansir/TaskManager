import { Form, Head, Link } from '@inertiajs/react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

type Task = {
    id: number;
    title: string;
    description: string | null;
    status: 'waiting' | 'in_process' | 'done';
    due_date: string | null;
};

export default function Dashboard({ tasks }: { tasks: Task[] }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4">
                <div>
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-xl font-semibold">My tasks</h1>
                        <Button asChild>
                            <Link href="/tasks/create">Create task</Link>
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Create and track your work from one place.
                    </p>
                </div>

                <div className="grid gap-3">
                    {tasks.length === 0 && (
                        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                            No tasks yet. Add your first task above.
                        </div>
                    )}
                    {tasks.map((task) => (
                        <div key={task.id} className="flex flex-col gap-3 rounded-xl border p-4 md:flex-row md:items-center">
                            {task.status === 'done' ? (
                                <CheckCircle2 className="text-green-600" />
                            ) : (
                                <Circle className="text-muted-foreground" />
                            )}
                            <div className="min-w-0 flex-1">
                                <p className={task.status === 'done' ? 'font-medium line-through opacity-60' : 'font-medium'}>
                                    {task.title}
                                </p>
                                {task.description && (
                                    <p className="text-sm text-muted-foreground">{task.description}</p>
                                )}
                                {task.due_date && <p className="text-xs text-muted-foreground">Due {task.due_date}</p>}
                            </div>
                            <Form action={`/tasks/${task.id}`} method="patch" className="flex items-center gap-2">
                                <select name="status" defaultValue={task.status} className={`status-select status-${task.status} h-9 rounded-md border px-2 text-sm`}>
                                    <option value="waiting">Waiting</option>
                                    <option value="in_process">In process</option>
                                    <option value="done">Done</option>
                                </select>
                                <input type="hidden" name="title" value={task.title} />
                                <input type="hidden" name="description" value={task.description ?? ''} />
                                <input type="hidden" name="due_date" value={task.due_date ?? ''} />
                                <Button type="submit" variant="outline" size="sm">Save</Button>
                            </Form>
                            <Form action={`/tasks/${task.id}`} method="delete">
                                <Button type="submit" variant="ghost" size="icon" aria-label={`Delete ${task.title}`}>
                                    <Trash2 />
                                </Button>
                            </Form>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
