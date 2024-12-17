import axios from 'axios';

function toJSON(data) {
    const jsonObj = {};
    const fields = Object.getOwnPropertyNames(data);
    for (const field of fields) {
        if (data[field] !== undefined) {
            jsonObj[field] = data[field];
        }
    }
    return jsonObj;
}

export default class DataService {
    static dataUrlPrefix = 'http://localhost:5000/api';

    static getToken() {
        return localStorage.getItem('token');
    }

    static getAuthHeader() {
        const token = this.getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    static async readAll(url, transformer) {
        const response = await axios.get(this.dataUrlPrefix + url, {
            headers: this.getAuthHeader()
        });
        return response.data.map(item => transformer(item));
    }

    static async read(url, transformer) {
        const response = await axios.get(this.dataUrlPrefix + url, {
            headers: this.getAuthHeader()
        });
        return transformer(response.data);
    }

    static async create(url, data) {
        const response = await axios.post(this.dataUrlPrefix + url, toJSON(data), {
            headers: this.getAuthHeader()
        });
        return response;
    }

    static async update(url, data) {
        await axios.put(this.dataUrlPrefix + url, toJSON(data), {
            headers: this.getAuthHeader()
        });
        return true;
    }

    static async delete(url) {
        await axios.delete(this.dataUrlPrefix + url, {
            headers: this.getAuthHeader()
        });
        return true;
    }
}