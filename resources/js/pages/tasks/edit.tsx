import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Task = {
    id: number;
    title: string;
    description: string | null;
    status: 'waiting' | 'in_process' | 'done';
    due_date: string | null;
};

export default function EditTask({ task }: { task: Task }) {
    return (
        <>
            <Head title={`Edit ${task.title}`} />
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4">
                <Link href={`/tasks/${task.id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="size-4" />
                    Back to task
                </Link>
                <h1 className="text-2xl font-semibold">Edit task</h1>
                <Form action={`/tasks/${task.id}`} method="patch" className="grid gap-5 rounded-xl border p-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" defaultValue={task.title} required />
                                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea id="description" name="description" defaultValue={task.description ?? ''} rows={5} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" />
                                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <select id="status" name="status" defaultValue={task.status} className="h-10 rounded-md border border-input bg-transparent px-3 text-sm">
                                    <option value="waiting">Waiting</option>
                                    <option value="in_process">In process</option>
                                    <option value="done">Done</option>
                                </select>
                                {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="due_date">Due date</Label>
                                <Input id="due_date" name="due_date" type="date" defaultValue={task.due_date ?? ''} />
                                {errors.due_date && <p className="text-sm text-destructive">{errors.due_date}</p>}
                            </div>
                            <div className="flex justify-end gap-3">
                                <Button asChild variant="outline"><Link href={`/tasks/${task.id}`}>Cancel</Link></Button>
                                <Button disabled={processing}>Save changes</Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}
