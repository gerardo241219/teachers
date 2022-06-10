import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup'
import MessageError from "../Components/MessageError";

const Document = () => {

    const navigate = useNavigate();
    const { id, file } = useParams();
    const [document, setDocument] = useState("");
    const url = "http://localhost:3001/files";
    const [allFiles, setAllFiles] = useState([]);

    useEffect(() => {
        switch (file) {
            case "acta":
                setDocument("Acta de nacimiento");
                break;
            case "curp":
                setDocument("CURP");
                break;
            case "rfc":
                setDocument("RFC");
                break;
        }
    }, []);

    useEffect(() => {
        const getFiles = async () => {
            try {

                const url = "http://localhost:3001/files";
                const response = await fetch(url);
                const result = await response.json();

                const filterFile = result.filter(res => Number(res.idUser) == id && res.typeFile === file);

                setAllFiles(filterFile)

            } catch (error) {

            }
        }

        getFiles();
    }, [])

    const handleSubmit = async (values) => {


        values.idUser = Number(id);
        values.typeFile = file;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            response.json();
            location.reload();
        } catch (error) {

        }
    }

    const handleDelete = async (idFile) => {
        try {
            const url = "http://localhost:3001/files/" + idFile;
            const response = await fetch(url, {
                method: "DELETE",
            });

            response.json();
            location.reload();
            
        } catch (error) {
            
        }
    }

    const validateInput = Yup.object().shape({
        file: Yup.mixed().required('Obligatory')
    })

    return (
        <div>
            <div className='mt-10 w-2/4 bg-slate-300 m-auto'>
                <div className='w-3/4 m-auto py-5 px-2'>
                    <h3 className='titles text-center text-3xl'>{document}</h3>

                    <Formik
                        initialValues={{
                            file: ""
                        }}

                        enableReinitialize={true}

                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values);
                            resetForm();
                        }}

                        validationSchema={validateInput}
                    >
                        {
                            ({ errors }) => (
                                <Form>
                                    <div className="mt-5">
                                        <Field
                                            type="file"
                                            name="file"
                                            id="file"
                                        />

                                        <MessageError>{errors.file}</MessageError>
                                    </div>

                                    <div className="mt-5">
                                        <input
                                            type="submit"
                                            value="Send"
                                            className="w-full py-2 bg-slate-600 text-white hover:bg-slate-700 cursor-pointer"
                                        />
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>

                    <h3 className='titles text-center text-xl mt-5'>Uploaded Documents</h3>

                    <div className="mt-7">
                        {allFiles.map(files => (
                            <div className="flex justify-between items-center" key={files.id}>
                                <h1 className="mt-5">
                                    {files.file.split(["\\"])[2]}
                                </h1>
                                <button 
                                    className="bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                    onClick={() => handleDelete(files.id)}
                                >Eliminar</button>
                            </div> 
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Document