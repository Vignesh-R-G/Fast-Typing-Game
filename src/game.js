import React,{useState,useEffect,useRef} from 'react'
import './App.css'
import './bootstrap.min.css'
import manual from './manual.jpg'
export const Game=()=>{
    const headstyle={
        color:"green",
        textAlign:"center"
    }
    const coloring={
        backgroundColor:"yellow",
    }
    const [data,setData]=useState([])
    const[wordcount,setWordCount]=useState(0)
    const[type,setType]=useState("")
    const[lst,setLst]=useState([])
    const[time,setTime]=useState(60)
    const[flag,setFlag]=useState(false)
    const[timeflag,setTimeFlag]=useState(false)
    const[typeflag,setTypeFlag]=useState(false)
    const[pause,setPause]=useState(false)
    const[indexing,setIndexing]=useState(0)
    const[index,setIndex]=useState(0)
    const[show,inputShow]=useState(false)
    const inref=useRef(null)
    useEffect(()=>{
        getwords()
    },[])
    useEffect(()=>{
        if(timeflag==true){
        let timer
        if(flag==false){
            timer=setInterval(()=>{
                setTime(time-1)
            },1000)
        }
        if(time==0){
            setFlag(true) 
            setTimeFlag(false)
            inputShow(true)
        }
        return(()=>clearInterval(timer))
        }
    },[time,timeflag])
    function getwords(){
        fetch("https://api.quotable.io/random").then((res)=>res.json()).then((json)=>{setData([...json.content]);const s=json.content.split(" ");setLst(s);console.log(s)})
    }
    const change=(e)=>{
        const ind=type.length
        if(e.target.value[ind]==' '){
            if(type==lst[index])
                setWordCount(wordcount+1)
            if(index==lst.length-1){
                setTypeFlag(true)
            }
            setType("")
            const c=index+1
            setIndex(index+1)
            setIndexing(c)
        }
        if(typeflag==false && e.target.value[ind]!=' '){
            setType(e.target.value)
        }
        else if(typeflag==true && e.target.value[ind]==' ')
        {
            setType("")
            getwords()
            setIndexing(0)
            setIndex(0)
            setTypeFlag(false)
        }
        
    }
    return(
        <div className='container-fluid'>
            <br></br>
            <div className="header">
            <div className="row">
                <div className="col-3">
                    <h1 style={headstyle}>FAST FINGERS</h1>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-3">
                    {time<10?<h1>00:0{time}</h1>:<h1>00:{time}</h1>}
                    
                </div>
            </div>
            </div>
            <hr></hr>
            <div className='row'>
                <div className='col-3'>
                    <h5 style={{color:"red"}}>Procedures to play this Game :</h5>
                </div>
            </div>
            <div className="row">
                <div className='col-6'>
                    <ul type="circle">
                        <li>Type the words in the inputbox which is highlighted in a yellow colour</li>
                        <li>Your timer gets started when you click on the start button</li>
                        <li>Your are given a time of 60 seconds</li>
                        <li>You can also pause the timer by clicking the pause button</li>
                        <li>Finally, after 60 seconds, your score will be displayed</li>
                    </ul>
                </div>
                <div className='col-6'>
                    <img src={manual} width="300" height="200"></img>
                </div>
            </div>
            <br></br>
            <hr></hr>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                <div className="disp">
                    {lst.map((x,index)=>(indexing==index)?<span style={coloring}>{lst[index]} </span>:<span>{lst[index]} </span>)}
                </div>
                </div>
                <div className="col-3"></div>
            </div>
            <br></br>
            {( pause|| show)?"":    
            <div className='row'><div className='col-3'></div><div className="col-6"><form className="form-group">
            <input ref={inref} type="text" className="form-control" value={type} onChange={change}></input></form></div></div>
            }
            <br></br>
            <div className='row'>
                <div className='col-4'></div>
                <div className='col-3'>
                    <button className='btn btn-primary' onClick={()=>{setTimeFlag(true);setPause(false);inref.current.focus()}}>Start</button><br></br>
                </div>
                <div className='col-3'>
                    <button className='btn btn-success' onClick={()=>{setPause(true);setTimeFlag(false)}}>Pause</button><br></br>
                </div>
            </div>
            <br></br>
            <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
            {flag?<h1 style={{textAlign:"center",padding:"5px",borderRadius:"5px",backgroundColor: " rgb(76, 238, 176)",color:"green"}}>Correct words per minute :{wordcount}</h1>:""}
            </div>
            </div>

        </div>
    )
}