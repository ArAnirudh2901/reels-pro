
class ApiClient {
    constructor(baseUrl = "") {
        this.baseUrl = baseUrl;
    }


    async get(endpoint, options = {}) {
        return this.request(endpoint, {
            method: "GET",
            ...options,
        });
    }


    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
            ...options,
        });
    }


    async put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
            ...options,
        });
    }


    async delete(endpoint, options = {}) {
        return this.request(endpoint, {
            method: "DELETE",
            ...options,
        });
    }


    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;

        const config = {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new ApiError(
                    data.error || "Something went wrong",
                    response.status,
                    data
                );
            }

            return data;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(error.message || "Network error", 0, null);
        }
    }
}


class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}


const apiClient = new ApiClient("/api");

export { apiClient, ApiClient, ApiError };
