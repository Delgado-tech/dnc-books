import {useEffect , useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { useParams } from 'react-router-dom'
import { LivrosService } from '../../api/LivrosService'

const LivrosEdicao = () => {  
  let {livroId} = useParams();

  const [livro, setLivro] = useState([])

  async function getLivro(){
    const {data} = await LivrosService.getLivro(livroId);
    setLivro(data[0])
  }

  async function editLivro(){
    const body = {
        bookId: Number(livro.bookId),
        title: livro.title,
        pageCount: Number(livro.pageCount),
        codeISBN: livro.codeISBN,
        publisher: livro.publisher
      }

    if(isNaN(livro.bookId)) {
      return alert("400 - O campo \"Id\" deve ser preenchido com apenas números!");
    }

    if(isNaN(livro.pageCount)) {
      return alert("400 - O campo \"Número de Páginas\" deve ser preenchido com apenas números!");
    }

    if(isNaN(livro.codeISBN)) {
      return alert("400 - O campo \"ISBN\" deve ser preenchido com apenas números!");
    }

    if(livro.bookId!=undefined && livro.bookId!='' && livro.title!=undefined && livro.title!='' && livro.pageCount!=undefined && livro.pageCount!='' && livro.codeISBN !=undefined && livro.codeISBN !='' && livro.publisher !=undefined && livro.publisher !=''){
      await LivrosService.updateLivro(Number(livro.bookId), body)
      .then((response)=>{
        alert(response.data.message);
      })
      .catch(({response:{data, status}})=>{
        alert(`${status} - ${data.message}`)      
      });
    }

  }

  useEffect(() => {
    getLivro()    
  }, [])  

  return (
  <>
    <Header/>    
    <SubmenuLivros/>
    <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario" onSubmit={(e) => e.preventDefault()}>
            <div className='form-group'>
              <label>Id</label>
              <input type="text" disabled required onChange={(event)=>{ setLivro({...livro, bookId: event.target.value})}} value={livro.bookId || ''}></input>
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" required onChange={(event)=>{ setLivro({...livro, title: event.target.value})}} value={livro.title || ''} ></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, pageCount: event.target.value})}} value={livro.pageCount || ''}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, codeISBN: event.target.value})}} value={livro.codeISBN || ''}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, publisher: event.target.value})}} value={livro.publisher || ''}></input>
            </div> 
            <div className='form-group'>
              <button onClick={()=>{
              editLivro()
            }}>Atualizar Livro</button>  
            </div>                   
          </form>
          </div>        
    </div>
  </>)
  
}

export default LivrosEdicao