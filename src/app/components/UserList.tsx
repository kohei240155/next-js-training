
interface User {
    id: number;
    name: string;
    email: string;
}

import React, { useEffect, useState } from 'react'

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('http://localhost:8080/users')
        .then(response => response.json())
        .then(data => {
            setUsers(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList