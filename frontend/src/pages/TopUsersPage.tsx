import { useEffect, useState } from "react";
import { Card, Table, Skeleton, Stack, Text, Center } from "@mantine/core";
import { useApi } from "../api/useApi";

type LeaderboardItem = {
    video_name: string;
    top_student_name: string;
    total_seconds: number;
    formatted_time: string;
};

const TopUsersPage = () => {
    const [items, setItems] = useState<LeaderboardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const api = useApi();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            setError("");

            try {
                const { data } = await api.get("/leaderboard");
                setItems(data);
            } catch (err) {
                console.error("Failed to fetch leaderboard:", err);
                setError("Nepodařilo se načíst data.");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [api]);

    if (error)
        return (
            <Center style={{ minHeight: "70vh" }}>
                <Text c="red">{error}</Text>
            </Center>
        );

    return (
        <Center style={{ minHeight: "70vh" }}>
            <Card style={{ width: 700, padding: 24 }}>
                <Text fw={700} size="xl" mb="md">
                    Nejlepší studenti podle videí
                </Text>

                {loading ? (
                    <Stack gap="sm">
                        <Skeleton height={30} radius="sm" />
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} height={25} radius="sm" />
                        ))}
                    </Stack>
                ) : (
                    <Table striped highlightOnHover>
                        <thead>
                        <tr>
                            <th>Video</th>
                            <th>Student</th>
                            <th>Čas sledování</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.video_name}</td>
                                <td>{item.top_student_name}</td>
                                <td>{item.formatted_time}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
            </Card>
        </Center>
    );
};

export default TopUsersPage;