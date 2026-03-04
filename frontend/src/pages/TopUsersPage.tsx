import { useEffect, useState } from "react";
import { Card, Table, Skeleton, Stack, Text, Center } from "@mantine/core";
import { useApi } from "../api/useApi";

type TopUser = {
    user_name: string;
    total_time: number; // in seconds
};

const TopUsersPage = () => {
    const [users, setUsers] = useState<TopUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const api = useApi();

    useEffect(() => {
        const fetchTopUsers = async () => {
            setLoading(true);
            setError("");

            try {
                const { data } = await api.get("/leaderboard/top5");
                setUsers(data);
            } catch (err) {
                console.error("Failed to fetch top users:", err);
                setError("Nepodařilo se načíst data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTopUsers();
    }, [api]);

    if (error)
        return (
            <Center style={{ minHeight: "70vh" }}>
                <Text color="red">{error}</Text>
            </Center>
        );

    return (
        <Center style={{ minHeight: "70vh" }}>
            <Card style={{ width: 600, padding: 24 }}>
                <Text  w={700} size="xl" mb="md">
                    Top 5 uživatelů podle sledovaného času
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
                            <th>#</th>
                            <th>Uživatel</th>
                            <th>Celkový čas (min)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user.user_name}>
                                <td>{index + 1}</td>
                                <td>{user.user_name}</td>
                                <td>{Math.floor(user.total_time / 60)}</td>
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