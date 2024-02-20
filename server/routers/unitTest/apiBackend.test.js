const request = require("supertest");
const app = require("../../app");
const userModel = require("../../models/userModel");
const { customSequelize } = require("../../services/database");
const workspaceModel = require("../../models/workspaceModel");
const flowModel = require("../../models/flowModel");

describe("Authorization API Tests", () => {
  describe("Login API Tests", () => {
    it("should login with correct credentials", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          email: "mosmoth04@gmail.com",
          password: "1234",
        });
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.userData).toBeDefined();
    });
    it("should fail login with incorrect credentials", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          email: "nonexistent@example.com",
          password: "wrongpassword",
        });
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(false);
      expect(response.body.userData).toBeUndefined();
    });

  });
  describe("Register API Tests", () => {
    // กำหนดข้อมูลสำหรับการทดสอบ
    const testUser = {
      email: 'testuser@example.com',
      password: 'testpassword',
      firstname: 'Test',
      lastname: 'User',
    };

    beforeAll(async () => {
      // ลบ user ในกรณีที่มีอยู่แล้ว (เพื่อให้ทุกครั้งเริ่มทดสอบกับข้อมูลใหม่)
      await userModel.destroy({ where: { email: testUser.email } });
    });

    afterAll(async () => {
      // ลบ user หลังจากทดสอบเสร็จ
      await userModel.destroy({ where: { email: testUser.email } });
    });
    it("should register a new user", async () => {
      const response = await request(app)
        .post('/auth/register')
        .send(testUser);

      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 201 Created
      expect(response.body.status).toBe(true);  // ตรวจสอบว่า status ใน response body เป็น true
      // ตรวจสอบข้อความของ response body
    });

    it("should not register a user with duplicate email", async () => {
      // สร้าง user ก่อนทดสอบ
      await userModel.create(testUser);

      const response = await request(app)
        .post('/auth/register')
        .send(testUser);

      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 400 Bad Request (หรือตามที่คุณต้องการ)
      expect(response.body.status).toBe(false);  // ตรวจสอบว่า status ใน response body เป็น false
      expect(response.body.msg).toBe('Email is already exists');  // ตรวจสอบข้อความของ response body
    });
  });
  describe("check if email exists API Tests", () => {
    it("should check if email exists", async () => {
      // สร้างข้อมูลสำหรับทดสอบ
      const testEmail = 'mosmoth04@gmail.com';
      // ทดสอบเมื่อ email ยังไม่มีอยู่
      let response = await request(app)
        .post('/auth/check-email')
        .send({ email: testEmail });

      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
      expect(response.body.status).toBe(false);
      expect(response.body.msg).toBe('Email already exists');  // ตรวจสอบว่า status ใน response body เป็น true
    });

    it("should check if email doesn't exists", async () => {
      // สร้างข้อมูลสำหรับทดสอบ
      const testEmail = 'testEmail@gmail.com';
      // ทดสอบเมื่อ email ยังไม่มีอยู่
      let response = await request(app)
        .post('/auth/check-email')
        .send({ email: testEmail });

      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
      expect(response.body.status).toBe(true); // ตรวจสอบว่า status ใน response body เป็น true
    });
  });
  // เพิ่มเทสเพื่อทดสอบกรณีอื่น ๆ ตามที่ต้องการ
});

// let testData = {
//   project_name: "test_project",
//   user_id: 1, // ให้ใส่ user_id ที่มีอยู่ในฐานข้อมูล
// };

describe("Workspace API Tests", () => {
  // beforeEach(() => {
  //   // กำหนดค่าเริ่มต้นของ testData ก่อนทุก test case
  //   testData = {
  //     project_name: "test_project",
  //     user_id: 1,
  //   };
  // });

  // describe("Build new database in MySQL", () => {
  //   beforeEach(async () => {
  //     // ลบ workspace ที่มีชื่อเดียวกันกับที่จะทดสอบ
  //     await workspaceModel.destroy({
  //       where: { name: testData.project_name, owner_id: testData.user_id },
  //     });
  //   });

  //   afterEach(async () => {
  //     // ลบ workspace ที่ถูกสร้างขึ้นใน MySQL เพื่อไม่ให้มีผลกระทบต่อฐานข้อมูล
  //     await workspaceModel.destroy({
  //       where: { name: testData.project_name, owner_id: testData.user_id },
  //     });
  //   });

  //   it("should create a new database", async () => {
  //     // ข้อมูลทดสอบ
  //     const response = await request(app)
  //       .post("/workspace/create")
  //       .send(testData);

  //     expect(response.status).toBe(200);
  //     expect(response.body.status).toBe(true);

  //     // ตรวจสอบว่า database ถูกสร้างขึ้นมาใน MySQL หรือไม่
  //     const [existingDatabase] = await customSequelize().query(
  //       `SHOW DATABASES LIKE '${testData.user_id}-${testData.project_name}'`
  //     );

  //     expect(existingDatabase.length).toBe(1);
  //   });

  //   it("should not create a database with invalid project_name", async () => {
  //     // ข้อมูลทดสอบ
  //     testData.project_name = "invalid project name!";
  //     const response = await request(app)
  //       .post("/workspace/create")
  //       .send(testData);

  //     expect(response.status).toBe(200);
  //     expect(response.body.status).toBe(false);
  //     expect(response.body.msg).toBe("Invalid characters in the database name");
  //   });
  // });

// -------------------------------------------------------------------------------------------
describe("Get Workspaces API Test", () => {
  it("should get workspace from the userid that is in the system.", async () => {
    // ข้อมูลทดสอบ
    const userId = 1; // ให้ใส่ user_id ที่มีอยู่ในฐานข้อมูล

    const response = await request(app)
      .get(`/workspace/get/workspaces?userid=${userId}`);

    expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
    expect(response.body.workspaces).toBeDefined();  // ตรวจสอบว่ามีข้อมูล workspaces ใน response body
    expect(response.body.workspaces.length).toBeGreaterThanOrEqual(0);  // ตรวจสอบว่ามี workspaces อย่างน้อย 0 รายการ
  });

  it("should return an error if userid parameter is missing", async () => {
    const response = await request(app)
      .get("/workspace/get/workspaces");

    expect(response.status).toBe(400);  // ตรวจสอบว่าได้รับสถานะ 400 Bad Request
    expect(response.body.error).toBe("userid parameter is missing in the request.");  // ตรวจสอบข้อความ error ใน response body
  });

});

describe("Get Templates API Test", () => {
  it("should return all templates", async () => {
    const response = await request(app)
      .get("/workspace/get/templates");

    expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
    expect(response.body.templates).toBeDefined();  // ตรวจสอบว่ามี property templates ใน response body
    expect(response.body.templates).toBeInstanceOf(Array);  // ตรวจสอบว่า templates เป็น array

    if (response.body.templates.length > 0) {
      const firstTemplate = response.body.templates[0];
 
      expect(firstTemplate.id).toBeDefined();
      expect(firstTemplate.name).toBeDefined();
      expect(firstTemplate.description).toBeDefined();

    }
  });

});

describe("Get Workspace Detail By Name API Test", () => {
  it("should return workspace details by name", async () => {
    const testName = "Test"; // ตั้งชื่อ workspace ที่มีในฐานข้อมูล

    const response = await request(app)
      .get("/workspace/get/workspaceDetailByName")
      .query({ name: testName, userid: 2 }); // ให้ใส่ userid ที่มีอยู่ในฐานข้อมูล

    expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
    expect(response.body.status).toBeDefined();  // ตรวจสอบว่ามี property status ใน response body
    expect(response.body.data).toBeDefined();  // ตรวจสอบว่ามี property data ใน response body
    expect(response.body.data.name).toBe(testName);  // ตรวจสอบว่าชื่อของ workspace ตรงกับที่ตั้งไว้
    expect(response.body.data.status).toBeDefined();  // ตรวจสอบว่ามี property status ในข้อมูลของ workspace
    // เพิ่มเงื่อนไขตรวจสอบอื่น ๆ ตามที่คุณต้องการ
  });

  it("should return error if userid parameter is missing", async () => {
    const testName = "test_project"; // ตั้งชื่อ workspace ที่มีในฐานข้อมูล

    const response = await request(app)
      .get("/workspace/get/workspaceDetailByName")
      .query({ name: testName });

    expect(response.status).toBe(400);  // ตรวจสอบว่าได้รับสถานะ 400 Bad Request
    expect(response.body.error).toBe("userid parameter is missing in the request.");  // ตรวจสอบข้อความ error ใน response body
  });

});

describe("Get Workspace Detail By ID API", () => {
  it("should return workspace details by ID", async () => {
    const testWorkspaceID = 1; // ตั้งค่า ID ของ workspace ที่มีในฐานข้อมูล

    const response = await request(app)
      .get("/workspace/get/workspaceDetailByID")
      .query({ id: testWorkspaceID }); // ให้ใส่ ID ที่มีอยู่ในฐานข้อมูล

    expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
    expect(response.body.status).toBeDefined();  // ตรวจสอบว่ามี property status ใน response body
    expect(response.body.data).toBeDefined();  // ตรวจสอบว่ามี property data ใน response body
    expect(response.body.data.id).toBe(testWorkspaceID);  // ตรวจสอบว่า ID ของ workspace ตรงกับที่ตั้งไว้
    expect(response.body.data.status).toBeDefined();  // ตรวจสอบว่ามี property status ในข้อมูลของ workspace
    // เพิ่มเงื่อนไขตรวจสอบอื่น ๆ ตามที่คุณต้องการ
  });

  it("should return error if id parameter is missing", async () => {
    const response = await request(app)
      .get("/workspace/get/workspaceDetailByID");

    expect(response.status).toBe(400);  // ตรวจสอบว่าได้รับสถานะ 400 Bad Request
    expect(response.body.error).toBe("id parameter is missing in the request.");  // ตรวจสอบข้อความ error ใน response body
  });
});

  // เพิ่มเทสเพื่อทดสอบกรณีอื่น ๆ ตามที่ต้องการ

});

describe("Flow API Tests", () => {

  describe("Get Flow from workspace_id API Test", () => {
    it("should return flows by workspace_id", async () => {
      // ข้อมูลทดสอบ
      const testWorkspaceID = 1; // ให้ใส่ workspace_id ที่มีอยู่ในฐานข้อมูล
  
      const response = await request(app)
        .get("/flows/get")
        .query({ workspaceid: testWorkspaceID });
  
      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
      expect(response.body.status).toBeDefined();  // ตรวจสอบว่ามี property status ใน response body
      expect(response.body.data).toBeDefined();  // ตรวจสอบว่ามี property data ใน response body
      expect(response.body.data.length).toBeGreaterThanOrEqual(0);  // ตรวจสอบว่ามี flows อย่างน้อย 0 รายการ
      // เพิ่มเงื่อนไขตรวจสอบข้อมูลใน response body ตามที่คุณต้องการ
    });
  
    it("should return an error if workspaceid parameter is missing", async () => {
      const response = await request(app)
        .get("/flows/get");
  
      expect(response.status).toBe(500);  // ตรวจสอบว่าได้รับสถานะ 400 Bad Request
    });
  });

  describe("Get Markdown By Name API Test", () => {
    it("should return markdown by flow_name", async () => {
      // ข้อมูลทดสอบ
      const testFlowName = "Moth"; // ให้ใส่ flow_name ที่มีอยู่ในฐานข้อมูล
  
      const response = await request(app)
        .get("/flows/getMarkdownByName")
        .query({ flow_name: testFlowName });
  
      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
      expect(response.body.status).toBeDefined();  // ตรวจสอบว่ามี property status ใน response body
      expect(response.body.data).toBeDefined();  // ตรวจสอบว่ามี property data ใน response body
      expect(response.body.data.property).toBeDefined();  // ตรวจสอบว่ามี property property ในข้อมูลของ markdown
      expect(response.body.data.flowObj).toBeDefined();  // ตรวจสอบว่ามี property flowObj ในข้อมูลของ markdown
      // เพิ่มเงื่อนไขตรวจสอบข้อมูลใน response body ตามที่คุณต้องการ
    });
    it("should return an error if flow_name is not found", async () => {
      // ให้ใส่ flow_name ที่ไม่มีอยู่ในฐานข้อมูล
      const nonExistentFlowName = "NonExistentFlowName";
  
      const response = await request(app)
        .get("/flows/getMarkdownByName")
        .query({ flow_name: nonExistentFlowName });
  
      expect(response.status).toBe(500);  // ตรวจสอบว่าได้รับสถานะ 500 Internal Server Error (หรือตามที่คุณต้องการ)
      expect(response.body.msg).toBe("Can't get flow detail");  // ตรวจสอบข้อความ msg ใน response body
    });
  });

  describe("Get Flow Detail By Name API Test", () => {
    it("should return flow details by flow_name", async () => {
      // ข้อมูลทดสอบ
      const testFlowName = "Register"; // ให้ใส่ flow_name ที่มีอยู่ในฐานข้อมูล
  
      const response = await request(app)
        .get("/flows/getFlowDetailByName")
        .query({ flow_name: testFlowName });
  
      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
      expect(response.body.status).toBeDefined();  // ตรวจสอบว่ามี property status ใน response body
      expect(response.body.data).toBeDefined();  // ตรวจสอบว่ามี property data ใน response body
      expect(response.body.data.id).toBeDefined();  // ตรวจสอบว่ามี property id ในข้อมูลของ flow
      expect(response.body.data.name).toBe(testFlowName);  // ตรวจสอบว่าชื่อของ flow ตรงกับที่ตั้งไว้
      expect(response.body.data.description).toBeDefined();  // ตรวจสอบว่ามี property description ในข้อมูลของ flow
      // เพิ่มเงื่อนไขตรวจสอบข้อมูลใน response body ตามที่คุณต้องการ
    });
  
  
    it("should return an error if flow_name is not found", async () => {
      // ให้ใส่ flow_name ที่ไม่มีอยู่ในฐานข้อมูล
      const nonExistentFlowName = "NonExistentFlowName";
  
      const response = await request(app)
        .get("/flows/getFlowDetailByName")
        .query({ flow_name: nonExistentFlowName });
  
      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK (หรือตามที่คุณต้องการ)
      expect(response.body.status).toBe(false);  // ตรวจสอบว่า status ใน response body เป็น false
      expect(response.body.msg).toBe("Flow not found.");  // ตรวจสอบข้อความ msg ใน response body
    });
  });
  
  describe("Add Table Flow API Test", () => {
    // สร้างตัวแปร global เพื่อเก็บข้อมูลที่จะใช้ใน test case ต่าง ๆ
    let addedFlowId;
  
    // Test case เพื่อทดสอบการเพิ่ม Flow
    it("should add a new flow and return flow_data", async () => {
      // ข้อมูลทดสอบ
      const testFlow = {
        name: "TestFlow",
        description: "Test Flow Description",
        API: "/test-api",
        markdown: "{}",
        status: "active",
        workspace_id: 1,  // ให้ใส่ workspace_id ที่มีอยู่ในฐานข้อมูล
      };
  
      const response = await request(app)
        .post("/flows/add")
        .send(testFlow);
  
      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
      expect(response.body.status).toBe(true);  // ตรวจสอบว่า status ใน response body เป็น true
      expect(response.body.flow_data).toBeDefined();  // ตรวจสอบว่ามี property flow_data ใน response body
      expect(response.body.flow_data.id).toBeDefined();  // ตรวจสอบว่ามี property id ในข้อมูลของ flow_data
      addedFlowId = response.body.flow_data.id;  // เก็บค่า id ของ flow_data เพื่อให้ใช้ใน test case ถัดไป
    });
  
    // Test case เพื่อทดสอบการลบ Flow โดยใช้ endpoint /flows/delete
    it("should delete the added flow using /flows/delete", async () => {
      // ข้อมูลทดสอบ
      const deleteFlowData = {
        workspace_id: 1,  // ให้ใส่ workspace_id ที่มีอยู่ในฐานข้อมูล
        flow_id: addedFlowId,  // ใช้ id ที่ได้จาก test case ก่อนหน้า
      };
  
      const response = await request(app)
        .delete("/flows/delete")
        .send(deleteFlowData);
  
      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
      expect(response.body.status).toBe(true);  // ตรวจสอบว่า status ใน response body เป็น true
      expect(response.body.flow_name).toBeDefined();  // ตรวจสอบว่ามี property flow_name ใน response body
      expect(response.body.flow_name).toBe("TestFlow");  // ตรวจสอบว่าชื่อ flow ที่ลบตรงกับที่ตั้งไว้
    });
  
    // Test case เพื่อทดสอบว่า flow ที่ลบจาก test case ก่อนหน้าไม่มีอยู่ในฐานข้อมูล
    it("should check that the deleted flow is no longer in the database", async () => {
      // ลองเรียก API เพื่อดึงข้อมูล flow ที่ถูกลบ
      const deletedFlow = await flowModel.findOne({
        where: {
          id: addedFlowId,
        },
      });
  
      // ตรวจสอบว่า flow ที่ถูกลบไม่มีอยู่ในฐานข้อมูล
      expect(deletedFlow).toBeNull();
    });
  });
  describe(" Check Flows name and path is exists API Test", () => {
    it("should return false for both name and path when neither exists", async () => {
      // ข้อมูลทดสอบ
      const testFlowName = "NonExistentFlowName";
      const testFlowPath = "NonExistentFlowPath";
  
      const response = await request(app)
        .post("/flows/check-detail")
        .send({
          flow_name: testFlowName,
          flow_path: testFlowPath,
        });
  
      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
      expect(response.body.status).toBe(true);  // ตรวจสอบว่า status ใน response body เป็น true

    });
  
    it("should return true for both name and path when both exist", async () => {
      // ข้อมูลทดสอบ
      const existingFlowName = "Register";
      const existingFlowPath = "User/Register";
  
      const response = await request(app)
        .post("/flows/check-detail")
        .send({
          flow_name: existingFlowName,
          flow_path: existingFlowPath,
        });
  
      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
      expect(response.body.status).toBe(false);  // ตรวจสอบว่า status ใน response body เป็น false
      expect(response.body.errorName).toBe(true);  // ตรวจสอบว่า errorName เป็น true
      expect(response.body.errorPath).toBe(true);  // ตรวจสอบว่า errorPath เป็น true
    });
  
    it("should return true for errorName when name exists", async () => {
      // ข้อมูลทดสอบ
      const existingFlowName = "Register";
      const testFlowPath = "NonExistentFlowPath";
  
      const response = await request(app)
        .post("/flows/check-detail")
        .send({
          flow_name: existingFlowName,
          flow_path: testFlowPath,
        });
  
      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
      expect(response.body.status).toBe(false);  // ตรวจสอบว่า status ใน response body เป็น false
      expect(response.body.errorName).toBe(true);  // ตรวจสอบว่า errorName เป็น true
      expect(response.body.errorPath).toBe(false);  // ตรวจสอบว่า errorPath เป็น false
    });
  
    it("should return true for errorPath when path exists", async () => {
      // ข้อมูลทดสอบ
      const testFlowName = "NonExistentFlowName";
      const existingFlowPath = "User/Register";
  
      const response = await request(app)
        .post("/flows/check-detail")
        .send({
          flow_name: testFlowName,
          flow_path: existingFlowPath,
        });
  
      expect(response.status).toBe(200);  // ตรวจสอบว่าได้รับสถานะ 200 OK
      expect(response.body.status).toBe(false);  // ตรวจสอบว่า status ใน response body เป็น false
      expect(response.body.errorName).toBe(false);  // ตรวจสอบว่า errorName เป็น false
      expect(response.body.errorPath).toBe(true);  // ตรวจสอบว่า errorPath เป็น true
    });
  });
  describe(" Delete Flow from workspace_id and flow_id API Test", () => {
    let testFlow; // Variable to store the Flow data for testing
  
    beforeEach(async () => {
      // Create test data for Flow
      testFlow = await flowModel.create({
        name: "Test Flow",
        description: "Test Description",
        API: "/test-api",
        status: 1,
        markdown: "{}", // Provide a non-null value for markdown
        workspace_id: 1, // Use a workspace_id that exists in the database
      });
    });
  
    afterEach(async () => {
      // Delete the Flow data after testing
      await flowModel.destroy({ where: { id: testFlow.id } });
    });
  
    it("should delete a flow from the database", async () => {
      // Perform the delete request
      const response = await request(app)
        .delete("/flows/delete")
        .send({ workspace_id: testFlow.workspace_id, flow_id: testFlow.id });
  
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.flow_name).toBe(testFlow.name);
  
      // Verify that the Flow has been deleted from the database
      const deletedFlow = await flowModel.findOne({
        where: {
          id: testFlow.id,
        },
      });
      expect(deletedFlow).toBeNull();
    });
  
    it("should return an error if flow not found", async () => {
      // Delete the Flow data to simulate it being already deleted
      await flowModel.destroy({ where: { id: testFlow.id } });
  
      // Perform the delete request
      const response = await request(app)
        .delete("/flows/delete")
        .send({ workspace_id: testFlow.workspace_id, flow_id: testFlow.id });
  
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(false);
      expect(response.body.msg).toBe("Flow not found");
    });
  });
  
  describe(" Save Flows Markdown API Test", () => {
    let testFlow; // Variable to store the Flow data for testing
  
    beforeEach(async () => {
      // Create test data for Flow
      testFlow = await flowModel.create({
        name: "Test Flow",
        description: "Test Description",
        API: "/test-api",
        status: 1,
        markdown: "{}", // Provide a non-null value for markdown
        workspace_id: 1, // Use a workspace_id that exists in the database
      });
    });
  
    afterEach(async () => {
      // Delete the Flow data after testing
      await flowModel.destroy({ where: { id: testFlow.id } });
    });
  
    it("should save markdown for a flow", async () => {
      // New markdown data to be saved
      const newMarkdown = {
        property: "new property",
        flowObj: "new flowObj",
      };
  
      // Perform the save markdown request
      const response = await request(app)
        .post("/flows/saveMarkdown")
        .send({ flow_name: testFlow.name, markdown: JSON.stringify(newMarkdown) });
  
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.msg).toBe("Edit markdown success !");
  
      // Verify that the Flow's markdown has been updated in the database
      const updatedFlow = await flowModel.findOne({
        attributes: ["markdown"],
        where: {
          id: testFlow.id,
        },
      });
  
      // Parse the stored markdown JSON
      const storedMarkdown = JSON.parse(updatedFlow.markdown);
      
      expect(storedMarkdown.property).toBe(newMarkdown.property);
      expect(storedMarkdown.flowObj).toBe(newMarkdown.flowObj);
    });
  
    it("should return an error if flow not found", async () => {
      // Delete the Flow data to simulate it being already deleted
      await flowModel.destroy({ where: { id: testFlow.id } });
  
      // New markdown data to be saved
      const newMarkdown = {
        property: "new property",
        flowObj: "new flowObj",
      };
  
      // Perform the save markdown request
      const response = await request(app)
        .post("/flows/saveMarkdown")
        .send({ flow_name: testFlow.name, markdown: JSON.stringify(newMarkdown) });
  
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(false);
      expect(response.body.msg).toBe("Flow id is not found");
    });
  });

  describe(" Edit Flows API Test", () => {
    let testFlow; // Variable to store the Flow data for testing
  
    beforeEach(async () => {
      // Create test data for Flow
      testFlow = await flowModel.create({
        name: "Test Flow",
        description: "Test Description",
        API: "/test-api",
        status: 1,
        markdown: "{}",
        workspace_id: 1, // Use a workspace_id that exists in the database
      });
    });
  
    afterEach(async () => {
      // Delete the Flow data after testing
      await flowModel.destroy({ where: { id: testFlow.id } });
    });
  
    it("should edit the details of a flow", async () => {
      // New data to be updated for the Flow
      const newData = {
        name: "Updated  new Flow Name",
        description: "Updated Description",
        API: "/updated-api-new",
        markdown: '{"property":"updated property","flowObj":"updated flowObj"}',
        status: 1,
        workspace_id: 1, // Use a workspace_id that exists in the database
      };
  
      // Perform the edit flow request
      const response = await request(app)
        .put("/flows/edit")
        .send({
          id: testFlow.id,
          columns: newData,
        });
  
        console.log("ลองงงงงงงงงงงงงงงงงงงงงงงง",response.body);  // แสดงค่าทั้งหมดที่ได้รับจาก API response
        console.log("ลองงงงงงงงงงงงงงงงงงงงงงงง",response.body.status);  // แสดงค่าของ status ที่ได้รับจาก API response
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.flow_data).toBeDefined();
  
      // Verify that the Flow's details have been updated in the database
      const updatedFlow = await flowModel.findOne({
        attributes: ["name", "description", "API", "markdown", "status"],
        where: {
          id: testFlow.id,
        },
      });
  
      expect(updatedFlow.name).toBe(newData.name);
      expect(updatedFlow.description).toBe(newData.description);
      expect(updatedFlow.API).toBe(newData.API);
      expect(updatedFlow.status).toBe(newData.status);
  
      // Parse the updated markdown and compare
      const updatedMarkdown = JSON.parse(updatedFlow.markdown);
      const expectedMarkdown = JSON.parse(newData.markdown);
  
      expect(updatedMarkdown.property).toBe(expectedMarkdown.property);
      expect(updatedMarkdown.flowObj).toBe(expectedMarkdown.flowObj);
    });
  
    it("should return an error if flow ID is already used", async () => {
      // Create another Flow with a different ID
      const anotherFlow = await flowModel.create({
        name: "Another Flow",
        description: "Another Description",
        API: "/another-api",
        status: 1,
        markdown: "{}",
        workspace_id: 1, // Use a workspace_id that exists in the database
      });
  
      // Attempt to edit the Flow with an ID that is already used by another Flow
      const response = await request(app)
        .put("/flows/edit")
        .send({
          id: anotherFlow.id, // Use the ID of another Flow
          columns: {
            name: "Updated Flow Name",
            description: "Updated Description",
            API: "/another-api",
            markdown: '{"property":"updated property","flowObj":"updated flowObj"}',
            status: 1,
            workspace_id: 1,
          },
        });
  
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(false);
      expect(response.body.msg).toBe("Flow name or API-Path is already used !");
  
      // Delete the additional Flow created for testing
      await flowModel.destroy({ where: { id: anotherFlow.id } });
    });
  });

});