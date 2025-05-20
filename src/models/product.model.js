const Pool = require('pg').Pool;

const pool = new Pool({
        id:{
            type: Number
        },
        name:{
            type: String,
            required: true
        },
        category:{
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        stock: {
        type: Number,
        required: true,
        },
        description: String
    },
    {timestamps: true}
)