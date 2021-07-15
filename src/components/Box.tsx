import React from 'react';

import PropsWithChildren from '../interfaces/Props';
import IBoxSizeProps from '../interfaces/Props';

import '../styles/Box.styl';

const Box = ({ children, size }: IBoxSizeProps | PropsWithChildren) => {
  return <section className={`box box-${size}`}>{children}</section>;
};

export default Box;
