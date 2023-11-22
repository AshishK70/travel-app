const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
  { id: 4, description: "Camera", quantity: 2, packed: false },
];


export default function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h2>🐣Travel Buddy 🌴</h2>
}

function Form() {
  function handleSubmit(e){
    e.preventDefault();
    console.log(e)
  }
  return <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do we need for the Trip?🤔</h3>
    <select>
      {/* <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option> */}
      {/* using array.from method to dynamically setting 20 options instead of manually */}
      {Array.from({length:20},(_, i)=>i+1).map(num=><option value={num} key={num}>{num}</option>)}
    </select>
    <input type="text" placeholder="Search item..."></input>
    <button>Add</button>
  </form>
}

function PackingList() {
  return <div className="list"><ul>
    {initialItems.map(item => <Item key={item.id} item={item} />)}
  </ul></div>
}
function Item({ item }) {
  return <li>
    {/* using ternary operater to set the class of packed items */}
    <span style={item.packed ? {textDecoration:'line-through'}:{}}>
    {item.quantity} {item.description}
    </span>
    <button>❌</button>
  </li>
}

function Stats() {
  return <footer className="stats">
    <em>You have X items remaining and Y items packed already</em>
  </footer>
}

