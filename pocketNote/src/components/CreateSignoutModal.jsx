import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../context/modalContext";
import { useAuth } from "../context/authContext";
import { useGroup } from "../context/groupContext";
import { useNote } from "../context/noteContext";
import { IoLogOutSharp } from "react-icons/io5";

const CreateSignoutModal = () => {
    const { setModal } = useModal();
    const { setUser, user } = useAuth();
    const { setGroup } = useGroup();
    const { setNote } = useNote();
    const navigate = useNavigate();
    const handleClick = () => {
        setModal((prevModal) => ({
            ...prevModal,
            signoutModal: false,
        }));
    };
    const handleButtonClick = () => {
        setUser({ token: "", userName: "" });
        setGroup([]);
        setNote([]);
        setModal((prevModal) => ({
            ...prevModal,
            signoutModal: false,
            signinModal: true,
        }));
        navigate("/");
    };
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5, // Ensure it's above other elements
                padding: "1rem", // Adds space for smaller screens
            }}
            onClick={handleClick}
        >
            <div
                style={{
                    position: "absolute",
                    top: "20%", // Adjusted to center better
                    left: "50%",
                    transform: "translateX(-50%)", // Ensures proper centering
                    width: "25%", // Default width
                    maxWidth: "400px", // Restrict max width
                    background: "#ffffff",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem",
                    boxSizing: "border-box",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <p style={{ fontSize: "1.1rem", color: "#555", textAlign: "center" }}>
                    Are you sure you want to sign out, <strong style={{ color: "#0047FF" }}>{user?.userName}</strong>?
                </p>

                <IoLogOutSharp
                    style={{
                        fontSize: "10vw",
                        color: "#3b82f6",
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    onClick={handleButtonClick}
                />
            </div>
        </div>
    );
};

export default CreateSignoutModal;
