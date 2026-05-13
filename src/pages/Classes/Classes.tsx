import { useEffect, useState } from "react";
import "./Classes.css";

type Groep = {
    id: string;
    naam: string;
    instructeur: string;
};

export default function Classes() {
    const [groepen, setGroepen] = useState<Groep[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchGroepen() {
        try {
            setLoading(true);
            setError("");

            // Nginx-proxied API route
            const res = await fetch("/api/user/groep", {
                method: "GET",
                headers: { Accept: "application/json" },
                // Only enable if your auth uses cookies and Nginx passes them through
                // credentials: "include",
            });

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`HTTP ${res.status} ${res.statusText}: ${text.slice(0, 120)}`);
            }

            const data = (await res.json()) as Groep[];
            setGroepen(Array.isArray(data) ? data : []);
        } catch (e: any) {
            setError(e?.message ?? "Failed to fetch groups.");
            setGroepen([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGroepen();
    }, []);

    return (
        <div className="classesPage">
            <h1 className="title">Groups</h1>

            {loading && <div className="muted">Loading…</div>}
            {error && <div className="error">{error}</div>}

            {!loading && !error && (
                <ul className="list">
                    {groepen.map((g) => (
                        <li className="listItem" key={g.id}>
                            <div>
                                <div className="listTitle">{g.naam}</div>
                                <div className="listMeta">Instructor: {g.instructeur || "(none)"}</div>
                            </div>
                            <div className="listMeta">{g.id}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
