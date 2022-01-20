import { Perfil } from "./perfil";

export class Candidato {
    id: number;
    nome: string;
    perfil: Perfil;
    pretensao: number;
    descricao: string;
    curriculoBase64: string;
    curriculoNome: string;
  }
