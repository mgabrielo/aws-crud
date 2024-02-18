import AddTaskForm from "./components/AddTaskForm";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Task from "./components/Task";
import { useState, useEffect } from "react";
import { API_URL } from "./utils/utils";
import axios from "axios";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const fakeTask = {
  id: '1',
  name: 'Build App',
  completed: false
}
export default function App() {
  const [tasks, setTasks] = useState([])

  const fetchTask = async () => {
    try {
      const { data } = await axios.get(API_URL)
      setTasks(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTask={fetchTask} />
      {
        tasks.length > 0 && tasks.map((task, index) => (
          <Task task={task} key={index} fetchTask={fetchTask} />
        ))
      }
    </ThemeProvider>
  );
}
