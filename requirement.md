Stock Portfolio App
-------------

### Instructions

1. Use any framework of your comfort in your solution (React, Angular, Vanilla JS, etc.) React folks can use [crete-react-app](https://github.com/facebookincubator/create-react-app) to quickly bootstrap the boilerplate setup.
2. Once done, please zip the deliverables and email it to us (If you use NPM, please don't include `node_modules`, but update your `package.json` with all of the dependencies for us to run your app).
3. Try to consider basic accessibility in your solution.

### Intro

We would like you to build a simple stock portfolio application. The application will let the user to enter the stock that the user has bought and at what price. Then, it will fetch the current market price of that stock and calculates the profit/loss data and displays it to the user. 

Screenshot of this application below.

![image](https://s3.amazonaws.com/hr-assets/0/1496780539-e90d092985-portfolio-test.png)

### Basic Requirements

1. Try to match your app UI to the screenshot above. 
2. Input fields:
	1. **Symbol** : String : Any length : Required : The symbol is the stock name that thse user wants to add. All stock symbols are from NASDAQ / Google Finance API. Sample values: *GOOG, AAPL, V*.
	2. **Price** : Number : Any length, with two decimal places : Required : The price at which the user has bought the stock. Sample values: *89.80, 123.10*.
	3. **Quantity** : Number : Any length, only Integer : Required : Number of stocks that the user has bought. Sample values: *100, 30, 50*.
	4. **Date** : Date : A Valid date in DD/MM/YYY format : The date of the transaction. Could be any date. Sample values: *10/01/2017, 28/04/2017*
3. Once the user enter above data and click on the `+` button, the app should add the stock the portfolio list. At the same time, it should fetch the current market price of the stock symbol from this API: "http://finance.google.com/finance/info?q=NASDAQ:AAPL,NASDAQ:GOOG,NASDAQ:V". You can fetch the prices for multiple stocks using this one sinple API. Construct this URL dynamically, according to the stocks that are currently in portfolio.
4. Once you get the response back, display the portfolio items in the below format.
   1. SYMBOL / QTY * BOUGHT PRICE = [VALUE] / DATE
   2. CURRENT PRICE / PROFIT


### Bonus points

You will get additional points if you are able to complete these steps.

1. Make the app responive, that looks good across devices.
2. Ability to edit/delete the items in the portfolio.
3. Ability to store the portfolio in local storage so that when the user refresh the page, we retain the portfolio data.
