import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
// import './Dropdown.scss';

interface IDropdownProps {
  items: Array<{ id: number; title: string }>;
  handleSelect: (id: number) => void;
  handleClose: () => void;
}

export function Dropdown({ items, handleSelect, handleClose }: IDropdownProps) {
  return (
    <div className="dropdown" role="menu">
      <ul>
        {items.map((item) => (
          <li key={item.id} className="dropdown-item" onClick={() => handleSelect(item.id)}>
            {item.title}
          </li>
        ))}
      </ul>

      <button onClick={handleClose} className="dropdown-close-btn">
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
}
