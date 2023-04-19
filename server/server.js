import express from 'express';



const app = express();
const PORT = 8080;

const logger = (req, res, next) => {
  console.log(`${req.method}  ${req.url}`, req.body)
  next()
}

app.use(express.json())
app.use(logger)
app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});

export default app