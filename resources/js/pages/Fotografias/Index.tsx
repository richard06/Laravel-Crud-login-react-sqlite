import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { BellDot } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fotografias',
        href: '/fotografias',
    },
];

interface Fotografia {
    id: number;
    nombre: string;
    fecha: Date;
    precio: number;
    autor: string;
    comentario: string;
}

interface PageProps {
    flash: {
        mensaje?: string;
    };
    fotografias: Fotografia[];
}

export default function Index() {
    const { fotografias, flash } = usePage().props as PageProps;

    const { processing, delete: destruir } = useForm();

    const handleDelete = (id: number, nombrefoto: string) => {
        //alert('Do you want to delete ' + nombrefoto.toUpperCase() + ' item ' + id + '?');
        if (confirm('Do you want to delete ' + nombrefoto.toUpperCase() + ' item ' + id + '?')) {
            //destruir('/fotografias/' + id);
            destruir(route('fotografias.destruir', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fotografias" />
            <div className="m-4">
                <Link href={route('fotografias.create')}>
                    <Button>Menu de fotografias</Button>
                </Link>
            </div>
            <div className="m-4">
                <div>
                    {flash.mensaje && (
                        <Alert>
                            <BellDot className="h-4 w-4" />
                            <AlertTitle>Notificación!</AlertTitle>
                            <AlertDescription>{flash.mensaje}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            {fotografias.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>Lista de fotografias</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Id</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead className="text-left">Fecha</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Autor</TableHead>
                                <TableHead className="text-right">Comentario</TableHead>
                                <TableHead className="text-center">Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fotografias.map((fotografia) => (
                                <TableRow>
                                    <TableCell className="font-medium">{fotografia.id}</TableCell>
                                    <TableCell>{fotografia.nombre}</TableCell>
                                    <TableCell className="text-left">{fotografia.fecha.toString()}</TableCell>
                                    <TableCell> ${fotografia.precio}</TableCell>
                                    <TableCell>{fotografia.autor}</TableCell>
                                    <TableCell className="text-right">{fotografia.comentario}</TableCell>
                                    <TableCell className="space-x-2 text-center">
                                        <Link href={route('fotografias.edit', fotografia.id)}>
                                            <Button className="bg-slate-600 hover:bg-slate-800">Edit</Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            onClick={() => handleDelete(fotografia.id, fotografia.nombre)}
                                            className="bg-red-400 hover:bg-red-700"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
