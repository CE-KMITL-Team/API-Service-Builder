import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  fetchGetModelDetail,
  ferchEditModel,
} from "../../../actions/modelActions";
import modelUtils from "../../../utils/modelUtils";
import workspaceUtils from "../../../utils/workspaceUtils";

function ModelEdit() {
  const [modelFields, setModelFields] = useState([]);
  const [editingModel, setEditingModel] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  console.log("editIndex", editIndex);
  const [editName, setEditName] = useState();
  const [editType, setEditType] = useState();
  const [editLength, setEditLength] = useState();
  const [editDefaultValue, setEditDefaultValue] = useState();
  const [editAutoIncrement, setEditAutoIncrement] = useState();

  const [selectedMethods, setSelectedMethods] = useState([]);

  const navigate = useNavigate();
  const { projectName } = useParams();

  const [idParam, setIdParam] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();

  // Add a new empty field to the modelFields
  const handleAddField = (e) => {
    e.preventDefault();
    const newName = e.target.elements.name.value;
    const newType = e.target.elements.type.value;
    const newLength = e.target.elements.lengths.value;
    const newDefaultValue = e.target.elements.defaultValue.value;
    const newAutoIncrement = e.target.elements.autoIncrement.checked;

    e.target.elements.name.value = "";
    e.target.elements.lengths.value = "";
    e.target.elements.defaultValue.value = "";
    e.target.elements.autoIncrement.checked = false;

    const newField = {
      name: newName,
      type: newType,
      length: newLength || null,
      default_value: newDefaultValue || null,
      auto_increment: newAutoIncrement,
    };

    setModelFields([...modelFields, newField]);
  };

  // Edit the field
  // const handleEditField = (index) => {
  //   setEditingModel(modelFields[index]);
  //   // console.log("Edit field at index:", index);
  // };

  const handleCheckboxChange = (method) => {
    // Check if the method is already selected
    if (selectedMethods.includes(method)) {
      // If selected, remove it from the list
      setSelectedMethods(selectedMethods.filter((m) => m !== method));
    } else {
      // If not selected, add it to the list
      setSelectedMethods([...selectedMethods, method]);
    }
  };

  const handleEditField = (id) => {
    const fieldToEdit = modelFields.find((field) => field.id === id);
    if (fieldToEdit) {
      setEditIndex(id);
      setEditName(fieldToEdit.name);
      setEditType(fieldToEdit.type);
      setEditLength(fieldToEdit.length || null);
      setEditDefaultValue(fieldToEdit.default_value || null);
      setEditAutoIncrement(fieldToEdit.auto_increment);
    }
  };

  const handleSaveEditField = () => {
    const index = modelFields.findIndex((field) => field.id === editIndex);
    if (index !== -1) {
      const newField = {
        id: editIndex,
        name: editName,
        type: editType,
        length: editLength || null,
        default_value: editDefaultValue || null,
        auto_increment: editAutoIncrement,
      };
      modelFields[index] = newField;
      resetEditState();
    }
  };

  const resetEditState = () => {
    setEditIndex(null);
    setEditName(null);
    setEditType(null);
    setEditLength(null);
    setEditDefaultValue(null);
    setEditAutoIncrement(false);
  };

  const handleCancelEdit = () => {
    resetEditState();
  };

  const handleSaveModel = async () => {
    const cleanedModelFields = modelFields.map((field) => {
      // Use object destructuring to create a copy of the field without the "id" key
      const { id, ...cleanedField } = field;

      // Use Object.fromEntries to filter out keys with null values
      const filteredField = Object.fromEntries(
        Object.entries(cleanedField).filter(([_, value]) => value !== null)
      );

      return filteredField;
    });

    const response = await dispatch(
      ferchEditModel(
        workspaceUtils.getID(),
        name,
        description,
        cleanedModelFields,
        selectedMethods
      )
    );
    if (response) {
      navigate(`/workspace/${projectName}/model/${name}`);
    } else {
      alert("Can't add model.");
    }
  };

  // Remove the field
  const handleDeleteField = (index) => {
    const updatedFields = [...modelFields];
    updatedFields.splice(index, 1);
    setModelFields(updatedFields);
  };

  const handleEditFieldChange = (e, index, fieldKey) => {
    const updatedFields = [...modelFields];
    updatedFields[index][fieldKey] = e.target.value;
    setModelFields(updatedFields);
  };

  async function initState(id) {
    try {
      const data = await dispatch(fetchGetModelDetail(id));

      if (data.status === true) {
        setModelFields(data.data.tables);
      } else {
        setModelFields([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // const handleSaveField = async (index) => {
  //   const newData = { ...modelFields[index], ...editingModel };
  //   try {
  //     await dispatch(ferchEditModel(idParam, newData));
  //     console.log("Save field at index:", idParam, newData);
  //     setEditingModel(null);
  //   } catch (error) {
  //     console.error("Error editing data:", error);
  //   }
  // };

  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await Promise.all(
  //       modelFields.map((field, index) => handleSaveField(index))
  //     );
  //     console.log("Edit submitted successfully");
  //   } catch (error) {
  //     console.error("Error submitting edit:", error);
  //   }
  // };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    initState(id);
    setIdParam(id);
  }, [location]);

  return (
    <div className="p-5 pl-10 pr-20 flex-1 flex flex-col h-screen overflow-auto">
      <div className="navigator flex justify-start items-center gap-x-3">
        <span className="text-gray-500">Models</span>
        <FontAwesomeIcon
          icon={icon({
            name: "caret-right",
            style: "solid",
          })}
          className="text-gray-500"
        />
        <span className="font-bold">Edit</span>
      </div>
      <div className="font-bold title flex w-full items-center mt-3">
        <h1 className="text-xl whitespace-nowrap">Edit Models</h1>
        <hr className="w-full border-gray-400 ml-5" />
      </div>
      <div className="group flex gap-x-5 mt-3">
        <div className="group w-full">
          <label
            htmlFor="model_name"
            className="block mb-2 text-md font-medium text-gray-900 text-left"
          >
            Model Name
          </label>
          <input
            type="text"
            id="model_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="User"
            required
          />
        </div>
        <div className="group w-full">
          <label
            htmlFor="description"
            className="block mb-2 text-md font-medium text-gray-900 text-left"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="This model for user data"
            required
          />
        </div>
      </div>
      <div className="font-bold title flex w-full items-center mt-3">
        <h1 className="text-xl whitespace-nowrap">Field List</h1>
        <hr className="w-full border-gray-400 ml-5" />
      </div>
      <div className="field-list">
        {/* {modelFields} */}
        <form onSubmit={handleAddField}>
          <table className="w-full border border-collapse mt-2">
            <thead>
              <tr>
                <th className="bg-primary-900 text-white p-2 border">Name</th>
                <th className="bg-primary-900 text-white p-2 border">Type</th>
                <th className="bg-primary-900 text-white p-2 border">Length</th>
                <th className="bg-primary-900 text-white p-2 border">
                  Default Value
                </th>
                <th className="bg-primary-900 text-white p-2 border">PK</th>
                <th className="bg-primary-900 text-white p-2 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {modelFields.map((field, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 border">
                    {editIndex === field.id  ? (
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Name"
                        name="edit-name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      field.name
                    )}
                  </td>
                  <td className="p-2 border">
                    {editIndex === field.id ? (
                      <select
                        name="type"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        defaultValue={editType}
                        onChange={(e) => setEditType(e.target.value)}
                      >
                        <option value="string">string</option>
                        <option value="number">number</option>
                        <option value="float">float</option>
                        <option value="date">date</option>
                      </select>
                    ) : (
                      field.type
                    )}
                  </td>
                  <td className="p-2 border">
                    {editIndex === field.id  ? (
                      <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        name="edit-length"
                        value={editLength || ""}
                        onChange={(e) => setEditLength(e.target.value)}
                      />
                    ) : (
                      field.length || "-"
                    )}
                  </td>
                  <td className="p-2 border">
                    {editIndex === field.id  ? (
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        name="edit-defaultValue"
                        value={editDefaultValue || ""}
                        onChange={(e) => setEditDefaultValue(e.target.value)}
                      />
                    ) : (
                      field.default_value
                    )}
                  </td>
                  <td className="p-2 border">
                    {editIndex === field.id  ? (
                      <input
                        type="checkbox"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        name="edit-auto_increment"
                        value={field.auto_increment}
                        defaultChecked={editAutoIncrement}
                        onChange={(e) => setEditAutoIncrement(e.target.checked)}
                        required
                        disabled
                      />
                    ) : (
                      <input
                        type="checkbox"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        defaultChecked={field.auto_increment}
                        disabled
                      />
                    )}
                  </td>

                  {/* <td className="p-2 border">{field.name}</td>
                  <td className="p-2 border">{field.type}</td>
                  <td className="p-2 border">{field.length || "-"}</td>
                  <td className="p-2 border">{field.default_value || "-"}</td>
                  <td className="p-2 border">
                    <input
                      type="checkbox"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      defaultChecked={field.auto_increment}
                      disabled
                    />
                  </td> */}
                  <td className="p-2">
                    <div className="flex justify-evenly">
                      {editIndex === field.id  ? (
                        <>
                          <FontAwesomeIcon
                            icon={icon({
                              name: "save",
                              style: "solid",
                            })}
                            className="scale-110 ml-2 opacity-90 cursor-pointer duration-75 text-primary-700 hover:text-primary-900"
                            onClick={() => handleSaveEditField()}
                          />
                          <FontAwesomeIcon
                            icon={icon({
                              name: "xmark",
                              style: "solid",
                            })}
                            className="scale-125 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
                            onClick={() => handleCancelEdit()}
                          />
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon
                            icon={icon({
                              name: "pen-to-square",
                              style: "solid",
                            })}
                            onClick={() => handleEditField(field.id)}
                            className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-orange-500 hover:text-orange-700"
                          />
                          <FontAwesomeIcon
                            icon={icon({
                              name: "trash",
                              style: "solid",
                            })}
                            onClick={() => handleDeleteField(field.id)}
                            className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
                          />
                        </>
                      )}
                    </div>
                  </td>
                  {/* <td className="p-2">
                    <div className="flex justify-evenly">
                      <FontAwesomeIcon
                        icon={icon({
                          name: "pen-to-square",
                          style: "solid",
                        })}
                        className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-orange-500 hover:text-orange-700"
                        onClick={() => handleEditField(index)}
                      />
                      <FontAwesomeIcon
                        icon={icon({
                          name: "trash",
                          style: "solid",
                        })}
                        className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteField(index)}
                      />
                    </div>
                  </td> */}
                </tr>
              ))}
              <tr className="border-t">
                <td className="p-2 border">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Name"
                    name="name"
                    required
                  />
                </td>
                <td className="p-2 border">
                  <select
                    name="type"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="float">float</option>
                    <option value="date">date</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Length"
                    name="lengths"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Default Value"
                    name="defaultValue"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    name="autoIncrement"
                  />
                </td>
                <td className="p-2 border text-center">
                  <button className="bg-primary-900 text-white hover:bg-primary-700 rounded-md px-3 py-2 text-lg text-md flex items-center justify-center w-full">
                    <FontAwesomeIcon
                      icon={icon({
                        name: "plus",
                        style: "solid",
                      })}
                      className="text-md mr-2"
                    />
                    <span>Add</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div className="action flex gap-x-8 justify-end mb-5 mt-8">
        <button className="text-gray-500 rounded-md px-3 py-2 text-lg text-md text-center border border-gray-500 w-32 duration-100 hover:bg-gray-700 hover:text-white hover:border-gray-700">
          <span>Cancel</span>
        </button>
        <button
          className="bg-primary-900 text-white rounded-md px-3 py-2 text-lg text-md text-center w-32 duration-100 hover:bg-primary-700"
          type="submit"
          onClick={handleSaveModel}
        >
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}

export default ModelEdit;
