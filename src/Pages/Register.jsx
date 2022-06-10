import { Formik, Form, Field } from "formik"
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import MessageError from "../Components/MessageError";
import userRegister from "../Helpers/userRegister";

const Register = () => {

    const navigate = useNavigate();

    // Esquema de validacion para el login
    const loginValidation = Yup.object().shape({
        names: Yup.string().required('Obligatory field'),
        lastname: Yup.string().required('Obligatory field'),
        email: Yup.string().email('Invalid email format').required('Obligatory field'),
        username: Yup.string().required("Obligatory field"),
        userpassword: Yup.string().required("Obligatory field")
    })

    const handleSubmit = async (values) => {
        const url = "http://localhost:3001/users";

        try {

            const users = await fetch(url);
            const results = await users.json();

            if (results.length === 0) {

                userRegister(url, values);
                alert('Correct');
                navigate('/login');

            } else {

                const verify = results.filter(result => result.email === values.email || result.username === values.username)

                if (verify.length === 0) {

                    userRegister(url, values);
                    alert('Correct');
                    navigate('/login'); 

                } else {
                    alert('The email or username alredy exists');
                }
            }

        } catch (error) {
            alert('Error' + error);
        }
    }

    return (
        <div className='bg-white w-3/4 mt-10 mb-10 max-w-md rounded-md py-5 px-3 shadow-2xl'>
            <h3 className='text-center text-3xl tracking-wider text-slate-600 font-bold titles'>User register</h3>

            <Formik
                initialValues={{
                    names: "",
                    lastname: "",
                    email: "",
                    username: "",
                    userpassword: ""

                }}

                enableReinitialize={true}

                validationSchema={loginValidation}

                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className='px-3 py-5'>
                        <div className='w-full mb-5 tracking-wider'>
                            <label
                                className='block mb-2'
                                htmlFor="names">Name
                            </label>
                            <Field
                                className='w-full border border-slate-600 px-3 py-1'
                                type="text"
                                name="names"
                                id="names"
                            />
                            {
                                errors.names && touched.names && (
                                    <MessageError>{errors.names}</MessageError>
                                )
                            }
                        </div>

                        <div className='w-full mb-5 tracking-wider'>
                            <label
                                className='block mb-2'
                                htmlFor="lastname">Lastname
                            </label>
                            <Field
                                className='w-full border border-slate-600 px-3 py-1'
                                type="text"
                                name="lastname"
                                id="lastname"
                            />
                            {
                                errors.lastname && touched.lastname && (
                                    <MessageError>{errors.lastname}</MessageError>
                                )
                            }
                        </div>

                        <div className='w-full mb-5 tracking-wider'>
                            <label
                                className='block mb-2'
                                htmlFor="email">Email
                            </label>
                            <Field
                                className='w-full border border-slate-600 px-3 py-1'
                                type="text"
                                name="email"
                                id="email"
                            />
                            {
                                errors.email && touched.email && (
                                    <MessageError>{errors.email}</MessageError>
                                )
                            }
                        </div>

                        <div className='w-full mb-5 tracking-wider'>
                            <label
                                className='block mb-2'
                                htmlFor="username">Username
                            </label>
                            <Field
                                className='w-full border border-slate-600 px-3 py-1'
                                type="text"
                                name="username"
                                id="username"
                            />
                            {
                                errors.username && touched.username && (
                                    <MessageError>{errors.username}</MessageError>
                                )
                            }
                        </div>

                        <div className='w-full mb-10 tracking-wider'>
                            <label
                                className='block mb-2'
                                htmlFor="password">Password
                            </label>
                            <Field
                                className='w-full border border-slate-600 px-3 py-1'
                                type="password"
                                name="userpassword"
                                id="password"
                            />
                            {
                                errors.userpassword && touched.userpassword && (
                                    <MessageError>{errors.userpassword}</MessageError>
                                )
                            }
                        </div>

                        <div>
                            <input
                                type="submit"
                                value="Sing in"
                                className='block w-full cursor-pointer bg-slate-700 py-2 text-white hover:bg-slate-800 tracking-wider'
                            />
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="mt-2  pb-3 text-center">
                <Link
                    to="/login"
                    className="text-slate-600 hover:text-slate-800">Return
                </Link>
            </div>
        </div>
    )
}

export default Register