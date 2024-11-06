import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState(null); // Iniciado como null
  const [winner, setWinner] = useState(null);
  const [playerOneSymbol, setPlayerOneSymbol] = useState(null); // Símbolo escolhido pelo Jogador 1
  const [playerOneWins, setPlayerOneWins] = useState(0); // Contador de vitórias do Jogador 1
  const [playerTwoWins, setPlayerTwoWins] = useState(0); // Contador de vitórias do Jogador 2

  // Função chamada quando uma célula é clicada
  const handleCellClick = (index) => {
    if (winner) {
      return null; // Não permite clicar depois de alguém vencer
    }

    if (board[index] !== "") {
      return null; // Impede de clicar em células já preenchidas
    }

    // Atualiza o tabuleiro com o símbolo do jogador
    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));

    // Alterna o jogador após cada jogada
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  // Função que verifica se algum jogador venceu
  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) {
        setWinner("O");
        if (playerOneSymbol === "O") {
          setPlayerOneWins(playerOneWins + 1)
        }

        else if (playerOneSymbol !== "O") {
          setPlayerTwoWins(playerTwoWins + 1);
        }; // Jogador 2 vence
      }
      if (cells.every(cell => cell === "X")) {
        setWinner("X");
        if (playerOneSymbol === "X") {
          setPlayerOneWins(playerOneWins + 1)
        }

        else if (playerOneSymbol !== "X") {
          setPlayerTwoWins(playerTwoWins + 1);
        };
        // Jogador 1 vence
      }
    });
  }

  // Função que verifica se houve empate
  const checkDraw = () => {
    if (board.every(item => item !== "") && winner === null) {
      setWinner("E"); // Empate
    }
  }

  checkDraw();

  useEffect(checkWinner, [board]);

  // Função para reiniciar o jogo
  const resetGame = () => {
    if (winner !== "E") {
      setCurrentPlayer(winner === "X" ? "O" : "X"); // Inicia o próximo jogo com o jogador correto
    }
    setBoard(emptyBoard);
    setWinner(null);
  }

  const resetRank = () => {
    setPlayerOneWins(0);
    setPlayerTwoWins(0);
  }

  // Função para escolher o símbolo do jogador 1
  const handleSymbolChoice = (symbol) => {
    setPlayerOneSymbol(symbol);
    setCurrentPlayer(symbol); // Jogador 1 começa com o símbolo escolhido
  }

  // Determina o símbolo do Jogador 2 com base na escolha do Jogador 1
  const playerTwoSymbol = playerOneSymbol === "X" ? "O" : "X";

  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>

      {/* Interface para escolher o símbolo */}
      {playerOneSymbol === null && (
        <div className="symbol-choice">
          <h2>Escolha o símbolo do Jogador 1</h2>
          <button onClick={() => handleSymbolChoice("X")}>X</button>
          <button onClick={() => handleSymbolChoice("O")}>O</button>
        </div>
      )}

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => (
          <div
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Exibe a mensagem do vencedor ou empate */}
      {winner && (
        <footer>
          {winner === "E" ? (
            <h2 className="winner-message">
              <span className={winner}>Empatou!</span>
            </h2>
          ) : (
            <h2 className="winner-message">
              <span className={winner}>{winner}</span> venceu!
            </h2>
          )}
        </footer>
      )}

      {/* Botão para reiniciar o jogo */}
      <div>
        <button className="reset-button" onClick={resetGame}>Recomeçar Jogo!</button>
      </div>

      <div>
        <button className="reset-rank-button" onClick={resetRank}>Resetar Pontos!</button>
      </div>

      {/* Contador de vitórias */}
      <div className="scoreboard">
        <h3>Jogador 1 ({playerOneSymbol}): {playerOneWins} vitórias</h3>
        <h3>Jogador 2 ({playerTwoSymbol}): {playerTwoWins} vitórias</h3>
      </div>
    </main>
  );
}

export default TicTacToe;
