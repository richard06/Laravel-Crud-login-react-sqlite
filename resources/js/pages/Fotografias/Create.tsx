import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { ChevronDownIcon, TriangleAlert } from 'lucide-react';
import * as React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agrega una nueva foto',
        href: '/fotografias/create',
    },
];

export default function Index() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        fecha: '',
        precio: ' ',
        autor: ' ',
        comentario: ' ',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('fotografias.almacen'));
    };

    const [date, setDate] = React.useState<Date | undefined>(undefined);
    React.useEffect(() => {
        if (date) {
            setData('fecha', format(date, 'dd-MM-yyyy'));
        }
    }, [date]);

    const [open, setOpen] = React.useState(false);
    // const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

    // const handleDateChange = (fecha: Date | undefined) => {
    //     setSelectedDate(fecha);
    //     if (fecha) {
    //         const formatted = format(fecha, 'dd-MM-yyyy');
    //         setOpen(false);
    //         setData('fecha', formatted);
    //     }
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crea una nueva fotografia" />
            <div className="m-4">
                <form onSubmit={handleSubmit} className="w-2/3 space-y-4">
                    {/*Display error*/}
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <TriangleAlert className="h-4 w-4" />
                            <AlertTitle>Alerta errores!</AlertTitle>
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
                                    {date ? format(date, 'dd-MM-yyyy') : 'Selecciona una fecha'}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar mode="single" selected={date} captionLayout="dropdown" onSelect={setDate} initialFocus />
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
                    <Button type="submit">Agregar fotografia</Button>
                </form>
            </div>
        </AppLayout>
    );
}
