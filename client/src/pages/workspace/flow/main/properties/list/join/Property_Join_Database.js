import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProperty } from "../../../../../../../actions/flowActions"; // Replace with your actual path
import InputSelect from "../../inputs/InputSelect";
import InputText from "../../inputs/InputText";
import InputCondition from "../../inputs/InputCondition";

const defaultValue_orderBy = "";
const defaultValue_direction = "ASC";
const defaultValue_groupBy = "";
const defaultValue_limit = "";
const defaultValue_noLimit = true;
const defaultValue_createSumColumn = "";
const defaultValue_whereConditions = [];

export default function Property_Join_Database() {
  const dispatch = useDispatch();

  const nodeStore = useSelector((state) => state.focusNode.flowProperty);
  const currentID = useSelector(
    (state) => state.focusNode?.currentNode?.id ?? 0
  );

  // Input for Order By
  const [orderBy, setOrderBy] = useState(defaultValue_orderBy);
  useEffect(() => {
    dispatch(saveProperty({ orderBy }));
  }, [orderBy]);

  // Input for Direction
  const [direction, setDirection] = useState(defaultValue_direction);
  useEffect(() => {
    dispatch(saveProperty({ direction }));
  }, [direction]);

  // Input for Group By
  const [groupBy, setGroupBy] = useState(defaultValue_groupBy);
  useEffect(() => {
    dispatch(saveProperty({ groupBy }));
  }, [groupBy]);

  // Input for Limit
  const [limit, setLimit] = useState(defaultValue_limit);
  useEffect(() => {
    dispatch(saveProperty({ limit }));
  }, [limit]);

  // Input for No Limit Checkbox
  const [noLimit, setNoLimit] = useState(defaultValue_noLimit);
  useEffect(() => {
    dispatch(saveProperty({ noLimit }));
  }, [noLimit]);

  // Input for Create Sum Column
  const [createSumColumn, setCreateSumColumn] = useState(
    defaultValue_createSumColumn
  );
  useEffect(() => {
    dispatch(saveProperty({ createSumColumn }));
  }, [createSumColumn]);

  // Input for Where Conditions
  const [whereConditions, setWhereConditions] = useState(
    defaultValue_whereConditions
  );
  useEffect(() => {
    dispatch(saveProperty({ whereConditions }));
  }, [whereConditions]);

  // Save Default Property
  useEffect(() => {
    dispatch(saveProperty({ orderBy }));
    dispatch(saveProperty({ direction }));
    dispatch(saveProperty({ groupBy }));
    dispatch(saveProperty({ limit }));
    dispatch(saveProperty({ noLimit }));
    dispatch(saveProperty({ createSumColumn }));
    dispatch(saveProperty({ whereConditions }));
  }, []);

  // Load Default Data
  useEffect(() => {
    const {
      orderBy,
      direction,
      groupBy,
      limit,
      noLimit,
      createSumColumn,
      whereConditions,
    } = nodeStore[currentID]?.property || {};

    setOrderBy(orderBy ?? defaultValue_orderBy);
    setDirection(direction ?? defaultValue_direction);
    setGroupBy(groupBy ?? defaultValue_groupBy);
    setLimit(limit ?? defaultValue_limit);
    setNoLimit(noLimit ?? defaultValue_noLimit);
    setCreateSumColumn(createSumColumn ?? defaultValue_createSumColumn);
    setWhereConditions(whereConditions ?? defaultValue_whereConditions);
  }, [currentID]);

  return (
    <>
      {/* InputSelect for Order By */}
      <InputText
        title="Order by"
        description="Column name"
        placeholder="user.id"
        type="text"
        controller={setOrderBy}
        defaultValue={orderBy}
      ></InputText>

      {/* InputSelect for Direction */}
      <InputSelect
        description="Direction"
        items={["ASC", "DESC"]}
        underline={true}
        controller={setDirection}
        defaultValue={direction}
      ></InputSelect>

      {/* InputSelect for Group By */}
      <InputText
        title="Group By"
        placeholder="product.category"
        type="text"
        controller={setGroupBy}
        defaultValue={groupBy}
        underline={true}
      ></InputText>

      {/* InputText for Limit */}
      <InputText
        title="Limit"
        placeholder="limit data"
        type="number"
        controller={setLimit}
        defaultValue={limit}
      ></InputText>

      {/* Checkbox for No Limit */}
      <div className="group mt-3 ml-1">
        <input
          className="mr-2"
          id="limit"
          type="checkbox"
          checked={noLimit}
          onChange={() => setNoLimit(!noLimit)}
        />
        <label htmlFor="optional">no limit</label>
      </div>

      <hr className="my-5 w-full border-gray-400 py-0" />

      {/* InputSelect for Create Sum Column */}
      <InputText
        title="Create sum column"
        description="sum column with name 'sum'"
        placeholder="product.quantity"
        type="text"
        controller={setCreateSumColumn}
        defaultValue={createSumColumn}
        underline={true}
      ></InputText>

      {/* InputCondition for Where Conditions */}
      <InputCondition
        title="Where Condition"
        controller={setWhereConditions}
        defaultValue={whereConditions}
      ></InputCondition>
    </>
  );
}
