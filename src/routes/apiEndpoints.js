export const backend = {
    OvExterna:
        import.meta.env.VITE_ENTORNO == 'local'
            ? 'http://localhost:4000/api'
            : 'https://cesopol.cooptech.com.ar/api',
    Cooptech:
        import.meta.env.VITE_ENTORNO == 'local'
            ? 'http://localhost:8081/api'
            : 'https://cooptech.com.ar/api',
    Archivos:
        import.meta.env.VITE_ENTORNO == 'local'
            ? 'http://localhost:5000'
            : 'https://archivos.cooptech.com.ar',
};
