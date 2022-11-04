import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Usuarios } from "../entities/usuario.entity";
import { UsuarioService } from "../service/usuario.service";

@Controller('/usuarios')
export class UsuarioController{
    constructor(private readonly usuarioService: UsuarioService){}

    @UseGuards(JwtAuthGuard) 
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise <Usuarios[]>{
        return this.usuarioService.findAll()
    }
    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async create(@Body() usuario: Usuarios): Promise <Usuarios> {
        return this.usuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard) 
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuarios): Promise <Usuarios> {
        return this.usuarioService.update(usuario)
    }
}