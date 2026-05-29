import styles from './styles.module.css'
import { Container } from '../components/Container'
import { InputPadrao } from '../components/Inputpadrao';
import { Pencil, X } from 'lucide-react';

export interface Curso{
    id: string,
    nome: string,
    periodo:string;
}
interface ListarCursoProps{
    cursos:Curso[];
    aoEditar:(curso:Curso)=>void;
    aoExcluir: (id:string)=>void;
}
export function ListarCursos({cursos, aoEditar, aoExcluir}: ListarCursoProps){
return(

    <>
    <Container>
        <section className={styles.listarContainer}>
            <h2 className={styles.titulo}>Listar de Curso</h2>
            <div className={styles.buscarContainer}>
                <InputPadrao
                type = "text"
                placeholder='Buacr Curso pelo nome'/>
            </div>
            <table className={styles.tabela}>
                <thead>
                    <th>Curso</th>
                    <th>Período</th>
                    <th>Ações</th>
                </thead>
                <tbody>
                    {cursos.map((curso)=>(
                        <tr key = {curso.id}>
                            <td>{curso.nome}</td>
                            <td>{curso.periodo}</td>
                            <td>
                                <button
                                className={styles.actionButton}
                                title="Editar"
                                onClick={()=>aoEditar(curso)}>
                                    
                                </button>
                                <button 
                                className={styles.actionButton}
                                title="Excluir"
                                onClick={()=>aoExcluir(curso.id)}></button>
                                <span><Pencil size = {18}/></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    </Container>
        
    </>
    );
}