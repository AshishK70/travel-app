import React, { useState } from "react";

export default function App() {
  // handle items count 
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  //  delete items
  function handleDeleteItems(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // update checkbox values
  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItems}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h2><span role="img" aria-label="emoji">🐣</span> Todo Buddy <span role="img" aria-label="emoji">🌴</span></h2>;
}

function Form({ onAddItems }) {
  // this gets the input values on change
  const [description, setDescription] = useState("");
  // this gets the select values on change
  const [select, setSelect] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e)
    // this newItems gets the value of select and input items so we can add them to our packing list
    if (!description) {
      alert("Please enter item...");
      return;
    }
    const newItem = {
      description,
      select,
      packed: false,
      id: Date.now(),
    };
    // console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setSelect(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do we need <span role="img" aria-label="emoji">🤔</span></h3>
      <select
        value={select}
        onChange={(e) => setSelect(Number(e.target.value))}
      >
        {/* using array.from method to dynamically setting 20 options instead of manually */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDeleteItems, onToggleItems }) {
  return (
    <li>
      {/* using ternary operater to set the class of packed items */}
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItems(item.id);
        }}
      />
      <span
        style={
          item.packed
            ? { textDecoration: "line-through" }
            : {}
        }
      >
        {item.select} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  // const numItems  = items.length;
  return (
    <footer className="stats">
      <em>
        You have X items remaining and Y items packed already
        <span role="img" aria-label="emoji">📦</span>
      </em>
    </footer>
  );
}
