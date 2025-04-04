import { useContext, useState, createContext } from "react";
import { useEffect } from "react";

const GroupContext = createContext();

// eslint-disable-next-line react/prop-types
const GroupProvider = ({ children }) => {
    const [group, setGroup] = useState(
        JSON.parse(localStorage.getItem("group")) || []
    );

    useEffect(() => localStorage.setItem("group", JSON.stringify(group)), [group]);
    return (
        <GroupContext.Provider value={{ group, setGroup }}>
            {children}
        </GroupContext.Provider>
    )
}

const useGroup = () => useContext(GroupContext);
// eslint-disable-next-line react-refresh/only-export-components
export { useGroup, GroupProvider };