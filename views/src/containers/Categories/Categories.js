import React from 'react';
import style from './Categories.module.css';
import Category from './Category/Category';
import {categories} from '../../utils/categories';

const Categories = () => {
    return (
        <div className={style.Categories}>
            {
                categories.map(category => {
                    return <Category
                    key={category.value}
                    path={`/${category.value}`}
                    categoryName={category.name} 
                    color={category.color}
                    fontAwesome={category.icon}
                    description={category.description}
                />
                })
            }
            
        </div>
    )
}

export default Categories;
