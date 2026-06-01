import { useEffect, useState } from "react";
import "./Profile.css";
import { accountService } from "../../Services/AccountService";
import type { Profile, PasswordChangeForm } from "../../contracts/Account/Profile";

export default function Profile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [passwordForm, setPasswordForm] = useState<PasswordChangeForm>({
        oldPassword: "",
        oldPasswordConfirm: "",
        newPassword: "",
    });
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);

    useEffect(() => {
        async function loadProfile() {
            try {
                setLoading(true);
                setError("");
                const data = await accountService.fetchProfile();
                setProfile(data);
            } catch (e: any) {
                setError(e?.message ?? "Failed to fetch profile.");
                setProfile(null);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");

        // Validation using service
        const validationError = accountService.validatePasswordChange(passwordForm);
        if (validationError) {
            setPasswordError(validationError);
            return;
        }

        try {
            setPasswordLoading(true);
            const message = await accountService.changePassword(
                passwordForm.oldPassword,
                passwordForm.newPassword
            );
            setPasswordSuccess(message);
            setPasswordForm({
                oldPassword: "",
                oldPasswordConfirm: "",
                newPassword: "",
            });
            setTimeout(() => {
                setShowPasswordChange(false);
                setPasswordSuccess("");
            }, 2000);
        } catch (e: any) {
            setPasswordError(e?.message ?? "Failed to change password.");
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="profilePage">
            <h1 className="profileTitle">
                {profile?.username ? `${profile.username}` : "Profile"}
            </h1>
            {loading && <div className="profileLoading">Loading…</div>}
            {error && <div className="profileError">{error}</div>}

            {!loading && !error && profile && (
                <>
                    <div className="profileBlock">
                        <div className="profileRow">
                            <span className="profileLabel">Username:</span>
                            <span className="profileValue">
                                {profile.username}
                            </span>
                        </div>
                        <div className="profileRow">
                            <span className="profileLabel">Email:</span>
                            <span className="profileValue">{profile.email}</span>
                        </div>
                        <div className="profileRow">
                            <span className="profileLabel">Role:</span>
                            <span className="profileValue">{profile.role}</span>
                        </div>
                        <button
                            className="changePasswordBtn"
                            onClick={() => setShowPasswordChange(!showPasswordChange)}
                        >
                            {showPasswordChange ? "Cancel" : "Change Password"}
                        </button>
                    </div>

                    {showPasswordChange && (
                        <div className="passwordChangeBlock">
                            <h2 className="passwordChangeTitle">
                                Change Password
                            </h2>
                            {passwordError && (
                                <div className="profileError">
                                    {passwordError}
                                </div>
                            )}
                            {passwordSuccess && (
                                <div className="profileSuccess">
                                    {passwordSuccess}
                                </div>
                            )}
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="formGroup">
                                    <label
                                        htmlFor="oldPassword"
                                        className="formLabel"
                                    >
                                        Old Password:
                                    </label>
                                    <input
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        value={passwordForm.oldPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter your current password"
                                        className="formInput"
                                    />
                                </div>

                                <div className="formGroup">
                                    <label
                                        htmlFor="oldPasswordConfirm"
                                        className="formLabel"
                                    >
                                        Confirm Old Password:
                                    </label>
                                    <input
                                        type="password"
                                        id="oldPasswordConfirm"
                                        name="oldPasswordConfirm"
                                        value={passwordForm.oldPasswordConfirm}
                                        onChange={handlePasswordChange}
                                        placeholder="Confirm your current password"
                                        className="formInput"
                                    />
                                </div>

                                <div className="formGroup">
                                    <label
                                        htmlFor="newPassword"
                                        className="formLabel"
                                    >
                                        New Password:
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={passwordForm.newPassword}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter your new password"
                                        className="formInput"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="submitBtn"
                                    disabled={passwordLoading}
                                >
                                    {passwordLoading ? "Changing..." : "Change Password"}
                                </button>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
