import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './Card.css';

class ListCards extends Component {
  render() {
    const { baralho } = this.props;
    // console.log(baralho); // mostra o array vazio dps o array de obejtos das cartas
    return (
      <section className="showCard">
        { // listar as cartas que forem sendo preenchidas
          baralho.map((elemento) => (
            <Card
              key={ elemento.cardName }
              cardName={ elemento.cardName }
              cardDescription={ elemento.cardDescription }
              cardAttr1={ elemento.cardAttr1 }
              cardAttr2={ elemento.cardAttr2 }
              cardAttr3={ elemento.cardAttr3 }
              cardImage={ elemento.cardImage }
              cardRare={ elemento.cardRare }
              cardTrunfo={ elemento.cardTrunfo }
            />))
        }
      </section>
    );
  }
}

ListCards.propTypes = {
  baralho: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListCards;
