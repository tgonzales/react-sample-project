import React from 'react';
import { AutoForm } from 'uniforms-antd';
import { notification, Modal } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Title } from '../../components'
import { addTool } from '../../store/modules/tools/actions';
import { api } from '../../services';
import { CancelButton } from './styles';
import FormSchema from './formSchema'


export default function AddTool({ setModal }) {
  const dispatch = useDispatch();

  async function handleSave({ tags, ...inputs }) {
    console.log('inputs', inputs)
    try {
      const tags2arr = String(tags)
        .trim()
        .split(' ');

      const { data: tool } = await api.post('/tools', {
        ...inputs,
        tags: tags2arr,
      });
      await openNotification('success', `Tool ${tool.title} adicionado com sucesso`)
      dispatch(addTool(tool));
    } catch ({ response: { data } }) {
      let message = 'Desculpe, estamos com algum problema. Tente novamente!';

      if (data.message) {
        const { message: errorMessage } = data;
        message = errorMessage;
      }
      openNotification('warning', message)
    }

  }

  function redirectToBack() {
    setModal(false) 
  }

  function onSubmit(inputs) {
    handleSave(inputs)
    redirectToBack();
  }

  function openNotification(type, message) {
    notification[type]({
      message: `Notification`,
      description: message,
      placement: 'topRight',
    });
  };

  return (
    <Modal
      title={<Title text='Nova Ferramenta' ico='save' />}
      centered
      visible={true}
      onOk={redirectToBack}
      onCancel={redirectToBack}
      footer={[
        <CancelButton key={1} onClick={redirectToBack}>
          Cancel
        </CancelButton>
      ]}
    >
      <AutoForm schema={FormSchema} onSubmit={onSubmit} />
    </Modal>
  );
}

AddTool.propTypes = {
  setModal: PropTypes.func.isRequired,
};
