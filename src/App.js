


import './App.css'; // Importing the CSS file for styling

import MyTaskName from './components/reactclass'; // Importing the MyTaskName component
import DateComponent from './components/datecomponent/itemDate'; // Importing the DateComponent
import GetFormDetails from "./components/formcomponent/form"; // Importing the GetFormDetails component
import React, { useState, useEffect } from 'react'; // Importing React and hooks

import { ToastContainer, toast } from 'react-toastify'; // Importing toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing the CSS for react-toastify
import { Button, Modal, Drawer } from "antd"; // Importing Button and Modal components from antd
import { MdDelete } from "react-icons/md"; // Importing the delete icon from react-icons

function App() {
  // Initializing state with data from localStorage or an empty array
  const initialData = JSON.parse(localStorage.getItem('tasks')) || [];
  const [data, setData] = useState(initialData); // State to hold task data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer visibility
  const [deletedTasks, setDeletedTasks] = useState([]); // State to hold deleted tasks

  // useEffect to save data to localStorage whenever 'data' changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(data));
  }, [data]);

  // Function to handle task deletion
  const buttonClicked = (index) => {
    const deletedTask = data[index]; // Get the deleted task
    const newData = data.filter((item, i) => i !== index); // Filter out the deleted task
    setData(newData); // Update state with new data
    setDeletedTasks(prevDeletedTasks => [...prevDeletedTasks, deletedTask]); // Add deleted task to deleted tasks state

    // Show toast notification for task deletion
    toast.error(`Task "${deletedTask.name}" removed!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  // Function to handle form submission and add a new task
  const submitButtonClicked = (event) => {
    setData(prevData => [...prevData, event]); // Add new task to data
    // Show toast notification for task submission
    toast.success("Task successfully submitted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  // Functions to control modal visibility
  const showModal = () => {
    setIsModalOpen(true); // Show modal
  };

  const handleOk = () => {
    setIsModalOpen(false); // Hide modal on OK
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Hide modal on Cancel
  };

  // Function to show the drawer
  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Function to close the drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="main-container">
        <h1 className='heading'>TO DO LIST</h1>
        <div className="form-details">
          <div className='modal-button'>
            <Button type="primary" onClick={showModal} style={{ backgroundColor: '#000080', borderColor: 'white', }}>
              ADD YOUR TASK HERE
            </Button>
          </div>
          <Modal title="ADD TASK" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <GetFormDetails task={submitButtonClicked} />
          </Modal>
        </div>
        {data.map((item, index) => (
          <div className="task-container" key={index}>
            <div className='task-name'>
              <MyTaskName name={item.name} />
            </div>
            <div className='task-date'>
              <DateComponent date={item.date} month={item.month} year={item.year} />
            </div>
            <div className='btn'>
              <MdDelete onClick={() => buttonClicked(index)} className="delete-button" />
            </div>  
          </div>
        ))}
      </div>

      {/* style={{ position: 'fixed',backgroundColor: '#000080', borderColor: 'white', right: '20px', bottom: '20px' }} */}

      <Button className='drawerbtn' type="primary" onClick={showDrawer}  >
        View Deleted Tasks
      </Button>

      <Drawer
        title="Deleted Tasks"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
      >
        {deletedTasks.length === 0 ? (
          <p>No deleted tasks</p>
        ) : (
          deletedTasks.map((task, index) => (
            <div key={index}>
              <p>{task.name} - {task.date}/{task.month}/{task.year}</p>
            </div>
          ))
        )}
      </Drawer>

      <ToastContainer /> {/* Container for toast notifications */}
    </>
  );
}

export default App; // Exporting the App component as default






