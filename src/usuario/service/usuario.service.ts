import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Bcrypt } from "../../auth/bcrypt/bcrypt"
import { Usuarios } from "../entities/usuario.entity"

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuarios)
        private usuarioRepository: Repository <Usuarios>,
        private bcrypt: Bcrypt 
    ) {}

    async findByUsuario(usuario:string): Promise<Usuarios | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }
    async findAll(): Promise<Usuarios[]> {
        return await this.usuarioRepository.find({
            relations: {
                postagem: true 
            }
        })
    }
    async findById(id: number): Promise <Usuarios> {
        let usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        })
        if(!usuario)
        throw new HttpException ("Usuario não encontrado", HttpStatus.NOT_FOUND)

        return usuario
    }
    async create(usuario: Usuarios): Promise <Usuarios> {
        let buscarUsuario = await this.findByUsuario(usuario.usuario) 

        if(!buscarUsuario){
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)

            return await this.usuarioRepository.save(usuario)
        }
        throw new HttpException ('O Usuario já está cadastrado', HttpStatus.BAD_REQUEST)
    }
    async update(usuario: Usuarios): Promise <Usuarios> {
        let updateUsuario: Usuarios = await this.findById(usuario.id)
        let buscarUsuario = await this.findByUsuario(usuario.usuario)

        if(!updateUsuario)
        throw new HttpException('Usuario não existe', HttpStatus.NOT_FOUND)

        if(buscarUsuario && buscarUsuario.id !== usuario.id) 
        throw new HttpException('Usuario já cadastrado', HttpStatus.BAD_REQUEST)

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario)
    }
}