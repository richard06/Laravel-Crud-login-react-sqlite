import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Autos',
        href: '/autos',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Autos" />
            <div className="m-4">
                <Link href={route('autos.create')}>
                    <Button>Menu de autos</Button>
                </Link>
            </div>
        </AppLayout>
    );
}
