import { useEffect, useState } from "react"
import { AppleIcon, EyeClose, EyeOpen, FacebookIcon, GoogleIcon, Logo } from "../../assets/images/MyIcon"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../api/login"


export  function Login(){
    return(
        <div className="pl-[265px]">
            <Header />
            <div className="flex mt-[73px] items-center gap-24">
                <LoginForm />
                <SideBanner />
            </div>
        </div>
    )
}
function Header(){
    return(
        <div className="py-6">
            <Logo width={130} height={32}/>
           
        </div>
    )
}
function LoginForm(){
    const [loginData,setLoginData] = useState({})
    const [errorList,setErrorList] = useState({})
    const navigate = useNavigate();
    const data = (e) =>{
        setLoginData({...loginData,[e.target.name]:e.target.value });
    }

    const onSubmit = async (event) =>{
        if(!checkValid()) return
        const data = await login(loginData.email,loginData.password)
        if(data.ok){
            localStorage.setItem("token",data.token)
            navigate('/home/today')
            return
        }
        setErrorList({
            ...errorList,
            general: data.message
        })
    }
    const checkValid = () =>{
        let isValid = true
        const error ={}
        if(loginData.email =='' || loginData.email == undefined){
            error.email = "Please enter an email"
        }else{
            let valid= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(loginData.email)
            if(!valid){
                error.email = "Email is not valid"
            }
        }

        if(loginData.password == '' || loginData.password == undefined){
            error.password = "Please enter an password"
        } else if(loginData.password.length < 8){
            error.password = "The minimum length of the password is 8 characters"
        }
        // userData && userData((user)=>{
        //     if(loginData.username && loginData.password != user.username)
        // })
        if(Object.keys(error).length > 0){
            setErrorList(error)
            isValid = false
        }else{
            setErrorList({})
        }
        return isValid

    }
    return(
            <div className="w-[400px]">
                <h1 className="font-bold text-[32px]">Log in</h1>
                <div className="flex flex-col gap-3 mt-10">
                    <PlatformLoginButton icon={FacebookIcon} sentence="Continue with Facebook" />
                    <PlatformLoginButton icon={GoogleIcon} sentence="Continue with Google" />
                    <PlatformLoginButton icon={AppleIcon} sentence="Continue with Apple" />
                </div>
                <div className="flex flex-col gap-3">
                    <MyInput name="email" type="mail" data={data} errorList={errorList} />
                    <MyInput name="password" type="password" data={data} errorList={errorList}/>
                </div>
                <button className="mt-3 flex w-full bg-red-500 opacity-90 hover:bg-red-600 justify-center gap-2 py-3 rounded-lg font-bold text-[18px] text-white" onClick={onSubmit}  type="submit">Log in</button>
                <div className="w-full mt-3">
                    <p className="underline text-[13px] mt-3">Forgot your password?</p>
                    <p className="text-[13px] mt-3">By continuing with Google, Apple, or Email, you agree to Todoist’s <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.</p>              
                </div>
            </div>   
    )
}
function PlatformLoginButton(props){
    return(
        <button className="flex w-full hover:bg-gray-100 justify-center gap-2 py-3 rounded-lg font-bold text-[17px] transition-all">
            <props.icon />
            <h2>{props.sentence}</h2>
        </button>
    )
}
function MyInput(props){
    const [show,setShow] = useState(false)
    if(props.type == "mail"){
        return(
            <div>
                <div className="flex flex-col gap-1 border border-gray-200 rounded-lg p-1">
                    <p className="text-[13px] font-semibold">Email</p>
                    <input className="focus:outline-none" name="email" onChange={props.data} type="text" placeholder="Enter your Email..." />
                </div>
                {props.errorList.email && <p className="text-red-600 pl-1">{props.errorList.email}</p>}
            </div>
        )
    
    }
    else{
        return(
            <div>
                <div className="flex gap-1 border border-gray-200 rounded-lg p-1 justify-between items-end">
                    <div className="flex flex-col w-full ">
                        <p className="text-[13px] font-semibold">Password</p>
                        <input className="focus:outline-none" name="password" onChange={props.data} type={ show == true? "text" : "password"} placeholder="Enter your password..." />
                    </div>
                    <div onClick={(e) =>{
                        if(show == true){
                            setShow(false)
                        }
                        else{
                            setShow(true)
                        }
                        
                    }}>
                        {
                            show ? <EyeOpen /> 
                            : <EyeClose />
                        }
                    </div>
                </div>
                {props.errorList.password && <p className="text-red-600 pl-1">{props.errorList.password}</p>}
                {props.errorList.general && <p className="text-red-600 pl-1">{props.errorList.general}</p>}
            </div>
        )
    }
}

function SideBanner(){
    return(
        <div className>
            <img className="w-[450px]" src="/src/assets/images/banner.png" />
        </div>
    )
}
