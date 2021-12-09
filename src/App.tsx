import { Routes, Route } from "react-router-dom";

import { ToDoList, NotFound } from "src/pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
