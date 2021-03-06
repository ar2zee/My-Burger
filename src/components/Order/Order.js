import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingridientName in props.ingredients) {
        ingredients.push({
            name: ingridientName,
            amount: props.ingredients[ingridientName]
        })
    }

    const ingredientOutut = ingredients.map(ig => {
        return (
            <span key={ig.name} style={{textTransform: 'capitilize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}>
                {ig.name} ({ig.amount})
            </span>
        )
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutut}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>

        </div>
    )
}

export default order;