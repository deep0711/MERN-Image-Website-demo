import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const Login =(props)=>{
    
    const handlesubmit=(e)=>{
        e.preventDefault();
            
        const data={
            username:e.target.username.value,
            password:e.target.password.value
        }
        
        const url='http://localhost:8000/gettoken'

        axios.post(url,data)
            .then(res=>{
                if(res.data)
                {
                    localStorage.setItem('image-user',res.data.token);
                    props.changestate(res.data.username);
                    props.history.push('/');
                }
                else
                    alert('Wrong Username or Password!');
            });
    };

    return(
            
        <div className="container" style={ { height: "100%" ,marginTop:"100px"} }>

            <div className="d-flex justify-content-center align-items-center" style={  {width: "100%" , height: "100%" }}>
                
                <div className="card" style={ { width: "26rem" }}>
                    <div className="card-header">
                        <center>Login</center>
                    </div>
                    
                    <div className="card-body">
                        <form onSubmit={handlesubmit}>
                            
                            <div className="form-group">
                                <label htmlFor="username">User Name</label>
                                <input type="text" className="form-control" id="username" required/>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" required/>
                            </div>
                            
                            <button type="submit" className="btn btn-primary btn-block ml-auto mb-4">Login</button>
                        </form>
                        
                        <Link to="/signup" className="card-link mt-5"><center>New Here ?</center></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;