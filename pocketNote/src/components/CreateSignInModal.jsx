import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useModal } from "../context/modalContext";
import { useGroup } from "../context/groupContext";
import { useNote } from "../context/noteContext";
import { useAuth } from "../context/authContext";

const CreateSignInModal = () => {
    const { setModal } = useModal();
    const { setUser, user } = useAuth();
    const { setGroup, group } = useGroup();
    const { setNote, note } = useNote();
    const [inputState, setInputState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const handleClick = (e) => {
        setModal((prevModal) => ({
            ...prevModal,
            signinModal: false,
        }));
    };

    const handleInputChange = (e) => {
        let fieldName = e.target.name;
        let value = e.target.value;

        setInputState((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };
    const validateInput = () => {
        const { email, password, confirmPassword } = inputState;

        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            toast.error("All fields are required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email address");
            return false;
        }

        // if (password.length < 6) {
        //     toast.error('Password must be at least 6 characters');
        //     return false;
        // }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleButtonClick = async () => {
        if (!validateInput()) return;

        setLoading(true);
        const { email, password } = inputState;

        try {
            const response = await axios.post(
                "https://note2-backend.onrender.com/api/v1/login",
                {
                    email,
                    password,
                }
            );
            // console.log("responseObject", response);
            if (response.data.status === "ok") {
                toast.success("Login successful");
                setUser({
                    userName: response.data.user.name,
                    token: response.data.token,
                    imageurl: response.data.user.imageurl
                });
                setGroup(response.data.user.group);
                setNote(response.data.user.notes);
                setModal((prevModal) => ({ ...prevModal, signinModal: false }));
            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error("Invalid email or password");
            } else {
                toast.error(error.response?.data?.message || "Network error");
            }
        } finally {
            setLoading(false);
        }
    };
    // console.log("user", user);
    // console.log("group", group);
    // console.log("note", note);
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
                zIndex: 5,
                padding: "1rem", // Ensures proper spacing on smaller screens
            }}
            onClick={handleClick}
        >
            <div
                style={{
                    position: "absolute",
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "90%", // Relative width
                    maxWidth: "450px", // Adjust max width for better responsiveness
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
                <h2 style={{ marginBottom: "1rem", color: "#1e293b", textAlign: "center" }}>
                    Sign In
                </h2>

                {["email", "password", "confirmPassword"].map((field, index) => (
                    <label key={index} style={{ width: "100%", marginBottom: "1rem" }}>
                        <span style={{ display: "block", marginBottom: "0.5rem" }}>
                            {field === "email" ? "Email" : field === "password" ? "Password" : "Confirm Password"}
                        </span>
                        <input
                            type={field === "email" ? "email" : "password"} // Explicitly setting password type
                            name={field}
                            placeholder={`Enter your ${field === "confirmPassword" ? "password again" : field}`}
                            style={{
                                border: "1px solid grey",
                                padding: "0.75rem",
                                borderRadius: "1rem",
                                width: "100%",
                                boxSizing: "border-box",
                                fontSize: "1rem",
                            }}
                            onChange={handleInputChange}
                        />
                    </label>
                ))}

                <button
                    style={{
                        marginTop: "1rem",
                        height: "3rem",
                        width: "100%",
                        fontSize: "1rem",
                        background: "blue",
                        color: "white",
                        borderRadius: "1rem",
                        border: "none",
                        cursor: "pointer",
                        transition: "background 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#0044cc")}
                    onMouseOut={(e) => (e.target.style.background = "blue")}
                    disabled={loading}
                    onClick={handleButtonClick}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </div>
        </div>
    );
};

export default CreateSignInModal;
