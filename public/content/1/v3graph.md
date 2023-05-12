---
id: liquidity-graph
title: v3 Liquidity Graph
embed:  hf0fPW3MkHM
---

#  Understanding Liquidity Price Graphs

In this video, the speaker explains how to read and understand liquidity price graphs. The example used is the USDC-IF pool.

## Introduction to Liquidity Price Graphs

-  A liquidity price graph shows the relationship between two tokens in a liquidity pool.
- The x-axis represents one token, while the y-axis represents the other token.
- The current price is shown on both sides of the current tick.
- In this example, X represents USDC, and Y represents IF.

## Deriving a Liquidity Price Graph

-  P = Y/X represents the price of X in terms of Y.
- To get the price of Y in terms of X, we flip the equation to get X/Y = 1/P.
- Instead of using P to show the graph for a liquidity price graph, we use 1/P.

## Mapping Ticks to a Modified Graph

-  To convert a graph into one where 1/P increases as ticks move right, we need to flip inequalities so that 1/Pa >= 1/P >= 1/Pb.
- We can then map these onto our modified graph with ticks increasing as 1/P moves right.

## Converting Prices to Ticks

-  To convert prices into ticks, we use log base 1.0001 and take -log(1.0001)^P = -T.
- Using this equation, we can replace each instance of 1/P with its corresponding tick value on our modified graph.
#  Token X and Y Placement

In this section, the speaker explains the placement of tokens X and Y in relation to Tier B and Tier Bay. 

## Token Placement

-  Token X will be between TLB and Tier Bay on the left of minus T.
-  To the left of the current T and between T and T of A, we have token Y.
-  On the bottom graph, token Y will come to the right of the current key to the left of minus T.
-  To the right of minus T, we have our token Y.

#  Price Increase as Tick Moves Right

In this section, the speaker discusses how price increases as tick moves from left to right.

## Price Increase

-  The price of Eve in terms of USDC is represented as 1 over P increases as tick moves to the right.
-  Going back to Uniswap V3 website for if USDC pool, all tokens are in USDC to the left of current tick.
-  To the right of current tick, although tokens are in Eve, you can see that price increases.
-  Here, at a certain point on Uniswap V3 website for if USDC pool, price is 1082. 
-  As we move over to the right, you can see now that price has increased to 1096.
