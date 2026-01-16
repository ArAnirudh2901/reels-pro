/**
 * Centralized API Client for handling HTTP requests
 * Wraps fetch API with error handling and common configurations
 */
class ApiClient {
    constructor(baseUrl = "") {
        this.baseUrl = baseUrl;
    }

    /**
     * Make a GET request
     * @param {string} endpoint - API endpoint
     * @param {object} options - Additional fetch options
     * @returns {Promise<any>} Response data
     */
    async get(endpoint, options = {}) {
        return this.request(endpoint, {
            method: "GET",
            ...options,
        });
    }

    /**
     * Make a POST request
     * @param {string} endpoint - API endpoint
     * @param {object} data - Request body data
     * @param {object} options - Additional fetch options
     * @returns {Promise<any>} Response data
     */
    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
            ...options,
        });
    }

    /**
     * Make a PUT request
     * @param {string} endpoint - API endpoint
     * @param {object} data - Request body data
     * @param {object} options - Additional fetch options
     * @returns {Promise<any>} Response data
     */
    async put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
            ...options,
        });
    }

    /**
     * Make a DELETE request
     * @param {string} endpoint - API endpoint
     * @param {object} options - Additional fetch options
     * @returns {Promise<any>} Response data
     */
    async delete(endpoint, options = {}) {
        return this.request(endpoint, {
            method: "DELETE",
            ...options,
        });
    }

    /**
     * Core request method
     * @param {string} endpoint - API endpoint
     * @param {object} options - Fetch options
     * @returns {Promise<any>} Response data
     */
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

/**
 * Custom API Error class
 */
class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

// Create a singleton instance for the app
const apiClient = new ApiClient("/api");

export { apiClient, ApiClient, ApiError };
