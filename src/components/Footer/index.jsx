import { useContext } from 'react'
import stylesNab from '../Navbar/Navbar.module.css'
import { UserContext } from '../../contexts/UserContext'
const currentYear = new Date().getFullYear()
function Footer() {
    const { usuario } = useContext(UserContext)
    return (
        <footer
            className={`p-2 ${
                usuario ? 'sm:ml-56' : ''
            } bg-white dark:bg-zinc-950 dark:text-gray-300 ${
                stylesNab.widthNab
            } mt-auto`}
        >
            <div className="w-full mx-auto max-w-screen-xl p-10 md:flex md:items-center md:justify-center">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    Versión 5.0 <br />
                    Copyright © IT & Development -
                    <a
                        href="https://cooptech.com.ar/"
                        target="_bank"
                        className="hover:underline text-yellow-400"
                    >
                        COOPTECH {currentYear}
                    </a>
                </span>
            </div>
        </footer>
    )
}

export default Footer
