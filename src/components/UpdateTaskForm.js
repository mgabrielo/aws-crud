import { Button, Dialog, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { API_URL } from '../utils/utils';
export default function UpdateTaskForm({
    isDialogOpen,
    setIsDialogOpen,
    task,
    fetchTask
}) {

    const { id, completed } = task
    const [taskName, setTaskName] = useState("")

    const handleUpdatetask = async (e) => {
        e.preventDefault();

        try {
            await axios.put(API_URL, { id, name: taskName, completed: completed })
            // await fetchTask()
            setTaskName('')
            setIsDialogOpen(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Dialog
            open={isDialogOpen}
        >
            <DialogTitle>Edit task</DialogTitle>
            <div className='dialog'>
                <TextField size='small' label='Task' variant='outlined' onChange={(e) => setTaskName(e.target.value)} />
                <Button variant='contained' onClick={() => handleUpdatetask}>
                    <CheckIcon />
                </Button>
            </div>
        </Dialog>
    )
}
