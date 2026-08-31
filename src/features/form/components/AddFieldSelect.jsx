/** @format */

function AddFieldSelect({ onAddField }) {
  function handleChange(event) {
    const type = event.target.value;

    if (type === "Add Field...") return;

    onAddField(type);

    event.target.value = "Add Field...";
  }

  return (
    <select
      defaultValue="Add Field..."
      onChange={handleChange}
      className="w-full appearance-none bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 hover:border-indigo-400 rounded-xl px-5 py-3.5 text-sm font-medium text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
    >
      <option value="Add Field...">+ Add Field...</option>
      <option value="short_text">📝 Short Text</option>
      <option value="long_text">📄 Long Text</option>
      <option value="multiple_choice">☑️ Multiple Choice</option>
    </select>
  );
}

export default AddFieldSelect;
