import NotesAPI from './NotesAPI';
import NotesView from './NotesView';

const app = document.getElementById('app')
const view = new NotesView(app, {
    onNoteSelect: (note) => {
        console.log('Selected note:', note);
    },
    onNoteAdd: () => {
        console.log('Add note')
    },
    onNoteEdit: (newTitle, newBody) => {
        console.log(newTitle, newBody);
    },
    onNoteDelete: (note) => {
        console.log('Delete note:', note);
    }
})

view.updateNoteList(NotesAPI.getAllNotes());

//save note
//NotesAPI.saveNote({
//     title: 'My new note',
//     body: 'body test'
// })

//update note
// NotesAPI.saveNote({
//     id: 943343421,
//     title: 'My new note - modified',
//     body: 'body test - modified'
// })

//delete note 
//NotesAPI.deleteNote(461234215)

console.log(NotesAPI.getAllNotes());