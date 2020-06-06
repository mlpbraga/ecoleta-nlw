import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.svg';
// interface HeaderProps {
//   title: string;
// }

const Home: React.FC = (props) => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt='Ecoleta'/>
        </header>
        <main>
          <h1>Seu marketplace de coleta de resíduos.</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de form eficiente.</p>

          <Link to='/create-point'>
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um onto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
}


export default Home;