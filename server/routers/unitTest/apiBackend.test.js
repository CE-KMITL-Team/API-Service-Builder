const request = require("supertest");
const app = require("../../app");
const userModel = require("../../models/userModel");
const { customSequelize } = require("../../services/database");
const workspaceModel = require("../../models/workspaceModel");

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