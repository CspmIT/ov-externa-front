import z from 'zod';

export const AdherentSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    dni: z.string(),
    fechaNacimiento: z.string(),
});
