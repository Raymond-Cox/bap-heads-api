jest.mock('axios')
jest.mock('mongoose', () => {
  const mocked = jest.createMockFromModule('mongoose')
  return {
    ...mocked,
    model: jest.fn().mockImplementation(() => ({
      createIndexes: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
    })),
  }
})
