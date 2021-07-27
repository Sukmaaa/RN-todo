const { default: axios } = require('axios');

const BASE_URL = 'https://rn-todo-api.herokuapp.com/api/v1/';

const getTodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}todos`);

    return response.data.data;
  } catch (error) {
    return `errors : ${error}`;
  }
};

const postTodo = async ({ payload }) => {
  try {
    const response = await axios.post(`${BASE_URL}todo`, payload);

    return response.nessage;
  } catch (error) {
    return `errors : ${error}`;
  }
};

const updateTodo = async ({ id, action, payload }) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}todo/${id}/${action}`,
      payload,
    );

    return response.nessage;
  } catch (error) {
    return `errors : ${error}`;
  }
};

exports.services = { getTodos, postTodo, updateTodo };
