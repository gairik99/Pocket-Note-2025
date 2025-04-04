import { useState } from "react";
import { IoLogOutSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useModal } from "../context/modalContext";

const SidebarHeader = ({ hide }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { setModal } = useModal();
    const [isHovered, setIsHovered] = useState(false);

    const handleHomeClick = () => {
        navigate("/");
    };


    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: hide ? "1rem 0.5rem" : "1.5rem 1rem",
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                background: "#f8fafc",
            }}
        >
            {/* User Profile Image */}
            {user?.token && user?.imageurl && (
                <div
                    style={{
                        marginBottom: hide ? "1rem" : "1.5rem",
                        cursor: "pointer",
                        position: "relative",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                        boxShadow: isHovered
                            ? "0 4px 8px rgba(0, 0, 0, 0.15)"
                            : "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        style={{
                            position: "absolute",
                            bottom: "5px",
                            right: "5px",
                            width: hide ? "12px" : "16px",
                            height: hide ? "12px" : "16px",
                            borderRadius: "50%",
                            background: "#4ade80",
                            border: "2px solid white",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    />
                    <img
                        src={user.imageurl || ""}
                        alt="User Profile"
                        style={{
                            width: hide ? "6rem" : "8rem",
                            height: hide ? "6rem" : "8rem",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "3px solid white",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    />
                </div>
            )}

            {/* Note Logo, Heading, and Logout Icon */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    cursor: "pointer",
                    padding: hide ? "0.25rem 0.5rem" : "0.5rem 1rem",
                    borderRadius: "12px",
                    transition: "background 0.3s ease, transform 0.2s ease",
                    userSelect: "none",
                }}
                onClick={handleHomeClick}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src="/icon.jpg"
                        alt="note"
                        style={{
                            width: hide ? "40px" : "52px",
                            height: hide ? "40px" : "52px",
                            borderRadius: "14px",
                            marginRight: hide ? "0.5rem" : "0.75rem",
                            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)",
                            transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <h1
                        style={{
                            color: "#1e293b",
                            margin: 0,
                            fontSize: hide ? "1.5rem" : "2rem",
                            fontWeight: 800,
                            letterSpacing: "-0.04em",
                            fontFamily: "'Inter', sans-serif",
                            background: "linear-gradient(135deg, #3b82f6, #6366f1, #9333ea)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            transition: "text-shadow 0.2s ease",
                            lineHeight: "1.2",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.textShadow = "0 2px 6px rgba(99, 102, 241, 0.5)")
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.textShadow = "none")}
                    >
                        {user.userName}
                    </h1>
                </div>
                {hide && <IoLogOutSharp
                    style={{
                        fontSize: hide ? "1.5rem" : "2rem",
                        color: "#3b82f6",
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    onClick={() => setModal(prev => ({ ...prev, signoutModal: true }))}
                />}
            </div>
        </div>
    );
};

export default SidebarHeader;