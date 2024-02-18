import { useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { API_URL } from '../utils/utils';

export default function AddTaskForm({ fetchTask }) {
    const [newTask, setNewTask] = useState('')

    const addNewTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, { name: newTask, completed: false })
            await fetchTask()
            setNewTask('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Typography align='center' variant='h2' padding={2}>
                My Task List
            </Typography>
            <div className='addtaskform'>
                <TextField size='md' variant='outlined' label='Add Task' value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                <Button variant='contained' disabled={!newTask.length} onClick={addNewTask}>
                    <AddIcon />
                </Button>
            </div>
        </div>
    )
}
