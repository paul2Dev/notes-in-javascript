export default class NotesView {
    constructor(root, {onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete} = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add">Add Note</button>
                <div class="notes__list"></div>
            </div>

            <div class="notes__preview">
                <input type="text" class="notes__title" placeholder="Note title...">
                <textarea class="notes__body">Note content...</textarea>
            </div>
        `;

        const btnAddNote = this.root.querySelector('.notes__add');
        const inputTitle = this.root.querySelector('.notes__title');
        const inputBody = this.root.querySelector('.notes__body');

        btnAddNote.addEventListener('click', () => {
            this.onNoteAdd();
        });

        [inputTitle, inputBody].forEach(inputField => {
            inputField.addEventListener('blur', () => {

                const updatedTitle = inputTitle.value.trim();
                const updatedBody = inputBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            })
        });

        this.updateNotePreviewVisibility(false);

    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;
        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="note__small-title">${title}</div>
                <div class="note__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? '...' : ''}
                </div>
                <div class="note__small-updated">${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}</div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesList = this.root.querySelector('.notes__list');
        notesList.innerHTML = '';

        for(let note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesList.insertAdjacentHTML('beforeend', html);
        }

        notesList.querySelectorAll('.notes__list-item').forEach(notesItem => {
            notesItem.addEventListener('click', () => {
                this.onNoteSelect(notesItem.dataset.noteId);
            });

            notesItem.addEventListener('dblclick', (e) => {
                const confirmDelete = confirm('Are you sure you want to delete this note?');
                if(confirmDelete) {
                    this.onNoteDelete(notesItem.dataset.noteId);
                }
            });
        });
    }

    updateSelectedNote(note) {
        this.root.querySelector('.notes__title').value = note.title;
        this.root.querySelector('.notes__body').value = note.body;

        this.root.querySelectorAll('.notes__list-item').forEach(notesItem => {
            notesItem.classList.remove('notes__list-item--selected');
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add('notes__list-item--selected');
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector('.notes__preview').style.display = visible ? 'block' : 'none';
    }

}