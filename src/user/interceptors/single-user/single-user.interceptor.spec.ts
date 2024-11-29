import { SingleUserInterceptor } from './single-user.interceptor';

describe('SingleUserInterceptor', () => {
  it('should be defined', () => {
    expect(new SingleUserInterceptor()).toBeDefined();
  });
});
