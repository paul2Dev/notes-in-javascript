import NotesAPI from './NotesAPI';
import NotesView from './NotesView';

const app = document.getElementById('app')
const view = new NotesView(app, {
    onNoteSelect: (noteId) => {
        console.log('Selected note:', noteId);
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

const notes = NotesAPI.getAllNotes();

view.updateNoteList(notes);
view.updateSelectedNote(notes[0]);

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