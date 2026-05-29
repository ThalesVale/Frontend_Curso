import styles from './styles.module.css'
import {Container} from '../components/Container'
import { InputPadrao } from '../components/Inputpadrao'
import { BotaoPadrao } from '../components/BotaoPadrao'
import { useEffect, useState } from 'react';
interface DadosCurso{
    nomecurso: string;
    periodo:string;

}
interface MainFormProps{
    aoAdicionar:(curso:any)=> void;
    aoAtualizar: (curso:any)=> void;
    cursoEmEdicao:any|null
}
export function MainForm({aoAdicionar,aoAtualizar,cursoEmEdicao}: MainFormProps){
    const[dadosCurso, setDadosCurso]=useState<DadosCurso>({nomecurso:'', periodo:''})
    useEffect(()=>{
        if(cursoEmEdicao){
            setDadosCurso({
                nomecurso: cursoEmEdicao.nome,
                periodo: cursoEmEdicao.periodo
            });
        }else{
            setDadosCurso({nomecurso:'', periodo:''})
        }
    },[cursoEmEdicao]);
    const lidarComMudança = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        setDadosCurso({
            ...dadosCurso,
            [e.target.name]: e.target.value
        });
    };
    const cadastrarCurso = (e:any) =>{
        e.preventDefault()
        if(cursoEmEdicao){
            const cursoAtualizado = {
                id:cursoEmEdicao.id,
                nome: dadosCurso.nomecurso,
                periodo: dadosCurso.periodo
            }
            console.log("alteracção em formato JSON:\n",
                JSON.stringify(cursoAtualizado,null,2))
            aoAtualizar(cursoAtualizado);
        }else{
            const cursoNovo = {
                id: "",
                nome: dadosCurso.nomecurso,
                periodo:dadosCurso.periodo
            }
            console.log("Inclusão em formato JSON:\n",
                JSON.stringify(cursoNovo,null,2))
                aoAdicionar(cursoNovo)
        }
            setDadosCurso({nomecurso:'', periodo: ''})
    }
    return(
        <>
            <Container>
                    <section className={styles.formularioContainer}>
                        <h2 className={styles.titulo}>
                            Main Form
                            {cursoEmEdicao? 'Editar Curso': 'Cadastrar Novo Curso'}
                        </h2>
                        <form onSubmit={cadastrarCurso}>
                            <div className= {styles.pularLinha}>
                                <label htmlFor="nomecurso" className={styles.label}>Nome curso</label>
                                <InputPadrao 
                                type = "text"
                                id = "nomecurso"
                                name = "nomecurso"
                                placeholder='EX: Devops'
                                value={dadosCurso.nomecurso}
                                onChange = {lidarComMudança} 
                                required/>
                            </div>{/** Fim da div*/}
                            <div className={styles.pularLinha}>
                                <label htmlFor = "periodo" className={styles.label}>Período</label>
                                <select name='' id='' className={styles.estiloTabela}>
                                    <option value= ""> Selecione um Período</option>
                                    <option value= ""> Matutino</option>
                                    <option value= ""> Vespertino</option>
                                    <option value= ""> Noturno</option>
                                    <option value= ""> Integral</option>
                                </select>{/** Fim do select*/}
                            </div>{/** Fim da div do select*/}
                            <div>
                                <BotaoPadrao type ="submit"> Provisorio
                                {cursoEmEdicao? 'Salvar Alteração': 'Inserir Curso'}
                                </BotaoPadrao>
                            </div>{/** Fim da div do botao*/}
                        </form> {/** Fim do formulario*/}
                    </section> {/** Fim da section*/}
            </Container>
        </>
    )
}