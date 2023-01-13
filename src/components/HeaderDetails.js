import React from 'react';
import { GrHomeRounded } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';

export default function HeaderDetails() {
  const { push } = useHistory();
  const handleHome = () => {
    push('/meals');
  };
  return (
    <GrHomeRounded data-testid="homeBtn" onClick={ handleHome } />
  );
}
