export default class NotesAPI{
    static getAllNotes(){
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]")
        
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        })
    }
    
    static saveNote(newNote){
        const notes = this.getAllNotes();

        const existingNote = notes.find(note => note.id === newNote.id);

        if(existingNote){
            existingNote.title = newNote.title;
            existingNote.body = newNote.body;
            existingNote.updated = new Date().toISOString();
        } else {
            newNote.id = Math.floor(Math.random() * 1000000000);
            newNote.updated = new Date().toISOString();

            notes.push(newNote);
        }  

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(id){
        const notes = this.getAllNotes();
        const newNotes = notes.filter(note => note.id !== id);
        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}