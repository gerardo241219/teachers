import { Link } from "react-router-dom"

const Files = () => {
    return (
        <div className='mt-10 w-2/4 bg-slate-300 m-auto'>
            <div className='w-2/4 m-auto text-center py-5 px-2'>
                <h3 className='titles text-3xl'>Document List</h3>
                <ol className='mt-7'>
                    <li className='mb-4'>
                        <Link to="acta" className='w-2/3 block m-auto py-2 px-4 bg-slate-600 text-white hover:bg-slate-700'>Acta de nacimiento</Link>
                    </li>
                    <li className='mb-4'>
                        <Link to="curp" className='w-2/3 block m-auto py-2 px-4 bg-slate-600 text-white hover:bg-slate-700'>CURP</Link>
                    </li>
                    <li className='mb-4'>
                        <Link to="rfc" className='w-2/3 block m-auto py-2 px-4 bg-slate-600 text-white hover:bg-slate-700'>RFC</Link>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default Files