import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterUserDto } from "src/users/dto/user.dto";
import { LoginUserDto } from "src/users/dto/login.dto";
import { UsersService } from "src/users/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    // Register method
    async register(registerUserDto: RegisterUserDto) {
        const exists = await this.userService.findUserByEmail(registerUserDto.email);
        if (exists) throw new BadRequestException("Email already exists");

        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
        const user = await this.userService.register({
            ...registerUserDto,
            password: hashedPassword,
        });

        const { password, ...userWithoutPassword } = user;
        return {
            message: 'User registered successfully',
            user: userWithoutPassword,
        };
    }

 async login(loginUserDto: LoginUserDto) {
    // 1️⃣ Find the user by email
    const exists = await this.userService.findUserByEmail(loginUserDto.email);
    if (!exists) throw new UnauthorizedException("Email not found");

    // 2️⃣ Compare password
    const check = await bcrypt.compare(loginUserDto.password, exists.password);
    if (!check) throw new UnauthorizedException("Invalid credentials");

    // 3️⃣ Update FCM token if provided
    if (loginUserDto.fcmToken) {
        await this.userService.updateUser(exists.id, { fcmToken: loginUserDto.fcmToken });
        exists.fcmToken = loginUserDto.fcmToken; // keep the updated token in object for return
    }

    // 4️⃣ Generate JWT token
    const token = await this.jwtService.signAsync({
        sub: exists.id,
        email: exists.email,
        role: exists.role,
    });

    // 5️⃣ Return user object including FCM token
    return {
        message: 'Login successful',
        token,
        user: {
            id: exists.id,
            name: exists.name,
            email: exists.email,
            role: exists.role,
         
        },
    };
}
}