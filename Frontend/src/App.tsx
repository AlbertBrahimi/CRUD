import  { useState } from 'react';
import { Table, Button } from 'antd';
import 'antd/dist/reset.css'; 
import UserModal from './components/UserModal';
import useUsers from './hooks/useUsers';
import './App.css';

interface User {
  id: number;
  name?: string;
  last_name?: string; 
  email?: string;
}

function App() {
  const { users, addUser, updateUser, deleteUser} = useUsers();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); 

  const handleAddUser = (newUser: User) => {
    addUser(newUser);
    setIsModalVisible(false);
    setSelectedUser(null);  
  };

  const handleUpdateUser = (updatedUser: User) => {
    updateUser(updatedUser);
    setIsModalVisible(false);
    setSelectedUser(null);  
  };

  const handleUpdate = (record: User) => {
    setSelectedUser(record);  
    setIsModalVisible(true);  
  };

  const handleDelete = (record: { id: number }) => {
    deleteUser(record.id);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <span>
          <Button type="link" onClick={() => handleUpdate(record)}>Update</Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className='wrapper'>
    <div className="App">
      <h1>Users</h1>
      <Button
        type="primary"
        onClick={() => {
          setSelectedUser(null); 
          setIsModalVisible(true); 
        }}
      >
        Add New User
      </Button>
     <Table columns={columns} dataSource={users} rowKey="id" />
      
      <UserModal
        visible={isModalVisible}
        onSave={selectedUser ? handleUpdateUser : handleAddUser}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedUser(null);
        }}
        initialValues={selectedUser || {}} 
      />
    </div>
    </div>

  );
}

export default App;
