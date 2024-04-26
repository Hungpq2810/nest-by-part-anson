import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumberString, ValidateNested, isNotEmpty } from "class-validator";
import { CreateAddressDto } from "./CreateAddress.dto";
import { Type } from "class-transformer";

export class CreateCustomerDto {

    @IsEmail()
    email: string;

    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;

    @ValidateNested()
    @Type(() => CreateAddressDto)
    @IsNotEmptyObject()
    address: CreateAddressDto;
}