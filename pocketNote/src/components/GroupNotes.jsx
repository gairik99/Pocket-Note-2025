import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createNote, updateNote, deleteNote } from "../../services/noteService"; // Import deleteNote
import { useNote } from "../context/noteContext";
import { useAuth } from "../context/authContext";

const GroupNotes = ({ id, hidden }) => {
    const { note, setNote } = useNote();
    const { user } = useAuth();
    const [notes, setNotes] = useState({});
    const [groupNote, setGroupNote] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null); // Track which note is being edited
    const [editingNoteText, setEditingNoteText] = useState(""); // Track the updated text
    const [showConfirmation, setShowConfirmation] = useState(false); // Track confirmation UI visibility
    const [noteToEdit, setNoteToEdit] = useState(null); // Track the note to be edited
    const [noteToDelete, setNoteToDelete] = useState(null); // Track the note to be delete+
    
    useEffect(() => {
        setNotes({ groupId: id });
        const newNotes = note?.filter(({ groupId }) => id == groupId);
        setGroupNote(newNotes);
    }, [id, note]);

    const handleInputChange = (e) => {
        let val = e.target.value;
        setNotes((prevNotes) => ({ ...prevNotes, note: val }));
    };

    const handleCreateNote = async () => {
        if (notes.note?.trim().length > 0) {
            const date = new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
            const time = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

            const newNote = { ...notes, date, time };

            setLoading(true);
            try {
                const response = await createNote(newNote, user.token);
                if (response.status === "ok") {
                    setNote((prevNote) => [...prevNote, response.data]);
                    toast.success("Note has been created");
                } else {
                    toast.error(response.message || "Failed to add note");
                }
            } catch (error) {
                toast.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            toast.warning("Note should have at least one character");
        }
    };

    const handleEditNote = async () => {
        if (editingNoteText.trim().length > 0) {
            const updatedNote = { _id: editingNoteId, note: editingNoteText };

            setLoading(true);
            try {
                const response = await updateNote(updatedNote, user.token);
                if (response.status === "ok") {
                    setNote((prevNotes) =>
                        prevNotes.map((note) =>
                            note._id.toString() === editingNoteId.toString() ? { ...note, note: editingNoteText } : note
                        )
                    );
                    toast.success("Note has been updated");
                    setEditingNoteId(null);
                    setEditingNoteText("");
                    setNoteToEdit(null);
                } else {
                    toast.error(response.message || "Failed to update note");
                }
            } catch (error) {
                toast.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            toast.warning("Note should have at least one character");
        }
    };

    const handleDeleteNote = async (_id) => {
        setLoading(true);
        try {
            const response = await deleteNote(_id, user.token);
            console.log(response);
            if (response.status === 200) {
                setNote((prevNotes) => prevNotes.filter((note) => note._id !== _id));
                toast.success("Note has been deleted");
            } else {
                toast.error(response.message || "Failed to delete note");
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
            setNoteToDelete(null);
        }
    };

    const handleEditClick = (note) => {
        setNoteToEdit(note); // Store the note to be edited
        setShowConfirmation(true); // Show the confirmation UI
    };

    const handleDeleteClick = (note) => {
        setNoteToDelete(note); // Store the note to be deleted
        setShowConfirmation(true); // Show the confirmation UI
    };

    const handleConfirmAction = () => {
        if (noteToEdit) {
            setEditingNoteId(noteToEdit._id); // Set the note ID being edited
            setEditingNoteText(noteToEdit.note); // Set the current note text for editing
        } else if (noteToDelete) {
            handleDeleteNote(noteToDelete._id); // Delete the note
        }
        setShowConfirmation(false); // Hide the confirmation UI
    };

    const handleCancelAction = () => {
        setShowConfirmation(false); // Hide the confirmation UI
        setNoteToEdit(null); // Clear the note to be edited
        setNoteToDelete(null); // Clear the note to be deleted
        setEditingNoteId(null); // Clear the editing note ID
        setEditingNoteText("");
    };

    const handleCancelEditMode = () => {
        setEditingNoteId(null); // Exit edit mode
        setEditingNoteText(""); // Clear the edit text
        setNoteToEdit(null);
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent newline in textarea
            handleCreateNote();
        }
    };
    // console.log(note);
    return (
        <div
            style={{
                width: "100%",
                height: "90%",
                background: "#f5f5f4",
                position: "relative",
            }}
        >
            {/* Custom Confirmation UI */}
            {showConfirmation && (
                <div
                    style={{
                        padding: hidden ? "1rem" : "2rem",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,

                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "2rem",
                            borderRadius: "10px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                            textAlign: "center",
                        }}
                    >
                        <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                            {noteToEdit
                                ? "Are you sure you want to edit this note?"
                                : "Are you sure you want to delete this note?"}
                        </p>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                            <button
                                style={{
                                    background: "green",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "0.5rem 1rem",
                                    cursor: "pointer",
                                }}
                                onClick={handleConfirmAction}
                            >
                                Yes
                            </button>
                            <button
                                style={{
                                    background: "red",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "0.5rem 1rem",
                                    cursor: "pointer",
                                }}
                                onClick={handleCancelAction}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div
                style={{
                    width: "100%",
                    height: "72.4vh",
                    overflowY: "auto",
                    padding: "0.5rem",
                }}
            >
                {groupNote.length > 0 ? (
                    groupNote.map(({ _id, note, date, time }) => (
                        <div
                            key={_id}
                            style={{
                                padding: "1rem",
                                borderRadius: "5px",
                                margin: "1rem 1rem",
                                boxShadow: "0 0 10px rgba(17, 233, 100, 0.2)",
                                background: "#fafafa",
                                color: "#262626",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                wordBreak: "break-word",
                                maxWidth: "100%",
                                minHeight: "10vh",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: hidden ? "column" : "row",
                                    alignItems: hidden ? "flex-start" : "center",
                                    width: "100%",
                                }}
                            >
                                {editingNoteId === _id ? (
                                    <textarea
                                        style={{
                                            width: "100%",
                                            height: "10vh",
                                            padding: "0.5rem",
                                            fontSize: "1rem",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                            marginBottom: "0.5rem",
                                        }}
                                        value={editingNoteText}
                                        onChange={(e) => setEditingNoteText(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                handleEditNote();
                                            }
                                        }}
                                    />
                                ) : (
                                    <p
                                        style={{
                                            fontSize: "1.2rem",
                                            marginBottom: "0.5rem",
                                            wordBreak: "break-word",
                                            whiteSpace: "normal",
                                            padding: "1rem",
                                            maxWidth: "95%"
                                        }}
                                    >
                                        {note}
                                    </p>
                                )}
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "0.6rem",
                                            color: "#555",
                                            display: "flex",
                                            felxDirection: "row",
                                            gap: "0.3rem",
                                        }}
                                    >
                                        {date} • {time}
                                    </div>
                                    {editingNoteId === _id ? (
                                        <>
                                            <button
                                                style={{
                                                    background: "blue",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    padding: "0.3rem 0.8rem",
                                                    fontSize: "0.9rem",
                                                    cursor: "pointer",
                                                }}
                                                onClick={handleEditNote}
                                            >
                                                &#10095;
                                            </button>
                                            <button
                                                style={{
                                                    background: "red",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    padding: "0.3rem 0.8rem",
                                                    fontSize: "0.9rem",
                                                    cursor: "pointer",
                                                }}
                                                onClick={handleCancelEditMode}
                                            >
                                                &#10006;
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                style={{
                                                    background: "green",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    padding: "0.3rem 0.8rem",
                                                    fontSize: "0.9rem",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => handleEditClick({ _id, note, date, time })}
                                                disabled={editingNoteId !== null}
                                            >
                                                &#x270E;
                                            </button>
                                            <button
                                                style={{
                                                    background: "red",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    padding: "0.3rem 0.8rem",
                                                    fontSize: "0.9rem",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => handleDeleteClick({ _id, note, date, time })}
                                                disabled={loading}
                                            >
                                                &#128465;
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "2rem",
                            color: "#999",
                            fontSize: "1.2rem",
                        }}
                    >
                        No notes available
                    </p>
                )}
            </div>

            <textarea
                style={{
                    height: "18.6vh",
                    width: "100%",
                    border: "12px solid blue",
                    borderRadius: "5px",
                    padding: "0.5rem 0.5rem",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                }}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                value={notes.note || ""}
                placeholder="Enter your Note ..."
            ></textarea>
            <button
                style={{
                    color: "white",
                    height: "1.5rem",
                    width: "1.5rem",
                    background: loading ? 'grey' : notes?.note?.length > 0 ? 'blue' : "grey",
                    borderRadius: "50%",
                    position: "absolute",
                    bottom: "2.5vh",
                    right: "2rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onClick={handleCreateNote}
                disabled={loading}
            >
                {loading ? (
                    <div className="spinner" style={{
                        border: "2px solid #fff",
                        borderTop: "2px solid transparent",
                        borderRadius: "50%",
                        width: "1rem",
                        height: "1rem",
                        animation: "spin 0.8s linear infinite"
                    }}></div>
                ) : (
                    '>'
                )}
            </button>

            <style>
                {`
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `}
            </style>
        </div>
    );
};

export default GroupNotes;