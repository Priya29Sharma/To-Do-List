
import './form.css'
// toaster libraeries




    

const GetFormDetails = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObject = {};

        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        console.log(formDataObject);
        
const dateObject = new Date(formDataObject['date']);

const year = dateObject.getFullYear(); // Get the year (e.g., 2024)
const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const monthIndex = dateObject.getMonth(); // Get the month index (0-indexed)
  const monthName = monthNames[monthIndex]; // Get the month name from the array// Get the month (0-indexed, so add 1) (e.g., 3 for March)
const date = dateObject.getDate(); // Get the day of the month (e.g., 12)
formDataObject['month']=monthName.toString()
formDataObject['date']=date.toString()
formDataObject['year']=year.toString()
console.log("date", formDataObject);
props.task(formDataObject)


//display toaste mesaage






        //to reset the form
        event.target.reset()
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="task">
                <input className="input-box-task" type="text" name="name" required placeholder='Write Your Task' />
            </label>
            <label className="Date">
                <input className="input-box-date"  type="date" name="date"  required />
            </label >
            <input  className="ADD" type="submit" value="Add" />
        </form>
    );
};

export default GetFormDetails;