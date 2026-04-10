import { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material'
import styles from './FileUpload.module.css'

const FileUpload = forwardRef(({ name }, ref) => {
  const [file, setFile] = useState(null)
  const videoRef = useRef(null)
  const fileInputRef = useRef(null)
  const [videoVisible, setVideoVisible] = useState(false)

  const handleCapture = async () => {
    try {
      const isSmallScreen = window.innerWidth < 550
      let constraints = { video: true }

      if (isSmallScreen) {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(device => device.kind === 'videoinput')
        if (videoDevices.length >= 2) {
          constraints = { video: { deviceId: { exact: videoDevices[1].deviceId } } }
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setVideoVisible(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const handleStopCapture = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
      setVideoVisible(false)
    }
  }

  const handleCaptureImage = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

    canvas.toBlob(blob => {
      setFile(blob)
      handleStopCapture()
    }, 'image/png')
  }

  const resetFile = () => {
    setFile(null)
    handleStopCapture()
  }

  const openFileInput = () => {
    handleStopCapture()
    fileInputRef.current?.click()
  }

  useImperativeHandle(ref, () => ({
    openCamera: handleCapture,
    captureImage: handleCaptureImage,
    reset: resetFile,
    openFileInput
  }))

  return (
    <div className='flex flex-wrap justify-center w-full'>
      <label htmlFor={`file${name}`} className='btn btn-dark mb-3'></label>
      <input
        ref={fileInputRef}
        id={`file${name}`}
        type='file'
        name={`file${name}`}
        onChange={(e) => setFile(e.target.files[0])}
        accept='image/*'
        style={{ display: 'none' }}
      />
      {file ? (
        <div>
          <img src={URL.createObjectURL(file)} alt='Preview' className='max-w-full max-h-[200px]' />
          <div className='flex justify-center w-full'>
            <div className='p-2' onClick={resetFile}>
              <Button className='botonesCancelar' variant="contained">
                <b>Borrar Foto</b>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`flex flex-wrap justify-center ${videoVisible ? '' : 'hidden'}`}>
          <video ref={videoRef} autoPlay playsInline className={`${styles.video} bg-white dark:bg-zinc-900 max-w-full max-h-[200px]`}/>
          <div className={`flex flex-wrap justify-center ${styles.btnFoto}`}>
            <h5 className='w-full text-center md:mt-5 text-gray-500 uppercase'>TOMAR FOTO DEL {name} DEL DNI</h5>
            <p className='w-full text-center md:hidden'> Encuadra el {name} del DNI en el marco </p>
            <img className={styles.marco} src='https://app.coopmorteros.coop/public/images/otros/lector_DNI.png' />
            <div className='p-2' id={name} onClick={handleCaptureImage}>
              <Button
                sx={{
                  backgroundColor: '#FDBA74',
                  color: '#7C2D12',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: '#FDBA74'
                  }
                }} variant="contained"><b>Capturar {name}</b> </Button>
            </div>
            <div className='p-2' onClick={handleStopCapture}>
              <Button
                sx={{
                  backgroundColor: '#A5B4FC',
                  color: '#4338CA',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: '#A5B4FC'
                  }
                }} variant="contained" > <b>Cancelar</b> </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

FileUpload.displayName = 'FileUpload'

export default FileUpload
