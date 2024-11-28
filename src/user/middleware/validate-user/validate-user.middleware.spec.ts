import { ValidateUserMiddleware } from './validate-user.middleware';

describe('ValidateUserMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateUserMiddleware()).toBeDefined();
  });
});
