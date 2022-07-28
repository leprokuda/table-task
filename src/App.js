import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from './table/table'
import Paginator from './pagination/pagination'
import './css/App.css'

function App() {

  // Сохраняем бд на сервере в переменную
  const base = ' https://jsonplaceholder.typicode.com/posts'
  
  const [data, setData] = useState([])
  const [directionSort, setDirectionSort] = useState(true)
  const [totalCountRow, setTotalCountRow] = useState(0)
  const [totalCountPage, setTotalCountPage] = useState(0)
  const [currentPageNumber, setCurrentPageNumber] = useState(null)
  const [disabledNextBtn, setDisabledNextBtn] = useState('page-item')
  const [disabledPreviousBtn, setDisabledPreviousBtn] = useState('page-item')
  const [activeCurrentPage, setActiveCurrentPage] = useState('page-item')
  const [searchText, setSearchText] = useState('')

  const limitCountRow = 10

  const onSearchSend = (text) => {
    setSearchText(text)
  }

  // сортируем данные от большего к меньшему и по алфавиту
  const sortData = (field) => {
    const copyData = data.concat()
    let sortData

    directionSort
    ? sortData = copyData.sort((a, b) => {
      return a[field] > b[field] ? 1 : -1
    })
    : sortData = copyData.reverse((a, b) => {
      return a[field] > b[field] ? 1 : -1
    })

    setData(sortData)
    setDirectionSort(!directionSort)
  }

  // фильтруем данные по введенному тексте в input
  const getFilteredData = () => {
    if (!searchText) {
      return data
    }
    return data.filter(
      el => {
        return el['title'].toLowerCase().includes(searchText.toLowerCase())
        || el['body'].toLowerCase().includes(searchText.toLowerCase())
      }
    )
  }

  const filteredData = getFilteredData()

  // получаем по 10 строк на странице
  const lastBlockRow = currentPageNumber * limitCountRow
  const firstBlockRow = lastBlockRow - limitCountRow
  const currentBlockRows = filteredData.slice(firstBlockRow, lastBlockRow)

  const currentPage = (pg) => {
    setCurrentPageNumber(pg)
    setDisabledNextBtn('')
    setDisabledPreviousBtn('')
    setActiveCurrentPage('active')
  }

  // получаем количество страниц, на основании данных и выводим их
  useEffect(() => {
    setTotalCountRow(filteredData.length)
    const getTotalCountPage = Math.ceil(totalCountRow/limitCountRow)
    setTotalCountPage(getTotalCountPage)
  }, [setTotalCountRow, filteredData.length, totalCountRow])

  let pages = []
  for (let i = 1; i <= totalCountPage; i++) {
    pages.push(i)
  }

  // получаем данные с сервера
  useEffect(() => {
    axios(base)
    .then(
      (res) => {
        setData(res.data)
      }
    )
  }, [])

  // переключаем страницы с помощью кнопок + меняем состояние кнопок Назад/Далее
  const onNextClick = () => {
    if (currentPageNumber >= totalCountPage) {
      setDisabledNextBtn('disabled')
      return
    }
    setCurrentPageNumber(currentPageNumber + 1)
  }

  const onPreviousClick = () => {
    if (currentPageNumber <= 1) {
      setDisabledPreviousBtn('disabled')
      return
    }
    setCurrentPageNumber(currentPageNumber - 1)
  }


  return (
    <div className="container">
      {
        <Table
          data={currentBlockRows}
          sortData={sortData}
          directionSort={directionSort}
          onSearchSend={onSearchSend}
        />
      }
      <Paginator
        pages={pages}
        currentPage={currentPage}
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        disabledNextBtn={disabledNextBtn}
        disabledPreviousBtn={disabledPreviousBtn}
        activeCurrentPage={activeCurrentPage}
        currentPageNumber={currentPageNumber}
      />
    </div>
  );
}



export default App;
