import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCurrentUserByContext = (context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  console.log('request', request.user);
  return request.user.userId;
};

export const CurrentUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
  },
);
