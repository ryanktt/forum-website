import React from 'react'
import style from './Category.module.css';
import FetchLink from '../../../components/FetchLink/FetchLink';

const Category = (props) => {
    let {path, fontAwesome, color, description, categoryName} = props;
    if(!path)  path = '' ;

 
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
                                <i class="far fa-comment"></i>
                                <p>789</p>
                            </div>
                            <div>
                                <i class="far fa-comments"></i>
                                <p>3558</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.LastPost}>
                <h4>Lorem Ipsum Dolores Matheo...</h4>
                <div>
                    <p>Today at 4:55 PM</p>
                    <p>Lorensio</p>
                </div>
            </div>


            
        </div>
    )
}

export default Category;
