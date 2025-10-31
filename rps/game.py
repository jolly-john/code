import random

MOVES = ['rock', 'paper', 'scissors']

class RockPaperScissors:
    def get_computer_move(self):
        return random.choice(MOVES)

    def get_winner(self, player, computer):
        if player == computer:
            return 'draw'
        if (
            (player == 'rock' and computer == 'scissors') or
            (player == 'scissors' and computer == 'paper') or
            (player == 'paper' and computer == 'rock')
        ):
            return 'player'
        return 'computer'
