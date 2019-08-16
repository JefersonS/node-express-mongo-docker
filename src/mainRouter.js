import express from 'express';
import namesRouter from './services/names/router'

const router = express.Router();

router.get('/', (req, res) => {
  res.render('layout');
});

router.use('/services', namesRouter);

export default router;