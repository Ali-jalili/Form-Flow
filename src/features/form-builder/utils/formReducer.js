/** @format */

function formReducer(state, action) {
  switch (action.type) {
    case "ADD_FIELD": {
      const newField = {
        id: crypto.randomUUID(),
        type: action.payload.type,
        label: "",
        required: false,
        order: state.fields.length + 1,
      };

      return { ...state, fields: [...state.fields, newField] };
    }

    case "DELETE_FIELD": {
      return {
        ...state,
        fields: state.fields.filter((item) => item.id !== action.payload.id),
      };
    }

    case "UPDATE_FIELD": {
      return {
        ...state,
        fields: state.fields.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, ...action.payload.changes };
          } else {
            return item;
          }
        }),
      };
    }

    case "SET_TITLE": {
      return { ...state, title: action.payload.title };
    }

    case "REORDER_FIELDS": {
      const newFields = [...state.fields];
      const [moved] = newFields.splice(action.payload.fromIndex, 1);
      newFields.splice(action.payload.toIndex, 0, moved);

      newFields.forEach((field, index) => (field.order = index + 1));
      return { ...state, fields: newFields };
    }
  }
}

export default formReducer;
