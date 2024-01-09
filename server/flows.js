const express = require('express');
const flowModel = require('./models/flowModel');
const router = express.Router();

// Get Flow from workspace_id
try{
router.get('/get', async (req, res) => {
  const {workspaceid} = req.query
 const result = await flowModel.findAll({
    attributes:["id","name","description","API","markdown","status"],
    where : {workspace_id : workspaceid }
  })
  return res.status(200).send({ status: true , data : result });
});
}catch(err){
  console.error("Error get Flow:", err);
    return res.status(500).send({ msg: "Error get Flow", status: false });
}
// Add Table Flow 
try {
router.post("/add", async (req,res) => {
  const {name ,description,API,markdown,status,workspace_id } = req.body;
  const check = await flowModel.findOne({where:{name,API}});
  if(check){
    return res.status(200).send({status: false ,msg: "Flow name or path is already used !"})
  }
  const newFlow = await flowModel.create({
    name:name,
    description:description,
    API:API,
    markdown:markdown,
    status:status,
    workspace_id:workspace_id
  })
  const FlowID = newFlow.id;
  console.log('Create Flow with ID : ', FlowID)
  return res.status(200).send({status : true,flow_id:FlowID })
})
} catch(err){
  console.error("Error creating Flow:", err);
    return res.status(500).send({ msg: "Error creating Flow", status: false });
  }


module.exports = router;

