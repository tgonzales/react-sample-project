import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { api } from '../../services';
import { setTools, deleteTool } from '../../store/modules/tools/actions';
import { SearchBar, ToolCard } from '../../components';
import { AddTool } from '../';
import { ActionBarContainer, Tools } from './styles';

export default function Home() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({});
  const [modal, setModal] = useState(false);
  const tools = useSelector(state => state.tools);

  const refreshTools = useCallback(tool => dispatch(setTools(tool)), [
    dispatch,
  ]);

  const removeTool = useCallback(id => dispatch(deleteTool(id)), [dispatch]);

  useEffect(() => {
    (async function searchTools() {
      const { query = '', onlyTags = false } = search;

      const paramName = onlyTags ? 'tags_like' : 'q';
      const queryString = `${paramName}=${query}`;
      const path = query ? `/tools?${queryString}` : `/tools`;

      const res = await api.get(path);
      refreshTools(res.data);
    })();
  }, [search, refreshTools]);

  async function handleRemoveTool({ id }) {
    await api.delete(`/tools/${id}`);
    removeTool(id);
  }

  function openModal() { setModal(true) }

  return (
    <>
      <ActionBarContainer>
        <SearchBar checkboxLabel="procurar por tags" onSubmit={setSearch} />
        <Button
          //type="primary"
          size="large"
          icon="plus"
          theme="outlined"
          onClick={openModal}>
            adicionar
        </Button>
      </ActionBarContainer>

      <Tools data-testid="tools">
        {tools.map(tool => (
          <ToolCard
            key={String(tool.id)}
            tool={tool}
            markTextAt={search.query}
            data-testid={`toolcard-${tool.id}`}
            onRemove={handleRemoveTool}
          />
        ))}
      </Tools>
        {modal && <AddTool setModal={setModal} />}
    </>
  );
}

