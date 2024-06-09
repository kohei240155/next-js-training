import React, { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
};

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newUser, setNewUser] = useState<{ name: string; email: string }>({ name: '', email: ''});
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch(`http://localhost:8080/users`)
        .then(response => response.json())
        .then(data => {
            setUsers(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            setLoading(false);
        })
    };

    const handleAddUser = () => {
        fetch(`http://localhost:8080/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(response => response.json())
        .then(data => {
            setUsers([...users, data]);
            setNewUser({name: '', email: ''});
        })
        .catch(error => console.error('Error adding user:', error));
    };

    const handleUpdateUser = (id: number, updatedUser: User) => {
        fetch(`http://localhost:8080/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
        .then(response => response.json())
        .then(data => {
            setUsers(users.map(user => (user.id === id ? data : user)));
        })
        .catch(error => console.error('Error updating user:', error));
    };

    const handleDeleteUser = (id: number) => {
        fetch(`http://localhost:8080/users/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setUsers(users.filter(user => user.id != id));
        })
        .catch(error => console.error('Error deleting user:', error));
    };

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
                        <button onClick={() => setEditingUser(user)}>Update</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
            <input
                type="text"
                placeholder="Name"
                value={editingUser ? editingUser.name : newUser.name}
                onChange={(e) => editingUser
                    ? setEditingUser({ ...editingUser, name: e.target.value })
                    : setNewUser({ ...newUser, name: e.target.value })
                }
             />
             <input
                type="text"
                placeholder="Email"
                value={editingUser ? editingUser.email : newUser.email}
                onChange={(e) => editingUser
                    ? setEditingUser({ ...editingUser, email: e.target.value })
                    : setNewUser({ ...newUser, email: e.target.value })}
             />
             {editingUser ? (
                <button onClick={() => handleUpdateUser(editingUser.id, editingUser)}>Update User</button>
             ) : (
                <button onClick={handleAddUser}>Add User</button>
             )}
        </div>) ;
}

export default UserList;