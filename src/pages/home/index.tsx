import {HomeIcon} from 'lucide-react'
import { Container } from '../../components/Container'
import { BotaoPadrao } from '../../components/BotaoPadrao'
import { InputPadrao } from '../../components/Inputpadrao'
import { MainForm } from '../../MainForm'
import { ListarCursos, type Curso } from '../../ListaCurso'
import { useState,useEffect } from 'react'
export function Home(){
    const [cursos,setCursos]=useState<Curso[]>(()=>{
        const cursosSalvos = localStorage.getItem('cursosLocalStorage')
        if(cursosSalvos){
            return JSON.parse(cursosSalvos)
        }
        return [];
    });

    const[cursosEmEdicao,setCursoEmEdicao] = useState<Curso|null>(null);
    useEffect(()=>{
        localStorage.setItem('cursosLocalStorage', JSON.stringify(cursos))
    },[cursos])



    const adicionarCurso = (novoCurso:Curso)=>{
        setCursos((cursosAtuais)=>{
            const maiorIdAtual = cursosAtuais.length > 0
            ? Math.max(...cursosAtuais.map(curso => Number(curso.id))) : 0;
            const cursoFinal = {...novoCurso,id: String(maiorIdAtual + 1)};
            return [...cursosAtuais,cursoFinal]

        })
    }


    const excluirCurso = (id:string) => {
    const cursosAtualizados = cursos.filter((curso) => String(curso.id) !== String(id));
    setCursos(cursosAtualizados);
}   


    const editarCurso = (curso:Curso)=>{
        setCursoEmEdicao(curso)
    }

    const atualizarCurso = (cursoAtualizado: Curso) => {
        const cursosAtualizados = cursos.map((curso) =>
            String(curso.id) === String(cursoAtualizado.id)
                ? cursoAtualizado: curso);
}
/**Fim de AtualizarCurso */


    









    return(
        <>
        <Container>
            <MainForm
            aoAdicionar={adicionarCurso}
            aoAtualizar={atualizarCurso}
            cursoEmEdicao={cursosEmEdicao}
            />
        
            <ListarCursos
            cursos={cursos}
            aoEditar={editarCurso}
            aoExcluir={excluirCurso}
            />
        </Container>

       
  
        
        </>
    )
}