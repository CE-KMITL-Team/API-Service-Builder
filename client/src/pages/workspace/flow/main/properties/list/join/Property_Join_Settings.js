import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../inputs/InputText";
import { saveProperty } from "../../../../../../../actions/flowActions";
import InputSelect from "../../inputs/InputSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { fetchGetModelWorkspace } from "../../../../../../../actions/modelActions";
import workspaceUtils from "../../../../../../../utils/workspaceUtils";

const defaultValue_resultTable = "$joinTable";
const defaultValue_joinType = "JOIN";

export default function Property_Join_Settings() {
  const dispatch = useDispatch();

  const nodeStore = useSelector((state) => state.focusNode.flowProperty);
  const currentID = useSelector(
    (state) => state.focusNode?.currentNode?.id ?? 0
  );

  const [defaultValue_model1, setDefaultValue_model1] = useState("");
  const [defaultValue_model2, setDefaultValue_model2] = useState("");

  // Input for Result Table
  const [resultTable, setResultTable] = useState(defaultValue_resultTable);
  useEffect(() => {
    dispatch(saveProperty({ resultTable: resultTable }));
  }, [resultTable]);

  // Input for Model 1
  const [model1, setModel1] = useState(defaultValue_model1);
  useEffect(() => {
    dispatch(saveProperty({ model1: model1 }));
  }, [model1]);

  // Input for Model 2
  const [model2, setModel2] = useState(defaultValue_model2);
  useEffect(() => {
    dispatch(saveProperty({ model2: model2 }));
  }, [model2]);

  // Input for Join Type
  const [joinType, setJoinType] = useState(defaultValue_joinType);
  useEffect(() => {
    dispatch(saveProperty({ joinType: joinType }));
  }, [joinType]);

  const [models, setModel] = useState([]);
  async function initState() {
    try {
      const data = await dispatch(
        fetchGetModelWorkspace(workspaceUtils.getID())
      );

      if (data.status === true) {
        let modelList = data.data.map((item) => item.name);

        if ((modelList?.length ?? []) !== 0) {
          setModel(modelList);

          setDefaultValue_model1(modelList[0]);
          setDefaultValue_model2(modelList[0]);

          const { model1, model2 } = nodeStore[currentID]?.property || {};

          dispatch(
            saveProperty({
              model1: model1 === "" ? modelList[0] : model1 || modelList[0],
            })
          );
          dispatch(
            saveProperty({
              model2: model2 === "" ? modelList[0] : model2 || modelList[0],
            })
          );
        }
      } else {
        setModel([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Save Default Property
  useEffect(() => {
    initState();
    dispatch(saveProperty({ resultTable: resultTable }));
    dispatch(saveProperty({ joinType: joinType }));
    dispatch(saveProperty({ model1: model1 }));
    dispatch(saveProperty({ model2: model2 }));
  }, []);

  // Load Default Data
  useEffect(() => {
    const { joinType, resultTable, model1, model2 } =
      nodeStore[currentID]?.property || {};
    setResultTable(resultTable ?? defaultValue_resultTable);
    setModel1(model1 ?? (models[0] || ""));
    setModel2(model2 ?? (models[0] || ""));
    setJoinType(joinType ?? defaultValue_joinType);
  }, [currentID]);

  return (
    <>
      {/* InputText for Result Table */}
      <InputText
        title="Result table"
        description="Result table from join"
        placeholder="variable"
        defaultValue={resultTable}
        controller={setResultTable}
        underline={true}
      ></InputText>

      <InputSelect
        title="Join Model"
        description="Model 1"
        items={models}
        defaultValue={model1}
        controller={setModel1}
      ></InputSelect>

      <InputSelect
        description="Join Type"
        items={["JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN"]}
        defaultValue={joinType}
        controller={setJoinType}
      ></InputSelect>

      <InputSelect
        description="Model 2"
        items={models}
        defaultValue={model2}
        controller={setModel2}
        underline={true}
      ></InputSelect>
    </>
  );
}
