import React, {useEffect, useState} from 'react';
import style from './Categories.module.css';
import Category from './Category/Category';
import {categories} from '../../utils/categories';
import axios from '../../utils/axios';
import Loading from '../../components/UI/Loading/Loading';

const Categories = () => {
    const [categoryArr, setCategoryArr] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {(async() => {
        setLoading(true)
        const categoryPromise =  await Promise.all(categories.map(async category => {

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
        }))
        setCategoryArr(categoryPromise);
        setLoading(false)})()
    }, []);

    return (
        <div className={style.Categories}>
            {loading ? <Loading/> : categoryArr}
            
        </div>
    )
}

export default Categories;
