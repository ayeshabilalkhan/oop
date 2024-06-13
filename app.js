#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const startProgram = async (persons) => {
    do { //loopAdded
        console.log(chalk.bold.blue("\nWelcome to the Interactive Program!"));
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: chalk.yellow("Whom would you like to interact with?"),
            choices: ["Faculty", "Student", "Exit"]
        });
        if (ans.select == "Faculty") {
            console.log(chalk.whiteBright("You Approach The Faculty Room. Please Feel Free To Ask Any Question."));
        }
        else if (ans.select == "Student") {
            const ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: chalk.blueBright("Please enter the name of the student you would like to interact with:")
            });
            const student = persons.students.find(val => val.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(chalk.yellow(`Hello I am ${name.name}. Pleasure meeting you!`));
                console.log(chalk.yellow("New student added"));
                console.log(chalk.yellow("Current student list:"));
                console.log(persons.students);
            }
            else {
                console.log(chalk.magenta(`Hello I am ${student.name}. Welcome back.`));
                console.log(chalk.red("Existing student list:"));
                console.log(persons.students);
            }
        }
        else if (ans.select == "Exit") {
            console.log(chalk.redBright("Thank you for using the program. Exiting now."));
            process.exit();
        }
    } while (true); //loopClosed
};
startProgram(persons);
