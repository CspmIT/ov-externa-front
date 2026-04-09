import logoImg from '../../assets/img/Logo/OficinaVirtual_cuadrado.png'
import logoCesopol from '../../assets/img/Logo/LogoCesopol.jpg'
function BaseInitial({ children }) {
    return (
        <div className="flex flex-row h-full justify-center items-center select-none">
            <div className="w-full  p-5 flex justify-center">
            <div className="w-full md:w-3/5 mt-10">
                    <div className="w-full flex justify-center items-center mb-5">
                        <div className='w-1/2 flex justify-end items-center px-2'>
                            <img className="w-[70%] md:w-[40%]" src={logoImg} />
                        </div>
                        <div className='w-1/2 flex justify-start items-center px-2 border-l border-l-slate-300'>
                            <img className="w-[70%] md:w-[45%]" src={logoCesopol} />
                        </div>
				    </div>
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
