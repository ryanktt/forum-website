import React from 'react'
import style from './Category.module.css';
import FetchLink from '../../../components/FetchLink/FetchLink';
import {dateFormat} from '../../../utils/dateFormat';
import {trimString} from '../../../utils/textFormat';

const Category = (props) => {
    const {fontAwesome, color, description, categoryName, categoryPath, postCount, threadCount, lastPost} = props;
    let {path} = props;
 
    if(!path)  path = '' ;
    console.log(lastPost)
    return (
        <div  className={style.Category} style={{borderColor: color}}>
            <div className={style.Introduction}>
                <div className={style.FontAwesome}>
                    {fontAwesome}
                </div>
                <div className={style.CategoryInfo}>
                    <FetchLink path={`/threads${path}`}><h2 style={{color: color}}>{categoryName}</h2></FetchLink>
                    <p>{description}</p>

                    <div className={style.CategoryDetails}>
                        <div className={style.CategoryDetailsBox}>
                            <div>
                                <i className="far fa-comment"></i>
                                <p>{threadCount}</p>
                            </div>
                            <div>
                                <i className="far fa-comments"></i>
                                <p>{postCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {lastPost ? <div className={style.LastPost}>
                <FetchLink path={`/thread/${categoryPath}/${lastPost.thread._id}`}><h4>{trimString(lastPost.thread.title, 40)}</h4></FetchLink>
                <div>
                    <p>{dateFormat(lastPost.createdAt)}</p>
                    <FetchLink path={`/member/${lastPost.user._id}`} ><p className={style.Name}>{lastPost.user.name}</p></FetchLink>
                </div>
            </div> : null}


            
        </div>
    )
}

export default Category;
