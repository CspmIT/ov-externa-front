import DashboardLvl2 from '../../components/DashBoardCustomer/Dashboard_lvl2'
import DashboardLvl1 from '../../components/DashBoardCustomer/Dashboard_lvl1'
const Home = () => {
  const level = JSON.parse(localStorage.getItem('usuario'))?.level
  return <div className='flex flex-wrap w-full'>{level === 1 ? <DashboardLvl1 /> : <DashboardLvl2 />}</div>
}

export default Home
