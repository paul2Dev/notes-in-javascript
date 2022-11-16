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
    }

}