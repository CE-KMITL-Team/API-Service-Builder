import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  updateEdge,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  useReactFlow,
} from "reactflow";
import {
  deleteNodeProperty,
  saveFocusNode,
  fetchSaveFlowMarkdown,
  fetchGetFlowMarkdownByName,
  saveProperty,
} from "../../../../actions/flowActions";
import ConditionNode from "../main/nodes/ConditionNode";
import { useLocation, useParams } from "react-router-dom";

const nodeTypes = {
  condition: ConditionNode,
};

let id = 1;
const getId = () => {
  const timestamp = new Date().getTime();
  return `node_${timestamp}${id++}`;
};

const FlowSpace = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);

  const [focusedNodeId, setFocusedNodeId] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const nodePropertyStore = useSelector(
    (state) => state.focusNode.flowProperty
  );

  const { activeFlow } = useParams();

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const data = await dispatch(fetchGetFlowMarkdownByName(activeFlow));

      if (data.status && (data?.data?.flowObj ?? false)) {
        console.log(data?.data?.property);

        dispatch(saveProperty(data?.data?.property ?? {}, true));

        setNodes(data.data.flowObj.nodes || []);
        setEdges(data.data.flowObj.edges || []);
        setViewport(data.data.flowObj.viewport);
      }
    };

    restoreFlow();
  }, [setNodes, setViewport, location]);

  const Init = async () => {
    const position = {
      x: 0,
      y: 0,
    };

    const newNode = {
      id: "node_0",
      type: "input",
      data: {
        label: "Request",
        ref: "request",
      },
      position,
    };

    // <>
    // 	<FontAwesomeIcon
    // 		icon={icon({ name: "plus", style: "solid" })}
    // 		className="mr-3 w-4"
    // 	/>
    // 	<span className="whitespace-nowrap">Request</span>
    // </>;

    const existingNode = nodes.find((node) => node.id === "node_0");

    if (!existingNode) {
      setNodes((nds) => nds.concat(newNode));
    }

    onRestore();
  };

  useEffect(() => {
    Init();
    dispatch(saveProperty({}, true));
  }, [location, activeFlow]);

  // Save Markdown
  useEffect(() => {
    let timeoutId;

    const saveFlowMarkdown = async () => {
      const flowObj = reactFlowInstance?.toObject();
      if (flowObj) {
        dispatch(
          fetchSaveFlowMarkdown(activeFlow, {
            property: nodePropertyStore,
            flowObj,
          })
        );
      }
    };

    const debouncedSaveFlowMarkdown = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(saveFlowMarkdown, 1000); // Adjust the debounce delay as needed
    };

    // Invoke the debounced function at intervals
    const intervalId = setInterval(debouncedSaveFlowMarkdown, 3000);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId); // Clear any pending debounced calls
    };
  }, [reactFlowInstance, nodePropertyStore]);

  const [, drop] = useDrop({
    accept: "FLOW_NODE",
    drop: (item, monitor) => {
      const initialOffset = monitor.getClientOffset();
      const position = reactFlowInstance.screenToFlowPosition({
        x: initialOffset.x - 100,
        y: initialOffset.y - 50,
      });

      const newNode = {
        id: getId(),
        type: item.type,
        position,
        data: {
          // label: (
          // 	<>
          // 		<FontAwesomeIcon
          // 			icon={item.icon}
          // 			className="mr-3 w-4"
          // 		/>
          // 		<span className="whitespace-nowrap">
          // 			{item.name}
          // 		</span>
          // 	</>
          // ),
          label: item.name,
          ref: item.ref,
          ...(item.model !== "" &&
            item.model !== undefined &&
            item.model !== null && { model: item.model }),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    collect: (monitor) => ({
      draggedItem: monitor.getItem(),
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const handleKeyDown = (event) => {
    if (event.keyCode === 46 || event.keyCode === 8) {
      deleteNodeById(focusedNodeId);
    }
  };

  const onNodeClick = (event, node) => {
    dispatch(saveFocusNode(node));
    setFocusedNodeId(node.id);
  };

  const onConnect = useCallback(
    (params) => {
      params.type = "smoothstep";
      params.markerEnd = {
        strokeWidth: 2,
        type: "arrow",
      };
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const deleteNodeById = (id) => {
    if (id !== "node_0") {
      reactFlowInstance.setNodes((nds) => nds.filter((node) => node.id !== id));

      if (nodePropertyStore.hasOwnProperty(id)) {
        dispatch(deleteNodeProperty(id));
      }
    }
  };

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true;
      newConnection.type = "smoothstep";
      oldEdge.type = "smoothstep";
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      edge.type = "smoothstep";
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  return (
    <ReactFlow
      ref={(el) => {
        reactFlowWrapper.current = el;
        drop(el);
      }}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      onDragOver={onDragOver}
      onNodeClick={onNodeClick}
      onNodeDragStart={onNodeClick}
      elementsSelectable={false}
      selectNodesOnDrag={false}
      onKeyDown={handleKeyDown}
      nodeTypes={nodeTypes}
      fitView
    >
      <MiniMap
        nodeStrokeColor={(node) => {
          switch (node.type) {
            case "input":
              return "#374151";
            case "output":
              return "#ea580c";
            default:
              return "#2EA6B0";
          }
        }}
        nodeColor={(node) => {
          switch (node.type) {
            case "input":
              return "#6b7280";
            case "output":
              return "#f97316";
            default:
              return "#3DBCC7";
          }
        }}
        nodeBorderRadius={2}
        maskColor="#3030301D"
        position="top-right"
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default FlowSpace;
