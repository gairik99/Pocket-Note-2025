import { createContext, useContext, useState } from "react";



const ModalContext = createContext();
// eslint-disable-next-line react/prop-types
const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({
        groupModal: false,
        signupModal: false,
        signinModal: false,
        signoutModal: false,
    });
    return (
        <ModalContext.Provider value={{ modal, setModal }}>
            {children}
        </ModalContext.Provider>
    )
}

const useModal = () => useContext(ModalContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useModal, ModalProvider };