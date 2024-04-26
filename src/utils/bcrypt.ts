import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string): string {
    return bcrypt.hashSync(rawPassword, 10);
}

export function comparePassword(rawPassword: string, password: string) {
    return bcrypt.compareSync(rawPassword, password);
}