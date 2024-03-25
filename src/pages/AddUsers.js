import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import '../config';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
     
    const navigate = useNavigate();


    async function submit(values) {
        let args = {
            full_name: values.fullName,
            email: values.email,
            role: values.role,
        };
        const response = await axios.post(global.config.api.remotePath + `user/add`, args, { mode: "cors" });
        return response;
    }
    return (
        <>
            <div className="py-3" style={{ backgroundColor: '#eee' }}>
                <div className="container-fluid h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Sign up</p>
                                            <Formik
                                                initialValues={{
                                                    fullName: '',
                                                    email: '',
                                                    role:''
                                                }}
                                                validationSchema={Yup.object({
                                                    fullName: Yup.string()
                                                        .min(2, 'Too Short!')
                                                        .max(50, 'Too Long!')
                                                        .required('Please Enter First Name'),
                                                    email: Yup.string().email('Invalid email').required('Please Enter email'),
                                                    role:Yup.string().required("Select Your Role")
                                                   
                                                })}

                                                onSubmit={(values, { resetForm, setSubmitting }) => {


                                                    submit(values)
                                                        .then(
                                                            function (response) {
                                                                console.log('dd', response);
                                                                if (response.data.res_code === 200) {
                                                                    toast.success('🦄 User was registered successfully!', {
                                                                        position: "top-right",
                                                                        autoClose: 5000,
                                                                        hideProgressBar: false,
                                                                        closeOnClick: true,
                                                                        pauseOnHover: true,
                                                                        draggable: true,
                                                                        progress: undefined,
                                                                        theme: "colored",
                                                                    });
                                                                    navigate("/users");
                                                                } else {
                                                                    toast.error(response.data.response, {
                                                                        position: "top-right",
                                                                        autoClose: 5000,
                                                                        hideProgressBar: false,
                                                                        closeOnClick: true,
                                                                        pauseOnHover: true,
                                                                        draggable: true,
                                                                        progress: undefined,
                                                                        theme: "colored",
                                                                    });
                                                                    navigate("/");
                                                                }
                                                                // return
                                                                // navigate("/");
                                                                // alert('success')

                                                                setSubmitting(false);
                                                                resetForm();
                                                            }

                                                        )
                                                        .finally(function () {
                                                            setSubmitting(false);
                                                        })

                                                }}
                                            >

                                                {({ errors, touched }) => (
                                                    <Form className='mx-1 mx-md-1'>

                                                        <div className='d-flex flex-row align-items-center mb-4'>
                                                            <i className='fas fa-user fa-lg me-3 fa-fw'></i>&nbsp;&nbsp;&nbsp;
                                                            <div className='form-outline flex-fill mb-0'>
                                                                
                                                                <Field
                                                                    name="fullName"
                                                                    className='form-control'
                                                                    placeholder="Your Full Name*"
                                                                />
                                                                {errors.fullName && touched.fullName ? (
                                                                    <span style={{ color: "red" }}>{errors.fullName}</span>
                                                                ) : null}
                                                            </div>
                                                        </div>

                                                      
                                                        <div className='d-flex flex-row align-items-center mb-4'>
                                                            <i className='fas fa-envelope fa-lg me-3 fa-fw'></i>&nbsp;&nbsp;&nbsp;
                                                            <div className='form-outline flex-fill mb-0'>
                                                                
                                                                <Field
                                                                    type="email"
                                                                    name="email"
                                                                    className='form-control'
                                                                    placeholder="Your Email*"
                                                                />
                                                                {errors.email && touched.email ? (
                                                                    <span style={{ color: "red" }}>{errors.email}</span>
                                                                ) : null}
                                                            </div>
                                                        </div>


                                                        <div className='d-flex flex-row align-items-center mb-4'>
                                                            <i className='fas fa-user fa-lg me-3 fa-fw'></i>&nbsp;&nbsp;&nbsp;
                                                            <div className='form-outline flex-fill mb-0'>
                                                                
                                                                <Field component="select" name="role" className='form-control'>
                                                                <option value="">Select Role</option>
                                                                <option value="1">Administrator</option>
                                                                <option value="2">Author</option>
                                                                <option value="3">Editor</option>
                                                                <option value="4">Subscriber</option>
                                                                </Field>
                                                        
                                                            
                                                                {errors.role && touched.role ? (
                                                                    <span style={{ color: "red" }}>{errors.role}</span>
                                                                ) : null}
                                                            </div>
                                                        </div>

                                                        <br></br>
                                                        <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                                                         <button type='submit' className='btn btn-primary btn-lg'>Register</button>
                                                        </div>

                                                        {/* </form> */}
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>

                                        <div className='col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2'>
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUsers
