function checkCashRegister(price, cash, cid) {


    let cashUnits = [
        ["ONE HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER",0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
    ]

    let amountDue = cash - price
    let changeDue = calculateChangeDue(cid, amountDue, cashUnits)
    let amountInDrawer = findAmountInDrawer(cid)
    console.log(amountInDrawer)
    console.log(changeDue)
    if (amountInDrawer < amountDue) {
      return {
        status: "INSUFFICIENT_FUNDS",
        change: []
      }
  
    } else if (amountInDrawer == amountDue) {
      return {status: "CLOSED", change: changeDue}
    } else {
      console.log('{status: "OPEN", change: ' + changeDue + '}')
      return {status: "OPEN", change: changeDue }

    }
  
  function findAmountInDrawer(cashInDrawer) {
    let totalCash = 0;
    cashInDrawer.forEach(c => {
      totalCash += c[1]
    })
    return totalCash.toFixed(2);
  }
  
  function calculateChangeDue(cashInDrawer, amountDue, cashUnits) {
    let runningTotal = amountDue.toFixed(2);
    let change = []
    while (runningTotal != 0) {
     
      let largest = findlargestFitting(cashInDrawer, runningTotal, cashUnits)
      runningTotal -= largest[1]
      addChangeToChange(change, largest)
      subtractLargestFromCashInDrawer(cashInDrawer, largest)
      runningTotal = runningTotal.toFixed(2)

  
    }
    return change
  }
  
  function subtractLargestFromCashInDrawer(cashInDrawer, largest) {
    let CashToBeSubtractedFrom = cashInDrawer.find(c=> c[0] == largest[0])
    CashToBeSubtractedFrom[1] -= largest[1]
    if (CashToBeSubtractedFrom[1] == 0){

    }
    return cashInDrawer
  }

  function addChangeToChange(change, largest) {
     let foundItem1 = change.find(c=> c[0] == largest[0])
      if (foundItem1 != undefined) {

        foundItem1[1] += largest[1]
        
      }
       else {
        change.push(largest)
      }
      return change
    }
  
  
  function findlargestFitting(cashInDrawer, amountDue, cashUnits) {
    for (let i = 0; i <= cashUnits.length; i++) {
    if(amountDue - cashUnits[i][1] >= 0){
        return cashUnits[i]
        }
    }
  }
  
  //comment
  
  function findAmountInDrawer(cashInDrawer) {
    let totalCash = 0;
    cashInDrawer.forEach(c => {
      totalCash += c[1]
    })
    return totalCash.toFixed(2);
  }
  
}
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
  