import React from 'react';
import './App.css';
import Form from './components/Form';
import Card from './components/Card';
import ListCards from './components/ListCards';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      baralho: [], // tive q setar um array vazio, q vai ser preenchido com objetos oriundos do map
    };
  }

  onSaveButtonClick = () => {
    // pego o estado(memoria) para começar a trabalhar com ele
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo } = this.state;
    // vou criar uma nova carta e colocar somente as info necessarias
    const novaCarta = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    // pego a memoria anterior e add uma nova carta
    this.setState((prevState) => ({
      baralho: [...prevState.baralho, novaCarta],
    }));
    // condicional para setar se tem ou nao super trunfo, se tiver muda a memoria do hasTrunfo pra true
    if (cardTrunfo === true) {
      this.setState({
        hasTrunfo: true,
      });
    }
    // nova memoria dps q clicar no botao de salvar, pq temos q esvaziar os inputs e prrencher para uma nova carta, loop infinito
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  handleSaveButtonDisabled = () => {
  // quando meu state estiver atualizado, faça esse codigo
    // chamando o state para dentro da funçao
    const { cardName, cardDescription,
      cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare } = this.state;
    // verificar se algo esta sendo digitado no input
    const nome = cardName.length > 0;
    const descricao = cardDescription.length > 0;
    const imagem = cardImage.length > 0;
    const raridade = cardRare.length > 0;
    // verificando os valores do input dos attr
    const max = 210;
    const min = 90;
    const attr1 = (Number(cardAttr1) <= min && Number(cardAttr1) >= 0);
    const attr2 = (Number(cardAttr2) <= min && Number(cardAttr2) >= 0);
    const attr3 = (Number(cardAttr3) <= min && Number(cardAttr3) >= 0);
    const total = ((Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3)) <= max);
    // verficando se todas as variaveis/condiçoes sao true
    const condicao = [nome, descricao, imagem, raridade, attr1, attr2, attr3, total];
    const verifyTrue = condicao.every((elemento) => elemento === true);
    // setando o button habilitado se as condiçoes forem atendidas
    this.setState({ isSaveButtonDisabled: !verifyTrue });
  }

  onInputChange = ({ target }) => {
    // console.log(this.state); // mostra o meu estado do constructor
    // console.log(target.checked); // pega o true e false qdo o checkbox ta selecionado
    const isTrunfo = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [target.name]: isTrunfo }, this.handleSaveButtonDisabled);
  }

  render() {
    const {
      cardName, cardDescription, baralho,
      cardAttr1, cardAttr2, cardAttr3, hasTrunfo,
      cardImage, cardRare, cardTrunfo, isSaveButtonDisabled } = this.state;

    return (
      <main>
        <h1>Tryunfo</h1>
        <section className="page">
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ hasTrunfo === false ? cardTrunfo : !cardTrunfo }
            onInputChange={ this.onInputChange }
          />
        </section>
        <section>
          <ListCards baralho={ baralho } />
        </section>
      </main>
    );
  }
}

export default App;
