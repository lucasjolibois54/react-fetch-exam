import React, { useState, useEffect } from 'react';

function FetchNoStyling() {
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
        setData([...data, jsonData]);
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
      <div>
        <div>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter a new item"
          />
          <button onClick={addNewItem}>Add Item</button>
        </div>
  
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                {item.title}
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  

export default FetchNoStyling;