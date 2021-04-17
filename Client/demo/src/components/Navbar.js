import React from 'react';
import {Link} from 'react-router-dom';
import '../css/Navbar.css';

function NavBar(props){

    const handlelogout=()=>{
        props.logout();
        props.history.push('/');
    }

    if(props.state.status==='Not_Logged_in')
    {
        return (
            <nav className="navbar">
                <div className="container" >
                    <Link to='/' style={{ marginLeft:"-20px",fontSize:"2em",textDecoration:"none"}}>Image-Website</Link>
                    
                    <div style={{alignItems:"right"}}>
                        <Link to="/login" style={{ fontSize:"1em",textDecoration:"none"}}>Login</Link>
                    </div>
                </div>   
            </nav>
        );
    }
    else
    {
        return (
            <nav className="navbar">
                <div className="container" >
                    <Link to='/' style={{ marginLeft:"-20px",fontSize:"2em",textDecoration:"none"}}>Image-Website</Link>
                    
                    <div style={{alignItems:"right",display:"flex"}}>
                        <p style={{ marginBottom:"-7px",fontSize:"1.5em",textDecoration:"none"}}>{props.state.username}</p>
                        <Link to="#" style={{marginTop:"8px",marginLeft:"20px",fontSize:"1em",textDecoration:"none"}} onClick={handlelogout}>Logout</Link>
                    </div>
                </div>   
            </nav>
        );
    }
};

export default NavBar;
