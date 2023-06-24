import React, { useEffect, useState } from 'react'
import { CREATE_NEW_TASK ,INPUT_TYPE_TEXT, INPUT_TYPE_TEXT_AREA, INPUT_TYPE_DATE, CREATE_TASK, CLOSE_FORM, INPUT_TYPE_BUTTON, DELETE_TEXT, UPDATE_TEXT, SUBMIT_TEXT, CANCEL_TEXT} from '../constants/constants'
import axios from 'axios';

const ToDoPage = () => {
    const initialTask = {
        title : "",
        description : "",
        date : ""
    }

    const shouldUpdateTask = {
        userId : "",
        taskId : 0,
        currentState : false
    }

    const [isNewForOpen,setIsNewFormOpen] = useState(false);
    const [toDoList, settoDoList] = useState([]);
    const [createTaskDetails,setCreateTaskDetails] = useState(initialTask);
    const [isUpdate,setIsUpdate] = useState(shouldUpdateTask);
    const [updateTaskDetails,setUpdateTaskDetails] = useState(initialTask);
    
    const openNewForm = () => {
        setIsNewFormOpen(true)
    };

    const closeNewForm = () =>{
        setIsNewFormOpen(false)
    };

    const handleChange = (e) => {
        setCreateTaskDetails({ ...createTaskDetails,
            [e.target.name] : e.target.value
        });
    }

    const createTask = () => {
        const data = {userId : "1" , ...createTaskDetails} // should be replaced with userId
        axios.post('http://localhost:3000/create',data)
             .then(response => console.log(response))
             .catch(error => {
                console.error(error)
             })
    }

    const deleteTask = (taskId) => {
        const data = {userId: "1" , taskId : taskId}; //should be replaced with userId
        axios.post('http://localhost:3000/delete',data)
             .then(response => console.log(response))
             .catch(error => {
                console.error(error)
             })

    }
    const updateButton = (taskId) => {
            setIsUpdate({
                ...isUpdate,
                userId : "1" ,//should be replaced with userId
                taskId : taskId,
                currentState : !isUpdate.currentState
            });
            setUpdateTaskDetails(initialTask);
        
    }

    const updateTask = (taskId,title,description,date) => {
        const data = {userId: "1" , 
                      taskId : taskId,
                      title : updateTaskDetails.title === "" ? title : updateTaskDetails.title,
                      description : updateTaskDetails.description === "" ? description : updateTaskDetails.description,
                      date : updateTaskDetails.date === "" ? date : updateTaskDetails.date
                    }; //should be replaced with userId

        console.log(data)
        axios.post('http://localhost:3000/update',data)
             .then(response => console.log(response))
             .catch(error => {
                console.error(error)
             })
        setIsUpdate(false);

    }

    useEffect(() => {
        const data = {userId : "1"} // should be replaced with userId
        axios.post('http://localhost:3000/read', data)
                .then(response => settoDoList(response.data))
                .catch(error => {
                    console.error(error);
                });
    })
  return (
    <div>
        <button onClick={openNewForm}>{CREATE_NEW_TASK}</button>
        {isNewForOpen && (
            //FORM TO CREATE NEW TASK
                <form>
                    <div>
                        <input type = {INPUT_TYPE_TEXT} name = "title" placeholder='Enter the task title' value={createTaskDetails.title} onChange={handleChange}/>
                    </div>
                    <div>
                        <textarea placeholder='Enter Description' name = "description" value={createTaskDetails.description} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <input type = {INPUT_TYPE_DATE} name = "date" value={createTaskDetails.date} onChange={handleChange}/>
                    </div>
                    <div>
                        <button onClick={createTask}>{CREATE_TASK}</button>
                        <button type={INPUT_TYPE_BUTTON} onClick={closeNewForm}>{CLOSE_FORM}</button>
                    </div>
                </form>
            )
        }
        {
            toDoList.map(ele => ( 
                isUpdate.userId === ele.userId && isUpdate.taskId === ele.taskId && 
                isUpdate.currentState ? 
               (
                <div key={ele.taskId}>
                    <div>
                        <input type = {INPUT_TYPE_TEXT} name = "title"  value={updateTaskDetails.title === "" ? ele.title : updateTaskDetails.title} onChange={(e) => setUpdateTaskDetails({...updateTaskDetails, [e.target.name] : e.target.value})}/>
                    </div>
                    <div>
                        <textarea  name = "description" value={updateTaskDetails.description === "" ? ele.description : updateTaskDetails.description} onChange={(e) => setUpdateTaskDetails({...updateTaskDetails, [e.target.name] : e.target.value})}></textarea>
                    </div>
                    <div>
                        <input type = {INPUT_TYPE_DATE} name = "date" value={updateTaskDetails.date === "" ? ele.date : updateTaskDetails.date} onChange={(e) => setUpdateTaskDetails({...updateTaskDetails, [e.target.name] : e.target.value})}/>
                    </div>
                    <button onClick={() => updateTask(ele.taskId,ele.title,ele.description,ele.date)}>{SUBMIT_TEXT}</button>
                    <button onClick={() => updateButton(ele.taskId)}>{CANCEL_TEXT}</button>
                </div>
               )
               :
               (<div key={ele.taskId}>
                   <div>
                            <h2>{ele.title}</h2>
                            <p>{ele.description}</p>
                            <p>{ele.date}</p>
                    </div>
                    <button onClick={() => deleteTask(ele.taskId)}>{DELETE_TEXT}</button>
                    <button onClick={() => updateButton(ele.taskId)}>{UPDATE_TEXT}</button>
               </div>)
))
        }

    </div>
  )
}

export default ToDoPage