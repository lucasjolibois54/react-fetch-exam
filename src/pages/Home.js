import React, { useState, useEffect } from 'react';

function Home() {
    const [data, setData] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    const addNewItem = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newItem,
            body: 'Lorem ipsum dolor sit amet.',
            userId: 1,
          }),
        });
        if (!response.ok) {
          throw new Error('Error adding new item');
        }
        const jsonData = await response.json();
        setData([jsonData, ...data]);
        setNewItem('');
      } catch (error) {
        console.error('Error adding new item:', error);
      }
    };

  
    const deleteItem = async (id) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error deleting item');
        }
        const filteredData = data.filter((item) => item.id !== id);
        setData(filteredData);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };
  
    return (
<div className="max-w-6xl mx-auto px-5">
<h1 className="text-3xl lg:text-5xl text-center font-bold mt-16 mb-16">React Fetch</h1>
  <div className="flex mb-10">
    <input
      className="border rounded-l py-2 px-4 w-full"
      type="text"
      value={newItem}
      onChange={(e) => setNewItem(e.target.value)}
      placeholder="Enter a new item"
    />
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
      onClick={addNewItem}
    >
      Add Item
    </button>
  </div>

  {loading ? (
    <p>Loading data...</p>
  ) : (
    <ul className="mt-4">
      {data.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between py-2 border-b"
        >
        <div className='flex flex-col'>
        <p className="font-bold">{item.title}</p>
        <p className='w-5/6'>{item.body}</p>
        </div>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteItem(item.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

    );
  };
  

export default Home