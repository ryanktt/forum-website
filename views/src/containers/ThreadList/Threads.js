import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import style from './Threads.module.css';
import Thread from './Thread/Thread';
import Button from '../../components/UI/Button/Button';
import {fetchThreads} from '../../redux/actions/thread';
import Location from '../../components/Location/Location';
import {categories} from '../../utils/categories';
import PageLocation from '../../components/PageLocation/PageLocation';


const Threads = (props) => {
    let {fetchThreads, 
        reFetch,
        threads, 
        isAuth, 
        fetching, 
        match, 
        history,
        paginate,
        location
    } = props

    const category = match.params.category;
    const currentPage = location.search
    let newThreadBtn = null;

    if(isAuth) {
        newThreadBtn = <div className={style.ThreadsBtn}>
        <Button  link={`/user/new-thread?ctgry=${category}`} intense >Novo Tópico</Button>
        </div>
    }    

    //MAKE SO THAT THE THREADS ONLY FETCH ONCE (LOADING BUG)
    useEffect(() => {
        const param = {category: category, currentPage: currentPage}
        if(!threads && !fetching ) {
            return fetchThreads(param);
        }
      
        if(reFetch && !fetching) {
            return fetchThreads(param);
        }
        
    }, [reFetch])

     //get category name by param
     const currentCategory = categories.filter(el => {
        return el.value === category
    })

    if(!currentCategory[0]) {
        history.push('/') 
        return null
    }
    const categoryName = currentCategory[0].name;

    let threadList = []
    
    if(!fetching) if (threads) {
        threadList = threads.map(thread => {
            return <Thread {...props} thread={thread} key={thread._id} user={thread.user} />
        })
    }



    const locationItems = [
        {name: 'Categorias', path: '/'},
    ]
    



    return (
        <>  
        <div className={style.BtnMobile}>{newThreadBtn}</div>
            <div className={style.LocationBar}>
                <Location items={locationItems} />
                <div  className={style.Btn}>{newThreadBtn}</div>
            </div>
            
            <div className={style.ThreadsCategory}>
                <p >{categoryName}</p>
            </div>
            <div className={style.Thread}>
            {threadList}
            </div>
            <div className={style.PageLocation}><PageLocation history={history} category={category} {...paginate}/></div>
        </>
        
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated,
        threads: state.thread.threadList,
        fetching: state.thread.fetching,
        reFetch: state.thread.reFetch,
        paginate: state.thread.threadsPagination
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchThreads: (category) => dispatch(fetchThreads(category)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Threads);
