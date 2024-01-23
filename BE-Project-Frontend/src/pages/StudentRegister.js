import React from "react";
import axios from 'axios'
import { useEffect, useRef } from 'react';
import {
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const StudentRegister = () =>{
    const navigate = useNavigate()
    useEffect(()=>{
      if(localStorage.getItem("token") === null){
        navigate("/")
      }
    },[])

  const [isLoading,setIsLoading] = useState(false)
  const [name,setName] = useState("John Doe");
  const [roll,setRoll] = useState("11111");
  const [branch,setBranch] = useState("IT");
  const [regId,setRegId] = useState("A1A12121212");
  const [year,setYear] = useState("1");
  const [email,setEmail] = useState("johndoe@john.com");
  const [division,setDivision] = useState("1");
  const [picture,setPicture] = useState("");
  const [errors,setErrors] = useState({name:"",roll:"",regId:"",year:"",email:"",division:""}) 

  let videoRef=useRef(null)
  let photoRef=useRef(null)


  const getUserCamera = () =>{
    navigator.mediaDevices.getUserMedia({
      video:true
    }).then((stream)=>{
      let video=videoRef.current
      video.srcObject=stream
      var joke=video.play()
      if(joke!== undefined){
        joke.then(()=>{
          console.log("playing video")
        }).catch(()=>{
          console.log('error')
        })
      }
      // video.load();
      
    }).catch((e)=>{
      console.log(e)
    })
  }

  const takePicture = () =>{
    let width =800
    let height = 620
    let photo = photoRef.current
    let video = videoRef.current
    photo.width=width
    photo.height=height
    let ctx = photo.getContext('2d')
    ctx.drawImage(video,0,0,photo.width,photo.height)  
    let canvas = document.getElementById("canvas")
    let imgencoded = canvas.toDataURL()
    setPicture(imgencoded)
    console.log(imgencoded)
  }
  useEffect(()=>{
    getUserCamera()
  },[videoRef])

  
  const submitData = async() =>{
    name === "" && setErrors({...errors,name: "This field is required"})
    roll === "" && setErrors({...errors,roll: "This field is required"})
    regId === "" && setErrors({...errors,regId: "This field is required"})
    !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) && setErrors({...errors,email: "Invalid email address"})
    email === "" && setErrors({...errors,email: "This field is required"})
    setIsLoading(true)
    axios.post("http://localhost:5000/admin/register",{
      "name":name,
      "roll":roll,
      "branch":branch,
      "regId":regId,
      "year":year,
      "email":email,
      "division":division,
      "img":picture
    }).then((res)=>{
      console.log(res)
      // if(res.status==200){
      //   alert("Student data already present !!")
      // }
      // else{

      //   alert("Student data registered successfully !!")
      // }
      setIsLoading(false)

      // axios.post("https://localhost:5000/admin/addstudent",res)
    }).catch((res)=>{
      console.log("nahi hua")
      alert("Student registeration failed !!")
      setIsLoading(false)
    })
  }

  return (
    <div className="App">
      <br/>
      <Typography variant="h4">Student Information</Typography>
      <br/>
      <form>
        <TextField
          error = {errors.name}
          style={{ width: "400px", margin: "5px" }}
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          type="text"
          label="Name"
          variant="outlined"
          required
          helperText = {errors.name}
        />
        <br />
        <TextField
          error = {errors.roll}
          style={{ width: "400px", margin: "5px" }}
          value={roll}
          onChange={(e)=>{setRoll(e.target.value)}}
          type="text"
          label="Roll"
          variant="outlined"
          required
          helperText = {errors.roll}
        />

        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          value={branch}
          onChange={(e)=>{setBranch(e.target.value)}}
          type="text"
          label="Branch"
          variant="outlined"
        />
        <br />
        <TextField
          required
          error = {errors.regId}
          style={{ width: "400px", margin: "5px" }}
          value={regId}
          onChange={(e)=>{setRegId(e.target.value)}}
          type="text"
          label="RegId"
          variant="outlined"
          helperText = {errors.regId}
        />
        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          value={year}
          onChange={(e)=>{setYear(e.target.value)}}
          type="text"
          label="Year"
          variant="outlined"
        />
        <br />
        <TextField
          error = {errors.email}
          style={{ width: "400px", margin: "5px" }}
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          type="text"
          label="Email"
          variant="outlined"
          helperText = {errors.email}
        />
        <br />
        <TextField
          style={{ width: "400px", margin: "5px" }}
          value={division}
          onChange={(e)=>{setDivision(e.target.value)}}
          type="text"
          label="Division"
          variant="outlined"
        />
        <br />
      </form>
      <div style={{width:"400px",display:"flex",flexDirection:"column",}}>
        <video  className='container' ref={videoRef} ></video>
        <br/>
        <canvas id="canvas" ref={photoRef} ></canvas>
        <br/>
        <Button onClick={takePicture} variant="contained" style={{ width: "400px"}}  color="primary">
          Take Picture
        </Button>
      </div>
      <br/>
      <Button onClick={submitData} disabled={isLoading} variant="contained" style={{ width: "400px"}}  color="primary">
          {isLoading ? "Loading...." : "Submit"}
      </Button>
      <br/>
    </div>
  );
}

export default StudentRegister;