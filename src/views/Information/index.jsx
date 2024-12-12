import { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import CardCustom from '../../components/CardCustom'
import { request } from '../../utils/request'
import { FaInfo } from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Information = () => {
    const [userData, setUserData] = useState([])
    const [informationWithImages, setInformationWithImages] = useState({})

    const searchInformation = async () => {
        try {
            const { data } = await request(import.meta.env.VITE_APP_API_URL + '/informations', 'get')
            console.log(data)
            const responseData = []
            const informationImages = {}

            for (let i = 0; i < data.length; i++) {
                responseData.push(data[i])
                const urlImage = import.meta.env.VITE_APP_API_URL + '/imageInformations?idInformation=' + data[i].id
                const url = []

                const responseImage = await request(urlImage, 'GET')
                responseImage.data.forEach((image) => {
                    url.push(`${import.meta.env.VITE_FILE_API_URL}/images/information/${image.url_image}`)
                })

                informationImages[data[i].id] = url
            }
            setUserData(responseData)
            setInformationWithImages(informationImages)
        } catch (error) {
            console.error('Error en la solicitud:', error)
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
    }

    useEffect(() => {
        searchInformation()
    }, [])

    return (
        <div>
            <h2 className='text-center m-5'>Información Útil</h2>
            {userData.length > 0 ? (
                <div>
                    <div className='w-full flex flex-wrap justify-center'>
                        {/* Renderizar las cards con imágenes */}
                        {userData
                            .filter((info) => informationWithImages[info.id] && informationWithImages[info.id].length > 0)
                            .map((info, index) => (
                                <div key={index} className='w-full md:w-1/2 p-2 xl:w-1/3'>
                                    <CardCustom
                                        className={`relative rounded-[2.5em] h-full p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards`}
                                        style={{ overflowY: 'auto' }}
                                    >
                                        <>
                                            {info.title !== '' || info.subtitle !== '' || info.description !== '' ? (
                                                <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900 ${informationWithImages[info.id] ? 'top-9' : ''}`}>
                                                    <FaInfo className='w-full' />
                                                </div>
                                            ) : null}
                                            <div className='flex flex-col w-full'>
                                                <p className='text-xl font-bold m-0 mb-1' style={{ wordWrap: 'break-word' }}>
                                                    {info.title}
                                                </p>
                                                <p className={`text-yellow-500 m-0 pr-9`} style={{ wordWrap: 'break-word' }}>
                                                    {info.subtitle}
                                                </p>
                                                <p className={`m-0 w-3/4`} style={{ wordWrap: 'break-word' }}>
                                                    {info.description}
                                                </p>
                                                {informationWithImages[info.id] &&
                                                    (informationWithImages[info.id].length === 1 ? (
                                                        <img src={informationWithImages[info.id][0]} alt='Imagen seleccionada' className='w-full mt-3' />
                                                    ) : (
                                                        <Slider {...settings}>
                                                            {informationWithImages[info.id].map((url, index) => (
                                                                <div key={index}>
                                                                    <img src={url} alt={`Imagen ${index + 1}`} className='w-full mt-3' />
                                                                </div>
                                                            ))}
                                                        </Slider>
                                                    ))}
                                            </div>
                                        </>
                                    </CardCustom>
                                </div>
                            ))}
                    </div>
                    <div className='w-full flex flex-wrap justify-center'>
                        {/* Renderizar las cards sin imágenes */}
                        {userData
                            .filter((info) => !informationWithImages[info.id] || informationWithImages[info.id].length === 0)
                            .map((info, index) => (
                                <div key={index} className='w-full md:w-1/2 p-2 xl:w-1/3'>
                                    <CardCustom
                                        className={`relative rounded-[2.5em] h-full p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards`}
                                        style={{ overflowY: 'auto' }}
                                    >
                                        <>
                                            {info.title !== '' || info.subtitle !== '' || info.description !== '' ? (
                                                <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900`}>
                                                    <FaInfo className='w-full' />
                                                </div>
                                            ) : null}
                                            <div className='flex flex-col w-full'>
                                                <p className='text-xl font-bold m-0 mb-1' style={{ wordWrap: 'break-word' }}>
                                                    {info.title}
                                                </p>
                                                <p className={`text-yellow-500 m-0 pr-9`} style={{ wordWrap: 'break-word' }}>
                                                    {info.subtitle}
                                                </p>
                                                <p className={`m-0 w-3/4`} style={{ wordWrap: 'break-word' }}>
                                                    {info.description}
                                                </p>
                                            </div>
                                        </>
                                    </CardCustom>
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                <p className='text-center m-5'>En esta pestaña podras encontrar informacion relevante. Actualmente no hay informacion para mostrar.</p>
            )}
        </div>
    )
}

export default Information