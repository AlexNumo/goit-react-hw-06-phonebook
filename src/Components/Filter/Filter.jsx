import { useDispatch, useSelector } from 'react-redux';

import { filterAction, getFilterValue } from '../../Redux/filterSlice';

export default function Filter() {
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const changeFilter = evt => dispatch(filterAction(evt.currentTarget.value));

  return (
    <label>
      <p>Find contacts by name</p>
      <input type="text" value={filter} onChange={changeFilter} />
    </label>
  );
}