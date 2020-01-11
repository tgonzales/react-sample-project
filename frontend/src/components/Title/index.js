import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

export default function Title({ text, icon }) {
  return (
    <>
      <Icon type={icon} theme="outlined" style={{ marginRight: '5px'}} />
        {text}
    </>
  );
}

Title.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string
};

/** Default Proptypes */
Title.defaultProps = {
  text: 'Bem vindo ...',
  icon: 'save'
};