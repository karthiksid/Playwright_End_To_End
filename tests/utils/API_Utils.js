class API_Utils {

    constructor(apiContext,loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload=loginPayload;
    }


    async getTokenLogin() {        
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayload,
            })        
        const loginResponseJson = await loginResponse.json();
        let token = loginResponseJson.token;
        console.log(token)
        return token;

    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayload,
            })        
        const loginResponseJson = await loginResponse.json();
        let token = loginResponseJson.token;
        console.log(token)
        return token;

    }

    async createOrder(orderPayload) {

        let response ={};
        response.token = await this.getToken()
        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'content-type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Encoding': 'gzip, deflate, br, zstd'
                },
            }
        )
        const orderResponseJson = await createOrderResponse.json()
        console.log(orderResponseJson)
        const createdOrderId = orderResponseJson.orders[0];
        response.createdOrderId=createdOrderId;
        return response;
    }
}

module.exports={API_Utils};