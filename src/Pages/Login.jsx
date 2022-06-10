import { Formik, Form, Field } from "formik"
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import MessageError from "../Components/MessageError";

const Login = () => {

    const navigate = useNavigate();

    // Esquema de validacion para el login
    const loginValidation = Yup.object().shape({
        username: Yup.string().required("Campo obligatorio"),
        userpassword: Yup.string().required("Campo obligatorio")
    })

    const handleSubmit = async (values) => {
        const url = "http://localhost:3001/users";
        const response = await fetch(url);
        const result = await response.json();

        const user = result.filter(res => res.username === values.username && res.userpassword === values.userpassword);

        if (user.length > 0) {
            user.map( u => {
                navigate('/home/' + u.id);
            })
        } else {
            alert('The username or password is wrong');
        }
    }

    return (
        <div className='bg-white w-3/4 mt-10 max-w-md rounded-md py-5 px-3 shadow-2xl'>
            <h3 className='text-center text-3xl tracking-wider text-slate-600 font-bold titles'>Login</h3>

            <Formik
                initialValues={{
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
                                value="Login in"
                                className='block w-full cursor-pointer bg-slate-700 py-2 text-white hover:bg-slate-800 tracking-wider'
                            />
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="mt-2  pb-3 text-center">
                <Link
                    to="register"
                    className="text-slate-600 hover:text-slate-800">Do you don't have an account? Sing in
                </Link>
            </div>
        </div>
    )
}

export default Login