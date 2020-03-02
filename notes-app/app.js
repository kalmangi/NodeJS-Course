//const add = require('./utils');//Load the node module

//fs.writeFileSync('notes.txt',"This file is created using node JS");

//fs.appendFileSync('notes.txt',' Thii');
// const a = add(4,5)
// console.log(a)

//const getNotes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs')
const notes = require('./notes');
//customize yargs version
yargs.version('1.1.0')

//creating add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title:{
            describe:'Show Title',
            demandOption: true,
            type:'string'
        },
        body:{
            describe:'Show Body',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
        console.log('Title '+ argv.title)
        console.log('Body '+ argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title:{
            describe:'Show Title',
            demandOption: true,
            type:'string'
        },
    },
    handler(argv){
        notes.removeNote(argv.title)
        console.log('Title '+ argv.title)
        
    }
})

yargs.command({
    command: 'list',
    describe: 'list your notes',
    handler: ()=>{
        notes.listNotes();
        console.log('Listing out all notes')
    }
})

yargs.command({
    command: 'Read',
    describe: 'Read notes',
    builder: {
        title:{
            describe:'Show Title',
            demandOption: true,
            type:'string'
        },
    },
    handler: (argv) =>{
        notes.readNotes(argv.title);
        console.log('Read out all notes')
    }
})

//add, remove, read list


// const command = process.argv[2];

// if(command === 'add'){
//     console.log('adding a note');
// } else if(command === 'remove') {
//     console.log('Remove a note')
// }
//console.log(process.argv)
//console.log(yargs.argv)
yargs.parse()

//record the input
// const msg = getNotes();
// console.log(msg)
// console.log(process.argv[2])

//Validate email
// const validator = require('validator');
// console.log(validator.isEmail('a@g.com'));
// console.log(validator.isURL('https/mead.io'));

//Chalk
//const chalk = require('chalk');
// console.log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `);
//console.log(chalk.bold('Hello!'))