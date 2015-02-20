# financejs
A library for calculating things

## Amortization
Use to get amortization with handy-D3 like syntax and D3 compatible output.

Example:
    var mortgage = $$$.amortize('300000')
      .down('10%')
      .period('25y')
      .interest(0.06);
      
    mortgage.balances(); // array of neat stuff
    
    mortgage.down(37600); // hmm maybe this would do better.
    
    mortgage.balances(); // even neater stuff
      

