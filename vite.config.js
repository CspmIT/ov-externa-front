import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	// En local (VITE_ENTORNO='local' en .env) se respeta la URL del .env.
	// En cualquier otro build (CI/Docker) se fija la URL del back de Cesopol,
	// para no depender del secret VITE_APP_API_URL del repo.
	const isLocal = env.VITE_ENTORNO === 'local'
	return {
		plugins: [react()],
		define: isLocal
			? {}
			: {
					'import.meta.env.VITE_APP_API_URL': JSON.stringify('https://cesopol.cooptech.com.ar/api'),
			  },
		server: {
			watch: {
				usePolling: true,
			},
			host: true, // necesario para que funcione el mapeo de puertos del contenedor Docker
			strictPort: true,
			port: 8082, // puedes reemplazar este puerto por cualquier otro
		},
	}
})
