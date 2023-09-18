import {useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'

const LivrosCadastro = () => {
  
  const [livro, setLivro] = useState([])

  async function createLivro(){
    const body = {
        bookId: Number(livro.bookId),
        title: livro.title,
        pageCount: Number(livro.pageCount),
        codeISBN: livro.codeISBN,
        publisher: livro.publisher
      }

      if(isNaN(livro.pageCount)) {
        return alert("400 - O campo \"Id\" deve ser preenchido com apenas números!");
      }

      if(isNaN(livro.pageCount)) {
        return alert("400 - O campo \"Número de Páginas\" deve ser preenchido com apenas números!");
      }

      if(isNaN(livro.codeISBN)) {
        return alert("400 - O campo \"ISBN\" deve ser preenchido com apenas números!");
      }

    if(livro.bookId!=undefined && livro.bookId!='' && livro.title!=undefined && livro.title!='' && livro.pageCount!=undefined && livro.pageCount!='' && livro.codeISBN !=undefined && livro.codeISBN !='' && livro.publisher !=undefined && livro.publisher !=''){
        await LivrosService.createLivro(body)
        .then((response)=>{
          alert(response.data.message);
          document.getElementById('formulario').reset();
        })
        .catch(({response:{data,status}})=>{
          alert(`${status} - ${data.message}`)      
        });
      }
  }

  return (
  <>
    <Header/>    
    <SubmenuLivros/>
    <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>          
          <form id="formulario" onSubmit={(e) => e.preventDefault()}>
          <div className='form-group'>
            <label>Id</label>
            <input type="text" id='id' required onChange={(event)=>{ setLivro({...livro, bookId: event.target.value})}} ></input>
          </div>
          <div className='form-group'>
            <label>Titulo</label>
            <input type="text" id='titulo' required onChange={(event)=>{ setLivro({...livro, title: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>Número de Páginas</label>
            <input type="text" id='num' required onChange={(event)=>{ setLivro({...livro, pageCount: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>ISBN</label>
            <input type="text" id='isbn' required onChange={(event)=>{ setLivro({...livro, codeISBN: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>Editora</label>
            <input type="text" id='editora' required onChange={(event)=>{ setLivro({...livro, publisher: event.target.value})}}></input>
          </div> 
          <div className='form-group'>
            <button onClick={()=>{
              createLivro()
            }}>Cadastrar Livro</button>  
          </div>         
          </form>
        </div>
    </div>
  </>)
  
}

export default LivrosCadastro