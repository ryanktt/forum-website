import React, {useEffect, useState} from 'react';
import style from './Categories.module.css';
import Category from './Category/Category';
import {categories} from '../../utils/categories';
import axios from '../../utils/axios';

const Categories = () => {
    const [categoryArr, setCategoryArr] = useState([])

    useEffect(async() => {
        setCategoryArr(await Promise.all(categories.map(async category => {

            const categoryInf = await axios.get(`/categories/${category.value}`);
            const threadCount = categoryInf.data.threadCount;
            const postCount = categoryInf.data.postCount;
            const lastPost = categoryInf.data.lastPost[0];

            return <Category
            key={category.value}
            path={`/${category.value}`}
            categoryName={category.name} 
            color={category.color}
            fontAwesome={category.icon}
            description={category.description}
            lastPost={lastPost}
            threadCount={threadCount}
            postCount={postCount}
            categoryPath={category.value}
            />
        })))
    }, []);

    console.log(categoryArr)
    return (
        <div className={style.Categories}>
            {categoryArr}
            
        </div>
    )
}

export default Categories;
