
import { createContext, useState, useContext, useEffect } from "react";



const NoteContext = createContext();
// eslint-disable-next-line react/prop-types
const NoteProvider = ({ children }) => {
    const [note, setNote] = useState(
        JSON.parse(localStorage.getItem("notes")) || [] // Load from localStorage or default to an empty array
    );
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(note)); // Update localStorage on state change
    }, [note]);
    return (
        <NoteContext.Provider value={{ note, setNote }}>
            {children}
        </NoteContext.Provider>
    )
}
const useNote = () => useContext(NoteContext);
// eslint-disable-next-line react-refresh/only-export-components
export { useNote, NoteProvider };