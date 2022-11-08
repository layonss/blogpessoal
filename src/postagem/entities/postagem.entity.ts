import { IsNotEmpty, MaxLength } from "class-validator";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuarios } from "../../usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity ({name:"tb_postagens"})
export class Postagem{
   
    @PrimaryGeneratedColumn()
    id: number
   
    @IsNotEmpty()
    @MaxLength(100)
    @Column({length: 100, nullable:false})
    titulo: string

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    texto: string

    @UpdateDateColumn()
    data: Date

    @ApiProperty({type: () => Tema })
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })

        tema: Tema

        @ApiProperty({type: () => Usuarios })
        @ManyToOne (() => Usuarios, (usuarios) => usuarios.postagem, {
            onDelete: "CASCADE"
        })
        usuarios: Usuarios
    }

