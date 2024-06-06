import { useState } from "react"

export function AddProject(props){
    const [isTyping,setIsTyping] = useState(false)
    const [checkValue,setCheckValue] = useState('')
    const handleChange = (e) =>{
        setIsTyping(e.target.value !='')
        setCheckValue(e.target.value)
    } 
    const handleCancle =(e) =>{
        setCheckValue('')
        setIsTyping(false)
    }
    const onSubmit = async (e) =>{
        const res = await fetch("http://localhost:3000/project",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name: checkValue })
        })
        if(res.ok) {
            const data = await res.json()
            props.setProjects(preProject => [...preProject, checkValue])
            setCheckValue('')
            setIsTyping(false)
        }
    }
    return(
        <div className={`flex fixed inset-0 items-center justify-center transition-colors bg-black/45 ${props.isOpen?'':'hidden'}`} >
            <div className="w-[450px] h-[550px] bg-white rounded-lg shadow-lg px-4 pt-2 flex flex-col justify-between">
                <div>
                    <h1 className="font-bold text-[20px]">Add project</h1>
                    <div className="pt-4">
                        <p className="font-bold pb-2">Name</p>
                        <input onChange={handleChange} value={checkValue} className="h-[30px] p-1.5 w-full border border-gray-300 rounded-md focus:border-gray-600 outline-none" type="text" />
                    </div>
                </div>
                <div className="flex justify-end pb-2">
                    <button onClick={(e) => {props.handleOpen(e); handleCancle(e);}} className="text-[13px] text-gray-500 font-medium py-2 px-3 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-md">Cancel</button>
                    <button onClick={(e) => {onSubmit(e);props.handleOpen(e);}} className={`text-[13px] text-white font-medium py-2 px-3 bg-red-300 rounded-md ml-2 ${isTyping?'bg-red-500 hover:bg-red-600':''}`}>Add</button>
                </div>
            </div>
        </div>
    )
}