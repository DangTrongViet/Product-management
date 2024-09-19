const mongoose = require("mongoose");
const ordersSchema = new mongoose.Schema(
    {
        // user_id: String,
        car_id: String,
        userInfo:{
            fullName: String,
            phone: String,
            address: String
        },
        products:[
            {
            product_id: String,
            price: Number,
            discountPercentage: Number,
            quantity:Number
            }
        ],
        deleted:
        {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true,
    }


);

const Order = mongoose.model("Order", ordersSchema, "orders");
module.exports = Order;