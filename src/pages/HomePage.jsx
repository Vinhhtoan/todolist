import { Bell, ChevronDown, CirclePlus, PanelLeft, Plus, Trash } from 'lucide-react';
import { AddIcon, FiltersIcon, InboxIcon, SearchIcon, TodayIcon, UpcomingIcon } from '../assets/images/MyIcon';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AddProject } from '../components/AddProject';
export function HomePage() {
    return(
        <div className='flex'>
            <UtilitiBar />
            <Outlet />
        </div>
    )
}
function UtilitiBar(){
    return(
        <div className="w-[280px] h-screen bg-[#FCFAF8] shrink-0">
            <Header username="vinhtoan552" />
            <BodyTask />
        </div>
    )
}
function Header(props){
    return(
        <div className="flex justify-between ">
            <div className="flex w-[135px] gap-3 hover:bg-gray-100 py-1 px-2 rounded-lg ml-2 mt-2 justify-between items-center">
                <img className="w-7 h-7 rounded-full" src="\src\assets\images\user.jpg" alt="" />
                <p className="text-[14px] font-semibold">{props.username}</p>
            </div>
            <div className='flex py-1 px-2 rounded-lg ml-2 pt-3 gap-1 items-center justify-between'>
                <div className='p-1.5 hover:bg-gray-100 rounded-lg'>
                    <Bell className='w-5 h-5'/>
                </div>
                <div className='p-1.5 hover:bg-gray-100 rounded-lg'>
                    <PanelLeft className='w-5 h-5' />
                </div>
            </div>
        </div>
    )
}
function BodyTask(){
    const fetchProject = async() =>{
        const res = await fetch("http://localhost:3000/project")
        if(res.ok){
            const data = await res.json()
            setProjects(data)
        }
    }
    const [projects, setProjects] = useState([]);
    const [isHover,setIsHover] = useState(false)
    const [color,setColor] = useState(null)
    const handleClick = (id) => {
        setColor(id)
    }
    const SidebarItems = [
        {
            icon:SearchIcon,
            active:"Search",
            url:'search'
        },
        {
            icon:InboxIcon,
            active:"Inbox",
            url:'inbox'
        },
        {
            icon:TodayIcon,
            active:"Today",
            url:'today'
        },
        {
            icon:UpcomingIcon,
            active:"Upcoming",
            url:'upcoming'
        },
        {
            icon:FiltersIcon,
            active:"Filters & Lables",
            url:"filter"
        },
    ]
    useEffect(() =>{
        fetchProject()
    },[projects])

    return(
        <div>
            <AddTool icon ={AddIcon} active="Add task" />
            <div className='mt-1 cursor-pointer'>
                {
                    SidebarItems.map((item,id)=>{
                        return(
                            <AnotherTools key={id} icon={item.icon} active={item.active} id={id} handleClick={handleClick} color={color} url={item.url}/>
                        )
                    })
                }
            </div>
            <div className='mt-2'>
                <Footer isHover={isHover} setIsHover={setIsHover} projects={projects} setProjects={setProjects}/>
            </div>
        </div>
    )
}
function AddTool(props){
    return(
        <div>
            <div className='flex mt-2 mx-2.5 p-1.5 gap-2 items-center hover:bg-gray-100 rounded-md'>
                <Plus className="w-5 h-5 stroke-2 bg-red-500 rounded-full stroke-white p-0.5 "/>
                <p className='text-[14px] text-[#A81F00] font-semibold'>{props.active}</p>
            </div>
        </div>
    )
}
function Footer(props) {
    const [isClick,setIsClick] = useState(false)
    const [isOpen,setIsOpen] = useState(false)
    const handleClick =()=>{
        setIsClick(!isClick)
    }
    const handleOpen =()=>{
        setIsOpen(!isOpen)
    }
    return(
        <div>
            <div onClick={handleClick} onMouseEnter={()=> props.setIsHover(true)} onMouseLeave={() =>props.setIsHover(false)} className={`flex justify-between mt-2 mx-2.5 px-1.5 py-2 gap-2 items-center  text-gray-600 rounded-md ${isClick?'bg-[#FFEFE5] text-black hover:bg-[#FFEFE5]':'hover:bg-gray-100 '}`}>
                <p className='text-[14px] font-semibold'>My Projects</p>
                <div className='flex gap-2 items-center'>
                    <Plus onClick={handleOpen} className={`hover:bg-gray-200 hover:stroke-black rounded-sm w-5 h-5 stroke-1 stroke-gray-500 opacity-0 duration-300 ease-in-out ${props.isHover ? 'opacity-100' : ''}`}/>
                    <ChevronDown className={`hover:bg-gray-200 hover:stroke-black rounded-sm w-5 h-5 stroke-1 stroke-gray-500 opacity-0 duration-300   ease-in-out ${props.isHover ? 'opacity-100':''}`} />
                </div>
            </div>
            <div>
                {props.projects.map((project,index) => (
                    <div className='flex justify-between text-[14px] mx-2 my-1 px-1 py-1 rounded-md hover:bg-gray-100'>
                        <p key={index}> # {project.name}</p>
                        <Trash className='w-4 h-4 stroke-gray-400 hover:stroke-red-500' />
                    </div>
                    
                ))}
            </div>
            <AddProject isOpen={isOpen} handleOpen={handleOpen} projects={props.projects} setProjects={props.setProjects}/>
        </div>
    )
}
function AnotherTools(props){
    return(
        <Link to={props.url}>
            <div onClick={() => props.handleClick(props.id)} 
                className={`flex mx-2.5 p-1.5 gap-2 items-center ${props.color === props.id ?'bg-[#FFEFE5]':''} hover:bg-gray-100 rounded-md transition-all`}
            >
                <props.icon />
                <p className='text-[14px]'>{props.active}</p>
            </div>
        </Link>
    )
}