import { FaUser } from 'react-icons/fa';
import CardCustom from '../CardCustom';

function SocialServiceDetail({ adherentes, remove = false }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('es', options);
    };
    return (
        <>
            <CardCustom className={'p-7 mt-5'}>
                <div className="flex relative w-full">
                    <h3 className="text-center m-0">Adherentes</h3>
                </div>
            </CardCustom>
            <div className="w-full flex flex-row justify-center max-sm:flex-col">
                {adherentes?.map((item, index) => {
                    if (!item) {
                        return null;
                    } else {
                        return (
                            <CardCustom
                                key={index}
                                className={`${
                                    index > 0 ? 'ml-5  max-sm:ml-0' : ''
                                } rounded-[2.5em] hover:scale-95 transition ease-in-out duration-300 flex w-1/4 shadow-[2px_2px_2px_theme(colors.amber.700)] dark:shadow-[2px_2px_2px_theme(colors.amber.500)] max-sm:w-full mt-5  h-80`}
                            >
                                <div className="w-full h-full flex-col justify-center items-center flex p-7">
                                    <div className='bg-amber-600 bg-opacity-75 text-amber-900 p-3 border-0 rounded-full mb-5'>
                                        <FaUser
                                            fontSize={'2rem'}
                                            className="w-full"
                                        />
                                    </div>
                                    <h4 className="text-center max-sm:text-2xl max-sm:m-0 font-['Roboto-Condensed']">
                                        {item.name}
                                    </h4>
                                    {item.category ? (
                                        <h5 className="max-sm:text-lg max-sm:m-0 font-['Roboto-Condensed']">
                                            Categoría: {item.category}
                                        </h5>
                                    ) : null}
                                    {item.dni ? (
                                        <h5 className="mb-1 max-sm:text-lg max-sm:m-0 font-['Roboto-Condensed']">
                                            DNI: {item.dni}
                                        </h5>
                                    ) : null}
                                    {item.groupBlood ? (
                                        <h5 className="mb-1 max-sm:text-lg max-sm:m-0 font-['Roboto-Condensed']">
                                            Grupo Sanguíneo: {item.groupBlood}
                                        </h5>
                                    ) : null}
                                    {item.burn ? (
                                        <h5 className="max-sm:text-lg max-sm:m-0 font-['Roboto-Condensed']">
                                            Fecha de Nacimiento:{' '}
                                            {formatDate(item.burn)}
                                        </h5>
                                    ) : null}
                                </div>
                            </CardCustom>
                        );
                    }
                })}
            </div>
        </>
    );
}

export default SocialServiceDetail;
