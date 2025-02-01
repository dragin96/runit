import {APIRequest} from "@playwright/test";

export interface RegisterData {
    username: string,
    email: string,
    password: string
}

export const createUser = async (request: APIRequest, data: RegisterData) => {
    const req = await request.newContext()
    const response = await req.post('api/users', { data });

    expect(response.status()).toBe(201);

    return response.json();
}
