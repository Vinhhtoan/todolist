
export async function login(email,password){
    const res = await fetch("http://localhost:3000/auth/login",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })         
    const data = await res.json()
    return {
        status: res.status,
        ok: res.ok,
        message: data.message,
        token: data.token
    }
}
