const mongoose = require('mongoose');

// Mock models for testing
const User = {
  findOne: jest.fn(),
  save: jest.fn()
};

const Site = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn()
};

const Backlink = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn()
};

const Keyword = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn()
};

const Activity = {
  find: jest.fn(),
  save: jest.fn()
};

const Setting = {
  findOne: jest.fn(),
  save: jest.fn()
};

module.exports = {
  User,
  Site,
  Backlink,
  Keyword,
  Activity,
  Setting
};