import React from 'react'
import Card from '../../components/Card'

const comerce = () => {

  const commerces = [{
    id: 1,
    img_name: "6543cf8b397e3.png",
  }, {
    id: 2,
    img_name: "6544c3db66876.png",
  }, {
    id: 3,
    img_name: "651bf30c3d3fb.png",
  }, {
    id: 4,
    img_name: "6543cf8b397e3.png",
  }, {
    id: 5,
    img_name: "6544c3db66876.png",
  }, {
    id: 6,
    img_name: "651bf30c3d3fb.png",
  }, {
    id: 6,
    img_name: "6543cf8b397e3.png",
  }, {
    id: 6,
    img_name: "651bf30c3d3fb.png",
  }]

  return (
    <div className="p-2 sm:pl-64 pt-20">
      <img width="100%" src="https://app.coopmorteros.coop/public/images/coopate/Header.png" alt="" />
      <hr />
      <h3 className='text-center mt-5'>COMERCIOS ADHERIDOS</h3>
      <div className='flex flex-wrap'>
        {commerces.map((item, index) => {
          return (
            <div key={item.id} className='w-1/4 p-4'>
              <Card
                props={{
                  phone: "",
                  subtitle: (
                    <div className="w-full text-center">
                      <img src={`https://app.coopmorteros.coop/public/images_rewards/commerce/${item.img_name}`} alt="img" className="w-full mb-3" />
                    </div>
                  ),
                  widht: "w-full",
                  bg: "bg-white",
                  positionBtn: "absolute"
                }}
              />
            </div>

          );
        })
        }
      </div>
    </div >
  )
}

export default comerce