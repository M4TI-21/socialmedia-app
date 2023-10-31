export default function AddNote() {
    return(
        <div className="addNoteOptions">
            <h1>Choose style:</h1>
            <div className="notesList d-flex flex-row flex-wrap align-items-center">
                <div className="noteType type1">
                    <h3>Type 1</h3>
                    <p>Simple text note, photo, video, link to file</p>
                </div>
                <div className="noteType type2">
                    <h3>Type 2</h3>
                    <p>To-do note with checkboxes</p>
                </div>
                <div className="noteType type3">
                    <h3>Type 3</h3>
                    <p>Online note, connect with others and share content</p>
                </div>
            </div>
        </div>
    );
}