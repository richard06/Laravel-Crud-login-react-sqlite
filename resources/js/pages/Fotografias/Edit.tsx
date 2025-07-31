import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { ChevronDownIcon, TriangleAlert } from 'lucide-react';
import * as React from 'react';

interface Fotografia {
    id: number;
    nombre: string;
    fecha: Date;
    precio: number;
    autor: string;
    comentario: string;
}

interface Props {
    fotografia: Fotografia;
}

export default function Edit({ fotografia }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: fotografia.nombre,
        fecha: fotografia.fecha,
        precio: fotografia.precio.toString(),
        autor: fotografia.autor,
        comentario: fotografia.comentario,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('fotografias.update', fotografia.id));
    };

    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [open, setOpen] = React.useState(false);

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit a Fotografia', href: '/fotografias/${fotografia.id}/edit' }]}>
            <Head title="Actualiza la fotografia" />
            <div className="m-4">
                <form onSubmit={handleUpdate} className="w-2/3 space-y-4">
                    {/*Display error*/}
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <TriangleAlert className="h-4 w-4" />
                            <AlertTitle>Alerta update!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input
                            type="nombre"
                            id="nombre"
                            placeholder="Nombre"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="fecha" className="px-1">
                            Fecha de creación
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                                    {date ? date.toLocaleDateString() : 'Selecciona una fecha'}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setDate(date);
                                        setOpen(false);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="precio">Precio</Label>
                        <Input
                            type="precio"
                            id="precio"
                            placeholder="precio"
                            value={data.precio}
                            onChange={(e) => setData('precio', e.target.value)}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="autor">Autor</Label>
                        <Input type="autor" id="autor" placeholder="autor" value={data.autor} onChange={(e) => setData('autor', e.target.value)} />
                    </div>
                    <div className="grid w-full gap-3">
                        <Label htmlFor="comentario">comentario</Label>
                        <Textarea
                            placeholder="Escribe tu comentario aquí."
                            id="comentario"
                            value={data.comentario}
                            onChange={(e) => setData('comentario', e.target.value)}
                        />
                    </div>
                    <Button disabled={processing} type="submit">
                        Update fotografia
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
