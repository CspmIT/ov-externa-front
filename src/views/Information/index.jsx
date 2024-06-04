import { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import CardCustom from '../../components/CardCustom'
import { request } from '../../utils/request';
import { FaInfo } from 'react-icons/fa'

const Information = () => {
  const [userData, setuserData] = useState()
  const searchInformation = async () => {
    try {
      const response = await request(import.meta.env.VITE_APP_API_URL + '/informations', 'get')
      setuserData(response.data);
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  useEffect(() => {
    searchInformation()
  }, [])

  return (
    <div>
      <h2 className='text-center m-5'>Información Útil</h2>
      {userData && (
        <div className='w-full flex flex-wrap justify-center'>
          {userData.map((i, index) => (
            <div className='w-full md:w-1/2 xl:w-1/3'>
              <CardCustom className={`relative rounded-[2.5em] m-2 p-8 max-sm:mt-3 hover:scale-95 transition ease-in-out duration-300 flex items-center shadowCards`} style={{ overflowY: 'auto' }}>
                <>
                  {i.title !== '' || i.subtitle !== '' || i.description !== '' ? (
                    <div className={`absolute right-5 max-xl:right-2 p-2 rounded-full text-xl bg-yellow-400 text-yellow-900 ${userData.url_img ? 'top-9' : ''}`}>
                      <FaInfo className='w-full' />
                    </div>
                  ) : null}
                  <div className='flex flex-col w-full'>
                    <p className='text-xl font-bold m-0 mb-1' style={{ wordWrap: 'break-word' }}>
                      {i.title}
                    </p>
                    <p className={`text-yellow-500 m-0 pr-9`} style={{ wordWrap: 'break-word' }}>
                      {i.subtitle}
                    </p>
                    <p className={`m-0 w-3/4`} style={{ wordWrap: 'break-word' }}>
                      {i.description}
                    </p>
                    {/* {userData.url_img &&
                  (userData.url_img.length === 1 ? (
                    <img src={userData.url_img} alt='Imagen seleccionada' className='w-full mt-3' />
                  ) : (
                    <Carousel>
                      {imageURLs.map((url, index) => (
                        <div key={index}>
                          <img src={url} alt={`Imagen ${index + 1}`} className='w-full mt-3' />
                        </div>
                      ))}
                    </Carousel>
                  ))} */}
                  </div>
                </>
              </CardCustom>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Information
