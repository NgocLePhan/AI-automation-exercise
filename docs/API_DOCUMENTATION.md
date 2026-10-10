# Automation Exercise - Official API Documentation

> **Document Version:** 1.0.0  
> **Source:** [Automation Exercise API List](https://automationexercise.com/api_list)  
> **Role:** Senior Fullstack Quality Control Engineer  
> **Base URL:** `https://automationexercise.com`  
> **Scope:** API Endpoints 1 through 14  
> **Content-Type Expected for Mutations:** `application/x-www-form-urlencoded` or `multipart/form-data`

---

## Technical Architecture & QC Findings Note

> [!IMPORTANT]
> **HTTP Status Code vs. Response Body `responseCode` Discrepancy:**  
> On the official documentation page (`https://automationexercise.com/api_list`), response codes such as `400`, `404`, `405`, and `201` are listed as the "Response Code".  
> However, live testing against the target backend confirms that the HTTP protocol response header is consistently returned as **`200 OK`**, while the logical status code is encapsulated inside the JSON payload key `"responseCode": <code>` (e.g., `{"responseCode": 405, "message": "This request method is not supported."}`).  
> As a Senior QC Engineer, this behavior is documented below for every endpoint with appropriate `[NEEDS_CLARIFICATION]` tags to guide both automated testing and contract validation.

---

## API Endpoints Summary Matrix

| API ID | Method | Endpoint | Documented Code | Purpose |
| :--- | :--- | :--- | :---: | :--- |
| **API 1** | `GET` | `/api/productsList` | `200` | Retrieve complete list of products |
| **API 2** | `POST` | `/api/productsList` | `405` | Negative test: Unsupported method on products list |
| **API 3** | `GET` | `/api/brandsList` | `200` | Retrieve complete list of brands |
| **API 4** | `PUT` | `/api/brandsList` | `405` | Negative test: Unsupported method on brands list |
| **API 5** | `POST` | `/api/searchProduct` | `200` | Search products by keyword |
| **API 6** | `POST` | `/api/searchProduct` | `400` | Negative test: Search product missing required parameter |
| **API 7** | `POST` | `/api/verifyLogin` | `200` | Verify user login with valid credentials |
| **API 8** | `POST` | `/api/verifyLogin` | `400` | Negative test: Verify login missing email parameter |
| **API 9** | `DELETE` | `/api/verifyLogin` | `405` | Negative test: Unsupported method on verify login |
| **API 10** | `POST` | `/api/verifyLogin` | `404` | Negative test: Verify login with invalid credentials |
| **API 11** | `POST` | `/api/createAccount` | `201` | Create / Register new user account |
| **API 12** | `DELETE` | `/api/deleteAccount` | `200` | Delete user account |
| **API 13** | `PUT` | `/api/updateAccount` | `200` | Update user account details |
| **API 14** | `GET` | `/api/getUserDetailByEmail` | `200` | Fetch account details for a specific user |

---

## Detailed Endpoint Specifications

### API 1: Get All Products List
* **Endpoint URL:** `https://automationexercise.com/api/productsList`
* **HTTP Method:** `GET`
* **Request Parameters:**
  * None
* **Expected Response Code:** `200`  
  * *HTTP Protocol Status:* `200 OK`
  * *Payload `responseCode`:* `200`
* **Official Documentation Response:**
  * `Response JSON: All products list`
* **Sample Response Body:**
```json
{
  "responseCode": 200,
  "products": [
    {
      "id": 1,
      "name": "Blue Top",
      "price": "Rs. 500",
      "brand": "Polo",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    },
    {
      "id": 2,
      "name": "Men Tshirt",
      "price": "Rs. 400",
      "brand": "H&M",
      "category": {
        "usertype": {
          "usertype": "Men"
        },
        "category": "Tshirts"
      }
    }
  ]
}
```

---

### API 2: POST To All Products List
* **Endpoint URL:** `https://automationexercise.com/api/productsList`
* **HTTP Method:** `POST`
* **Request Parameters:**
  * None
* **Expected Response Code:** `405`  
  * `[NEEDS_CLARIFICATION]` *HTTP Protocol Status vs JSON Response Code:* The official documentation lists `Response Code: 405`. The live server returns HTTP header status `200 OK` with JSON field `"responseCode": 405`.
* **Official Documentation Response:**
  * `Response Message: This request method is not supported.`
* **Sample Response Body:**
```json
{
  "responseCode": 405,
  "message": "This request method is not supported."
}
```

---

### API 3: Get All Brands List
* **Endpoint URL:** `https://automationexercise.com/api/brandsList`
* **HTTP Method:** `GET`
* **Request Parameters:**
  * None
* **Expected Response Code:** `200`  
  * *HTTP Protocol Status:* `200 OK`
  * *Payload `responseCode`:* `200`
* **Official Documentation Response:**
  * `Response JSON: All brands list`
* **Sample Response Body:**
```json
{
  "responseCode": 200,
  "brands": [
    {
      "id": 1,
      "brand": "Polo"
    },
    {
      "id": 2,
      "brand": "H&M"
    },
    {
      "id": 3,
      "brand": "Madame"
    },
    {
      "id": 4,
      "brand": "Madame"
    },
    {
      "id": 5,
      "brand": "Mast & Harbour"
    }
  ]
}
```

---

### API 4: PUT To All Brands List
* **Endpoint URL:** `https://automationexercise.com/api/brandsList`
* **HTTP Method:** `PUT`
* **Request Parameters:**
  * None
* **Expected Response Code:** `405`  
  * `[NEEDS_CLARIFICATION]` *HTTP Protocol Status vs JSON Response Code:* The official documentation specifies `Response Code: 405`. The live server returns HTTP header status `200 OK` with JSON field `"responseCode": 405`.
* **Official Documentation Response:**
  * `Response Message: This request method is not supported.`
* **Sample Response Body:**
```json
{
  "responseCode": 405,
  "message": "This request method is not supported."
}
```

---

### API 5: POST To Search Product
* **Endpoint URL:** `https://automationexercise.com/api/searchProduct`
* **HTTP Method:** `POST`
* **Request Parameters:**
  * `search_product`: (String, required) Search keyword (For example: `top`, `tshirt`, `jean`). Sent as Form Data / URL Encoded body.
* **Expected Response Code:** `200`  
  * *HTTP Protocol Status:* `200 OK`
  * *Payload `responseCode`:* `200`
* **Official Documentation Response:**
  * `Response JSON: Searched products list`
* **Sample Response Body:**
```json
{
  "responseCode": 200,
  "products": [
    {
      "id": 1,
      "name": "Blue Top",
      "price": "Rs. 500",
      "brand": "Polo",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    },
    {
      "id": 5,
      "name": "Winter Top",
      "price": "Rs. 600",
      "brand": "Mast & Harbour",
      "category": {
        "usertype": {
          "usertype": "Women"
        },
        "category": "Tops"
      }
    }
  ]
}
```

---

### API 6: POST To Search Product without search_product parameter
* **Endpoint URL:** `https://automationexercise.com/api/searchProduct`
* **HTTP Method:** `POST`
* **Request Parameters:**
  * None (omitting `search_product`)
* **Expected Response Code:** `400`  
  * `[NEEDS_CLARIFICATION]` *HTTP Protocol Status vs JSON Response Code:* The official documentation specifies `Response Code: 400`. The live server returns HTTP header status `200 OK` with JSON field `"responseCode": 400`.
* **Official Documentation Response:**
  * `Response Message: Bad request, search_product parameter is missing in POST request.`
* **Sample Response Body:**
```json
{
  "responseCode": 400,
  "message": "Bad request, search_product parameter is missing in POST request."
}
```

---

### API 7: POST To Verify Login with valid details
* **Endpoint URL:** `https://automationexercise.com/api/verifyLogin`
* **HTTP Method:** `POST`
* **Request Parameters:**
  * `email`: (String, required) Valid registered user email address.
  * `password`: (String, required) Corresponding account password.
* **Expected Response Code:** `200`  
  * *HTTP Protocol Status:* `200 OK`
  * *Payload `responseCode`:* `200`
* **Official Documentation Response:**
  * `Response Message: User exists!`
* **Sample Response Body:**
```json
{
  "responseCode": 200,
  "message": "User exists!"
}
```

---

### API 8: POST To Verify Login without email parameter
* **Endpoint URL:** `https://automationexercise.com/api/verifyLogin`
* **HTTP Method:** `POST`
* **Request Parameters:**
  * `password`: (String, required) Account password (`email` parameter omitted).
* **Expected Response Code:** `400`  
  * `[NEEDS_CLARIFICATION]` *HTTP Protocol Status vs JSON Response Code:* The official documentation specifies `Response Code: 400`. The live server returns HTTP header status `200 OK` with JSON field `"responseCode": 400`.
* **Official Documentation Response:**
  * `Response Message: Bad request, email or password parameter is missing in POST request.`
* **Sample Response Body:**
```json
{
  "responseCode": 400,
  "message": "Bad request, email or password parameter is missing in POST request."
}
```

---

### API 9: DELETE To Verify Login
* **Endpoint URL:** `https://automationexercise.com/api/verifyLogin`
* **HTTP Method:** `DELETE`
* **Request Parameters:**
  * None
* **Expected Response Code:** `405`  
  * `[NEEDS_CLARIFICATION]` *HTTP Protocol Status vs JSON Response Code:* The official documentation specifies `Response Code: 405`. The live server returns HTTP header status `200 OK` with JSON field `"responseCode": 405`.
* **Official Documentation Response:**
  * `Response Message: This request method is not supported.`
* **Sample Response Body:**
```json
{
  "responseCode": 405,
  "message": "This request method is not supported."
}
```

---

### API 10: POST To Verify Login with invalid details
* **Endpoint URL:** `https://automationexercise.com/api/verifyLogin`
* **HTTP Method:** `POST`
* **Request Parameters:**
  * `email`: (String, required) Invalid / unregistered user email.
  * `password`: (String, required) Invalid password.
* **Expected Response Code:** `404`  
  * `[NEEDS_CLARIFICATION]` *HTTP Protocol Status vs JSON Response Code:* The official documentation specifies `Response Code: 404`. The live server returns HTTP header status `200 OK` with JSON field `"responseCode": 404`.
* **Official Documentation Response:**
  * `Response Message: User not found!`
* **Sample Response Body:**
```json
{
  "responseCode": 404,
  "message": "User not found!"
}
```

---

### API 11: POST To Create/Register User Account
* **Endpoint URL:** `https://automationexercise.com/api/createAccount`
* **HTTP Method:** `POST`
* **Request Parameters:**
  * `name`: (String, required) User full display name
  * `email`: (String, required) Unique user email address
  * `password`: (String, required) Account password
  * `title`: (String, optional/required) Title (`Mr`, `Mrs`, `Miss`)
  * `birth_date`: (String, required) Day of birth (e.g. `01` - `31`)
  * `birth_month`: (String, required) Month of birth (e.g. `01` - `12`)
  * `birth_year`: (String, required) Year of birth (e.g. `1990`)
  * `firstname`: (String, required) User first name
  * `lastname`: (String, required) User last name
  * `company`: (String, optional) Company name
  * `address1`: (String, required) Street address line 1
  * `address2`: (String, optional) Street address line 2 / Suite
  * `country`: (String, required) Country (e.g. `United States`, `India`, `Canada`)
  * `zipcode`: (String, required) Zip / Postal code
  * `state`: (String, required) State / Province
  * `city`: (String, required) City name
  * `mobile_number`: (String, required) Phone number
* **Expected Response Code:** `201`  
  * `[NEEDS_CLARIFICATION]` *HTTP Protocol Status vs JSON Response Code:* The official documentation specifies `Response Code: 201`. The live server returns HTTP header status `200 OK` with JSON field `"responseCode": 201`.
* **Official Documentation Response:**
  * `Response Message: User created!`
* **Sample Response Body:**
```json
{
  "responseCode": 201,
  "message": "User created!"
}
```

---

### API 12: DELETE METHOD To Delete User Account
* **Endpoint URL:** `https://automationexercise.com/api/deleteAccount`
* **HTTP Method:** `DELETE`
* **Request Parameters:**
  * `email`: (String, required) Email address of account to delete
  * `password`: (String, required) Password of account to delete
* **Expected Response Code:** `200`  
  * *HTTP Protocol Status:* `200 OK`
  * *Payload `responseCode`:* `200`
* **Official Documentation Response:**
  * `Response Message: Account deleted!`
* **Sample Response Body:**
```json
{
  "responseCode": 200,
  "message": "Account deleted!"
}
```

---

### API 13: PUT METHOD To Update User Account
* **Endpoint URL:** `https://automationexercise.com/api/updateAccount`
* **HTTP Method:** `PUT`
* **Request Parameters:**
  * `name`: (String, required) User full display name
  * `email`: (String, required) Registered user email address
  * `password`: (String, required) Account password
  * `title`: (String, optional/required) Title (`Mr`, `Mrs`, `Miss`)
  * `birth_date`: (String, required) Day of birth
  * `birth_month`: (String, required) Month of birth
  * `birth_year`: (String, required) Year of birth
  * `firstname`: (String, required) User first name
  * `lastname`: (String, required) User last name
  * `company`: (String, optional) Company name
  * `address1`: (String, required) Street address line 1
  * `address2`: (String, optional) Street address line 2 / Suite
  * `country`: (String, required) Country
  * `zipcode`: (String, required) Zip / Postal code
  * `state`: (String, required) State / Province
  * `city`: (String, required) City name
  * `mobile_number`: (String, required) Phone number
* **Expected Response Code:** `200`  
  * *HTTP Protocol Status:* `200 OK`
  * *Payload `responseCode`:* `200`
* **Official Documentation Response:**
  * `Response Message: User updated!`
* **Sample Response Body:**
```json
{
  "responseCode": 200,
  "message": "User updated!"
}
```

---

### API 14: GET user account detail by email
* **Endpoint URL:** `https://automationexercise.com/api/getUserDetailByEmail`
* **HTTP Method:** `GET`
* **Request Parameters:**
  * `email`: (String, required) Registered user's email address.  
    * `[NEEDS_CLARIFICATION]` *Parameter Transmission Method:* As this endpoint uses HTTP `GET`, the parameter must be passed in the URL Query String (e.g., `?email=user@example.com`). If `email` query parameter is omitted, the API returns: `{"responseCode": 400, "message": "Bad request, email parameter is missing in GET request."}`.
* **Expected Response Code:** `200`  
  * *HTTP Protocol Status:* `200 OK`
  * *Payload `responseCode`:* `200`
* **Official Documentation Response:**
  * `Response JSON: User Detail`
* **Sample Response Body:**
```json
{
  "responseCode": 200,
  "user": {
    "id": 2954570,
    "name": "Test Engineer",
    "email": "user@example.com",
    "title": "Mr",
    "birth_day": "01",
    "birth_month": "01",
    "birth_year": "1990",
    "first_name": "Test",
    "last_name": "Engineer",
    "company": "QC Corp",
    "address1": "123 Test Street",
    "address2": "Suite 100",
    "country": "United States",
    "state": "New York",
    "city": "New York",
    "zipcode": "10001"
  }
}
```

---

## Items Flagged with `[NEEDS_CLARIFICATION]`

1. **HTTP Response Status Header vs Payload `responseCode`:**
   * *Issue:* The official site lists Expected Response Codes as `405` (API 2, 4, 9), `400` (API 6, 8), `404` (API 10), and `201` (API 11). However, the live web server actually responds with HTTP status header `200 OK` for all these cases, embedding the documented code within the JSON response body key `responseCode`.
   * *Clarification Needed:* In automated API test assertions, should we assert the HTTP protocol status header (`resp.status == 200`), or assert the JSON body property (`resp.json()["responseCode"] == 400|404|405|201`), or assert both?

2. **API 14 Parameter Protocol:**
   * *Issue:* The site specifies `GET` method and lists `Request Parameters: email` without explicitly stating that it must be provided as a query string parameter (`?email=...`).
   * *Clarification Needed:* Standardized as `?email=<value>` in the query string based on live verification.

3. **Field Naming Discrepancies Between Registration (API 11/13) and Retrieval (API 14):**
   * *Issue:* Input parameters for API 11 and API 13 use:
     * `birth_date` -> Returned as `birth_day` in API 14
     * `firstname` -> Returned as `first_name` in API 14
     * `lastname` -> Returned as `last_name` in API 14
     * `mobile_number` -> Not returned in the API 14 `user` object
   * *Clarification Needed:* Automated schema contract tests must account for this field name mapping difference between create/update payloads and read payloads.
