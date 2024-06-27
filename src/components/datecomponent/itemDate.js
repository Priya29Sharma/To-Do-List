import './itemDate.css'

const DateComponent = (props)=>{
    const date=props.date
    const month=props.month
    const year=props.year
    return(
        <div>
            <span className="date">{date} </span>
            <span className="date">{month} </span>
            <span className="date">{year}</span>
        </div>
    )
}
export default DateComponent