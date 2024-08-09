import React, { useState } from 'react'
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  }
  from 'mdb-react-ui-kit';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom'
  import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
    
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email:'',
        password:'',
      });

    const handleChange = ((e)=>{
        const {name,value}= e.target
        setFormData ({
            ...formData,
            [name]:value,
        })
    })
    const handleSubmit = ((e)=>{
        e.preventDefault();
        axios.post("http://127.0.0.1/login",formData)
        .then(response=>{
           const token = response.data.accessToken
           const message = response.message
            if (message === 'Login successful'){
                toast.success({message})
                navigate("/")
            }
        })
        .catch(error=>{
            const message = error.message;
            console.log(message)
        })
    })
      
    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        
        <form onSubmit={handleSubmit} >
          <MDBInput
          required
          name='email'
          onChange={handleChange}
           wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
          <MDBInput
          required
          name='password'
          onChange={handleChange}
           wrapperClass='mb-4' label='Password' id='form2' type='password'/>
    
          <div className="d-flex justify-content-between mx-3 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>
    
          <div className="d-flex justify-content-center">
            <MDBBtn type='submit' className="mb-4">Sign in</MDBBtn>
        </div>
          </form>
          <div className="text-center">
            <p>Not a member? <a href="#!">Register</a></p>
            <p>or sign up with:</p>
    
            <div className='d-flex justify-content-center mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>
    
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>
    
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>
    
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
    
            </div>
          </div>
    
        </MDBContainer>
      );
    }

export default Login