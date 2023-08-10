import PropTypes from 'prop-types';
import { RiSearchLine } from 'react-icons/ri';
import css from './Filter.module.css';

const Filter = ({ value, onChange, contacts }) => {
  return (
    <div className={css.searchbar__wrapper}>
      <RiSearchLine className={css.search__icon} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={`Search contact from ${contacts.length} contacts`}
        className={css.searchInput}
      />
    </div>
  );
};

Filter.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
