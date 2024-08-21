import React, { useContext, useEffect, useState } from 'react'
import { request } from '../../utils/request'
import { UserContext } from '../../contexts/UserContext'
import { Box, Modal } from '@mui/material'
import CardCustom from '../CardCustom'
import { Close } from '@mui/icons-material'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const PopUp = () => {
	const settings = {
		dots: true,
		lazyLoad: true,
		infinite: true,
		autoplay: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0,
	}
	const [showModal, setShowModal] = useState(false)
	const [listImgs, setListImgs] = useState([])
	const { account } = useContext(UserContext)
	const activeUser = JSON.parse(localStorage.getItem('usuario'))
	const dataUser = async () => {
		const response = await request(import.meta.env.VITE_APP_API_URL + '/activePopups', 'GET')
		if (response.status !== 200) throw new Error('Error en consulta')
		const imgs = []
		const today = new Date()
		response.data.forEach((item) => {
			if (item.date_start >= today || (item.date_end && item.date_end < today)) return
			if (account.level === item.level) {
				const url = import.meta.env.VITE_FILE_API_URL + '/images/popup/' + item.img
				imgs.push(url)
			}
		})
		setListImgs(imgs)
		setShowModal(response.data && response.data.length > 0)
		activeUser.popup = false
		localStorage.setItem('usuario', JSON.stringify(activeUser))
	}
	useEffect(() => {
		if (activeUser.popup) {
			dataUser()
		}
	}, [account])
	return (
		<Modal className='flex justify-center items-center !z-50' open={showModal} onClose={() => setShowModal(false)} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description'>
			<Box className={'w-full flex justify-center items-center'}>
				<CardCustom className={'lg:w-1/3 w-2/3 max-sm:w-full rounded-xl bg-white shadow-lg overflow-hidden block'}>
					<div className='rounded-xl'>
						<div className='relative rounded-t-xl bg-slate-200 p-5 '>
							<h3 className='text-gray-900 m-0 font-bold text-center font-sans' id='exampleModalLabel'>
								Novedades
							</h3>
							<div className='absolute right-5 top-5'>
								<Close onClick={() => setShowModal(false)} className='text-gray-500 hover:text-gray-800 hover:cursor-pointer' />
							</div>
						</div>
					</div>
					<div className='max-h-[50vh] min-h-[50vh]'>
						<Slider {...settings}>
							{listImgs.map((img, index) => (
								<div key={index} className='!flex !justify-center !items-center h-[50vh] w-full'>
									<img src={img} alt='Imagen no disponible' className='max-h-full max-w-full dark:text-white' />
								</div>
							))}
						</Slider>
					</div>
				</CardCustom>
			</Box>
		</Modal>
	)
}

export default PopUp
