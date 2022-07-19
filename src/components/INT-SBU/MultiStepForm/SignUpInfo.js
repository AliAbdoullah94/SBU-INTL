import React from "react";

function SignUpInfo({ formData, setFormData }) {
    return (
        <div className="formPage">
            <div className="sign-up-container fw-bold">
                <input
                    type="text"
                    placeholder="Email..."
                    value={formData.email}
                    onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Password..."
                    value={formData.password}
                    onChange={(event) =>
                        setFormData({ ...formData, password: event.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Confirm Password..."
                    value={formData.confirmPassword}
                    onChange={(event) =>
                        setFormData({ ...formData, confirmPassword: event.target.value })
                    }
                />
            </div>
        </div>
    );
}

export default SignUpInfo;