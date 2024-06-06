import {  CalendarFold, Check, Flag, Inbox, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';


export function NewTask() {
    const[isShow,setIsShow] = useState(false)
    const handleClick = () =>{
        setIsShow(!isShow)
    }
    return(
        <div className="my-6">
            <div 
                onClick={(e) =>{
                    setIsShow(true)
                }} 
                className={`flex gap-2 items-center group cursor-pointer ${isShow?'hidden':''}`}
            >
                <div className="group-hover:bg-red-500 rounded-full">
                    <Plus className="w-5 h-5 stroke-1 stroke-red-500 group-hover:stroke-white "/>
                </div>
                
                <p className="text-[14px] text-gray-500 group-hover:text-red-500 ">Add task</p>
            </div>

            <AddBox isHidden={!isShow} handleClick={handleClick}/>

            <div className={`flex flex-col items-center mt-4 ${isShow?'hidden':''}`}>
                <img src="\src\assets\images\chauhoa.png" alt="" />
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="font-semibold">You're all done for the week, vinhtoan552!</p>
                    <div className="text-gray-500 text-[14px] text-center">
                        <p>Enjoy the rest of your day and don't forget</p>
                        <p>to share your #TodoistZero awesomeness</p>
                    </div>
                   
                    <button className="text-[#B03D32]">Share #TodoistZero</button>
                </div>
            </div>
        </div>    
    )
}
function AddBox(props) {
    const [onTyping,setOnTyping] = useState(false)
    const [checkValue,setCheckValue] = useState('')
    const handleChange = (e) =>{
            setOnTyping(e.target.value !== '')
            setCheckValue(e.target.value)
    }
    return(
        <div className={`p-2 flex flex-col items-start gap-1.5 border border-gray-400 rounded-lg w-ful ${props.isHidden?'hidden':''} ${props.setDelete?'hidden':''}`}>
            <input onChange={handleChange} value={checkValue} className="w-full font-medium text-[14px] focus:outline-none" type="text" placeholder="Task name" />
            <input className="w-full text-[13px] focus:outline-none" type="text" placeholder="Description"/>
            <div className="flex gap-2 mt-2">
                <DateBtn date='Today' />
                <PriorityBtn />
            </div>
            <BotBox  setDelete={props.handleClick} setChange={handleChange} onTyping={onTyping} clearvalue={() =>setCheckValue('')}/>
        </div>
    )
}

function DateBtn(props) {
    const [date, setDate] = useState(new Date())
    const [isCalenderOpen, setIsCalenderOpen] = useState(false)
    function onChange(dateValue) {
        setDate(dateValue)
        setIsCalenderOpen(false)
    }
    const monthStrings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return(
        <div>
            <button 
                className="px-1 py-[3px] flex items-center gap-1 text-[13px] group text-gray-500 border border-gray-300 rounded-md relative hover:bg-gray-100"
                onClick={e=> {
                    setIsCalenderOpen(!isCalenderOpen)
                }}
            >
                <CalendarFold 
                    className={`w-4 h-4 stroke-[2px] group-hover:stroke-gray-800 
                        ${date !== null && date.toDateString() === (new Date).toDateString() ? 'stroke-green-600 group-hover:stroke-green-600 ' : 'stroke-gray-400'}
                    `}
                />
                {
                     date !== null && date.toDateString() === (new Date).toDateString() ? (
                        <p className="text-green-600"> Today </p>
                    ) : null
                }
                {
                    date !== null && date.toDateString() !== (new Date).toDateString() ? (
                        `${date.getDate()} ${monthStrings[date.getMonth()]}`
                    ) : null
                }
                {
                    date === null ? (
                        "Due date"
                    ) : null
                }
                <X 
                    className={`w-3 h-3 hover:stroke-black ${date === null ? 'hidden': ''}`}
                    onClick={e=> {
                        e.stopPropagation()
                        setDate(null)
                    }}
                />

            </button>
            <Calendar
                className={`absolute ${isCalenderOpen ? '':'hidden'}`}
                onChange={onChange}
                value={date}
            />
        </div>
    )
}
function PriorityBtn(props) {
    const PriList =[
        {
            id: 1,
            icon: <Flag className="w-4 h-4 fill-red-500 stroke-red-500"/>,
            name: 'Priority 1',
            short:'P1'

        },
        {
            id:2,
            icon: <Flag className="w-4 h-4  fill-yellow-500 stroke-yellow-500"/>,
            name: 'Priority 2',
            short :'P2'

        },
        {
            id:3,
            icon: <Flag className="w-4 h-4  fill-blue-500 stroke-blue-500"/>,
            name: 'Priority 3',
            short: 'P3'
        },
        {
            id:4,
            icon: <Flag className="w-4 h-4 stroke-gray-500"/>,
            name: 'Priority 4',
            short : 'Priority'
        },
    ]
    const[isShow,setIsShow] = useState(false)
    const[shortName,setShortName] = useState(PriList[PriList.length-1].short)
    const[flag,setFlag] = useState(PriList[PriList.length-1].icon)
    const [idClick,setIdClick] = useState(PriList[PriList.length-1].id)
    useEffect(()=>{
        for(let i = 0;i<PriList.length;i++){
            if(idClick == PriList[i].id){
                setFlag(PriList[i].icon)
            }
            
        } 
    },
    [idClick])
    useEffect(()=>{
        for(let i = 0;i<PriList.length;i++){
            if(idClick == PriList[i].id){
                setShortName(PriList[i].short)
            }
            
        } 
    },
    [idClick])
    const handleClick = (id) =>{
        setIdClick(id)
    }
   
    return(
        <div className="relative inline-block">
            <button onClick={(e) =>{
                setIsShow(!isShow)
            }} 
            className="px-1 py-[3px] flex items-center gap-1 text-[13px] group text-gray-500 border border-gray-300 rounded-md relative hover:bg-gray-100 z-10">
                {
                    flag
                }
                {
                    shortName 
                }
                <X 
                    className={`w-3 h-3 hover:stroke-black ${shortName !== PriList[PriList.length-1].short ? '': 'hidden'}`}
                    onClick={e=> {
                        e.stopPropagation()
                        setShortName(PriList[PriList.length-1].short)
                        setFlag(PriList[PriList.length-1].icon)
                        setIdClick(PriList[PriList.length-1].id)
                    }}
                />
            </button>
            <div className={`border border-gray-200 rounded-lg  w-[130px] bg-white top-full left-1/2 transform -translate-x-1/2 absolute ${isShow == false?'hidden':''}`}>
                {
                    PriList.map((item,id) => {
                        return(
                            <div key={id} className="flex flex-col text-[13px] ">
                                <PriorityList icon={item.icon} name={item.name} short={item.short} handleClick={handleClick} idClick={idClick} id={item.id} setIsShow={setIsShow}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
function PriorityList(props) {
    return(
        <div 
            onClick={() => {{
                props.handleClick(props.id)
                props.setIsShow(false)
            }}}
            className="flex hover:bg-gray-100 px-2 py-1.5 gap-3 cursor-pointer items-center"
        >
            {props.icon}
            <p>{props.name}</p>
            {
                props.idClick == props.id?<Check className= "w-3 h-3 stroke-red-600" />:null
            }
            
        </div>
    )
}
function BotBox(props) {
    const[onClick,setOnClick] = useState(false)
    let menuRef = useRef()
    const handleClick = () =>{
        setOnClick(!onClick)
    }
    useEffect(()=>{
        let handle =(e) =>{
            if(!menuRef.current.contains(e.target) ){
                setOnClick(false)
            }
        }
        document.addEventListener("mousedown",handle)
    })
    return(
        <div className="w-full relative" ref={menuRef}>
            <div  className="flex justify-between border-t-gray-400 ">
                <button
                onClick={handleClick} 
                className={`flex text-[13px] text-gray-500 font-medium gap-1 py-2 px-2 hover:bg-gray-100 hover:text-gray-900 rounded-md items-center ${onClick?'bg-gray-100 text-gray-900 ':''}`}>
                    <Inbox className="w-4 h-4 stroke-gray-400" />
                    Inbox
                </button>
                <div className="flex gap-2">
                    <button onClick={()=>{
                        props.setDelete(true)
                        props.clearvalue()
                    }} className={`text-[13px] text-gray-500 font-medium py-2 px-3 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-md `}>Cancle</button>
                    <button className={`text-[13px] text-white font-medium py-2 px-3 bg-red-300 rounded-md ${props.onTyping?'bg-red-500 hover:bg-red-600':''}`}>Add Task</button>
                </div>
            </div>
            <div  className={`border border-gray-300 rounded-md w-[300px] bg-white transform -translate-x-1/3 absolute ${onClick== false?'hidden':''}`}>
                <InboxField name="abc"/>
            </div>
        </div>
        
    )
}
function InboxField(props) {
    const [type,setType] = useState('')
    const [value,setValue] = useState('')
    const handleOnChange = (e)=>{
        setType(e.target.value !== '')
        setValue(e.target.value)
    }
    return(
        <div >
            <div className={`p-2 text-[14px] `}>
                <input  onChange={handleOnChange} className="border border-gray-400 w-full rounded-md px-2 py-1.5 focus:outline-none" type="text" placeholder="Type a project name" />
            </div>
            <div className={`flex justify-between px-2 py-1 bg-gray-100 items-center cursor-pointer ${type?'hidden':''}`}>
                <div className="flex items-center gap-2 text-[13px] ">
                    <Inbox className="w-5 h-5 stroke-gray-400"/>
                    Inbox
                </div>
                <Check className="w-3 h-3 stroke-red-500"/>
            </div>
            <div className={`w-full ${type?'':'hidden'}`}>
                <p className="text-gray-500 text-[14px] px-2 py-1 cursor-default">Project not found</p>
                <div className="hover:bg-[#FFEFE5] cursor-pointer">
                    <div className="flex items-center gap-2 py-1.5 px-3 ">
                        <Plus className="w-5 h-5 stroke-1"/>
                        <p className="text-[12px] font-semibold">Create "{value}"</p>
                    </div>
                </div>
            </div>
        </div>
    )
}