const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';
async function request(endpoint, options = {}) {
const url = `${API_URL}${endpoint}`;
const response = await fetch(url, {
headers: {
'Content-Type': 'application/json',
...options.headers,
},
...options,
});
if (!response.ok) {
const error = await response.json();
throw new Error(error.message || 'API error');
}
return response.json();
}
export async function getTasks(params = {}) {
const query = new URLSearchParams();
if (params.filter) query.append('filter', params.filter);
if (params.search) query.append('search', params.search);
if (params.limit) query.append('limit', params.limit);
if (params.page) query.append('page', params.page);
if (params.sort) query.append('sort', params.sort);
return request(`/api/tasks?${query.toString()}`);
}
export async function getTask(id) {
return request(`/api/tasks/${id}`);
}
export async function createTask(data) {
return request('/api/tasks', {
method: 'POST',
body: JSON.stringify(data),
});
}
export async function updateTask(id, data) {
return request(`/api/tasks/${id}`, {
method: 'PUT',
body: JSON.stringify(data),
});
}
export async function deleteTask(id) {
return request(`/api/tasks/${id}`, {
method: 'DELETE',
});
}
export async function restoreTask(id) {
return request(`/api/tasks/${id}/restore`, {
method: 'POST',
});
}
export async function reorderTasks(orderedIds) {
return request('/api/tasks/reorder', {
method: 'POST',
body: JSON.stringify({ orderedIds }),
});
}
export async function importTasks(tasks) {
return request('/api/tasks/import', {
method: 'POST',
body: JSON.stringify(tasks),
});
}
export async function exportTasks() {
return request('/api/tasks/export');
}