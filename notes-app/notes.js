const fs = require('fs')
const chalk = require('chalk');

const getNotes = function () {
    return "Success.."
}

const addNote =  (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note)=>{
    //     return note.title === title;
    // });
    const duplicate = notes.find(note=>{
        return note.title === title;
    })

    debugger
    //console.log(duplicate)
    //console.log(duplicateNotes)
    if(!duplicate){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.red.underline('New note is added'));
    } else {
        console.log(chalk.green.underline('Note taken'))
    }
   
}

const saveNotes = (notes) =>{
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson);

}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        console.log(dataBuffer);

        const dataJSON = dataBuffer.toString();
        console.log(dataJSON)
        const u = JSON.parse(dataJSON)
        console.log(u)
        return u
        
    } catch (e) {
        return []
    }
}

const removeNote = (title) =>{
    const notes = loadNotes();
    const notesToKeep = notes.filter((note)=>{
        return note.title !== title
    });
    console.log(notesToKeep)
    if(notes.length > notesToKeep.length){
        console.log('note is removed')
        saveNotes(notesToKeep)
    } else {
        console.log('no notes')
    }
}

const readNotes = (title)=>{
    const notes = loadNotes();
    const notesFind = notes.find((note)=>{
        return note.title === title
    });

    if(notesFind){
        console.log('ddd')
    }else{
        console.log('no note')
    }
}

const listNotes = () =>{
    const notes = loadNotes();
    console.log(notes)
    const s = notes.map(note=>{
        return note.title
    })
    console.log(s)
}

module.exports = { getNotes: getNotes, addNote: addNote, removeNote: removeNote, listNotes: listNotes, readNotes: readNotes };