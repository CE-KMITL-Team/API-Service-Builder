import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  fetchGetModelDetail,
  fetchEditModel,
} from "../../../actions/modelActions";

import modelUtils from "../../../utils/modelUtils";
import workspaceUtils from "../../../utils/workspaceUtils";

function ModelEdit() {
  const [modelFields, setModelFields] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editIndex, setEditIndex] = useState(null);

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

    if (modelFields.some((field) => field.name === newName)) {
      alert("Field name already exists. Please choose a different name.");
      return;
    }

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
    e.target.reset();
  };

  const handleEditField = (id) => {
    if (id !== "id") {
      const fieldToEdit = modelFields.find((field) => field.name === id);
      if (fieldToEdit) {
        setEditIndex(id);
        setEditName(fieldToEdit.name);
        setEditType(fieldToEdit.type);
        setEditLength(fieldToEdit.length || "");
        setEditDefaultValue(fieldToEdit.default_value || "");
        setEditAutoIncrement(fieldToEdit.auto_increment);
      }
    }
  };

  const handleSaveEditField = () => {
    const index = modelFields.findIndex((field) => field.name === editIndex);
    if (index !== -1) {
      const newName = editName;
      if (
        modelFields.some((field, i) => i !== index && field.name === newName)
      ) {
        alert("Field name already exists. Please choose a different name.");
        return;
      }
      const updatedFields = [...modelFields];
      const newField = {
        id: editIndex,
        name: editName,
        type: editType,
        length: editLength || null,
        default_value: editDefaultValue || null,
        auto_increment: editAutoIncrement,
      };
      updatedFields[index] = newField;
      setModelFields(updatedFields);
      resetEditState();
    }
  };

  const resetEditState = () => {
    setEditIndex(null);
    setEditName("");
    setEditType("");
    setEditLength("");
    setEditDefaultValue("");
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
      fetchEditModel(
        workspaceUtils.getID(),
        name === "" ? modelUtils.getCurrentName() : name,
        description === "" ? modelUtils.getCurrentDescription() : description,
        modelUtils.getCurrentID(),
        cleanedModelFields,
        selectedMethods
      )
    );
    console.log(response);

    if (response.status === true) {
      navigate(
        `/workspace/${projectName}/model/${
          name !== "" ? name : modelUtils.getCurrentName()
        }`
      );
    } else {
      alert("Can't add model.");
    }
  };

  // Remove the field
  const handleDeleteField = (fieldName) => {
    const updatedFields = modelFields.filter(
      (field) => field.name !== fieldName
    );
    setModelFields(updatedFields);
  };

  async function initState(id) {
    try {
      const data = await dispatch(fetchGetModelDetail(id));

      if (data.status === true) {
        const changeType = data.data.tables.map((field) => {
          if (field.type === "int") {
            return {
              ...field,
              type: "number",
            };
          } else {
            return field;
          }
        });
        setModelFields(changeType);
      } else {
        setModelFields([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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
            className="bg-gray-200 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={modelUtils.getCurrentName()}
            onChange={(e) => {
              const newValue = e.target.value
                .replace(/[^a-zA-Z_]+/g, "")
                .toLowerCase();
              setName(newValue.replace(/ /g, "_"));
            }}
            onKeyDown={(e) => {
              if (e.key === " ") {
                e.preventDefault();
                setName((prevName) => prevName + "_");
              }
            }}
            disabled
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
            placeholder={modelUtils.getCurrentDescription()}
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
                    {editIndex === field.name ? (
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
                    {editIndex === field.name ? (
                      <select
                        name="type"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        defaultValue={editType}
                        onChange={(e) => setEditType(e.target.value)}
                      >
                        <option value="string">string</option>
                        <option value="number">number</option>
                        <option value="double">double</option>
                        <option value="date">date</option>
                      </select>
                    ) : (
                      field.type
                    )}
                  </td>
                  <td className="p-2 border">
                    {editIndex === field.name ? (
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
                    {editIndex === field.name ? (
                      field.type === "date" ? (
                        <input
                          type="date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          name="edit-defaultValue"
                          value={editDefaultValue || ""}
                          onChange={(e) => setEditDefaultValue(e.target.value)}
                        />
                      ) : (
                        <input
                          type={field.type === "number" ? "number" : "text"}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          name="edit-defaultValue"
                          value={editDefaultValue || ""}
                          onChange={(e) => setEditDefaultValue(e.target.value)}
                        />
                      )
                    ) : (
                      field.default_value
                    )}
                  </td>
                  <td className="p-2 border">
                    {editIndex === field.name ? (
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
                        style={{
                          display: field.name === "id" ? "block" : "none",
                        }}
                        disabled
                      />
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex justify-evenly">
                      {field.name !== "id" && ( // เพิ่มเงื่อนไขเช็คว่าชื่อ Field ไม่ใช่ "id" ก่อนที่จะแสดงตัวเลือกการแก้ไขและลบ
                        <>
                          {editIndex === field.name ? (
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
                                onClick={() => handleEditField(field.name)}
                                className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-orange-500 hover:text-orange-700"
                              />
                              <FontAwesomeIcon
                                icon={icon({
                                  name: "trash",
                                  style: "solid",
                                })}
                                onClick={() => handleDeleteField(field.name)}
                                className="scale-105 ml-2 opacity-90 cursor-pointer duration-75 text-red-500 hover:text-red-700"
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </td>
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
                    <option value="double">double</option>
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
                    style={{ display: "none" }}
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
