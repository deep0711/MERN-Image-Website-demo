import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Login from './components/login'
import Signup from './components/signup'
import Home from './components/home'
import axios from 'axios';

class App extends React.Component{
  
  //State storing current status
  state={
    status:"Not_Logged_in",
    username:null
  }

  //When user will login ,we have to change state from not logged in to Logged in
  changestate=(username)=>{
    this.setState({
      status:"Logged_In",
      username:username
    })
  }

  //When user will logout,again we have to change state
  logout=()=>{
    localStorage.removeItem('image-user');

    this.setState({
      status:"Not_Logged_in",
      username:null
    })
  }
  
  componentDidMount(){
    const token =localStorage.getItem('image-user');
    
    if(token)
    {
        const url='http://localhost:8000/getuser';
        
        axios.get(url,{ headers: {authorization:'Bearer '+token}})
          .then(res=>{
              this.setState({
                status:"Logged_In",
                username:res.data
              })
          }).catch(err=>{
            localStorage.removeItem('image-user');
            alert('Error Occured while Authenticating.Re-Login');
          })
    }
  }


  render(){
    return(
      <div className="App-Content">
          <BrowserRouter>
            <Route path='/' render={ (props)=>< Navbar {...props} logout={this.logout} state={this.state} />}/>
            <Route path='/login' render={ (props)=>< Login {...props} changestate={this.changestate} />} />
            <Route path='/signup' component={Signup}/>
            <Route exact path='/' render={ (props)=>< Home {...props} state={this.state} />}/>
          </BrowserRouter>
      </div>
    )
  }
}
export default App;
