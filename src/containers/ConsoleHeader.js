import React, { useContext } from 'react'
import { GlobalContext } from '../store/GlobalStore';
import RunCode from '../utils/RunCode';
import Tabs from '../utils/Tabs';

export default function ConsoleHeader() {
  const { gstate, dispatch } = useContext(GlobalContext);
  const { isRunning, tabIndex } = gstate;

  const onRun = async () => {
    dispatch({ type: 'isRunning', payload: { isRunning: true } });
    await RunCode(Tabs.getContent(), gstate.language.name);
  }

  const onTab = (index) => {
    dispatch({ type: 'update-tab-index', payload: { tabIndex: index } })
  }

  const onAddTab = () => {
    Tabs.addOne();
    dispatch({ type: 'update-tab-index', payload: { tabIndex: 0 } })
  }

  const onRemoveTab = (index, title) => {
    if (window.confirm('Are you sure to delete ?' + title)) {
      dispatch({ type: 'update-tab-index', payload: { tabIndex: 0 } })
      Tabs.remove(index)
    }
  }

  const onUpdate = (e) => {
    Tabs.updateTabTitle(tabIndex, e.target.innerText)
  }

  return <header className="w-100 d-flex justify-between">
    <ul className="bg-dark d-flex align-center text-uppercase">
      <li className='pl-3 pr-3 nowrap'>
        <span className="circle bg-danger"></span>
        <span className="circle bg-warning"></span>
        <span className="circle bg-green"></span>
      </li>

      {Tabs.getAll().map((tab, i) => <li key={i} className={'h-100 btn nowrap' + (tabIndex === i ? ' active-tab' : '')}>
        <span onClick={() => { onTab(i); }} contentEditable={i !== 0}
          onInput={onUpdate} suppressContentEditableWarning="true">{tab.title}</span>
        {i !== 0 && <span onClick={() => { onRemoveTab(i, tab.title); }}><i className='fa fa-times ml-2'></i></span>}
      </li>)}
      <li onClick={onAddTab} className='h-100 btn'><i className='fa fa-plus'></i></li>
    </ul>

    <ul className="h-100 d-flex">
      <li className="btn" title="Run Code" onClick={onRun} disabled={isRunning}>
        <i className="fa fa-play mr-3"></i><span>run</span>
      </li>

    </ul>
  </header>
}
