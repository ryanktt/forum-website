import React from 'react';
import style from './Categories.module.css';
import Category from './Category/Category';

const Categories = () => {
    return (
        <div className={style.Categories}>
            <Category 
                categoryName='PC' 
                color='rgb(32, 32, 32)'
                fontAwesome={<i style={{color:'rgb(32, 32, 32)'}} class="fas fa-desktop"></i>}
                description='Notícias sobre PC, Hardware, Placas de Vídeo e Steam.'
                />
            <Category 
                categoryName='Playstation'
                color='rgb(22, 80, 255)'
                fontAwesome={<i style={{color:'rgb(22, 80, 255)'}} class="fab fa-playstation"></i>}
                description='Discussão sobre Sony/Playstation.'
                />
            <Category 
                categoryName='Xbox'
                color='rgb(13, 104, 0)'
                fontAwesome={<i style={{color: 'rgb(13, 104, 0)'}} class="fab fa-xbox"></i>}
                description='Discussão sobre Microsoft/Xbox.'/>
            <Category 
                categoryName='Jogos' 
                color='rgb(219, 0, 0)'
                fontAwesome={<i style={{color: 'rgb(219, 0, 0)'}} class="fas fa-gamepad"></i>}
                description='Discussão sobre jogos em geral.'/>
            <Category 
                categoryName='Filmes e Séries'
                color='rgb(0, 195, 229)'
                fontAwesome={<i style={{color:'rgb(0, 195, 229)'}} class="fas fa-film"></i>}
                description='Discussão e notícias sobre as séries e filmes do momento.'/>

            <Category 
                categoryName='Animes'
                color='rgb(140, 0, 255)'
                fontAwesome={<i style={{color:'rgb(140, 0, 255)'}} class="fas fa-video"></i>}
                description='Discussão e notícias sobre os animes/mangás do momento.'/>
            
            <Category 
                categoryName='Vale Tudo'
                description='O velho mas ouro, VT.'
                fontAwesome={<i class="fas fa-comment-alt"></i>}
            />
        </div>
    )
}

export default Categories;
