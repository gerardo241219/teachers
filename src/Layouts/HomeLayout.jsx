import { Outlet, useParams, Link } from 'react-router-dom'
import SepLogo from './../Images/sep-logo.png'

const HomeLayout = () => {

  const { id, file } = useParams();

  return (
    <>
      <div className='w-full h-40 md:h-28 bg-slate-600 shadow-2xl text-center py-5 md:flex justify-between items-center px-10'>
        <img className='w-52 m-auto md:m-0' src={SepLogo} alt="" />
        <nav className='pt-5 flex items-center'>
          { file && (<Link className='w-full block py-3 px-5 mr-5 text-white text-sm hover:bg-slate-900 ' to={`/home/${id}`}>Back</Link>)}
          <a className='w-full block py-3 px-5 text-white text-sm hover:bg-slate-900 ' href="#">Exit</a>
        </nav>
      </div>

      <Outlet />
    </>
  )
}

export default HomeLayout