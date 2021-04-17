import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Signup=(props)=>{

    const handlesubmit=(e)=>{
        e.preventDefault();
        
        const url='http://localhost:8000/signup';
        
        const data={
            username:e.target.username.value,
            password:e.target.password.value
        }

        axios.post(url,data)
            .then(res=>{
                
                if(!res.data)
                {
                    alert('Username Already there.Try Again with different username');    
                }
                else{
                    alert('User Added Successfully');
                    props.history.push('/login');
                }
            }).catch(e=>{
                alert('Unexpected Error occured.Try Again :(');
            })
        }

    
    return(


        <div className="container" style={ { height: "100%" ,marginTop:"100px"} }>

            <div className="d-flex justify-content-center align-items-center" style={  {width: "100%" , height: "100%" }}>
                
                <div className="card" style={ { width: "26rem" }}>
                    <div className="card-header">
                        <center>SignUp</center>
                    </div>
                    
                    <div className="card-body">
                        <form onSubmit={ handlesubmit }>
                            <div className="form-group">
                                <label htmlFor="username">User Name</label>
                                <input type="text" className="form-control" id="username" required/>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" required/>
                            </div>
                            
                            <button type="submit" className="btn btn-primary btn-block ml-auto mb-4">Submit</button>
                        </form>
                        
                        <Link to="/login" className="card-link mt-5"><center>Already Have an account ?</center></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup; 



