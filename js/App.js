import NotesView from "./NotesView";
import NotesAPI from "./NotesAPI";

export default class App {
    constructor(root) {
        this.notes = [];
        this.selectedNote = null;
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();
    }

    _handlers() {
        return {
            onNoteSelect: (noteId) => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: 'New note',
                    body: 'Take a note...'
                };

                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                NotesAPI.saveNote({
                    id: this.selectedNote.id,
                    title: title,
                    body: body
                });
                this._refreshNotes();
            },
            onNoteDelete: (noteId) => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            }
        }
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();
        this._setNotes(notes);
        if(notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    _setActiveNote(note) {
        this.selectedNote = note;
        this.view.updateSelectedNote(note);
    }
}