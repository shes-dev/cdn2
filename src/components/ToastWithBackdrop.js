import { useEffect } from 'react';
import './ToastWithBackdrop.css';

export default function ToastWithBackdrop(props) {
  useEffect(() => {
    const textDiv = document.querySelector('.toast');
    if (props.show) textDiv?.classList.add('show');
    else textDiv?.classList.remove('show');
  }, [props.show]);
  return (
    <article id="backdrop show">
      <div className="toast">
        <div className="textWrap">
          <h1>Welcome!</h1>
          <ul className='backdrop__ul'>
            <li>Each card describes a project.</li>
            <li>Project pics are randomly fetched from Giphy.com.</li>
            <li>Feel free to hover over them.</li>
            <li>Click "Open" for a demo.</li>
            <li>Click "Git" for the source code.</li>
            <br />Enjoy :)</ul>
        </div>
      </div>
    </article>);
}


