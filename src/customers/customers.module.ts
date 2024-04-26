import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(ValidateCustomerMiddleware).forRoutes('customers');
    consumer
     .apply(ValidateCustomerMiddleware, ValidateCustomerAccountMiddleware)
     .exclude(
      {
        path: '/api/customers/create',
        method: RequestMethod.POST,
      },
      {
        path: '/api/customers',
        method: RequestMethod.GET,
      }
     )
  }
}
