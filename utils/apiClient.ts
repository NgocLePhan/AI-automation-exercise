import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * ApiClient provides a typed abstraction over Automation Exercise REST endpoints.
 */
export class ApiClient {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * API 1: Get All Products List
   */
  async getProductsList(): Promise<APIResponse> {
    return this.request.get('/api/productsList');
  }

  /**
   * API 3: Get All Brands List
   */
  async getBrandsList(): Promise<APIResponse> {
    return this.request.get('/api/brandsList');
  }

  /**
   * API 5: POST To Search Product
   */
  async searchProduct(keyword: string): Promise<APIResponse> {
    return this.request.post('/api/searchProduct', {
      form: { search_product: keyword },
    });
  }

  /**
   * API 7: Verify Login with valid details
   */
  async verifyLogin(email: string, password: string): Promise<APIResponse> {
    return this.request.post('/api/verifyLogin', {
      form: { email, password },
    });
  }

  /**
   * API 11: Create User Account
   */
  async createAccount(userData: Record<string, string>): Promise<APIResponse> {
    return this.request.post('/api/createAccount', {
      form: userData,
    });
  }

  /**
   * API 12: Delete User Account
   */
  async deleteAccount(email: string, password: string): Promise<APIResponse> {
    return this.request.delete('/api/deleteAccount', {
      form: { email, password },
    });
  }

  /**
   * API 14: GET user account detail by email
   */
  async getUserDetailByEmail(email: string): Promise<APIResponse> {
    return this.request.get(`/api/getUserDetailByEmail?email=${encodeURIComponent(email)}`);
  }
}
