import express from 'express';
import Name from '../../models/namesModel';
import {
  deleteName,
  getName,
  getNames,
  updateName,
  getNamesRegExp,
  putName
} from './names';
import { debug, sendResponse } from '../../common/utils.js';
import { validateRequest } from '../../common/utils.js';

const router = express.Router();

router.get('/names/all', async (req, res) => {
  const [error, newName] = await getNames({ Name, debug })();
  sendResponse({ res })(newName, error);
});

router.put('/names', validateRequest(['id', 'name', 'position'], 'body', sendResponse), async (req, res) => {
  const [error, newName] = await updateName({ Name, debug })(req.body);
  sendResponse({ res })(newName, error);
});

router.post('/names', validateRequest(['name', 'position'], 'body', sendResponse), async (req, res) => {
  const [error, newName] = await putName({ Name, debug })(req.body);
  sendResponse({ res })(newName, error);
});

router.delete('/names', validateRequest(['id'], 'body', sendResponse), async (req, res) => {
  const [error, newName] = await deleteName({ Name, debug })(req.body);
  sendResponse({ res })(newName, error);
});

router.get('/names', validateRequest(['id'], 'query', sendResponse), async (req, res) => {
  const [error, newName] = await getName({ Name, debug })(req.query);
  sendResponse({ res })(newName, error);
});

router.get('/names/auto-complete', validateRequest(['name'], 'query', sendResponse), async (req, res) => {
  const [error, newName] = await getNamesRegExp({ Name, debug })(req.query);
  sendResponse({ res })(newName, error);
});

export default router;