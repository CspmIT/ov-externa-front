import Footer from '../../components/Footer'

export default function MaintenancePage() {
    return (
        <div className="min-h-screen flex flex-row md:flex-row items-center justify-center bg-[#1e3c72] p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 md:mr-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 mb-4">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-full h-full text-orange-500"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 text-center">
                        Servicio No Disponible
                    </h1>
                </div>

                <div className="space-y-4 text-center">
                    <p className="text-gray-600">
                        Lo sentimos, estamos experimentando problemas técnicos
                        con nuestra base de datos. Nuestro equipo está
                        trabajando para resolver el problema lo antes posible.
                    </p>

                    <div className="animate-pulse flex justify-center items-center space-x-2 mt-6">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>

                    <p className="text-sm text-gray-500 mt-6">
                        Por favor, intente nuevamente en unos minutos
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 w-full bg-[#1e3c72] text-white rounded-md py-2 px-4 hover:bg-[#162a50] transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            <Footer />
            </div>

        </div>
    )
}
