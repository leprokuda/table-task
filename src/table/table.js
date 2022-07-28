import React, { useState } from 'react'
import ArrowDown from '../icons/arrow-down'
import ArrowUp from '../icons/arrow-up'
import SearchForm from '../search/search'
import '../css/App.css'


const Table = ({sortData, data, directionSort, onSearchSend}) => {

  const [dataField, setDataField] = useState('')

  const ArrowDir = () => {
    return (directionSort ? <ArrowUp /> : <ArrowDown />)
  }
  const fieldSortData = (field) => {
    sortData(field)
    setDataField(field)
  }

  return (
    <div>
      <SearchForm
        onSearchSend={onSearchSend}
      />
      <table className="table">
        <thead>
          <tr>
            <th className='idColumn' onClick={() => { fieldSortData('id') }}>
              ID {dataField === 'id' ? <ArrowDir /> : <ArrowDown />}
            </th>
            <th className='titleColumn' onClick={() => { fieldSortData('title') }}>
              Заголовок {dataField === 'title' ? <ArrowDir /> : <ArrowDown />}
            </th>
            <th className='bodyColumn' onClick={() => { fieldSortData('body') }}>
              Описание {dataField === 'body' ? <ArrowDir /> : <ArrowDown />}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            item => (
              <tr key={item.id}>
                <td className='tbodyId'>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table