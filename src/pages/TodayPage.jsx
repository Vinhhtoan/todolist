import { AddProject } from "../components/AddProject";
import { NewTask } from "../components/NewTask";

export function TodayPage(){
    return(
        <div className="mx-52 mt-16  items-center w-full ">
            <div className="">
                <h1 className="font-bold text-[26px]">Today</h1>
            </div>
            <NewTask />
        </div>
    )
}
