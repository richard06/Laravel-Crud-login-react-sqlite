import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agrega un nuevo auto',
        href: '/autos/create',
    },
];

const FormSchema = z.object({
    email: z
        .string({
            error: 'Please select an email to display.',
        })
        .email(),
});

export default function Index() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast('You submitted the following values', {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crea un nuevo Auto" />
            <div className="m-4">
                <form className="w-2/3 space-y-6">
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input type="nombre" id="nombre" placeholder="Nombre" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="email">Correo</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="airplane-mode">Airplane Mode</Label>
                        <Switch id="airplane-mode" />
                    </div>
                    <div>
                        <Label htmlFor="airplane-mode">Selecciona una opcion</Label>
                        <Select>
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Select a timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>North America</SelectLabel>
                                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                    <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                                    <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                                    <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                                    <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Europe & Africa</SelectLabel>
                                    <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                                    <SelectItem value="cet">Central European Time (CET)</SelectItem>
                                    <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                                    <SelectItem value="west">Western European Summer Time (WEST)</SelectItem>
                                    <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                                    <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Asia</SelectLabel>
                                    <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                                    <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                                    <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                                    <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                                    <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                                    <SelectItem value="ist_indonesia">Indonesia Central Standard Time (WITA)</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Australia & Pacific</SelectLabel>
                                    <SelectItem value="awst">Australian Western Standard Time (AWST)</SelectItem>
                                    <SelectItem value="acst">Australian Central Standard Time (ACST)</SelectItem>
                                    <SelectItem value="aest">Australian Eastern Standard Time (AEST)</SelectItem>
                                    <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                                    <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>South America</SelectLabel>
                                    <SelectItem value="art">Argentina Time (ART)</SelectItem>
                                    <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                                    <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                                    <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>{' '}
                    </div>
                </form>
                <br></br>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        You can manage email addresses in your <Link href="/examples/forms">email settings</Link>.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </AppLayout>
    );
}
