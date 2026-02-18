import { useEffect, useState } from "react";

export default function DailyTopics() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CMS_URL = "https://cms.shiksha.com";

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    `${CMS_URL}/api/daily-topics?populate=*`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await res.json();
                setTopics(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <div style={styles.center}>Loading...</div>;
    if (error) return <div style={styles.center}>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Daily Topics</h1>

            {topics.length === 0 && (
                <p>No topics found. Make sure entries are published.</p>
            )}

            {topics.map((topic) => {
                const attributes = topic.attributes;

                // If you have images
                const image =
                    attributes.image?.data?.attributes?.url;

                return (
                    <div key={topic.id} style={styles.card}>
                        <h2>{attributes.title}</h2>

                        {image && (
                            <img
                                src={`${CMS_URL}${image}`}
                                alt="topic"
                                style={styles.image}
                            />
                        )}

                        <p>{attributes.description}</p>
                    </div>
                );
            })}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
    },
    title: {
        textAlign: "center",
        marginBottom: "30px",
    },
    card: {
        background: "#f5f5f5",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "8px",
    },
    image: {
        width: "100%",
        maxHeight: "300px",
        objectFit: "cover",
        marginBottom: "15px",
    },
    center: {
        textAlign: "center",
        marginTop: "100px",
        fontSize: "18px",
    },
};
