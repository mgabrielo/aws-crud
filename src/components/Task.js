import { Checkbox, Button, Typography } from '@mui/material'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateTaskForm from './UpdateTaskForm';
import classnames from 'classnames'
import axios from 'axios';
import { API_URL } from '../utils/utils';

export default function Task({ task, fetchTask }) {
    const { id, name, completed } = task
    const [isComplete, setIsComplete] = useState(completed)
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    async function handleUpdateTaskCompleted() {
        try {
            await axios.put(API_URL, { id, name, completed: !completed })
            await fetchTask()
        } catch (error) {
            console.log(error)
        }
        setIsComplete((prev) => !prev)
    }

    async function handleDelete(e) {
        e.preventDefault();

        try {
            console.log(id)
            await axios.delete(`${API_URL}/${id}`)
            await fetchTask()
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='task'>
            <div className={classnames('flex', {
                done: isComplete
            })}>
                <Checkbox checked={isComplete} onChange={handleUpdateTaskCompleted} />
                <Typography variant='h4'>{name}</Typography>
            </div>
            <div className='taskbuttons'>
                <Button variant='contained' onClick={() => setIsDialogOpen(true)}>
                    <EditIcon />
                </Button>
                <Button color='error' variant='contained' onClick={handleDelete}>
                    <DeleteIcon />
                </Button>
            </div>
            {isDialogOpen && <UpdateTaskForm isDialogOpen={isDialogOpen} fetchTask={fetchTask} setIsDialogOpen={setIsDialogOpen} task={task} />}
        </div>
    )
}
