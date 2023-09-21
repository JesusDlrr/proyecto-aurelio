/*Importes*/
import React from 'react';
import useHomePage from './useHomePage';
import styles from './homePage.module.css'

export const homePage = () => {
    <div>
        <input type='text' placeholder='Que estas pensando?'></input>
        <button type="button" className='btn btn-secondary'>Publicar</button>
    </div>
}