import React from 'react';
import {v4} from 'uuid';
import style from './PageLocation.module.css';
import LocationItem from './LocationItem';

const PageLocation = (props) => {
    const {totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage, category, history, path} = props
    const uuid = v4;


    let disable = '';
    let pages = []
    let itemsLimit = 7;

    if(totalPages <= 1) {
        disable = style.Disable;
    }

    if(totalPages <= 7) itemsLimit = totalPages;

    const pagesLeft = totalPages - page;
    if(page <= 7 && totalPages <=7) {
        for (let i=0; i < itemsLimit ; i++) {
       
            if (page === i +1) {
                pages.push(<LocationItem path={path} key={uuid()} selected history={history} pageNumber={i+1} category={category}/>);
            }else {
                pages.push(<LocationItem path={path}  key={uuid()} history={history} pageNumber={i+1} category={category}/>);
            }

        }

    } else if (page < 5  ) {
        console.log('aq1')
        if (totalPages > 7) itemsLimit = 4
        for (let i=0; i < itemsLimit ; i++) {
       
            if (page === i +1) {
                pages.push(<LocationItem path={path} key={uuid()} selected history={history} pageNumber={i+1} category={category}/>);
            }else {
                pages.push(<LocationItem path={path}  key={uuid()} history={history} pageNumber={i+1} category={category}/>);
            }
            if(totalPages > 7 && i+1 === 4) {
                pages.push(<LocationItem path={path}  key={uuid()} history={history} pageNumber={i+2} category={category}/>);
                pages.push(<div key={uuid()}><p className={style.Dots}>...</p></div>);
                pages.push(<LocationItem path={path}  key={uuid()} history={history} pageNumber={totalPages} category={category}/>);
            }

        }
    } else if(page > 3 && pagesLeft > 4) {
        console.log('aq2')
        pages = [
            <LocationItem path={path} key={uuid()} history={history} pageNumber={page - 3} category={category}/>,
            <LocationItem path={path} key={uuid()} history={history} pageNumber={page - 2} category={category}/>,
            <LocationItem path={path} key={uuid()} history={history} pageNumber={page - 1} category={category}/>,
            <LocationItem path={path} key={uuid()} selected history={history} pageNumber={page} category={category}/>,
            <LocationItem path={path} key={uuid()} history={history} pageNumber={page + 1} category={category}/>,
            <div key={uuid()}><p className={style.Dots}>...</p></div>,
            <LocationItem path={path} key={uuid()} history={history} pageNumber={totalPages-1} category={category}/>,
            <LocationItem path={path} key={uuid()} history={history} pageNumber={totalPages} category={category}/>
        ]
    }else if(page > 4) {
        console.log('aq3')
        if(pagesLeft >= 4) {
            pages = [
                <LocationItem path={path} key={uuid()}  history={history} pageNumber={1} category={category}/>,
                <div key={uuid()}><p className={style.Dots}>...</p></div>,
                <LocationItem path={path} key={uuid()} history={history} pageNumber={page - 1} category={category}/>,
                <LocationItem path={path} key={uuid()} selected history={history} pageNumber={page} category={category}/>,
                <LocationItem path={path} key={uuid()} history={history} pageNumber={page + 1} category={category}/>,
                <div key={uuid()}><p className={style.Dots}>...</p></div>,
                <LocationItem path={path} key={uuid()} history={history} pageNumber={totalPages} category={category}/>
    
            ]   
        }

        if(pagesLeft < 4 ) {
            itemsLimit = totalPages
            for (let i= totalPages - 5; i < itemsLimit ; i++) {
                if (i === totalPages - 5) {
                    pages.push(<LocationItem path={path} key={uuid()}  history={history} pageNumber={1} category={category}/>);
                    pages.push(<div key={uuid()}><p className={style.Dots}>...</p></div>)
                }
                if (page === i +1) {
                    pages.push(<LocationItem path={path} key={uuid()} selected history={history} pageNumber={i+1} category={category}/>);
                } else {
                    pages.push(<LocationItem path={path}  key={uuid()} history={history} pageNumber={i+1} category={category}/>);
                }
    
            }    
        
        }
    }


    return (
        <div className={[style.PageLocation, disable].join(' ')}>
            {hasPrevPage 
            ? <LocationItem path={path} pageNumber={prevPage} history={history} category={category} classes={style.Prev} content={<><span><i class="fas fa-caret-left"></i></span> Anterior</>} /> 
            : null}
            <div className={style.Pages}>
                {pages}
            </div> 
            {hasNextPage
            ? <LocationItem path={path} pageNumber={nextPage} history={history} category={category} classes={style.Next} content={<>Próxima <span><i class="fas fa-caret-right"></i></span></>}/>
            : null}
        </div>
        
    )
}


export default PageLocation;
