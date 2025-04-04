import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { useModal } from "../context/modalContext";
import { useAuth } from "../context/authContext";
import CreateGroupModal from "../components/CreateGroupModal";
import NavBar from "../components/NavBar";
import CreateSignUpModal from "../components/CreateSignUpModal";
import CreateSignInModal from "../components/CreateSignInModal";
import CreateSignoutModal from "../components/CreateSignoutModal";
import "../style/Home.css";

const Home = () => {
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    const { modal } = useModal();
    const { user } = useAuth();
    // console.log("Environment Variables in App:", {
    //     cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    //     uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    // });
    // console.log("home", isHidden)
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >

            <motion.div
                className="main-content"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
                {user?.token && <Sidebar hidden={isHidden} />}
                <motion.div
                    className={`content ${isHidden && user.token ? "hide" : ""}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{ width: user?.token ? "75%" : "100%", }}
                >
                    <NavBar hide={isHidden} />

                    {/* Static Content About the App */}
                    {!user?.token && (
                        <motion.div
                            className="static-content "
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            style={{
                                textAlign: "center",
                                padding: "4rem",
                                background: "rgba(255, 255, 255, 0.1)",
                                borderRadius: "10px",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                maxWidth: "800px",
                                margin: "5vh auto",
                            }}
                        >
                            <h1 style={{ color: "rgba(29, 24, 24, 0.81)", fontSize: "2.5rem", marginBottom: "1rem" }}>
                                Welcome to Note App
                            </h1>
                            <p style={{ color: "rgba(29, 24, 24, 0.69)", fontSize: "1.2rem", lineHeight: "1.6" }}>
                                Note App is your ultimate solution for organizing and managing your notes efficiently.
                                Whether you're jotting down quick ideas, creating to-do lists, or collaborating with
                                others, Note App has got you covered. Sign up or sign in to get started and unlock the
                                full potential of our app!
                            </p>
                            <h2 style={{ color: "rgba(29, 24, 24, 0.78)", fontSize: "2rem", marginTop: "1.5rem", marginBottom: "1rem" }}>
                                Key Features:
                            </h2>
                            <ul style={{ color: "rgba(29, 24, 24, 0.79)", fontSize: "1.1rem", textAlign: "center", listStyleType: "none", padding: 0 }}>
                                <li>📝 Create and manage notes effortlessly.</li>
                                <li>👥 Collaborate with groups and share notes.</li>
                                <li>🔒 Secure and private with user authentication.</li>
                                <li>📅 Stay organized with reminders and due dates.</li>
                                <li>🌐 Access your notes from anywhere, anytime.</li>
                            </ul>
                        </motion.div>
                    )}

                    {/* Display username if it exists */}
                    {user?.userName && (
                        <motion.div
                            className="user-greeting hide"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            style={{
                                textAlign: "center",
                                padding: "1rem",
                                background: "rgba(255, 255, 255, 0.1)",
                                borderRadius: "10px",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                maxWidth: "20vw",
                                margin: "16vh auto",
                                color: "rgba(29, 24, 24, 0.81)",
                                fontSize: "1.5rem",
                            }}
                        >
                            Welcome back, {user.userName}!
                            <img
                                src="./icon.jpg"
                                alt="note image"
                                style={{
                                    width: "100px", // Set a fixed width
                                    height: "100px", // Set a fixed height
                                    borderRadius: "50%", // Make it circular
                                    border: "3px solid rgba(255, 255, 255, 0.5)", // Add a border
                                    marginTop: "1rem", // Add some space above the image
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
                                    objectFit: "cover", // Ensure the image covers the area without distortion
                                }}
                            />
                        </motion.div>
                    )}

                    {/* Word "Note" moving all around the page */}
                    {/* <motion.div
                        className="moving-note"
                        initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                        animate={{
                            x: [0, 300, -300, 500, -500, 400, 0],
                            y: [0, -300, 200, -400, 300, 400, 0],
                            rotate: [0, 90, 180, 270, 360],
                            scale: [1, 1.2, 1, 0.8, 1]
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{ willChange: "transform" }}
                    >
                        Note
                    </motion.div> */}
                </motion.div>
            </motion.div>

            {/* Modals */}
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
            {modal.signupModal && (
                <motion.div
                    className="modal-animation"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <CreateSignUpModal />
                </motion.div>
            )}
            {modal.signinModal && (
                <motion.div
                    className="modal-animation"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <CreateSignInModal />
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
        </motion.div>
    );
};

export default Home;