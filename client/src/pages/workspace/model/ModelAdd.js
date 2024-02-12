import React, { useState } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { fetchCreateModel, } from "../../../actions/modelActions";
import { useParams, useNavigate } from "react-router-dom";
import workspaceUtils from "../../../utils/workspaceUtils";
import modelUtils from "../../../utils/modelUtils";

function ModelAdd() {
  // Input
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [modelFields, setModelFields] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState();
  const [editType, setEditType] = useState();
  const [editLength, setEditLength] = useState();
  const [editDefaultValue, setEditDefaultValue] = useState();
  const [editAutoIncrement, setEditAutoIncrement] = useState();

  const [selectedMethods, setSelectedMethods] = useState([]);

  const dispatch = useDispatch();
  const { projectName } = useParams();
  const navigate = useNavigate();

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

  const handleAddField = (e) => {
    e.preventDefault();
    const { name, type, lengths, defaultValue, autoIncrement } =
      e.target.elements;
    const newField = {
      id: modelFields.length,
      name: name.value,
      type: type.value,
      length: lengths.value || null,
      default_value: defaultValue.value || null,
      auto_increment: autoIncrement.checked,
    };
    setModelFields([...modelFields, newField]);
    e.target.reset();
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

  const handleCancelEditField = () => {
    resetEditState();
  };

  const resetEditState = () => {
    setEditIndex(null);
    setEditName(null);
    setEditType(null);
    setEditLength(null);
    setEditDefaultValue(null);
    setEditAutoIncrement(false);
  };

  const handleDeleteField = (id) => {
    const indexToDelete = modelFields.findIndex((field) => field.id === id);
    if (indexToDelete !== -1) {
      setModelFields((prevFields) => [
        ...prevFields.slice(0, indexToDelete),
        ...prevFields.slice(indexToDelete + 1),
      ]);
    }
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
      fetchCreateModel(
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
        <span className="font-bold">Create</span>
      </div>
      <div className="font-bold title flex w-full items-center mt-3">
        <h1 className="text-xl whitespace-nowrap">Create Models</h1>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="font-bold title flex w-full items-center mt-3">
        <h1 className="text-xl whitespace-nowrap">Field List</h1>
        <hr className="w-full border-gray-400 ml-5" />
      </div>
      <div className="field-list">
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
                <th className="bg-primary-900 text-white p-2 border">AI</th>
                <th className="bg-primary-900 text-white p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {modelFields.map((field, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 border">
                    {`${editIndex}` === `${field.id}` ? (
                      <input
                        name="edit-name"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      field.name
                    )}
                  </td>
                  <td className="p-2 border">
                    {`${editIndex}` === `${field.id}` ? (
                      <select
                        name="edit-type"
                        defaultValue={editType}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
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
                    {`${editIndex}` === `${field.id}` ? (
                      <input
                        name="edit-length"
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={editLength || ""}
                        onChange={(e) => setEditLength(e.target.value)}
                      />
                    ) : (
                      field.length || "-"
                    )}
                  </td>
                  <td className="p-2 border">
                    {`${editIndex}` === `${field.id}` ? (
                      <input
                        name="edit-defaultValue"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={editDefaultValue || ""}
                        onChange={(e) => setEditDefaultValue(e.target.value)}
                      />
                    ) : (
                      field.default_value || "-"
                    )}
                  </td>
                  <td className="p-2 border">
                    {`${editIndex}` === `${field.id}` ? (
                      <input
                        name="edit-auto_increment"
                        type="checkbox"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        defaultChecked={editAutoIncrement}
                        onChange={(e) => setEditAutoIncrement(e.target.checked)}
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
                  <td className="p-2">
                    <div className="flex justify-evenly">
                      {`${editIndex}` === `${field.id}` ? (
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
                            onClick={() => handleCancelEditField()}
                          />
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon
                            icon={icon({
                              name: "pen-to-square",
                              style: "solid",
                            })}
                            className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-orange-500 hover:text-orange-700"
                            onClick={() => handleEditField(field.id)}
                          />
                          <FontAwesomeIcon
                            icon={icon({
                              name: "trash",
                              style: "solid",
                            })}
                            className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteField(field.id)}
                          />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {/* Add Area */}
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

      <div className="font-bold title flex w-full items-center mt-3">
        <h1 className="text-xl whitespace-nowrap">Generate flow</h1>
        <hr className="w-full border-gray-400 ml-5" />
      </div>
      <div className="flex mt-6 flex-wrap gap-6 items-start mb-auto">
        <div className="group border flex items-center gap-x-3 p-3 relative rounded-md min-w-[12rem]">
          <div className="title font-bold text-gray-600 absolute -top-3 left-3 whitespace-nowrap bg-white px-2">
            Retrieve methods
          </div>
          <div className="check-list ml-3 flex flex-col">
            <div className="group flex gap-x-3">
              <input
                type="checkbox"
                id="find_all"
                onChange={() => handleCheckboxChange("find all")}
              />
              <label htmlFor="find_all" className="block text-md text-left">
                Find all
              </label>
            </div>
          </div>
        </div>
        <div className="group border flex items-center gap-x-3 p-3 relative rounded-md min-w-[12rem]">
          <div className="title font-bold text-gray-600 absolute -top-3 left-3 whitespace-nowrap bg-white px-2">
            Create methods
          </div>
          <div className="check-list ml-3 flex flex-col">
            <div className="group flex gap-x-3">
              <input
                type="checkbox"
                id="insert_all"
                onChange={() => handleCheckboxChange("insert all")}
              />
              <label htmlFor="insert_all" className="block text-md text-left">
                insert Data
              </label>
            </div>
          </div>
        </div>
        <div className="group border flex items-center gap-x-3 p-3 relative rounded-md min-w-[12rem]">
          <div className="title font-bold text-gray-600 absolute -top-3 left-3 whitespace-nowrap bg-white px-2">
            Delete methods
          </div>
          <div className="check-list ml-3 flex flex-col">
            <div className="group flex gap-x-3">
              <input
                type="checkbox"
                id="delete_one"
                onChange={() => handleCheckboxChange("delete one")}
              />
              <label htmlFor="delete_one" className="block text-md text-left">
                Delete one
              </label>
            </div>
            <div className="group flex gap-x-3">
              <input
                type="checkbox"
                id="delete_all"
                onChange={() => handleCheckboxChange("delete all")}
              />
              <label htmlFor="delete_all" className="block text-md text-left">
                Delete all
              </label>
            </div>
          </div>
        </div>
        <div className="group border flex items-center gap-x-3 p-3 relative rounded-md min-w-[12rem]">
          <div className="title font-bold text-gray-600 absolute -top-3 left-3 whitespace-nowrap bg-white px-2">
            Update methods
          </div>
          <div className="check-list ml-3 flex flex-col">
            <div className="group flex gap-x-3">
              <input
                type="checkbox"
                id="update"
                onChange={() => handleCheckboxChange("update")}
              />
              <label htmlFor="update" className="block text-md text-left">
                Update
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="action flex gap-x-8 justify-end mb-5 mt-8">
        <button className="text-gray-500 rounded-md px-3 py-2 text-lg text-md text-center border border-gray-500 w-32 duration-100 hover:bg-gray-700 hover:text-white hover:border-gray-700">
          <span>Cancel</span>
        </button>
        <button
          className="bg-primary-900 text-white rounded-md px-3 py-2 text-lg text-md text-center w-32 duration-100 hover:bg-primary-700"
          type="submit"
          onClick={() => handleSaveModel()}
        >
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}

export default ModelAdd;
