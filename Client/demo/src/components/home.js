import React from 'react';
import axios from 'axios';
import path from 'path';

class Home extends React.Component{

    state={
        images:[]
    }

    handlesubmit=(e)=>{
        e.preventDefault();
        const url='http://localhost:8000/upload_image'

        const formData=new FormData();
        
        formData.append('file',e.target.image_file.files[0]);
        formData.append('filename',e.target.image_file.files[0].name);
        
        axios.post(url,formData,{headers:{'Content-Type':'multipart/form-data'}})
            .then(res=>{
                if(res.data)
                {
                    alert('Image Uploaded Successfully!');
                    window.location.reload(false);
                }
                else
                {
                    alert('Image Upload Failed.Try Again!');
                }
            })
    }

    componentDidMount(){
        
        const url='http://localhost:8000/getimages';
        axios.get(url)
            .then(res=>{
                if(res.data)
                {
                    this.setState({
                        images:res.data
                    })
                }
                else
                {
                    alert('Something bad is happening in backyard :(');
                }    
            })
            
    }
    
    
    render(){
        
    const imagelist=this.state.images.map(image=>{
        
        return(
            <div className="d-flex justify-content-center align-items-center" key={image.image_id}>
                <div className="col-sm-6">

                    <div className="card">
                    <div className="card-body">
                    <img className="card-img-top" src={require('../image/'+image.image_id+image.image_name)} alt="image" width="18rem" height="250px"></img>
                        <p className="card-text">{image.image_name}</p>
                    </div>
                    
                    </div>
                </div>
            </div>
            
        )
    })
    
    if(this.props.state.status==="Not_Logged_in")
    {
        return(
            <div className="container" style={ { height: "100%" ,marginTop:"100px"} }>
                <div className="d-flex justify-content-center align-items-center" style={  {width: "100%" , height: "100%" }}>
                    Login First to view Images
                </div>
            </div>    
        )
    }
    else
    {
        return(
            <div className="container" style={ {height: "100%" ,marginTop:"100px"} }>
                <form style={ {height: "100%" ,marginLeft:"40%"}} onSubmit={this.handlesubmit}>
                    <input type="file" id="image_file" required/>
                    <br></br>
                    <br></br>
                    <button type="submit">Upload New Image</button> 
                </form>
                <hr></hr>
                {imagelist.length===0 && <h2><center>No images to show. Start uploading! </center></h2>}
                {imagelist.length!==0 && imagelist}
            </div>
           
        )
    }
}
}

export default Home;