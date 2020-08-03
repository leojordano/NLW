import React from 'react';
import { Link } from 'react-router-dom';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

const TeacherItem: React.FC = () => {
  return (
          <article className="teacher-item">
             <header>
             <img 
                src="https://avatars1.githubusercontent.com/u/41167816?s=460&u=9dbbec5178dccf734fdd5986be224ce770e2eede&v=4"
                alt="Leonardo Jordano"/>

                  <div>
                    <strong>Leonardo Jordano</strong>
                    <span>Quimica</span>
                  </div>
             </header>

             <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit.
               <br/><br/>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure repudiandae accusamus debitis
             </p>

             <footer>
                <p>
                  Preço/hora
                  <strong>R$ 80,00</strong>
                </p>
                <button>
                  <img src={whatsappIcon} alt="whatsapp"/>
                  Entrar em contato
                </button>
             </footer>
          </article>
  );
}

export default TeacherItem;