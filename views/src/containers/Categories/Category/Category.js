import React from 'react'
import style from './Category.module.css';
import {Link} from 'react-router-dom';

const Category = (props) => {
    let path = props.path;
    if(!props.path)  path = '' ;

    return (
        <div className={style.Category} style={{borderColor: props.color}}>
            <div className={style.Introduction}>
                <div className={style.FontAwesome}>
                    {props.fontAwesome}
                </div>
                <div className={style.CategoryInfo}>
                    <Link to={`/threads${path}`}><h2 style={{color: props.color}}>{props.categoryName}</h2></Link>
                    <p>{props.description}</p>

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
