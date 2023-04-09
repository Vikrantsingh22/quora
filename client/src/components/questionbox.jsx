import { Avatar } from '@mui/material'
import React from 'react'
import "../StyleSheet/QuestionBox.css"


const Questionbox=() =>{
    return(
        <div className='QuestionBox'>
            <div className='QuestionBox__user'>
                <Avatar src='' alt='Profile of user'/>
                <h4 className='user__id'>USER</h4>


            </div>
            <input type="text" placeholder='Ask your question' className='QuestionBox__inputtext' />


        </div>
    );
};

export default Questionbox
