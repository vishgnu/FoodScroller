import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import '../../styles/tokens.css';
import { ART } from '../index';

const root = createRoot(document.getElementById('r')!);
root.render(
  <>
    {ART.map((e) => (
      <div className="c" key={e.id}>
        {createElement(e.Component)}
        <div className="sc" />
        <div className="sc2" />
        <div className="cap">@placeholder.handle<br/>[PLACEHOLDER] caption line one that wraps across two lines here</div>
        <div className="rail">♥<br/>1.2M<br/>💬<br/>32K<br/>↗<br/>13K</div>
        <div className="l">{e.id}</div>
      </div>
    ))}
  </>,
);
