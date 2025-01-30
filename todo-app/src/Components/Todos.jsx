import { MdDelete } from "react-icons/md";


export function Todos({ todos,setTodos }) {
    
    function markTodoCompleted(id) {
        fetch("http://localhost:3000/completed", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
        .then(() => {
            setTodos((prevTodos) =>
                prevTodos.map(todo =>
                    todo._id === id ? { ...todo, completed: true } : todo
                )
            );
        })
        .catch(error => console.error("Error updating todo:", error));
    }

    function deleteTodo(id){
        fetch("http://localhost:3000/del-todos",{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        }).then(()=>{
            setTodos(prevTodos=>prevTodos.filter(todo=>todo._id!==id));
        })
        .catch(error => console.error("Error updating todo:", error))
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {todos.map((todo) => (
                <div 
                    key={todo._id} 
                    className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-transform transform hover:scale-105"
                >   
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-gray-800">{todo.title}</h1>
                        <MdDelete size="25" className="text-red-700" onClick={()=>deleteTodo(todo._id)}/>
                    </div>
                    <h2 className="text-gray-600 mt-2">{todo.description}</h2>
                    <button 
                        className={`mt-4 px-4 py-2 rounded-lg text-white font-medium ${
                            todo.completed 
                                ? "bg-green-500 hover:bg-green-600" 
                                : "bg-blue-500 hover:bg-blue-600"
                        } transition duration-200`}
                        onClick={()=>markTodoCompleted(todo._id)}
                    >
                        {todo.completed ? "Completed" : "Mark as Complete"}
                    </button>
                </div>
            ))}
        </div>
    );
}
