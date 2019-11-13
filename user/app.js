'use strict'

const common = require('./common.js');
const db = require('./db.js');
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    // console.log(JSON.stringify({event}));
    var response;
    try {
		switch (event.httpMethod) {
			case 'GET':
				if (event.pathParameters) {
					response = getUser(event.pathParameters['id']);
				} else {
					response = getAllUsers();
				}
				break;
			case 'POST':
				response = createUser(event.body);
				break;
			case 'PATCH':
				response = updateUser(event.pathParameters['id'], event.body);
				break;
			case 'DELETE':
				response = deleteUser(event.pathParameters['id']);
				break;
			default:
				response = common.responses.error('unsupported');
		}
	} catch (err) {
		console.log(err);
		return err;
	}

    return response;
};

async function getAllUsers() {
	console.log("GetAllUsers");
	try {
		let [rows,fields] = await db.query("SELECT HEX(id) as id, first_name, last_name, department_id, HEX(role_id) as role_id, title, email FROM Users.Users;");
		return common.responses.success(rows);
	}
	catch(exception) {
		console.log("Exception ", exception);
		return common.responses.error(common.errorJSON.error(exception));
	}
}

async function getUser(userID) {
	console.log("GetUser");
	try {
		let [rows,fields] = await db.query("SELECT HEX(id) as id, first_name, last_name, department_id, HEX(role_id) as role_id, title, email FROM Users.Users WHERE id = UNHEX(?)", [userID]);
		return common.responses.success(rows);
	}
	catch(exception) {
		console.log("Exception ", exception);
		return common.responses.error(common.errorJSON.error(exception));
	}
}

async function createUser(jsonBody) {
	console.log("createUser");
	try {
		let insertValues = JSON.parse(jsonBody);
		let [rows,fields] = await db.query("INSERT INTO Users.Users (id, first_name, last_name, email, password, role_id) VALUES (Users.ordered_uuid(uuid()), ?, ?, ?, ?, UNHEX(?));", [insertValues.first_name, insertValues.last_name, insertValues.email, insertValues.password, insertValues.role_id]);
		return common.responses.success();
	}
	catch(exception) {
		console.log("Exception ", exception);
		return common.responses.error(common.errorJSON.error(exception));
	}
}

async function updateUser(userID, jsonBody) {
	console.log("UpdateUser");
	try {
		let updateValues = JSON.parse(jsonBody);
		let [rows,fields] = await db.query("UPDATE Users.Users SET ? WHERE id = UNHEX(?);", [updateValues, userID]);
		return common.responses.success();
	}
	catch(exception) {
		console.log("Exception ", exception);
		return common.responses.error(common.errorJSON.error(exception));
	}
}

async function deleteUser(userID) {
	console.log("deleteUser");
	try {
		let [rows,fields] = await db.query("DELETE FROM Users.Users WHERE id = UNHEX(?);", userID);
		return common.responses.success();
	}
	catch(exception) {
		console.log("Exception ", exception);
		return common.responses.error(common.errorJSON.error(exception));
	}
}

