import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
//   { id: 4, description: "Camera", quantity: 2, packed: false },
// ];


export default function App() {
    const [items, setItems] = useState([]);
    function hanldeAddItems(item){
      setItems((items)=>[...items, item] );
    }
  return (
    <div className="App">
      <Logo />
      <Form onAddItems={hanldeAddItems} />
      <PackingList items= {items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h2>🐣 Todo Buddy 🌴</h2>
}

function Form({onAddItems}) {
  // this gets the input values on change
  const [description,setDescription] = useState('');
    // this gets the select values on change
  const [select,setSelect] = useState(1);

  function handleSubmit(e){
    e.preventDefault();
    console.log(e)
    // this newItems gets the value of select and input items so we can add them to our packing list
    if(!description) {
      alert("Please enter item...");
      return;
    };
    const newItem = {description,select,packed:false,id:Date.now()};
    console.log(newItem);
    onAddItems(newItem);
    setDescription('');
    setSelect(1);
  }
  return <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do we need for the Trip?🤔</h3>
    <select value={select} onChange={(e)=>setSelect(Number(e.target.value))}>
      {/* using array.from method to dynamically setting 20 options instead of manually */}
      {Array.from({length:20},(_, i)=>i+1).map(num=><option value={num} key={num}>{num}</option>)}
    </select>
    <input type="text" placeholder="Search item..." value={description} onChange={(e)=>setDescription(e.target.value)}></input>
    <button>Add</button>
  </form>
}

function PackingList({items}) {
  return <div className="list"><ul>
    {items.map(item => <Item key={item.id} item={item} />)}
  </ul></div>
}
function Item({ item }) {
  return <li>
    {/* using ternary operater to set the class of packed items */}
    <span style={item.packed ? {textDecoration:'line-through'}:{}}>
    {item.select} {item.description}
    </span>
    <button>❌</button>
  </li>
}

function Stats() {
  return <footer className="stats">
    <em>You have X items remaining and Y items packed already</em>
  </footer>
}

