import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
    private customers: Customer[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'Jon.Doe@gmail.com',
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'Jane.Doe@gmail.com',
        },
    ]

    getCustomerById(id: number) {
        return this.customers.find(customer => customer.id === id);
    }

    searchCustomerById(id: number) {
        return `Customer with id ${id} not found`;
    }

    createCustomer(data: CreateCustomerDto) {
        this.customers.push(data)
    }

    getAllCustomers() {
        return this.customers;
    }
}
