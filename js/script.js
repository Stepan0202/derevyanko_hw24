class Student {
    constructor(id, name, secondName, course, pay){
        this.id = id,
        this.name = name,
        this.secondName = secondName,
        this.course = course,
        this.pay = pay,
        this.debt = this.course.price - this.pay

    }
}
const students = [
    { id: 1, name: 'John', secondName: 'Smith', course: { name: 'Marketing', price: 300 }},
    { id: 2, name: 'Alice', secondName: 'Johnson', course: { name: 'Programming', price: 400 }},
    { id: 3, name: 'Bob', secondName: 'Brown', course: { name: 'Design', price: 350 }, pay: 250},
    { id: 4, name: 'Eva', secondName: 'Davis', course: { name: 'Marketing', price: 300 }, pay: 150},
    { id: 5, name: 'Frank', secondName: 'Lee', course: { name: 'Programming', price: 400 }, pay: 300},
    { id: 6, name: 'Grace', secondName: 'Garcia', course: { name: 'Design', price: 350 }, pay: 200},
    { id: 7, name: 'Hannah', secondName: 'Hall', course: { name: 'Marketing', price: 300 }, pay: 250},
    { id: 8, name: 'Ivy', secondName: 'Clark', course: { name: 'Programming', price: 400 }, pay: 300},
    { id: 9, name: 'Jack', secondName: 'Lopez', course: { name: 'Design', price: 350 }, pay: 100},
    { id: 10, name: 'Oliver', secondName: 'Green', course: { name: 'Marketing', price: 300 }, pay: 200},
    
]