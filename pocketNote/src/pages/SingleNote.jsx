import { useParams } from "react-router-dom"
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar"
import CreateGroupModal from "../components/CreateGroupModal"
import { useModal } from "../context/modalContext"
import GroupNotes from "../components/GroupNotes"
import NavBar from "../components/NavBar"
import CreateSignoutModal from "../components/CreateSignoutModal"
import { useState } from "react";
import { useEffect } from "react";
import { useStyle } from "../context/styleContext";

const SingleNote = () => {
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    const { style } = useStyle();
    const { modal } = useModal();
    const { id } = useParams();
    // console.log('singleNote', style)

    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    // console.log(id);
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <Sidebar id={id} hidden={isHidden} />
                <div style={{ width: isHidden ? (style ? '100%' : '0%') : "75%", height: '100%', position: 'relative', display: isHidden ? (style ? 'block' : "none") : 'block' }} >
                    <NavBar id={id} hidden={isHidden} />
                    <GroupNotes id={id} hidden={isHidden} />
                </div>
            </div>
            {modal.groupModal && (
                <motion.div
                    className="modal-animation"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <CreateGroupModal />
                </motion.div>
            )}

            {modal.signoutModal && (
                <motion.div
                    className="modal-animation"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <CreateSignoutModal />
                </motion.div>
            )}
        </div>
    )
}

export default SingleNote