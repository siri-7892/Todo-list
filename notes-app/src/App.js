import React, { useState } from 'react';

const App = () => {
  const [categories, setCategories] = useState(["All", "Work", "Personal"]);

  const [notes, setNotes] = useState([
    { content: "Meeting at 10 AM", category: "All", ticked: false, completed: false, color: "white" },
    { content: "Grocery shopping", category: "All", ticked: false, completed: false, color: "white" },
    { content: "Project deadline", category: "All", ticked: false, completed: false, color: "white" },
  ]);

  const [new_cat, setnew_cat] = useState("");
  const [new_note, setnew_note] = useState("");
  const [currentCategory, setcurrentCategory] = useState("All");
  const colors = ["white", "gold", "blue", "pink", "plum"];

  const handleNewCat = () => {
    if (new_cat.trim() !== "") {
      setCategories([...categories, new_cat.trim()]);
      setnew_cat("");
    }
  };

  const handleNewNote = () => {
    if (new_note.trim() !== "") {
      setNotes([
        ...notes,
        {
          content: new_note.trim(),
          category: currentCategory,
          ticked: false,
          completed: false,
          color: "white",
        },
      ]);
      setnew_note("");
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const Tick_box = (index) => {
    const updated = [...notes];
    updated[index].completed = !updated[index].completed;
    setNotes(updated);
  };

  const Ticked = (index) => {
    const updated = [...notes];
    updated[index].ticked = !updated[index].ticked;
    setNotes(updated);
  };

  const changeCategory = (index, newCategory) => {
    const updated = [...notes];
    updated[index].category = newCategory;
    setNotes(updated);
  };

  const changeColor = (index, newColor) => {
    const updated = [...notes];
    updated[index].color = newColor;
    setNotes(updated);
  };

  const filteredNotes =
    currentCategory === "All"
      ? notes
      : notes.filter((n) => n.category === currentCategory);

  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
      <div className="w-1/4 border-box">
        <h3>Categories</h3>
        <input
          type="text"
          placeholder="Insert new category"
          value={new_cat}
          onChange={(e) => setnew_cat(e.target.value)}
          style={{height: "20px"}}
        />
        <button onClick={handleNewCat}>
          <img src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png" alt="Submit" style={{height: "18px"}}/>
        </button>

        <div style={{ display: "flex", flexDirection: "column", width: "100px", padding: "10px"}}>
          {categories.map((cat, i) => (
            <button
              onClick={() => setcurrentCategory(cat)}
              key={i}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="w-3/4 border-box">
        <p className="font-bold">Notes</p>
        <input
          type="text"
          placeholder="Add your note here"
          value={new_note}
          onChange={(e) => setnew_note(e.target.value)}
        />
        <button onClick={handleNewNote}>
          <img src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png" alt="Submit" style={{height: "18px"}}/>
        </button>

        <div>
          {filteredNotes.map((note, i) => (
            <div key={i} style={{ backgroundColor: note.color }}>
                {
                  note.ticked && note.completed && (
                    <p>Completed Tasks</p>
                  )
                }
              <div className="flex">
                {note.ticked && (
                  <label>
                    <input
                      type="checkbox"
                      checked={note.completed}
                      onChange={() => Tick_box(i)}
                    />
                  </label>
                )}
                <span
                  style={{ textDecoration: note.ticked && note.completed ? "line-through" : "none" }}
                  className="font-medium"
                >
                  {note.content}
                </span>
              </div>

              <div className="flex">
                <button onClick={() => deleteNote(i)}>
                  🗑️
                </button>
                <button onClick={() => Ticked(i)}>Tick</button>

                <select
                  value={note.category}
                  onChange={(e) => changeCategory(i, e.target.value)}
                >
                  {categories.map((c, j) => (
                    <option key={j} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  value={note.color}
                  onChange={(e) => changeColor(i, e.target.value)}
                >
                  {colors.map((c, j) => (
                    <option key={j} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
