import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Task = {
    id: number;
    title: string;
    description: string | null;
    status: 'waiting' | 'in_process' | 'done';
    due_date: string | null;
};

const statusLabels: Record<Task['status'], string> = {
    waiting: 'Waiting',
    in_process: 'In process',
    done: 'Done',
};

export default function ShowTask({ task }: { task: Task }) {
    return (
        <>
            <Head title={task.title} />
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="size-4" />
                    Back to tasks
                </Link>
                <div className="rounded-xl border p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold">{task.title}</h1>
                            <span className={`badge status-${task.status} mt-2 inline-block`}>
                                {statusLabels[task.status]}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href={`/tasks/${task.id}/edit`}><Pencil className="mr-2 size-4" />Edit</Link>
                            </Button>
                            <Form action={`/tasks/${task.id}`} method="delete">
                                <Button type="submit" variant="destructive"><Trash2 className="mr-2 size-4" />Delete</Button>
                            </Form>
                        </div>
                    </div>
                    {task.description && <p className="mt-6 whitespace-pre-wrap">{task.description}</p>}
                    {task.due_date && <p className="mt-6 text-sm text-muted-foreground">Due: {task.due_date}</p>}
                </div>
            </div>
        </>
    );
}
