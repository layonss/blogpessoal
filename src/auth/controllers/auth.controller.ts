import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../service/auth.service";

@ApiTags('Usuario')
@Controller('/auth')
export class AuthController{
    constructor(private authservice: AuthService){}

    @UseGuards(LocalAuthGuard)
    @HttpCode (HttpStatus.OK)
    @Post('/logar')
    async login(@Body() user: UsuarioLogin): Promise <any> {
        return this.authservice.login(user)
    }
}