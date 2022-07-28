import React from 'react'
import '../css/App.css'

const Paginator = ({
  pages,
  currentPage,
  onNextClick,
  onPreviousClick,
  disabledPreviousBtn,
  disabledNextBtn,
  activeCurrentPage,
  currentPageNumber
}) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${disabledPreviousBtn}`}>
          <a className="page-link text-secondary" href="#" tabIndex="-1" onClick={() => {onPreviousClick()}}>Назад</a>
        </li>
        {
          pages.map(p => {
            return (
              <li className={(currentPageNumber === p) ? `page-item ${activeCurrentPage}` : `page-item`} key={p}>
                <a className="page-link text-secondary" href="#" onClick={() => {currentPage(p)}}>{p}</a>
              </li>
            )
          })
        }
        <li className={`page-item ${disabledNextBtn}`}>
          <a className="page-link text-secondary" href="#" onClick={() => {onNextClick()}}>Далее</a>
        </li>
      </ul>
    </nav>
  )
}

export default Paginator