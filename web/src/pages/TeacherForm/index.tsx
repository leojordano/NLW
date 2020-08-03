import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg'
import logoImg from '../../assets/images/logo.svg'

import PageHeader from '../../components/PageHeader';

import './styles.css'
// import { Container } from './styles';

const TeacherForm: React.FC = () => {
  return (
      <div id="page-teacher-form" className="container">
        <PageHeader title='Que incrível que você quer dar aulas.' />
      </div>
  );
}

export default TeacherForm;