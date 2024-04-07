function createEmployeeRecord(row){
    return {
    firstName:row[0],
    familyName:row[1],
    title:row[2],
    payPerHour:row[3],
    timeInEvents:[],
    timeOutEvents:[]
    }
}

function createEmployeeRecords(raw){
    return raw.map(row=>{
        return createEmployeeRecord(row)}
)}
function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}
function createTimeOutEvent(dateStamp){
    let[date,hour]=dateStamp.split(' ')
    this.timeOutEvents.push({
        type:"TimeOut"
        ,hour:parseInt(hour,10)
        ,date
    })
    return this
}
function hoursWorkedOnDate(dateStamp){
    let timeIn=this.timeInEvents.find(evo=>{return evo.date === dateStamp})
    let timeOut=this.timeOutEvents.find(avo=>{return avo.date===dateStamp})
    return (timeOut.hour-timeIn.hour)/100
}  
function wagesEarnedOnDate(dateStamp){
    let wages=hoursWorkedOnDate.call(this,dateStamp)*this.payPerHour
    return parseFloat(wages.toString())
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
function findEmployeeByFirstName(employee,first) {
    return employee.find(rec=>{return rec.firstName===first})
}
function calculatePayroll(employee){
    return employee.reduce((memo,rec)=>{
        return memo+allWagesFor.call(rec)
    },0)
}