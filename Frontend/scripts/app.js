const paypalButtons = window.paypal.Buttons({
   style: {
        shape: "rect",
        layout: "vertical",
        color: "gold",
        label: "paypal",
    },
   message: {
        amount: 100,
    },
   async createOrder() {
        try {
            const pettition = await axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                "amount": {
                    "currency_code": "USD",
                    "value": `${localStorage.getItem('totalForPayPal')}`
                }
                }
            ],
            "application_context": {
                "return_url": "https://tusitio.com/retorno",
                "cancel_url": "https://tusitio.com/cancelado"
            }
            },{
                headers:{
                    Authorization: 'Bearer A21AAIeQlgoqeV77AwGUnwmGBlC5A_KUoWErx-_rh7FCLaPOHUkGKYutC7zow0ZAb8gxJipryLWbe694iieXfKeQeasuL0Liw'
                }
            }
            )

            const orderData = pettition.data

            if (orderData.id) {
                return orderData.id;
            }
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                : JSON.stringify(orderData);

            throw new Error(errorMessage);
        } catch (error) {
            console.error(error);
            // resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
        }
    },
   async onApprove(data, actions) {
        try {
            const response = await fetch(
                `/api/orders/${data.orderID}/capture`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const orderData = await response.json();

            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
            } else if (errorDetail) {
                throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`
                );
            } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData));
            } else {
                const transaction =
                    orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                    orderData?.purchase_units?.[0]?.payments
                        ?.authorizations?.[0];
                resultMessage(
                    `Transaction ${transaction.status}: ${transaction.id}<br>
          <br>See console for all available details`
                );
                console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2)
                );
            }
        } catch (error) {
            console.error(error);
            resultMessage(
                `Sorry, your transaction could not be processed...<br><br>${error}`
            );
        }
    },

   
});
paypalButtons.render("#paypal-button-container");

function resultMessage(message) {
    const container = document.querySelector("#result-message");
    container.innerHTML = message;
}