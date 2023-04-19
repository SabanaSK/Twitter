import express from 'express';

import usersRoutes from './routes/users.js';



const app = express();

const PORT = 8080;

const staticPath = url.fileURLToPath(new URL('../static', import.meta.url))



app.use(express.static(staticPath))
app.use(express.json())
app.use(logger)
app.use('/api/users', usersRoutes)



app.listen (PORT, () => {
  
  console.log(`Server is running on port ${PORT}`);
});

export default app