import { useEffect, useState } from "react";
import "./Profile.css";

type Profile = {
    username: string;
    email: string;
    role: string;
};

export default function Profile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            try {
                setLoading(true);
                setError("");
                const res = await fetch("/api/account/me", {
                    headers: { Accept: "application/json" },
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = (await res.json()) as Profile;
                setProfile(data);
            } catch (e: any) {
                setError(e?.message ?? "Failed to fetch profile.");
                setProfile(null);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    return (
        <div className="profilePage">
            <h1 className="profileTitle">
                {profile?.username ? `${profile.username}` : "Profile"}
            </h1>
            {loading && <div className="profileLoading">Loading…</div>}
            {error && <div className="profileError">{error}</div>}

            {!loading && !error && profile && (
                <div className="profileBlock">
                    <div className="profileRow">
                        <span className="profileLabel">Username:</span>
                        <span className="profileValue">{profile.username}</span>
                    </div>
                    <div className="profileRow">
                        <span className="profileLabel">Email:</span>
                        <span className="profileValue">{profile.email}</span>
                    </div>
                    <div className="profileRow">
                        <span className="profileLabel">Role:</span>
                        <span className="profileValue">{profile.role}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
