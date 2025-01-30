import { useEffect, useState } from "react";
import { Todos } from "./Components/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  // Function to fetch todos
  const fetchTodos = () => {
    fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        setTodos(json.todos);
      })
      .catch(error => console.error("Error fetching todos:", error));
  };

  // Fetch todos once when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to add a new todo
  const addTodo = () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description cannot be empty!");
      return;
    }

    fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description,
      })
    })
      .then(async (res) => {
        const json = await res.json();
        alert("Todo Added");

        // Clear input fields after adding
        setTitle("");
        setDescription("");

        // Fetch updated todos
        fetchTodos();
      })
      .catch(error => console.error("Error adding todo:", error));
  };

  return (
    <>
      <div className="min-h-screen flex md:flex-row flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4 md:pt-[100px] md:pb-[100px]">
        <div className="glass-effect shadow-xl rounded-lg p-8  md:w-1/3 w-full max-w-sm flex flex-col gap-6 items-center">
          <h1 className="text-white text-4xl font-bold">Create Todo</h1>
          
          {/* Title Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="todo-title" className="text-white font-medium">
              Title
            </label>
            <input
              id="todo-title"
              type="text"
              placeholder="Enter title here"
              value={title}
              className="mt-2 p-3 w-full bg-white/10 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col w-full">
            <label htmlFor="todo-description" className="text-white font-medium">
              Description
            </label>
            <textarea
              id="todo-description"
              placeholder="Enter description here"
              value={description}
              className="mt-2 p-3 w-full bg-white/10 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Create Todo Button */}
          <button
            className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition"
            onClick={addTodo}
          >
            Create Todo
          </button>
        </div>

        {/* Todos List */}
        <div className="flex">
          <Todos todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </>
  );
}

export default App;
