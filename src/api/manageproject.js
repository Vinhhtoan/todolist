export async function ManageProject(name){
    const res = await fetch("http://localhost:3000/project",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name:name,
        })
    })         
}