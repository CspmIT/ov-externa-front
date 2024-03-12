function BaseInitial({ children }) {
    return (
        <div className="flex flex-row h-full justify-center items-center select-none">
            <div className="w-full  p-5 flex justify-center">
                <div className="w-full md:w-2/3">
                    <img className="mx-auto h-24 w-auto " src="https://app.coopmorteros.coop/public/images/logos/Iso_OfiVirtual_Logo_Recortado.png?random=6582f0b2a7340" alt="Your Company" />
                    {children}
                </div>
            </div>
            <div className="w-0 md:w-3/6 h-full flex justify-center bg-[#c1c7cc]">
                <div className='w-full h-full bg-[url("assets/gifs/Login2.gif")] bg-cover'></div>
            </div>
        </div>
    );
}

export default BaseInitial;
