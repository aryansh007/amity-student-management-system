const BASE_URL = 'http://localhost:3001';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

const apiRequest = async (endpoint, method, body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    return await handleResponse(response);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Student API
const getStudents = async () => {
  return apiRequest('/students', 'GET');
};

const getStudent = async (id) => {
  return apiRequest(`/students/${id}`, 'GET');
};

const addStudent = async (studentData) => {
  return apiRequest('/students', 'POST', studentData);
};

const updateStudent = async (id, studentData) => {
  return apiRequest(`/students/${id}`, 'PUT', studentData);
};

const deleteStudent = async (id) => {
  return apiRequest(`/students/${id}`, 'DELETE');
};

export default {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  getFees: async () => {
    return apiRequest('/fees', 'GET');
  },
  getCourses: async () => {
    return apiRequest('/courses', 'GET');
  },
  validateCredentials: async (email, password) => {
    return apiRequest('/auth/login', 'POST', { email, password });
  },
};
