import { Body, Controller, Get, HttpException, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {} 

    @Get(':id')
    getCustomers(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request, 
        @Res() res: Response
    ){
        const customer = this.customersService.getCustomerById(id);
        if (customer) {
            return res.send(customer);
        } else {
            res.status(404).send({ message: 'Customer not found'})
        }
    }

    @Get('/search/:id')
    searchCustomerById(@Param('id', ParseIntPipe) id: number) {
        const customer = this.customersService.searchCustomerById(id);
        if (customer) {
            return customer;
        } else {
            throw new HttpException('Customer not found', 404);
        }
    }

    @Get('')
    getAllCustomers() {
        return this.customersService.getAllCustomers();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body () data: CreateCustomerDto) {
        return this.customersService.createCustomer(data);
    }
}
