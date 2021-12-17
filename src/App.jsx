import { useState } from "react";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    deleteIncompleteTodo(index);
  };

  const onClickComplete = (index) => {
    const newTodos = [...completedTodos, incompleteTodos[index]];
    setCompletedTodos(newTodos);
    deleteIncompleteTodo(index);
  };

  const deleteIncompleteTodo = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickReturn = (index) => {
    const newTodos = [...incompleteTodos, completedTodos[index]];
    setIncompleteTodos(newTodos);
    deleteCompletedTodo(index);
  };

  const deleteCompletedTodo = (index) => {
    const newTodos = [...completedTodos];
    newTodos.splice(index, 1);
    setCompletedTodos(newTodos);
  };

  return (
    <>
      <div className="input_area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>入力</button>
      </div>
      <div className="incomplete_area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <li key={todo}>
                <div className="list_row">
                  <p className="list_item">{todo}</p>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="completed_area">
        <p className="title">完了したTODO</p>
        <ul>
          {completedTodos.map((todo, index) => {
            return (
              <li key={todo}>
                <div className="list_row">
                  <p className="list_item">{todo}</p>
                  <button onClick={() => onClickReturn(index)}>戻す</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default App;
