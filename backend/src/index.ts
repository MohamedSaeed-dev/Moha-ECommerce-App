import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './Routes/authRoutes'
import customerRoutes from './Routes/customerRoutes'
import categoryRoutes from './Routes/categoryRoutes'
import productRoutes from './Routes/productRoutes'
import cartRoutes from './Routes/cartRoutes'



const app = express();


dotenv.config();
if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT, 10)

app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:3000",
  })
);
app.use(cookieParser())
app.use(express.json());

app.use('/', authRoutes)
app.use('/customers', customerRoutes)
app.use('/categories', categoryRoutes)
app.use('/carts', cartRoutes)
app.use('/products', productRoutes)

app.listen(PORT, () => {
    console.log(`The host is running on ${PORT} `);
})